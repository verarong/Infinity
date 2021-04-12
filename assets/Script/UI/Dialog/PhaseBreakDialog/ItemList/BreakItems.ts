import { Util } from "../../../../Common/Utils/Util";
import { Item } from "../../../../ItemList/Item";
import { BreakItemsData } from "./PhaseBreakData";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html




const { ccclass, property } = cc._decorator;

@ccclass
export class BreakItems extends Item<BreakItemsData> {

    private _data: BreakItemsData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public icon_bg: cc.Sprite;

    @property(cc.Sprite)
    public icon_phase: cc.Sprite;

    @property(cc.Label)
    public amount: cc.Label;

    getData(): BreakItemsData {
        return this._data;
    }

    showByData() {
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon_phase, this.icon_phase);
        this.amount.string = this._data.item.name + " *" + this._data.amount
        this.amount.node.color = this._data.check_item ? Util.ButtonColor("common") : Util.ButtonColor("shortage")
    }

    bindData(currentIndex: number, data: BreakItemsData) {
        this._data = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
