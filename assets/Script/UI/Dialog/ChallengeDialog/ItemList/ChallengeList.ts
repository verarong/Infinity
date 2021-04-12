import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { ChallengeItemData } from "./ChallengeItemData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChallengeList extends ItemList<ChallengeItemData> {

    private _datas: Array<ChallengeItemData> = new Array();

    @property(cc.Prefab)
    public ChallengeItem;

    public ApplyData(datas: Array<ChallengeItemData>, selected: number): void {
        if (datas == null || datas.length == 0) {
            return;
        }
        this._datas = new Array()
        for (let index = 0; index < datas.length; index++) {
            const element = datas[index];
            this._datas.push(element);
        }
        //this.selectEmpty();

        this.refreshContent();
        this.setSelectSlot(selected)
        this.refreshSelectState()
    }

    slotCount(): number {
        return this._datas.length;
    }

    createItem(): Item<ChallengeItemData> {

        let ChallengeItemPrefab = window.appContext.Pool.requestInstant(this.ChallengeItem);

        if (ChallengeItemPrefab == null) {
            return null;
        }

        let ChallengeItem = ChallengeItemPrefab.getComponent("ChallengeItem");

        return ChallengeItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): ChallengeItemData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<ChallengeItemData>): void {
        Debug.log("onItemSelected");
        return;
    }
}