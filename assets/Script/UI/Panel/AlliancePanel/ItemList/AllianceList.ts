

import { AllianceListData } from "./AllianceData";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";
const { ccclass, property } = cc._decorator;

@ccclass
export class AllianceList extends ItemList<AllianceListData> {

    private _datas: Array<AllianceListData> = new Array();

    @property(cc.Prefab)
    public Alliance;

    public ApplyData(datas: Array<AllianceListData>): void {
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

    createItem(): Item<AllianceListData> {

        let AllianceItemPrefab = window.appContext.Pool.requestInstant(this.Alliance);

        if (AllianceItemPrefab == null) {
            return null;
        }

        let AllianceItem = AllianceItemPrefab.getComponent("AllianceItem");

        return AllianceItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): AllianceListData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<AllianceListData>): void {
        Debug.log("onItemSelected");
        return;
    }
}