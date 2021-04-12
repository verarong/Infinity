import { PartnerMemory } from "./PartnerMemory";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { PartnerMemoryPanelData } from "./PartnerPanelData";
import { Debug } from "../../../../Common/Debug";
const { ccclass, property } = cc._decorator;

@ccclass
export class PartnerMemoryList extends ItemList<PartnerMemoryPanelData> {

    private _datas: Array<PartnerMemoryPanelData> = new Array();

    @property(cc.Prefab)
    public PartnerMemory;

    public ApplyData(datas: Array<PartnerMemoryPanelData>): void {
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

    createItem(): Item<PartnerMemoryPanelData> {

        let PartnerMemoryItemPrefab = window.appContext.Pool.requestInstant(this.PartnerMemory);

        if (PartnerMemoryItemPrefab == null) {
            return null;
        }

        let PartnerMemoryItem = PartnerMemoryItemPrefab.getComponent("PartnerMemory");

        return PartnerMemoryItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): PartnerMemoryPanelData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<PartnerMemoryPanelData>): void {
        Debug.log("onItemSelected");
        return;
    }
}