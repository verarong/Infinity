import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import { LevelData, DomainData, ItemData } from "../../Common/JsonData/JsonData";
import { Util } from "../../Common/Utils/Util";
import DomainPanel from "../Panel/DomainPanel/DomainPanel";
import { PrefabUrl } from "../../Manager/PrefabUrl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonLevelUpgradeDialog extends BaseDialog {

      private level: number;
      private data: LevelData;
      private dan: ItemData;
      private dan_amount: number = 0;
      private selected: number = 0;
      private fly_expand: number = 0;
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

      @property(cc.Label)
      public fly: cc.Label;

      @property(cc.Label)
      public fly_describe: cc.Label;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Sprite)
      public icon_bg: cc.Sprite;

      @property(cc.Sprite)
      public icon_phase: cc.Sprite;

      @property(cc.Label)
      public dan_describe: cc.Label;

      @property(cc.Label)
      public current_selected: cc.Label;

      @property(cc.Label)
      public rate: cc.Label;

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

      public minus() {
            if (this.selected > 1) {
                  this.selected -= 1
            }
            this.refresh_selected()
      }

      public add() {
            if (this.selected < this.dan_amount) {
                  this.selected += 1
            }
            this.refresh_selected()
      }

      public max() {
            this.selected = this.dan_amount
            this.refresh_selected()
      }

      public refresh_selected(split = "/") {
            if (window.appContext.DataContainer.ItemAmount.has(this.dan.item_id)) {
                  this.dan_amount = window.appContext.DataContainer.ItemAmount.get(this.dan.item_id)
            }
            else {
                  this.dan_amount = 0
            }

            this.current_selected.string = this.selected + split + this.dan_amount
            this.dan_describe.string = "每颗" + this.dan.name + "提升" + this.data.rate_expand * 100 + "%成功率\n最高服用" + this.data.max_amount + "颗"
            let current_rate: number = this.data.rate_base + this.fly_expand + this.selected * this.data.rate_expand
            this.rate.string = "当前成功率  " + Math.floor(current_rate * 100) + "%"
            this.rate.node.color = current_rate < 1 ? Util.ButtonColor("shortage") : Util.ButtonColor("common")
      }

      public ShowByData() {
            this.level = window.appContext.DataContainer.get_RoleData().level
            this.data = window.appContext.ConfigManager.GetlevelById(this.level)
            this.selected = 0;

            let max: number = window.appContext.ConfigManager.GetMaxLevel()
            let bool_max = this.level == max
            let now: LevelData = window.appContext.ConfigManager.GetlevelById(this.level)
            let next: LevelData = window.appContext.ConfigManager.GetlevelById(bool_max ? max : this.level + 1)
            this.btn.string = bool_max ? "已达顶级" : "渡劫"
            this.requirement.node.active = !bool_max
            this.rate.node.active = !bool_max
            this.current_describe.string = "攻击+" + now.attack.toString();
            this.next_describe.string = "攻击+" + next.attack.toString();
            this.title.string = now.title;
            this.current_level.string = now.name;
            this.next_level.string = next.name;

            let fly_level: number = window.appContext.DataContainer.DomainLevel.get(6)
            let fly_data: DomainData = window.appContext.ConfigManager.GetdomainByBuildingIdAndLevel(6, fly_level)
            this.fly.string = "当前LV" + fly_level + "飞升台"
            this.fly_expand = fly_data.rate
            this.fly_describe.string = "额外提升" + Math.floor(fly_data.rate * 100) + "%渡劫成功率"

            this.dan = window.appContext.ConfigManager.GetitemByItemId(now.item_expand)
            window.appContext.Pool.setSpriteFrameByUrl(this.dan.icon, this.icon);
            window.appContext.Pool.setSpriteFrameByUrl(this.dan.icon_bg, this.icon_bg);
            window.appContext.Pool.setSpriteFrameByUrl(this.dan.icon_phase, this.icon_phase);

            let require: string = "修为 " + window.appContext.DataContainer.RoleData.exp + "/" + now.exp_require
            this.check_requirement = Util.CheckResource("exp", now.exp_require)
            this.requirement.string = require
            this.requirement.node.color = this.check_requirement ? Util.ButtonColor("common") : Util.ButtonColor("shortage")

            this.refresh_selected()
      }

      public bind_data(info: any) {
            Debug.log(info);
      }

      public show(info: any) {
            this.bind_data(info);

            this.ShowByData()
      }

      public Upgrade() {
            let self = this
            window.appContext.WebApi.level_upgrade(this.data.item_expand, this.selected, this, function () {
                  window.appContext.WebApi.get_character_info(["main", "item", "role_params", "attribute"], this, function (data) {
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_ItemData(data.item)
                        window.appContext.DataContainer.set_GuideData(data.role_params)
                        window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                        if (window.appContext.DataContainer.RoleData.level % 10 == 0) {
                              window.appContext.UIManager.ShowDialog(PrefabUrl.PhaseBreakDialog)
                              self.hide()
                        }
                        else {
                              self.ShowByData()
                        }
                        // 会导致弹出引导
                        // let DomainPanel: DomainPanel = window.appContext.UIManager.getCurrentPanel<DomainPanel>();
                        // DomainPanel.refresh()
                  });
            });
      }
}
