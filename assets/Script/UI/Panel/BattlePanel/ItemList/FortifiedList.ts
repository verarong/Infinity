// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { ItemList } from "../../../../ItemList/ItemList";
import FortifiedData from "./FortifiedData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FortifiedList extends ItemList<FortifiedData> {

    private _datas: Array<FortifiedData> = new Array();

    @property(cc.Prefab)
    public FortifiedItem;

    public ApplyData(datas: Array<FortifiedData>): void {
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

    createItem(): Item<FortifiedData> {

        let prefab = window.appContext.Pool.requestInstant(this.FortifiedItem);

        if (prefab == null) {
            return null;
        }

        let item = prefab.getComponent("FortifiedItem");

        return item;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): FortifiedData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<FortifiedData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
