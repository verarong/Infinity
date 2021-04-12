

import { ItemsData } from "./CharacterPanelData";
import { EquipmentsData } from "./CharacterPanelData";
import { Equipments } from "./Equipments";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";
const { ccclass, property } = cc._decorator;

@ccclass
export class EquipmentsList extends ItemList<EquipmentsData> {

    private _datas: Array<EquipmentsData> = new Array();

    @property(cc.Prefab)
    public Equipments;

    public ApplyData(datas: Array<EquipmentsData>): void {
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

    createItem(): Item<EquipmentsData> {

        let EquipmentsItemPrefab = window.appContext.Pool.requestInstant(this.Equipments);

        if (EquipmentsItemPrefab == null) {
            return null;
        }

        let EquipmentsItem = EquipmentsItemPrefab.getComponent("Equipments");

        return EquipmentsItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): EquipmentsData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<EquipmentsData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
