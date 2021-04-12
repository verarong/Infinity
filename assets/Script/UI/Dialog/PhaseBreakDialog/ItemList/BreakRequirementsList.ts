import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { BreakRequirementsData } from "./PhaseBreakData";

const { ccclass, property } = cc._decorator;

@ccclass
export class BreakRequirementsList extends ItemList<BreakRequirementsData> {

    private _datas: Array<BreakRequirementsData> = new Array();

    @property(cc.Prefab)
    public BreakRequirements;

    public ApplyData(datas: Array<BreakRequirementsData>): void {
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

    createItem(): Item<BreakRequirementsData> {

        let BreakRequirementsItemPrefab = window.appContext.Pool.requestInstant(this.BreakRequirements);

        if (BreakRequirementsItemPrefab == null) {
            return null;
        }

        let BreakRequirementsItem = BreakRequirementsItemPrefab.getComponent("BreakRequirements");

        return BreakRequirementsItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): BreakRequirementsData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<BreakRequirementsData>): void {
        Debug.log("onBreakRequirementselected");
        return;
    }
}