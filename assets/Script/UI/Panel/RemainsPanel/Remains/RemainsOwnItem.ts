// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { ThreadData } from "../../../../Common/JsonData/JsonData";
import { RemainsPaginateData } from "../../../Dialog/RemainsPaginateDialog/ItemList/RemainsPaginateData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RemainsOwnItem extends Item<RemainsPaginateData> {

    private _data: RemainsPaginateData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Label)
    public capture_user: cc.Label;

    @property(cc.Label)
    public flag: cc.Label;

    @property(cc.Node)
    public capture_flag: cc.Node;

    getData(): RemainsPaginateData {
        return this._data;
    }

    showByData() {
        this.capture_user.string = this._data.user_name
        this.flag.string = this._data.flag
        this.capture_flag.active = this._data.flag == "占"

        //this.conquer_user.string = this._data.conquer_user_name
        if (this._data.quality) {
            this.icon.node.active = true
            window.appContext.Pool.setSpriteFrameByUrl("remains_" + this._data.quality, this.icon);
        }
        else {
            this.icon.node.active = false
        }
    }

    bindData(currentIndex: number, data: RemainsPaginateData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this._data = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {
        if (!selected || this._data.quality == 0) {
            return;
        }

        window.appContext.UIManager.ShowDialog(PrefabUrl.RemainsDialog, this._data);
    }

    getClickButton(): cc.Button {
        return this.node.getComponent(cc.Button);
    }
}
