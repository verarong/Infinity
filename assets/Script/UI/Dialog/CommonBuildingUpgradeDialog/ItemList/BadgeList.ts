

import BadgeItem from "./BadgeItem";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { BadgeData } from "./BadgeData";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BadgeList extends ItemList<BadgeData> {

    private _datas: Array<BadgeData> = new Array();

    @property(cc.Prefab)
    public BadgeItem;

    public ApplyData(datas: Array<BadgeData>): void {
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

    createItem(): Item<BadgeData> {

        let BadgeItemPrefab = window.appContext.Pool.requestInstant(this.BadgeItem);

        if (BadgeItemPrefab == null) {
            return null;
        }

        let BadgeItem = BadgeItemPrefab.getComponent("BadgeItem");

        return BadgeItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): BadgeData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<BadgeData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
