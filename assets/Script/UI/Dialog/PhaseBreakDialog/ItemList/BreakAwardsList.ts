import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { BreakAwardsData } from "./PhaseBreakData";

const { ccclass, property } = cc._decorator;

@ccclass
export class BreakAwardsList extends ItemList<BreakAwardsData> {

    private _datas: Array<BreakAwardsData> = new Array();

    @property(cc.Prefab)
    public BreakAwards;

    public ApplyData(datas: Array<BreakAwardsData>): void {
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

    createItem(): Item<BreakAwardsData> {

        let BreakAwardsItemPrefab = window.appContext.Pool.requestInstant(this.BreakAwards);

        if (BreakAwardsItemPrefab == null) {
            return null;
        }

        let BreakAwardsItem = BreakAwardsItemPrefab.getComponent("BreakAwards");

        return BreakAwardsItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): BreakAwardsData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<BreakAwardsData>): void {
        Debug.log("onBreakAwardselected");
        return;
    }
}