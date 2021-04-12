import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import CharacterPanel from "../Panel/PackagePanel/CharacterPanel";
import { ItemData, EquipmentData } from "../../Common/JsonData/JsonData";
import { Util } from "../../Common/Utils/Util";
import { ItemsData } from "../Panel/PackagePanel/Package/CharacterPanelData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonItemDialog extends BaseDialog {

      private _data: ItemsData;
      private selected: number = 1;
      private item_data: ItemData

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public poem: cc.Label;

      @property(cc.Label)
      public describe: cc.Label;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Sprite)
      public icon_bg: cc.Sprite;

      @property(cc.Sprite)
      public icon_phase: cc.Sprite;

      @property(cc.Node)
      public locked: cc.Node;

      @property(cc.Label)
      public amount: cc.Label;

      @property(cc.Label)
      public current_selected: cc.Label;

      @property(cc.Label)
      public sell: cc.Label;

      @property(cc.Label)
      public lock: cc.Label;

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
            this._data = info;
            this.selected = 1;
            this.item_data = window.appContext.ConfigManager.GetitemByItemId(this._data.item_id);
      }

      public minus() {
            if (this.selected > 1) {
                  this.selected -= 1
            }
            this.refresh_selected()
      }

      public add() {
            if (this.selected < this._data.amount) {
                  this.selected += 1
            }
            this.refresh_selected()
      }

      public max() {
            this.selected = this._data.amount
            this.refresh_selected()
      }

      public refresh_selected() {
            this.current_selected.string = this.selected + "/" + this._data.amount
      }

      public showByData() {
            this.amount.string = "X" + this._data.amount
            this.lock.string = this._data.bool_lock ? "解锁" : "锁定"
            this.locked.active = this._data.bool_lock

            this.title.string = this.item_data.name;
            this.poem.string = this.item_data.poem
            this.describe.string = this.item_data.describe

            window.appContext.Pool.setSpriteFrameByUrl(this.item_data.icon, this.icon);
            window.appContext.Pool.setSpriteFrameByUrl(this.item_data.icon_bg, this.icon_bg);
            window.appContext.Pool.setSpriteFrameByUrl(this.item_data.icon_phase, this.icon_phase);

            this.refresh_selected()
      }

      public show(info: any) {
            this.bind(info);

            this.showByData()
      }

      public Lock() {
            window.appContext.WebApi.lock_item(this._data.package_item_id, !this._data.bool_lock, "item", this, function (succData) {
                  this.hide();
                  let CharacterPanel: CharacterPanel = window.appContext.UIManager.getCurrentPanel<CharacterPanel>();
                  CharacterPanel.refresh(true)
            });
      }

      public Sell() {
            window.appContext.WebApi.recover_item(this._data.package_item_id, this.selected, this, function (succData) {
                  this.hide();
                  let CharacterPanel: CharacterPanel = window.appContext.UIManager.getCurrentPanel<CharacterPanel>();
                  CharacterPanel.refresh(true)
            });
      }

      public Use() {
            if (this.item_data.can_use != 1) {
                  window.appContext.UIManager.ShowCommonDialog(this.item_data.describe)
            }
            else {
                  window.appContext.WebApi.use_item(this._data.item_id, this.selected, this, function (succData) {
                        this.hide();
                        let CharacterPanel: CharacterPanel = window.appContext.UIManager.getCurrentPanel<CharacterPanel>();
                        CharacterPanel.refresh(true)
                  });
            }

      }
}
