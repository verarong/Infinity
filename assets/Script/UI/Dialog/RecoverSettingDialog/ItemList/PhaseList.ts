

import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { QualityData, PhaseData } from "./RecoverData";

const { ccclass, property } = cc._decorator;

@ccclass
export class PhaseList extends ItemList<PhaseData> {

    private _datas: Array<PhaseData> = new Array();

    @property(cc.Prefab)
    public PhaseItem;

    public ApplyData(datas: Array<PhaseData>): void {
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

    createItem(): Item<PhaseData> {

        let PhaseItemPrefab = window.appContext.Pool.requestInstant(this.PhaseItem);

        if (PhaseItemPrefab == null) {
            return null;
        }

        let PhaseItem = PhaseItemPrefab.getComponent("PhaseItem");

        return PhaseItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): PhaseData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<PhaseData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
