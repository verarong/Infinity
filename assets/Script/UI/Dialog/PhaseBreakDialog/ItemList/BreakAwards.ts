import { Item } from "../../../../ItemList/Item";
import { BreakAwardsData } from "./PhaseBreakData";

const { ccclass, property } = cc._decorator;

@ccclass
export class BreakAwards extends Item<BreakAwardsData> {

    private _data: BreakAwardsData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public icon_bg: cc.Sprite;

    @property(cc.Sprite)
    public icon_phase: cc.Sprite;

    @property(cc.Label)
    public amount: cc.Label;

    @property(cc.Label)
    public name_: cc.Label;

    getData(): BreakAwardsData {
        return this._data;
    }

    showByData() {
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item.icon_phase, this.icon_phase);
        this.name_.string = this._data.item.name
        this.amount.string = this._data.amount.toString()
    }

    bindData(currentIndex: number, data: BreakAwardsData) {
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
