// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { QualityData } from "./RecoverData";

const { ccclass, property } = cc._decorator;

@ccclass
export class QualityItem extends Item<QualityData> {

    private index: number
    public bool_selected: boolean
    private data_: QualityData

    @property(cc.Label)
    public text: cc.Label;

    @property(cc.Sprite)
    public selected: cc.Sprite;

    getData(): QualityData {
        return this.data_;
    }

    showByData() {
        this.text.string = this.data_.quality
        this.selected.node.active = this.bool_selected
    }

    bindData(currentIndex: number, data: QualityData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.index = currentIndex
        this.bool_selected = data.bool_selected
        this.data_ = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {
        if (selected) {
            this.bool_selected = !this.bool_selected
            this.showByData()
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}