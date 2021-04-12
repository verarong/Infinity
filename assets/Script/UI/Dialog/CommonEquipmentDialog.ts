import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import CharacterPanel from "../Panel/PackagePanel/CharacterPanel";
import { Util } from "../../Common/Utils/Util";
import { LinesList } from "../Panel/PackagePanel/Package/LinesList";
import { EquipmentLinesData } from "../Panel/PackagePanel/Package/CharacterPanelData";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import { EquipmentData } from "../../Common/JsonData/JsonData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonEquipmentDialog extends BaseDialog {

      private equipment_index: number | string;
      private type: string;
      private _data: any;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public describe: cc.Label;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Sprite)
      public icon_bg: cc.Sprite;

      @property(cc.Sprite)
      public icon_phase: cc.Sprite;

      @property(cc.Label)
      public lock: cc.Label;

      @property(cc.Label)
      public strength: cc.Label;

      @property(cc.Node)
      public btn: cc.Node;

      @property(cc.Node)
      public strength_btn: cc.Node;

      @property(cc.Node)
      public sell_btn: cc.Node;

      @property(cc.Node)
      public wear_btn: cc.Node;

      @property(cc.Label)
      public basic: cc.Label;

      @property(cc.Node)
      public locked: cc.Node;

      @property(LinesList)
      public LinesList: LinesList;

      @property(cc.Node)
      public bg: cc.Node;

      start() {
            this.fastShowAnim();
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

      public bind(info: any) {
            Debug.log(info);
            [this.equipment_index, this._data] = info;
      }

      public show(info: any) {
            this.bind(info);

            if (this.equipment_index == "item") {
                  this.strength_btn.active = false
                  this.sell_btn.active = true
                  this.wear_btn.active = true
            }
            else {
                  this.strength_btn.active = true
                  this.sell_btn.active = false
                  this.wear_btn.active = false
            }
            this.btn.active = this.equipment_index != "rank"

            this.lock.string = this._data.bool_lock ? "解锁" : "锁定"
            this.locked.active = this._data.bool_lock
            this.strength.string = "+" + this._data.strengthen_level
            this.strength.node.active = this._data.strengthen_level > 0
            let item_data: EquipmentData = window.appContext.ConfigManager.GetequipmentById(this._data.item_id)
            this.title.string = item_data.name

            this.describe.string = item_data.poem
            this.basic.string = Util.GetEquipmentBasicAttribute(this._data.item_id, this._data.strengthen_level)
            window.appContext.Pool.setSpriteFrameByUrl(item_data.icon, this.icon);
            window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_bg, this.icon_bg);
            window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_phase, this.icon_phase);

            if (this._data.params) {
                  let data_list: Array<EquipmentLinesData> = new Array()
                  for (let line of this._data.params) {
                        data_list.push(new EquipmentLinesData(line, this._data.item_id))
                  }
                  this.LinesList.ApplyData(data_list)
            }
            this.LinesList.node.active = this._data.params ? true : false
      }

      public Lock() {
            let equipment_loc = "equipment"
            if (this.equipment_index == "item") {
                  equipment_loc = "item"
            }
            window.appContext.WebApi.lock_item(this._data.package_item_id, !this._data.bool_lock, equipment_loc, this,
                  function (succData) {
                        this.hide();
                        let CharacterPanel: CharacterPanel = window.appContext.UIManager.getCurrentPanel<CharacterPanel>();
                        CharacterPanel.refresh(true)
                  });
      }

      public Strength() {
            window.appContext.UIManager.ShowPanel(PrefabUrl.DomainPanel);
            window.appContext.UIManager.ShowDialog(PrefabUrl.EquipmentStrengthenDialog, this.equipment_index)
            this.hide()
      }

      public Sell() {
            window.appContext.WebApi.recover_item(this._data.package_item_id, 1, this, function (succData) {
                  this.hide();
                  let CharacterPanel: CharacterPanel = window.appContext.UIManager.getCurrentPanel<CharacterPanel>();
                  CharacterPanel.refresh(true)
            });
      }

      public Wear() {
            window.appContext.WebApi.wear_equipment(this._data.package_item_id, this, function (succData) {
                  this.hide();
                  let CharacterPanel: CharacterPanel = window.appContext.UIManager.getCurrentPanel<CharacterPanel>();
                  CharacterPanel.refresh(true)
            });
      }
}
