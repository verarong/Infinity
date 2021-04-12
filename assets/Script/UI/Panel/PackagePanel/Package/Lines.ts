// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EquipmentLinesData } from "./CharacterPanelData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { EquipmentData, ItemData } from "../../../../Common/JsonData/JsonData";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export class Lines extends Item<EquipmentLinesData> {

    private _data: EquipmentLinesData;

    @property(cc.Label)
    public describe: cc.Label;

    getData(): EquipmentLinesData {
        return this._data;
    }

    showByData() {
        this.describe.string = this._data.attribute + "+" + this._data.amount + "  (" + this._data.min + "-" + this._data.max + ")"
        this.describe.node.color = new cc.Color().fromHEX(this._data.color)
    }

    bindData(currentIndex: number, data: EquipmentLinesData) {
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
        Debug.log("select:" + selected);
    }

    getClickButton(): cc.Button {
        return this.node.getComponent(cc.Button);
    }
}