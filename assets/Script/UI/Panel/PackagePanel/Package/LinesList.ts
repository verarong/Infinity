

import { ItemsData } from "./CharacterPanelData";
import { EquipmentLinesData } from "./CharacterPanelData";
import { Lines } from "./Lines";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";
const { ccclass, property } = cc._decorator;

@ccclass
export class LinesList extends ItemList<EquipmentLinesData> {

    private _datas: Array<EquipmentLinesData> = new Array();

    @property(cc.Prefab)
    public Lines;

    public ApplyData(datas: Array<EquipmentLinesData>): void {
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

    createItem(): Item<EquipmentLinesData> {

        let LinesItemPrefab = window.appContext.Pool.requestInstant(this.Lines);

        if (LinesItemPrefab == null) {
            return null;
        }

        let LinesItem = LinesItemPrefab.getComponent("Lines");

        return LinesItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): EquipmentLinesData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<EquipmentLinesData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
