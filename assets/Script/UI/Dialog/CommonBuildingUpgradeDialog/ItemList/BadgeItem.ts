// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { BadgeData } from "./BadgeData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BadgeItem extends Item<BadgeData> {

    private badge_type: string;
    private require_amount: number
    private data_: BadgeData

    @property(cc.Label)
    public amount: cc.Label;

    @property(cc.Sprite)
    public badge: cc.Sprite;

    @property(cc.Sprite)
    public bg: cc.Sprite;

    getData(): BadgeData {
        return this.data_;
    }

    showByData() {
        window.appContext.Pool.setSpriteFrameByUrl(this.badge_type, this.badge);
        window.appContext.Pool.setSpriteFrameByUrl("icon_bg_" + this.data_.quality, this.bg);
        this.amount.string = this.require_amount.toString()
        if (!Util.CheckResource(this.badge_type, this.require_amount)) {
            this.amount.node.color = Util.ButtonColor("shortage")
            this.amount.getComponent(cc.LabelOutline).enabled = false
        }
        else {
            this.amount.node.color = Util.ButtonColor("highlight")
            this.amount.getComponent(cc.LabelOutline).enabled = true
        }
    }

    bindData(currentIndex: number, data: BadgeData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.badge_type = data.badge
        this.require_amount = data.requirement;
        this.data_ = data;

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
