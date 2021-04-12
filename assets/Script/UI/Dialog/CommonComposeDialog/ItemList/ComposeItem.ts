// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { Util } from "../../../../Common/Utils/Util";
import CommonComposeDialog from "../CommonComposeDialog";
import { ComposeItemsData } from "./ComposeItemsData";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ComposeItem extends Item<ComposeItemsData> {

    private check_requirement: boolean = true;
    private item_index: number;
    private _data: ComposeItemsData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public icon_bg: cc.Sprite;

    @property(cc.Sprite)
    public icon_phase: cc.Sprite;

    @property(cc.Label)
    public amount: cc.Label;

    getData(): ComposeItemsData {
        return this._data;
    }

    showByData(char = "/") {
        this.amount.string = this._data.total + char + this._data.requirement * this._data.compose_amount
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon_phase, this.icon_phase);
        if (!Util.CheckItem(this._data.item_id, this._data.requirement * this._data.compose_amount)) {
            this.amount.node.color = Util.ButtonColor("shortage")
            this.check_requirement = false
        }
        else {
            this.amount.node.color = Util.ButtonColor("common")
            this.check_requirement = true
        }
    }

    bindData(currentIndex: number, data: ComposeItemsData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.item_index = currentIndex
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
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
