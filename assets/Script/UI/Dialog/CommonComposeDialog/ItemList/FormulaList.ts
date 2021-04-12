

import FormulaItem from "./FormulaItem";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { FormulaItemData } from "./FormulaItemData";
import { Debug } from "../../../../Common/Debug";
const { ccclass, property } = cc._decorator;

@ccclass
export default class FormulaList extends ItemList<FormulaItemData> {

    private _datas: Array<FormulaItemData> = new Array();

    @property(cc.Prefab)
    public FormulaItem;

    public ApplyData(datas: Array<FormulaItemData>, selected: number): void {
        if (datas == null || datas.length == 0) {
            return;
        }
        this._datas = new Array()
        for (let index = 0; index < datas.length; index++) {
            const element = datas[index];
            this._datas.push(element);
        }
        //this.selectEmpty();
        this.setSelectSlot(selected)
        this.refreshContent();
        this.refreshSelectState()
    }

    slotCount(): number {
        return this._datas.length;
    }

    createItem(): Item<FormulaItemData> {

        let FormulaItemPrefab = window.appContext.Pool.requestInstant(this.FormulaItem);

        if (FormulaItemPrefab == null) {
            return null;
        }

        let FormulaItem = FormulaItemPrefab.getComponent("FormulaItem");

        return FormulaItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): FormulaItemData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<FormulaItemData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
