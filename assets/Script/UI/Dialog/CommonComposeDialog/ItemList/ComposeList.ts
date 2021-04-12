

import ComposeItem from "./ComposeItem";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { ComposeItemsData } from "./ComposeItemsData";
import { Debug } from "../../../../Common/Debug";
const { ccclass, property } = cc._decorator;

@ccclass
export default class ComposeList extends ItemList<ComposeItemsData> {

    private _datas: Array<ComposeItemsData> = new Array();

    @property(cc.Prefab)
    public ComposeItem;

    public ApplyData(datas: Array<ComposeItemsData>): void {
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

    createItem(): Item<ComposeItemsData> {

        let ComposeItemPrefab = window.appContext.Pool.requestInstant(this.ComposeItem);

        if (ComposeItemPrefab == null) {
            return null;
        }

        let ComposeItem = ComposeItemPrefab.getComponent("ComposeItem");

        return ComposeItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): ComposeItemsData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<ComposeItemsData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
