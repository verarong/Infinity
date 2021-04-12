// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { ResourceData } from "./AwardsData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResourceItem extends Item<ResourceData> {

    private data_: ResourceData

    @property(cc.Label)
    public amount: cc.Label;

    @property(cc.Sprite)
    public bg: cc.Sprite;

    @property(cc.Sprite)
    public Resource: cc.Sprite;

    getData(): ResourceData {
        return this.data_;
    }

    showByData() {
        window.appContext.Pool.setSpriteFrameByUrl(this.data_.resource, this.Resource);
        window.appContext.Pool.setSpriteFrameByUrl("icon_bg_" + this.data_.quality, this.bg);
        this.amount.string = this.data_.amount.toString()
    }

    bindData(currentIndex: number, data: ResourceData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
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
