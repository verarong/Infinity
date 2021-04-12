

import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { QualityData, PhaseData } from "./RecoverData";

const { ccclass, property } = cc._decorator;

@ccclass
export class QualityList extends ItemList<QualityData> {

    private _datas: Array<QualityData> = new Array();

    @property(cc.Prefab)
    public QualityItem;

    public ApplyData(datas: Array<QualityData>): void {
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

    createItem(): Item<QualityData> {

        let QualityItemPrefab = window.appContext.Pool.requestInstant(this.QualityItem);

        if (QualityItemPrefab == null) {
            return null;
        }

        let QualityItem = QualityItemPrefab.getComponent("QualityItem");

        return QualityItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): QualityData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<QualityData>): void {
        Debug.log("onItemSelected");
        return;
    }
}