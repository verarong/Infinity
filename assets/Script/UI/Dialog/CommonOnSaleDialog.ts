import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import StorePanel from "../Panel/StorePanel/StorePanel";
import { Util } from "../../Common/Utils/Util";
import { On_saleData } from "../../Common/JsonData/JsonData";
import { PrefabUrl } from "../../Manager/PrefabUrl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonOnSaleDialog extends BaseDialog {

      private check_requirement: boolean = true;
      private _data: On_saleData;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public describe: cc.Label;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Sprite)
      public resource: cc.Sprite;

      @property(cc.Label)
      public price: cc.Label;

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
            this._data = info;
      }

      public showByData() {
            this.title.string = this._data.name
            this.describe.string = this._data.describe
            this.price.string = this._data.on_sale.toString()
            window.appContext.Pool.setSpriteFrameByUrl(this._data.icon, this.icon);
            window.appContext.Pool.setSpriteFrameByUrl(this._data.resource, this.resource);
            if (!Util.CheckResource(this._data.resource, this._data.on_sale)) {
                  this.price.node.color = Util.ButtonColor("shortage")
                  this.check_requirement = false
            }
            else {
                  this.price.node.color = Util.ButtonColor("common")
                  this.check_requirement = true
            }
      }

      public show(info: any, start = "X") {
            this.bind(info);
            this.showByData()
      }

      public Purchase() {
            if (this.check_requirement) {
                  window.appContext.WebApi.purchase_on_sale(this._data.id, this,
                        function (succData) {
                              window.appContext.UIManager.ShowDialog(PrefabUrl.TaskAwardDialog, succData)
                              this.hide();
                              let StorePanel: StorePanel = window.appContext.UIManager.getCurrentPanel<StorePanel>();
                              StorePanel.refresh(true)
                        });
            }

      }
}
