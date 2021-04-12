import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";
import { AllianceTechnologyData } from "./AllianceData";
const { ccclass, property } = cc._decorator;

@ccclass
export class TechnologyList extends ItemList<AllianceTechnologyData> {

    private _datas: Array<AllianceTechnologyData> = new Array();

    @property(cc.Prefab)
    public Technology;

    public ApplyData(datas: Array<AllianceTechnologyData>): void {
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

    createItem(): Item<AllianceTechnologyData> {

        let TechnologyItemPrefab = window.appContext.Pool.requestInstant(this.Technology);

        if (TechnologyItemPrefab == null) {
            return null;
        }

        let TechnologyItem = TechnologyItemPrefab.getComponent("TechnologyItem");

        return TechnologyItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): AllianceTechnologyData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<AllianceTechnologyData>): void {
        Debug.log("onItemSelected");
        return;
    }
}