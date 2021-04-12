import { BaseDialog } from "../../Common/BaseDialog";
import { Debug } from "../../../Common/Debug";
import { StrengthenData, ItemData, EquipmentData } from "../../../Common/JsonData/JsonData";
import StrengthenList from "./ItemList/StrengthenList";
import { StrengthenItemData } from "./ItemList/StrengthenItemData";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { Util } from "../../../Common/Utils/Util";
import DomainPanel from "../../Panel/DomainPanel/DomainPanel";


const { ccclass, property } = cc._decorator;

@ccclass
export default class EquipmentStrengthenDialog extends BaseDialog {

      private equipment_class: number;
      private check_requirement: boolean;
      public selected: number = 0;
      private _data: StrengthenItemData;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Sprite)
      public icon_bg: cc.Sprite;

      @property(cc.Sprite)
      public icon_phase: cc.Sprite;

      @property(cc.Label)
      public equipment: cc.Label;

      @property(cc.Label)
      public describe: cc.Label;

      @property(cc.Label)
      public requirement: cc.Label;

      @property(cc.Label)
      public now: cc.Label;

      @property(cc.Label)
      public next: cc.Label;

      @property(cc.Label)
      public strengthen_describe: cc.Label;

      @property(StrengthenList)
      public StrengthenList: StrengthenList;

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

      private sortByEquipmentClass(a: StrengthenItemData, b: StrengthenItemData) {
            return a.equipment_class - b.equipment_class
      }

      public ShowByData(apply, split = "/") {
            let data_list: Array<StrengthenItemData> = new Array();
            for (let i of window.appContext.DataContainer.EquipmentData.equipment) {
                  data_list.push(new StrengthenItemData(i))
            }
            data_list = data_list.sort(this.sortByEquipmentClass)

            if (apply) {
                  this.StrengthenList.ApplyData(data_list, this.selected);
            }

            this._data = data_list[this.selected]
            this.equipment_class = this._data.equipment_class
            let item_data: EquipmentData = window.appContext.ConfigManager.GetequipmentById(this._data.equipment_id);
            this.equipment.string = item_data.name + (this._data.strengthen_level ? "+" + this._data.strengthen_level : "");
            this.describe.string = item_data.poem
            window.appContext.Pool.setSpriteFrameByUrl(item_data.icon, this.icon);
            window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_bg, this.icon_bg);
            window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_phase, this.icon_phase);

            let strengthen: StrengthenData = window.appContext.ConfigManager.GetStrengthen(this._data.strengthen_level)
            let current: number = window.appContext.DataContainer.get_item_amount(strengthen.item_id)
            this.requirement.string = current + split + strengthen.item_amount
            if (current < strengthen.item_amount) {
                  this.requirement.node.color = Util.ButtonColor("shortage")
                  this.check_requirement = false
            }
            else {
                  this.requirement.node.color = Util.ButtonColor("common")
                  this.check_requirement = true
            }
            this.now.string = "基础属性*" + Math.floor(strengthen.ratio_expand * 100 + 100) + "%\n" + "基础属性+" + strengthen.base_expand
            let max = window.appContext.ConfigManager.GetMaxStrengthen()
            let strengthen_next: StrengthenData = window.appContext.ConfigManager.GetStrengthen(this._data.strengthen_level == max ? max : this._data.strengthen_level + 1)
            this.next.string = "基础属性*" + Math.floor(strengthen_next.ratio_expand * 100 + 100) + "%\n" + "基础属性+" + strengthen_next.base_expand
            this.strengthen_describe.string = "强化升功率" + Math.floor(strengthen.rate * 100) + "%" + (strengthen.when_failed == -1 ? ",失败时降低一级" : "")
            this.strengthen_describe.node.active = this._data.strengthen_level < max
            this.requirement.node.active = this._data.strengthen_level < max
            this.btn.string = this._data.strengthen_level == max ? "已达顶级" : "精炼"
      }

      public refresh(refresh: boolean = false, select = null, apply: boolean = true) {
            this.selected = select ? select : 0

            let self = this
            if (refresh) {
                  window.appContext.WebApi.get_character_info(["equipment", "item", "role_params", "attribute", "daily_task"], this, function (data) {
                        window.appContext.DataContainer.set_ItemData(data.item)
                        window.appContext.DataContainer.set_EquipmentData(data.equipment)
                        window.appContext.DataContainer.set_GuideData(data.role_params)
                        window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                        window.appContext.DataContainer.set_DailyTaskData(data.daily_task)
                        self.ShowByData(apply)
                  });
            }
            else {
                  self.ShowByData(apply)
            }
      }

      public show(selected: any) {
            this.refresh();
      }

      public Strengthen() {
            let self = this
            if (this.check_requirement) {
                  window.appContext.WebApi.strengthen_equipment(this.equipment_class, this,
                        function (succData) {
                              self.refresh(true, self.selected)
                              let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
                              domain.refresh()
                        });
            }
      }
}
