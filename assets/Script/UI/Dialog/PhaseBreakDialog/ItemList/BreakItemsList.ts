import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { BreakItemsData } from "./PhaseBreakData";

const { ccclass, property } = cc._decorator;

@ccclass
export class BreakItemsList extends ItemList<BreakItemsData> {

    private _datas: Array<BreakItemsData> = new Array();

    @property(cc.Prefab)
    public BreakItems;

    public ApplyData(datas: Array<BreakItemsData>): void {
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

    createItem(): Item<BreakItemsData> {

        let BreakItemsItemPrefab = window.appContext.Pool.requestInstant(this.BreakItems);

        if (BreakItemsItemPrefab == null) {
            return null;
        }

        let BreakItemsItem = BreakItemsItemPrefab.getComponent("BreakItems");

        return BreakItemsItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): BreakItemsData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<BreakItemsData>): void {
        Debug.log("onBreakItemselected");
        return;
    }
}