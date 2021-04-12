// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { ItemList } from "../../../../ItemList/ItemList";
import { Item } from "../../../../ItemList/Item";
import { RemainsData } from "../../../../Common/JsonData/JsonData";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RemainsList extends ItemList<RemainsData> {

    private _datas: Array<RemainsData> = new Array();

    @property(cc.Prefab)
    public RemainsItem;

    public ApplyData(datas: Array<RemainsData>): void {
        if (datas == null || datas.length == 0) {
            return;
        }
        this._datas = new Array()
        for (let index = 0; index < datas.length; index++) {
            const element = datas[index];
            this._datas.push(element);
        }
        this.selectEmpty();
        this.refreshContent();
    }

    slotCount(): number {
        return this._datas.length;
    }

    createItem(): Item<RemainsData> {

        let prefab = window.appContext.Pool.requestInstant(this.RemainsItem);

        if (prefab == null) {
            return null;
        }

        let item = prefab.getComponent("RemainsItem");

        return item;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): RemainsData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<RemainsData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
