import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import { Util } from "../../Common/Utils/Util";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import BattlePanel from "../Panel/BattlePanel/BattlePanel";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonSecretDialog extends BaseDialog {

      private secret_id: number;
      private cost_base: number;
      private _data: any;
      private check_requirement: boolean;
      private rest: number;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Sprite)
      public icon_phase: cc.Sprite;

      @property(cc.Label)
      public timer: cc.Label;

      @property(cc.Label)
      public btn_text: cc.Label;

      @property(cc.Sprite)
      public resource: cc.Sprite;

      @property(cc.Label)
      public price: cc.Label;

      start() {
            //this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return this._data;
      }

      closeDialog(): any {
            this.hide();
      }

      show_by_datetime() {
            if (this.rest > 0) {
                  this.timer.string = Util.FormatCountDown(this.rest)
                  let cost: number = (Math.floor((this.rest) / 600) + 1) * this.cost_base
                  this.check_requirement = Util.CheckResource("jade", cost)
                  this.price.string = cost.toString()
                  this.price.node.color = this.check_requirement ? Util.ButtonColor("common") : Util.ButtonColor("shortage")
                  this.rest--
            }
            else {
                  this.unscheduleAllCallbacks();
                  this.scheduleOnce(function () {
                        this.refresh(true)
                  }, 15);
            }
      }

      public showByData() {
            this._data = window.appContext.DataContainer.Secrets.get(this.secret_id);
            window.appContext.Pool.setSpriteFrameByUrl("secret_" + this._data.quality, this.icon);
            window.appContext.Pool.setSpriteFrameByUrl("icon_phase_" + this._data.phase, this.icon_phase);
            let secret = window.appContext.ConfigManager.GetsecretByPhaseAndQuality(this._data.phase, this._data.quality)
            this.rest = this._data.start + secret.probe_hours * 3600 - Math.floor(new Date().getTime() / 1000)

            if (this._data.state == 0) {
                  this.btn_text.node.active = true
                  this.resource.node.active = false
                  this.price.node.active = false
                  this.timer.string = this._data.name
                  this.btn_text.string = "开始探索"
            }
            else if (this._data.state == 1) {
                  this.btn_text.node.active = false
                  this.resource.node.active = true
                  this.price.node.active = true
                  this.timer.string = Util.FormatCountDown(this.rest)
                  let cost: number = (Math.floor((this.rest) / 600) + 1) * this.cost_base
                  this.check_requirement = Util.CheckResource("jade", cost)
                  this.price.string = cost.toString()
                  this.price.node.color = this.check_requirement ? Util.ButtonColor("common") : Util.ButtonColor("shortage")
                  this.unscheduleAllCallbacks();
                  this.schedule(this.show_by_datetime, 1, cc.macro.REPEAT_FOREVER, 0)
            }
            else if (this._data.state == 2) {
                  this.btn_text.node.active = true
                  this.resource.node.active = false
                  this.price.node.active = false
                  this.timer.string = this._data.name
                  this.btn_text.string = "收获奖励"
            }
      }

      public refresh(refresh: boolean = false, hide = false) {
            let self = this
            if (refresh || window.appContext.DataContainer.get_SecretData()) {
                  window.appContext.WebApi.get_character_info(["secret", "main", "item", "role_params", "daily_task"], this, function (data) {
                        window.appContext.DataContainer.set_SecretData(data.secret)
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_ItemData(data.item)
                        window.appContext.DataContainer.set_GuideData(data.role_params)
                        window.appContext.DataContainer.set_DailyTaskData(data.daily_task)
                        let BattlePanel: BattlePanel = window.appContext.UIManager.getCurrentPanel()
                        BattlePanel.showBySecretData()
                        if (hide) {
                              self.hide()
                        }
                        else {
                              self.showByData()
                        }
                  })
            }
            else {
                  this.showByData()
            }
      }

      public bind(secret_id: number) {
            Debug.log(secret_id);
            this.secret_id = secret_id
            this.cost_base = window.appContext.ConfigManager.GetBasicValueByType("jade_immediately_per_600s")
      }

      public show(secret_id: number) {
            this.bind(secret_id);

            this.refresh()
      }

      public btn() {
            let self = this
            if (this._data.state == 0) {
                  window.appContext.WebApi.probe_secret(this._data.secret_id, this, function (data) {
                        self.refresh(true)
                  })
            }
            else if (this._data.state == 1 && this.check_requirement) {
                  window.appContext.WebApi.probe_immediately(this._data.secret_id, this, function (data) {
                        self.refresh(true)
                  })
            }
            else if (this._data.state == 2) {
                  window.appContext.WebApi.probe_statement(this._data.secret_id, this, function (data) {
                        self.hide()
                        let info = [self._data.resource, data, undefined]
                        window.appContext.UIManager.ShowDialog(PrefabUrl.AwardDialog, info)
                        self.refresh(true, true)
                  })
            }
      }
}
