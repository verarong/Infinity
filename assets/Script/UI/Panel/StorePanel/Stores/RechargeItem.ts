// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { StorePanelData, RechargePanelData } from "./StorePanelData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RechargeItem extends Item<RechargePanelData> {

    private goods_index: number;
    private _data: RechargePanelData;

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

    getData(): RechargePanelData {
        return this._data;
    }

    showPriceByData() {
        window.appContext.Pool.setSpriteFrameByUrl(this._data.resource, this.resource);
        this.price.string = this._data.price.toString()
    }

    showByData(start = "X") {
        this.amount.string = start + this._data.amount
        let item_data = window.appContext.ConfigManager.GetitemByItemId(this._data.item_id);
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_phase, this.icon_phase);

        this.showPriceByData()
    }

    bindData(currentIndex: number, data: RechargePanelData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.goods_index = currentIndex
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
        else {
            let info = [this.goods_index, "recharge", this._data]
            window.appContext.UIManager.ShowDialog(PrefabUrl.CommonStoreDialog, info)
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
