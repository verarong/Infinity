

import { BuildingData } from "./BuildingPanelData";
import { Building } from "./Building";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";
const { ccclass, property } = cc._decorator;

@ccclass
export class BuildingList extends ItemList<BuildingData> {

    private _datas: Array<BuildingData> = new Array();

    @property(cc.Prefab)
    public Building;

    public ApplyData(datas: Array<BuildingData>): void {
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

    createItem(): Item<BuildingData> {

        let BuildingItemPrefab = window.appContext.Pool.requestInstant(this.Building);

        if (BuildingItemPrefab == null) {
            return null;
        }

        let BuildingItem = BuildingItemPrefab.getComponent("Building");

        return BuildingItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): BuildingData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<BuildingData>): void {
        Debug.log("onItemSelected");
        return;
    }
}