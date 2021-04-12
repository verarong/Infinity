// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { RemainsData, ThreadData } from "../../../../Common/JsonData/JsonData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RemainsItem extends Item<RemainsData> {

    private _data: RemainsData;

    @property(cc.Node)
    public Remains: cc.Node;

    @property(cc.Label)
    public Name: cc.Label;

    @property(cc.Sprite)
    public Icon: cc.Sprite;

    getData(): RemainsData {
        return this._data;
    }

    public showByData() {
        this.Name.string = this._data.name;
        this.Remains.setPosition(this._data.loc_x, this._data.loc_y);
        window.appContext.Pool.setSpriteFrameByUrl("remains_area_" + this._data.quality, this.Icon);
    }

    bindData(currentIndex: number, data: RemainsData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this._data = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
        this.Name.string = "";
        this.Icon.spriteFrame = null;
    }

    select(selected: boolean): void {
        if (!selected) {
            return;
        }

        window.appContext.UIManager.ShowDialog(PrefabUrl.RemainsPaginateDialog, this._data.quality);
    }

    getClickButton(): cc.Button {
        return this.node.getComponent(cc.Button);
    }
}
