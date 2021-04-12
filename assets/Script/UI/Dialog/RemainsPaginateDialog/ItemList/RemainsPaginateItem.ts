// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { RemainsPaginateData } from "./RemainsPaginateData";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RemainsPaginateItem extends Item<RemainsPaginateData> {

    private _data: RemainsPaginateData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Label)
    public capture_user: cc.Label;

    @property(cc.Sprite)
    public capture_flag: cc.Sprite;

    @property(cc.Sprite)
    public conquer_flag: cc.Sprite;

    getData(): RemainsPaginateData {
        return this._data;
    }

    showByData() {
        this.capture_user.string = this._data.user_name
        window.appContext.Pool.setSpriteFrameByUrl("remains_" + this._data.quality, this.icon);
        this.capture_flag.node.active = this._data.user_id == window.appContext.DataContainer.RoleData.id
        this.conquer_flag.node.active = this._data.conquer_user_id == window.appContext.DataContainer.RoleData.id
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

        if (!selected) {
            return;
        }
        window.appContext.UIManager.ShowDialog(PrefabUrl.RemainsDialog, this._data);
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
