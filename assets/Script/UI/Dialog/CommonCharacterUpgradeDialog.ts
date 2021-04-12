import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import { Util } from "../../Common/Utils/Util";
import DomainPanel from "../Panel/DomainPanel/DomainPanel";
import { ConsciousnessData, PhysiqueData } from "../../Common/JsonData/JsonData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonCharacterUpgradeDialog extends BaseDialog {

      private type: string;
      private bool_max: boolean;
      private check_requirement: boolean;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public current_level: cc.Label;

      @property(cc.Label)
      public current_describe: cc.Label;

      @property(cc.Label)
      public next_level: cc.Label;

      @property(cc.Label)
      public next_describe: cc.Label;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Sprite)
      public resource: cc.Sprite;

      @property(cc.Label)
      public requirement: cc.Label;

      @property(cc.Label)
      public btn: cc.Label;

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return;
      }

      closeDialog(): any {
            this.hide();
      }

      public bind_data(info: any) {
            Debug.log(info);
            this.type = info;
      }

      public ShowByData() {
            let now: ConsciousnessData | PhysiqueData;
            let next: ConsciousnessData | PhysiqueData;
            if (this.type == "soul") {
                  let level = window.appContext.DataContainer.get_RoleData().consciousness
                  let max: number = window.appContext.ConfigManager.GetMaxConsciousnessLevel()
                  this.bool_max = level == max
                  now = window.appContext.ConfigManager.GetconsciousnessById(level)
                  next = window.appContext.ConfigManager.GetconsciousnessById(this.bool_max ? max : level + 1)
                  this.current_describe.string = "速度+" + now.speed
                  this.next_describe.string = "速度+" + next.speed
                  this.requirement.string = window.appContext.DataContainer.RoleData.soul + "/" + now.soul_require
                  this.check_requirement = Util.CheckResource(this.type, now.soul_require)
            }
            else if (this.type == "gas") {
                  let level = window.appContext.DataContainer.get_RoleData().physique
                  let max: number = window.appContext.ConfigManager.GetMaxPhysiqueLevel()
                  this.bool_max = level == max
                  now = window.appContext.ConfigManager.GetphysiqueById(level)
                  next = window.appContext.ConfigManager.GetphysiqueById(this.bool_max ? max : level + 1)
                  this.current_describe.string = "生命+" + now.life
                  this.next_describe.string = "生命+" + next.life
                  this.requirement.string = window.appContext.DataContainer.RoleData.gas + "/" + now.gas_require
                  this.check_requirement = Util.CheckResource(this.type, now.gas_require)
            }

            this.btn.string = this.bool_max ? "已达顶级" : "升级"
            this.requirement.node.active = !this.bool_max
            this.title.string = now.title;
            this.current_level.string = now.name;
            this.next_level.string = next.name;
            window.appContext.Pool.setSpriteFrameByUrl(this.type, this.icon);
            window.appContext.Pool.setSpriteFrameByUrl(this.type, this.resource);
            this.requirement.node.color = this.check_requirement ? Util.ButtonColor("highlight") : Util.ButtonColor("shortage")
      }

      public show(info: any) {
            this.bind_data(info);

            this.ShowByData()
      }

      public Upgrade() {
            if (this.check_requirement) {
                  let self = this
                  if (this.type == "soul") {
                        window.appContext.WebApi.consciousness_upgrade(this, function () {
                              window.appContext.WebApi.get_character_info(["main", "role_params", "attribute"], this, function (data) {
                                    window.appContext.DataContainer.set_RoleData(data.main)
                                    window.appContext.DataContainer.set_GuideData(data.role_params)
                                    window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                                    self.ShowByData()
                                    let DomainPanel: DomainPanel = window.appContext.UIManager.getCurrentPanel<DomainPanel>();
                                    DomainPanel.refresh()
                              })
                        });
                  }
                  else if (this.type == "gas") {
                        window.appContext.WebApi.physique_upgrade(this, function () {
                              window.appContext.WebApi.get_character_info(["main", "role_params", "attribute"], this, function (data) {
                                    window.appContext.DataContainer.set_RoleData(data.main)
                                    window.appContext.DataContainer.set_GuideData(data.role_params)
                                    window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                                    self.ShowByData()
                                    let DomainPanel: DomainPanel = window.appContext.UIManager.getCurrentPanel<DomainPanel>();
                                    DomainPanel.refresh()
                              })
                        });
                  }
            }
      }
}
