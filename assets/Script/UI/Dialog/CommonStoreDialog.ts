import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import StorePanel from "../Panel/StorePanel/StorePanel";
import { Util } from "../../Common/Utils/Util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonStoreDialog extends BaseDialog {

      private goods_index: number;
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
      public amount: cc.Label;

      @property(cc.Sprite)
      public resource: cc.Sprite;

      @property(cc.Label)
      public price: cc.Label;

      @property(cc.Label)
      public free: cc.Label;

      @property(cc.Node)
      public learned: cc.Node;

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
            this.goods_index = info[0];
            this.type = info[1];
            this._data = info[2]
      }

      public show(info: any, start = "X") {
            this.bind(info);

            if (this._data.resource) {
                  this.resource.enabled = true
                  this.price.enabled = true
                  this.free.enabled = false
                  window.appContext.Pool.setSpriteFrameByUrl(this._data.resource, this.resource);
                  this.price.string = this._data.price.toString()
            }
            else {
                  this.resource.enabled = false
                  this.price.enabled = false
                  this.free.enabled = true
            }

            let item_data: any = window.appContext.ConfigManager.GetitemByItemId(this._data.item_id);
            this.title.string = item_data.name;
            this.amount.string = start + this._data.amount
            this.describe.string = item_data.describe
            window.appContext.Pool.setSpriteFrameByUrl(item_data.icon, this.icon);
            window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_bg, this.icon_bg);
            window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_phase, this.icon_phase);
            this.learned.active = this._data.bool_learned
      }

      public Purchase() {
            if (this.type == "store") {
                  window.appContext.WebApi.purchase_goods(this.goods_index, this,
                        function (succData) {
                              this.hide();
                              let StorePanel = window.appContext.UIManager.getCurrentPanel<StorePanel>();
                              StorePanel.refresh(true)
                        });
            }
            else if (this.type == "recharge") {
                  window.appContext.WebApi.recharge(this.goods_index, this,
                        function (succData) {
                              this.hide();
                              let StorePanel = window.appContext.UIManager.getCurrentPanel<StorePanel>();
                              StorePanel.refresh(true)
                        });
            }
      }
}
