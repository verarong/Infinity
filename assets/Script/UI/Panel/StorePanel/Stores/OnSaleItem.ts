// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { OnSalePanelData } from "./StorePanelData";
import { Item } from "../../../../ItemList/Item";
import StorePanel from "../StorePanel";
import { On_saleData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class OnSaleItem extends Item<OnSalePanelData> {

    private goods_index: number;
    private check_requirement: boolean = true;
    private original: OnSalePanelData;
    private _data: On_saleData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public resource: cc.Sprite;

    @property(cc.Label)
    public price: cc.Label;

    @property(cc.Label)
    public on_sale: cc.Label;

    @property(cc.Label)
    public time: cc.Label;

    @property(cc.Label)
    public name_: cc.Label;

    @property(cc.Label)
    public limit: cc.Label;

    getData(): OnSalePanelData {
        return this.original;
    }

    showByData(start = "限购", terminal = "次", split = "/") {
        window.appContext.Pool.setSpriteFrameByUrl(this._data.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.resource, this.resource);
        this.price.string = this._data.price.toString()
        this.on_sale.string = this._data.on_sale.toString()
        this.name_.string = this._data.name
        let current: number = window.appContext.DataContainer.get_PurchaseTimes(this._data.id)
        this.limit.string = start + current + split + this._data.purchase_times_limit.toString() + terminal
        if (current >= this._data.purchase_times_limit) {
            this.limit.node.color = Util.ButtonColor("shortage")
            this.check_requirement = false
        }
        else {
            this.limit.node.color = Util.ButtonColor("common")
            this.check_requirement = true
        }

        let rest: number = this._data.valid_terminal - Math.floor(new Date().getTime() / 1000)
        this.unscheduleAllCallbacks();
        this.schedule(function () {
            if (rest > 0) {
                this.time.string = Util.FormatCountDown(rest)
                rest--
            }
            else {
                let StorePanel: StorePanel = window.appContext.UIManager.getCurrentPanel()
                StorePanel.ShowOnSale()
            }
        }, 1, cc.macro.REPEAT_FOREVER, 0)
    }

    bindData(currentIndex: number, data: OnSalePanelData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.goods_index = currentIndex
        this.original = data
        this._data = data.data;

        this.unscheduleAllCallbacks();
        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {

        Debug.log("select:" + selected);
        if (!selected) {
            return;
        }
        else if (this.check_requirement) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.CommonOnSaleDialog, this._data)
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
