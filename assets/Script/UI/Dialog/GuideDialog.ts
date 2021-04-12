import { Debug } from "../../Common/Debug";
import { GuideData } from "../../Common/JsonData/JsonData";
import { Util } from "../../Common/Utils/Util";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import { BaseDialog } from "../Common/BaseDialog";
import BattlePanel from "../Panel/BattlePanel/BattlePanel";
import FortifiedData from "../Panel/BattlePanel/ItemList/FortifiedData";
import DomainPanel from "../Panel/DomainPanel/DomainPanel";
import ArtsChoiceDialog from "./ArtsChoiceDialog";
import CharacterUpgradeChoiceDialog from "./CharacterUpgradeChoiceDialog";
import CommonComposeDialog from "./CommonComposeDialog/CommonComposeDialog";
import CommonLevelUpgradeDialog from "./CommonLevelUpgradeDialog";
import EnterFortifiedDialog from "./EnterFortifiedDialog";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GuideDialog extends BaseDialog {

      private guide: GuideData;
      private fight_data: any;
      private guide_step: Array<any> = new Array()
      private current_step: number = 0
      private typerTimer: number = null; // 计时器Id
      private arrow_guide: boolean = false

      @property(cc.Sprite)
      public mask: cc.Sprite;

      @property(cc.Sprite)
      public background: cc.Sprite;

      @property(cc.Node)
      public plot_node: cc.Node;

      @property(cc.Node)
      public dialogue_other_node: cc.Node;

      @property(cc.Node)
      public dialogue_self_node: cc.Node;

      @property(cc.Node)
      public guide_text_node: cc.Node;

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
      public arrow_area: cc.Node;

      @property(cc.Node)
      public skip: cc.Node;

      @property(cc.Node)
      public advance: cc.Node;

      start() {
            this.fastShowAnim();
      }

      reset(): void {
            return
      }

      onDisable() {
      }

      getData(): any {
            return this.guide;
      }

      closeDialog(): any {
            this.typerTimer && clearInterval(this.typerTimer);
            if (this.fight_data) {
                  window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, this.fight_data);
            }
            this.hide();
      }

      update(dt) {
            this.arrow_area.opacity = 200 + 50 * Math.sin(100 * dt)
      }

      private MakeLabelType(label: cc.Label, str: string, split = "\n", time = 500) {
            let charArr = str.split(split);
            let charIdx = 0;

            this.typerTimer && clearInterval(this.typerTimer);
            this.typerTimer = setInterval(() => {
                  if (charIdx >= charArr.length) {
                        this.typerTimer && clearInterval(this.typerTimer);
                  } else {
                        charIdx += 1;
                        label.string = charArr.slice(0, charIdx).join(split);
                  }
            }, time);
      }

      public bind(info: any) {
            Debug.log(info);
            [this.guide, this.fight_data] = info;

            let guide_step: Array<any> = new Array()

            if (this.guide.plot) {
                  let plot: any = {}
                  plot.type = "plot"
                  plot.content = this.guide.plot
                  guide_step.push(plot)
            }

            if (this.guide.dialogue) {
                  for (let dialog of this.guide.dialogue.split("\n")) {
                        let dialogue: any = {}
                        dialogue.type = "dialogue"
                        dialogue.content = dialog
                        guide_step.push(dialogue)
                  }
            }

            if (this.guide.text) {
                  let arrow: any = {}
                  arrow.type = "arrow"
                  arrow.content = this.guide.text
                  guide_step.push(arrow)
                  this.arrow_guide = true
            }
            else {
                  this.arrow_guide = false
            }

            this.guide_step = guide_step
            this.current_step = 0
            this.skip.active = true
            this.advance.active = true
            this.arrow_area.active = false
      }

      public showByData() {
            let current = this.guide_step[this.current_step]
            this.background.node.active = this.guide.background ? current.type == "plot" : false
            this.mask.node.active = current.type != "arrow"

            if (current.type == "plot") {
                  this.plot_node.active = true
                  this.dialogue_other_node.active = false
                  this.dialogue_self_node.active = false
                  this.guide_text_node.active = false
                  this.MakeLabelType(this.plot, current.content)
            }
            else if (current.type == "dialogue") {
                  this.plot_node.active = false
                  this.guide_text_node.active = false
                  let [role, sentence, dubbing] = current.content.split("卍")
                  if (dubbing != 'null') {
                        window.appContext.SoundManager.playSFX("dubbing_" + dubbing + ".mp3")
                  }

                  if (role == "self") {
                        this.dialogue_other_node.active = false
                        this.dialogue_self_node.active = true
                        this.dialogue_self.string = sentence.replace("{}", window.appContext.DataContainer.RoleData.name)
                        window.appContext.Pool.setSpriteFrameByUrl("self_" + window.appContext.DataContainer.AvatarData.head, this.drawing_self);
                  }
                  else if (role == "null") {
                        this.dialogue_other_node.active = false
                        this.dialogue_self_node.active = true
                        this.drawing_self.node.active = false
                  }
                  else {
                        this.dialogue_other_node.active = true
                        this.dialogue_self_node.active = false
                        this.dialogue_other.string = sentence.replace("{}", window.appContext.DataContainer.RoleData.name)
                        window.appContext.Pool.setSpriteFrameByUrl("partner_" + role, this.drawing_other);
                  }
            }
            else if (current.type == "arrow") {
                  this.plot_node.active = false
                  this.dialogue_other_node.active = false
                  this.dialogue_self_node.active = false
                  this.guide_text_node.active = true
                  this.guide_text_node.setPosition(this.guide.loc_x, this.guide.loc_y)
                  this.skip.active = false
                  this.advance.active = false
                  this.arrow_area.active = true
                  this.arrow_area.runAction(Util.getBlink())
            }
      }

      public show(info: any) {
            this.bind(info);
            this.showByData()

            if (this.guide.background) {
                  window.appContext.Pool.setSpriteFrameByUrl(this.guide.background, this.background);
            }

            let self = this
            if (this.guide.condition_type != "fight") {
                  window.appContext.WebApi.guide_advance(this.guide.condition_type, this, function (data) {
                        if (self.guide.condition_type == "guide") {
                              window.appContext.DataContainer.GuideData.guide += 1
                        }
                        else if (self.guide.condition_type == "level_trigger") {
                              window.appContext.DataContainer.GuideData.level_trigger_guide += 1
                        }
                  })
            }
      }

      public Arrow() {
            this.closeDialog()

            if (this.guide.arrow_callback_id == 1 || this.guide.arrow_callback_id == 11) {
                  let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
                  domain.onBattleBtnClick()
            }
            else if (this.guide.arrow_callback_id == 2) {
                  let data = new FortifiedData(window.appContext.DataContainer.MapData.map[0], new cc.Vec2(10, 0))
                  window.appContext.UIManager.ShowDialog(PrefabUrl.EnterFortifiedDialog, data);
            }
            else if (this.guide.arrow_callback_id == 3) {
                  let dialog: EnterFortifiedDialog = window.appContext.UIManager.getDialog(PrefabUrl.EnterFortifiedDialog)
                  dialog.OnCombatBtnClick()
            }
            else if (this.guide.arrow_callback_id == 4 && window.appContext.DataContainer.Secrets.get(0).bool_free != 1) {
                  window.appContext.UIManager.ShowDialog(PrefabUrl.CommonSecretDialog, 0);
            }
            else if (this.guide.arrow_callback_id == 5) {
                  let battle: BattlePanel = window.appContext.UIManager.getCurrentPanel()
                  battle.BackBtnClick()
            }
            else if (this.guide.arrow_callback_id == 6) {
                  let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
                  domain.onBuildingClick()
            }
            else if (this.guide.arrow_callback_id == 7) {
                  let info = [window.appContext.DataContainer.DomainLevel.get(1), 1]
                  window.appContext.UIManager.ShowDialog(PrefabUrl.CommonBuildingUpgradeDialog, info)
            }
            else if (this.guide.arrow_callback_id == 8) {
                  let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
                  domain.onCharacterUpgradeChoiceClick()
            }
            else if (this.guide.arrow_callback_id == 9) {
                  let character_upgrade: CharacterUpgradeChoiceDialog = window.appContext.UIManager.getDialog(PrefabUrl.CharacterUpgradeChoiceDialog)
                  character_upgrade.upgrade_character_fly()
            }
            else if (this.guide.arrow_callback_id == 10) {
                  let level_upgrade: CommonLevelUpgradeDialog = window.appContext.UIManager.getDialog(PrefabUrl.CommonLevelUpgradeDialog)
                  level_upgrade.Upgrade()
            }
            else if (this.guide.arrow_callback_id == 12) {
                  let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
                  domain.onArtsChoiceClick()
            }
            else if (this.guide.arrow_callback_id == 13) {
                  let arts_choice: ArtsChoiceDialog = window.appContext.UIManager.getDialog(PrefabUrl.ArtsChoiceDialog)
                  arts_choice.onClickQi()
            }
            else if (this.guide.arrow_callback_id == 14) {
                  let compose: CommonComposeDialog = window.appContext.UIManager.getDialog(PrefabUrl.CommonComposeDialog)
                  compose.Compose()
            }
            else if (this.guide.arrow_callback_id == 15) {
                  let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
                  domain.onEquipmentStrengthenClick()
            }
            else if (this.guide.arrow_callback_id == 16) {
                  let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
                  domain.onStoreBtnClick()
            }
            else if (this.guide.arrow_callback_id == 17) {
                  let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
                  domain.onAllianceClick()
            }
            else if (this.guide.arrow_callback_id == 18) {
                  let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
                  domain.achievement_progress()
            }
            else if (this.guide.arrow_callback_id == 19) {
                  window.appContext.UIManager.ShowPanel(PrefabUrl.RemainsPanel)
            }
            else if (this.guide.arrow_callback_id == 20) {
                  window.appContext.UIManager.ShowDialog(PrefabUrl.RemainsPaginateDialog, 1)
            }
      }


      public SkipGuide() {
            if (this.arrow_guide) {
                  this.current_step = this.guide_step.length - 1
                  this.showByData()
            }
            else {
                  this.closeDialog()
            }
      }

      public Advance() {
            if (this.current_step < this.guide_step.length - 1) {
                  this.current_step += 1
                  this.showByData()
            }
            else if (!this.arrow_guide) {
                  this.closeDialog()
            }
      }
}
