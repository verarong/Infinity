// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { UserAttributeData } from "./UserAttributeData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UserAttributeItem extends Item<UserAttributeData> {

    private _data: UserAttributeData;

    @property(cc.Label)
    public attribute: cc.Label;

    @property(cc.Label)
    public amount: cc.Label;

    getData(): UserAttributeData {
        return this._data;
    }

    showByData() {
        this.attribute.string = this._data.attribute_ch
        this.amount.string = this._data.amount.toString()
    }

    bindData(currentIndex: number, data: UserAttributeData) {

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
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
