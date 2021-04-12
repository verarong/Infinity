

import TalentItem from "./TalentItem";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { TalentItemData } from "./TalentItemData";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TalentList extends ItemList<TalentItemData> {

    private _datas: Array<TalentItemData> = new Array();

    @property(cc.Prefab)
    public TalentItem;

    public ApplyData(datas: Array<TalentItemData>, selected: number): void {
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

    createItem(): Item<TalentItemData> {

        let TalentItemPrefab = window.appContext.Pool.requestInstant(this.TalentItem);

        if (TalentItemPrefab == null) {
            return null;
        }

        let TalentItem = TalentItemPrefab.getComponent("TalentItem");

        return TalentItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): TalentItemData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<TalentItemData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
