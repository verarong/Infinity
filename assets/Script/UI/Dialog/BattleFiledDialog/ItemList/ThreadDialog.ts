import { BaseDialog } from "../../../Common/BaseDialog";
import { Debug } from "../../../../Common/Debug";
import { ThreadData } from "../../../../Common/JsonData/JsonData";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import BattleFiledDialog from "../BattleFiledDialog";
import { Util } from "../../../../Common/Utils/Util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ThreadDialog extends BaseDialog {
      private node_id: string;
      private thread_id: number;
      private plot_thread: ThreadData;
      private plot_thread_step: Array<any> = new Array()
      private current_step: number = 0
      private dialogue: string = ""
      private typerTimer: number = null; // 计时器Id
      private bool_memory: boolean;

      @property(cc.Node)
      public thread_plot: cc.Node;

      @property(cc.Node)
      public choice_interface: cc.Node;

      @property(cc.Sprite)
      public background: cc.Sprite;

      @property(cc.Node)
      public plot_node: cc.Node;

      @property(cc.Node)
      public dialogue_other_node: cc.Node;

      @property(cc.Node)
      public dialogue_self_node: cc.Node;

      @property(cc.Label)
      public plot: cc.Label;

      @property(cc.Label)
      public dialogue_other: cc.Label;

      @property(cc.Label)
      public dialogue_self: cc.Label;

      @property(cc.Sprite)
      public drawing_other: cc.Sprite;

      @property(cc.Sprite)
      public drawing_self: cc.Sprite;

      @property(cc.Node)
      public skip_plot: cc.Node;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public describe: cc.Label;

      @property(cc.Label)
      public choice1: cc.Label;

      @property(cc.Label)
      public choice2: cc.Label;

      @property(cc.Label)
      public choice3: cc.Label;

      @property(cc.Label)
      public choice4: cc.Label;

      @property(cc.Node)
      public choice1_node: cc.Node;

      @property(cc.Node)
      public choice2_node: cc.Node;

      @property(cc.Node)
      public choice3_node: cc.Node;

      @property(cc.Node)
      public advance: cc.Node;

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return this.thread_id;
      }

      closeDialog(): any {
            this.hide();
      }

      private MakeLabelType(label: cc.Label, str: string, split = "\n", time = 1000) {
            let charArr = str.split(split);
            let charIdx = 0;

            this.typerTimer && clearInterval(this.typerTimer);
            this.typerTimer = setInterval(() => {
                  if (charIdx >= charArr.length) {
                        this.typerTimer && clearInterval(this.typerTimer);
                        this.advance.active = true
                  } else {
                        charIdx += 1;
                        label.string = charArr.slice(0, charIdx).join(split);
                  }
            }, time);
      }

      public bind(info: any) {
            Debug.log(info);
            this.node_id = info[0];
            this.bool_memory = this.node_id == ""
            this.thread_id = info[1];
            this.plot_thread = window.appContext.ConfigManager.GetthreadById(this.thread_id);
            this.current_step = 0
            this.typerTimer = null;
            this.plot.string = ""
            if (info[3]) {
                  this.dialogue = this.plot_thread.dialogue_branch.toString()
            }
            else if (this.plot_thread.dialogue_branch) {
                  this.dialogue = window.appContext.DataContainer.PartnerDetail.get(this.plot_thread.map_id)["intimacy"] >= this.plot_thread.threshold ? this.plot_thread.dialogue.toString() : this.plot_thread.dialogue_branch.toString()
            }
            else {
                  this.dialogue = this.plot_thread.dialogue.toString()
            }

            let plot_thread_step: Array<any> = new Array()

            if (this.plot_thread.plot) {
                  let plot: any = {}
                  plot.type = "plot"
                  plot.content = this.plot_thread.plot
                  plot_thread_step.push(plot)
            }

            if (this.plot_thread.dialogue) {
                  for (let dialog of this.dialogue.split("\n")) {
                        let dialogue: any = {}
                        dialogue.type = "dialogue"
                        dialogue.content = dialog
                        plot_thread_step.push(dialogue)
                  }
            }
            this.plot_thread_step = plot_thread_step
      }

      public showByPlot() {
            let current = this.plot_thread_step[this.current_step]

            if (current.type == "plot") {
                  this.plot_node.active = true
                  this.dialogue_other_node.active = false
                  this.dialogue_self_node.active = false
                  this.advance.active = false
                  this.MakeLabelType(this.plot, current.content)
                  window.appContext.SoundManager.playPlot(this.plot_thread.map_id)
            }
            else if (current.type == "dialogue") {
                  this.skip_plot.active = true
                  this.plot_node.active = false
                  let [role, sentence, dubbing] = current.content.split("卍")
                  if (dubbing != 'null') {
                        window.appContext.SoundManager.playSFX("dubbing_" + dubbing + ".mp3")
                  }

                  if (role == "self" || role == "null") {
                        this.dialogue_other_node.active = false
                        this.dialogue_self_node.active = true
                        this.drawing_self.node.active = true
                        this.dialogue_self.string = sentence.replace("{}", window.appContext.DataContainer.RoleData.name)
                        window.appContext.Pool.setSpriteFrameByUrl("self_" + window.appContext.DataContainer.AvatarData.head, this.drawing_self);
                        this.drawing_self.node.active = role == "self"
                        this.dialogue_self.node.width = role == "self" ? 420 : 620
                  }
                  else {
                        this.dialogue_other_node.active = true
                        this.dialogue_self_node.active = false
                        this.dialogue_other.string = sentence.replace("{}", window.appContext.DataContainer.RoleData.name)
                        window.appContext.Pool.setSpriteFrameByUrl("partner_" + role, this.drawing_other);
                  }
            }
      }


      public show(info: any) {
            this.bind(info);

            let thread_data: ThreadData = window.appContext.ConfigManager.GetthreadById(this.thread_id);
            let bool_terminal_thread = window.appContext.ConfigManager.checkBoolTerminalThread(this.thread_id);
            this.title.string = thread_data.name;
            this.describe.node.active = !bool_terminal_thread;
            this.choice1.string = thread_data.choice1;
            this.choice2.string = thread_data.choice2;
            this.choice3.string = thread_data.choice3;
            this.choice1_node.active = !bool_terminal_thread
            this.choice2_node.active = !bool_terminal_thread
            this.choice3_node.active = !bool_terminal_thread
            this.choice4.string = bool_terminal_thread ? (window.appContext.DataContainer.PartnerDetail.get(this.plot_thread.map_id)["intimacy"] >= this.plot_thread.threshold ? "Happy Ending" : "Bad Ending") : "我还没有做好决定下次再来"

            if (this.plot_thread.background) {
                  window.appContext.Pool.setSpriteFrameByUrl(this.plot_thread.background, this.background);
            }
            else {
                  window.appContext.Pool.setSpriteFrameByUrl("plot_bg_" + Util.getRndInteger(1, 10), this.background);
            }

            //仅首次触发剧情
            if (thread_data.dialogue && info[2]) {
                  this.thread_plot.active = true
                  this.skip_plot.active = false
                  this.choice_interface.active = false
                  this.showByPlot()
            }
            else {
                  this.choice_interface.active = true
                  this.thread_plot.active = false
                  this.skip_plot.active = false
            }
      }

      public Advance() {
            let current = this.plot_thread_step[this.current_step]
            if (current.type == "plot") {
                  window.appContext.SoundManager.playerBgm2()
            }

            if (this.current_step < this.plot_thread_step.length - 1) {
                  this.current_step += 1
                  this.showByPlot()
            }
            else if (!this.bool_memory) {
                  this.choice_interface.active = true
                  this.skip_plot.active = false
                  this.thread_plot.active = false
            }
            else {
                  this.hide()
            }
      }

      public Skip() {
            if (this.bool_memory) {
                  this.hide()
            }
            else {
                  this.choice_interface.active = true
                  this.skip_plot.active = false
                  this.thread_plot.active = false
            }
      }

      public choice(choice_id: number) {
            let self = this
            window.appContext.WebApi.thread_node(this.node_id, choice_id, this,
                  function (succData) {
                        window.appContext.WebApi.get_character_info(["battle", "partner", "role_params"], this, function (data) {
                              window.appContext.DataContainer.set_BattleData(data.battle)
                              window.appContext.DataContainer.set_PartnerData(data.partner)
                              window.appContext.DataContainer.set_GuideData(data.role_params)
                              let battleFiledDialog = window.appContext.UIManager.getDialog(PrefabUrl.BattleFiledDialog) as BattleFiledDialog;
                              battleFiledDialog.refresh()
                              self.hide();
                        })
                  }
            );
      }

      public choice_1() {
            this.choice(1)
      }

      public choice_2() {
            this.choice(2)
      }

      public choice_3() {
            this.choice(3)
      }

      public choice_4() {
            this.choice(4)
      }
}
