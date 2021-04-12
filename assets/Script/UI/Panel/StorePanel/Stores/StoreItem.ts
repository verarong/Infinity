// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { StorePanelData } from "./StorePanelData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { Util } from "../../../../Common/Utils/Util";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StoreItem extends Item<StorePanelData> {

    private goods_index: number;
    private bool_purchased: boolean;
    private check_requirement: boolean = true;
    private _data: StorePanelData;

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
    public sell_out: cc.Node;

    @property(cc.Node)
    public learned: cc.Node;

    getData(): StorePanelData {
        return this._data;
    }

    showPriceByData() {
        if (this._data.bool_purchased) {
            this.resource.enabled = false
            this.price.enabled = false
            this.free.enabled = false
            this.sell_out.active = true
        }
        else if (this._data.resource) {
            this.resource.enabled = true
            this.price.enabled = true
            this.free.enabled = false
            this.sell_out.active = false
            window.appContext.Pool.setSpriteFrameByUrl(this._data.resource, this.resource);
            this.price.string = this._data.price.toString()
            if (!Util.CheckResource(this._data.resource, this._data.price)) {
                this.price.node.color = Util.ButtonColor("shortage")
                this.check_requirement = false
            }
            else {
                this.price.node.color = Util.ButtonColor("common")
                this.check_requirement = true
            }
        }
        else {
            this.resource.enabled = false
            this.price.enabled = false
            this.free.enabled = true
            this.sell_out.active = false
        }
    }

    showByData(start = "X") {
        this.amount.string = start + this._data.amount
        this.learned.active = this._data.bool_learned
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item_data.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item_data.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item_data.icon_phase, this.icon_phase);

        this.showPriceByData()
    }

    bindData(currentIndex: number, data: StorePanelData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.goods_index = currentIndex
        this.bool_purchased = data.bool_purchased
        this.check_requirement = true
        this._data = data;

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
        else if (!this.bool_purchased && this.check_requirement) {
            let info = [this.goods_index, "store", this._data]
            window.appContext.UIManager.ShowDialog(PrefabUrl.CommonStoreDialog, info)
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
