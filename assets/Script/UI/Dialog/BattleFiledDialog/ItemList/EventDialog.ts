import { BaseDialog } from "../../../Common/BaseDialog";
import { Debug } from "../../../../Common/Debug";
import { EventData } from "../../../../Common/JsonData/JsonData";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import BattleFiledDialog from "../BattleFiledDialog";
import { Util } from "../../../../Common/Utils/Util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class EventDialog extends BaseDialog {
      private node_id: string;
      private event_id: number;

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

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return this.event_id;
      }

      closeDialog(): any {
            this.hide();
      }

      public bind(info: any) {
            Debug.log(info);
            this.node_id = info[0];
            this.event_id = info[1];
      }

      public format_choice(event_data: EventData) {
            if (event_data.requirement1 && !Util.CheckRequirement(event_data.requirement1, event_data.require_level1)) {
                  this.choice1.node.color = Util.ButtonColor("shortage")
                  this.choice1.getComponent(cc.LabelOutline).enabled = false
            }
            else if (event_data.cost1 && !Util.CheckItem(event_data.cost_id1, event_data.cost_amount1)) {
                  this.choice1.node.color = Util.ButtonColor("shortage")
                  this.choice1.getComponent(cc.LabelOutline).enabled = false
            }
            else {
                  this.choice1.node.color = Util.ButtonColor("highlight")
                  this.choice1.getComponent(cc.LabelOutline).enabled = true
            }

            if (event_data.requirement2 && !Util.CheckRequirement(event_data.requirement2, event_data.require_level2)) {
                  this.choice2.node.color = Util.ButtonColor("shortage")
                  this.choice2.getComponent(cc.LabelOutline).enabled = false
            }
            else if (event_data.cost2 && !Util.CheckItem(event_data.cost_id2, event_data.cost_amount2)) {
                  this.choice2.node.color = Util.ButtonColor("shortage")
                  this.choice2.getComponent(cc.LabelOutline).enabled = false
            }
            else {
                  this.choice2.node.color = Util.ButtonColor("highlight")
                  this.choice2.getComponent(cc.LabelOutline).enabled = true
            }

            if (event_data.requirement3 && !Util.CheckRequirement(event_data.requirement3, event_data.require_level3)) {
                  this.choice3.node.color = Util.ButtonColor("shortage")
                  this.choice3.getComponent(cc.LabelOutline).enabled = false
            }
            else if (event_data.cost3 && !Util.CheckItem(event_data.cost_id3, event_data.cost_amount3)) {
                  this.choice3.node.color = Util.ButtonColor("shortage")
                  this.choice3.getComponent(cc.LabelOutline).enabled = false
            }
            else {
                  this.choice3.node.color = Util.ButtonColor("highlight")
                  this.choice3.getComponent(cc.LabelOutline).enabled = true
            }
      }

      public show(info: any) {
            this.bind(info);

            let event_data: EventData = window.appContext.ConfigManager.GeteventById(this.event_id);
            this.title.string = event_data.name;
            this.describe.string = event_data.describe;
            this.choice1.string = event_data.choice1;
            this.choice2.string = event_data.choice2;
            this.choice3.string = event_data.choice3;
            this.format_choice(event_data)
      }

      public choice(choice_id: number) {
            let self = this
            window.appContext.WebApi.event_node(this.node_id, choice_id, this,
                  function (succData) {
                        window.appContext.WebApi.get_character_info(["battle", "item"], this, function (data) {
                              window.appContext.DataContainer.set_BattleData(data.battle)
                              window.appContext.DataContainer.set_ItemData(data.item)
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
}
