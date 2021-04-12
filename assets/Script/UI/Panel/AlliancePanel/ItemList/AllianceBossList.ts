import { ItemList } from "../../../../ItemList/ItemList";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";
import { AllianceBossData } from "./AllianceData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AllianceBossList extends ItemList<AllianceBossData> {

    private _datas: Array<AllianceBossData> = new Array();

    @property(cc.Prefab)
    public AllianceBossItem;

    public ApplyData(datas: Array<AllianceBossData>): void {
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

    createItem(): Item<AllianceBossData> {

        let AllianceBossItemPrefab = window.appContext.Pool.requestInstant(this.AllianceBossItem);

        if (AllianceBossItemPrefab == null) {
            return null;
        }

        let AllianceBossItem = AllianceBossItemPrefab.getComponent("AllianceBossItem");

        return AllianceBossItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): AllianceBossData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<AllianceBossData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
