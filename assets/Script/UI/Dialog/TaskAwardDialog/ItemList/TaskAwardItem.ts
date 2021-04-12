// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { TaskAwardData } from "./TaskAwardData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskAwardItem extends Item<TaskAwardData> {

    private _data: TaskAwardData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public icon_bg: cc.Sprite;

    @property(cc.Sprite)
    public icon_phase: cc.Sprite;

    @property(cc.Label)
    public amount: cc.Label;

    getData(): TaskAwardData {
        return this._data;
    }

    showByData(char = "/") {
        this.amount.string = this._data.amount.toString()
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon_phase, this.icon_phase);
    }

    bindData(currentIndex: number, data: TaskAwardData) {

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
