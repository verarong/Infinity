

import { PartnerPanelData } from "./PartnerPanelData";
import { Partner } from "./Partner";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";
const { ccclass, property } = cc._decorator;

@ccclass
export class PartnerList extends ItemList<PartnerPanelData> {

    private _datas: Array<PartnerPanelData> = new Array();

    @property(cc.Prefab)
    public Partner;

    public ApplyData(datas: Array<PartnerPanelData>): void {
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

    createItem(): Item<PartnerPanelData> {

        let PartnerItemPrefab = window.appContext.Pool.requestInstant(this.Partner);

        if (PartnerItemPrefab == null) {
            return null;
        }

        let PartnerItem = PartnerItemPrefab.getComponent("Partner");

        return PartnerItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): PartnerPanelData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<PartnerPanelData>): void {
        Debug.log("onItemSelected");
        return;
    }
}