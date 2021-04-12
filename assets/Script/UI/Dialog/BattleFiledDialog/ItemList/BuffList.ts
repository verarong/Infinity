import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import MapBuffData from "./BuffData";


const { ccclass, property } = cc._decorator;

@ccclass
export class BuffList extends ItemList<MapBuffData> {

    private _datas: Array<MapBuffData> = new Array();

    @property(cc.Prefab)
    public Buff;

    public ApplyData(datas: Array<MapBuffData>): void {
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

    createItem(): Item<MapBuffData> {

        let BuffItemPrefab = window.appContext.Pool.requestInstant(this.Buff);

        if (BuffItemPrefab == null) {
            return null;
        }

        let BuffItem = BuffItemPrefab.getComponent("Buff");

        return BuffItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): MapBuffData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<MapBuffData>): void {
        Debug.log("onBuffelected");
        return;
    }
}