import { ItemList } from "../../../../ItemList/ItemList";
import { RankEquipmentData } from "./UserRankData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RankEquipmentList extends ItemList<RankEquipmentData> {

    private _datas: Array<RankEquipmentData> = new Array();

    @property(cc.Prefab)
    public RankEquipmentItem;

    public ApplyData(datas: Array<RankEquipmentData>): void {
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

    createItem(): Item<RankEquipmentData> {

        let RankEquipmentItemPrefab = window.appContext.Pool.requestInstant(this.RankEquipmentItem);

        if (RankEquipmentItemPrefab == null) {
            return null;
        }

        let RankEquipmentItem = RankEquipmentItemPrefab.getComponent("RankEquipmentItem");

        return RankEquipmentItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): RankEquipmentData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<RankEquipmentData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
