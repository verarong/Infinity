

import StrengthenItem from "./StrengthenItem";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { StrengthenItemData } from "./StrengthenItemData";
import { Debug } from "../../../../Common/Debug";
const { ccclass, property } = cc._decorator;

@ccclass
export default class StrengthenList extends ItemList<StrengthenItemData> {

    private _datas: Array<StrengthenItemData> = new Array();

    @property(cc.Prefab)
    public StrengthenItem;

    public ApplyData(datas: Array<StrengthenItemData>, selected: number): void {
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

    createItem(): Item<StrengthenItemData> {

        let StrengthenItemPrefab = window.appContext.Pool.requestInstant(this.StrengthenItem);

        if (StrengthenItemPrefab == null) {
            return null;
        }

        let StrengthenItem = StrengthenItemPrefab.getComponent("StrengthenItem");

        return StrengthenItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): StrengthenItemData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<StrengthenItemData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
