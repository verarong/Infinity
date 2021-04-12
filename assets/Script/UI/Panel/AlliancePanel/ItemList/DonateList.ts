import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { DonateData } from "./AllianceData";

const { ccclass, property } = cc._decorator;

@ccclass
export class DonateList extends ItemList<DonateData> {

    private _datas: Array<DonateData> = new Array();

    @property(cc.Prefab)
    public Donate;

    public ApplyData(datas: Array<DonateData>): void {
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

    createItem(): Item<DonateData> {

        let DonateItemPrefab = window.appContext.Pool.requestInstant(this.Donate);

        if (DonateItemPrefab == null) {
            return null;
        }

        let DonateItem = DonateItemPrefab.getComponent("DonateItem");

        return DonateItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): DonateData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<DonateData>): void {
        Debug.log("onDonateelected");
        return;
    }
}