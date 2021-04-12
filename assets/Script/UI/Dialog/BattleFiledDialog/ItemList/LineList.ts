import { ItemList } from "../../../../ItemList/ItemList";
import LineData from "./LineData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LineList extends ItemList<LineData> {

    private _datas: Array<LineData> = new Array();

    @property(cc.Prefab)
    public LineItem;

    public ApplyData(datas: Array<LineData>): void {
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
        // this.DestroyItemOnDisable();
    }

    slotCount(): number {
        return this._datas.length;
    }

    createItem(): Item<LineData> {

        let prefab = window.appContext.Pool.requestInstant(this.LineItem);

        if (prefab == null) {
            return null;
        }

        let item = prefab.getComponent("LineItem");

        return item;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): LineData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<LineData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
