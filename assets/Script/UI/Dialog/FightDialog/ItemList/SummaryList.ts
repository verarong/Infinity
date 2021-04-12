import AttackData from "../AttackData";
import { ItemList } from "../../../../ItemList/ItemList";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SummaryList extends ItemList<AttackData> {

    private _datas: Array<AttackData> = new Array();

    @property(cc.Prefab)
    public SummaryItem;

    public ApplyData(datas: Array<AttackData>): void {
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
        this.DestroyItemOnDisable();
    }

    slotCount(): number {
        return this._datas.length;
    }

    createItem(): Item<AttackData> {

        let prefab = window.appContext.Pool.requestInstant(this.SummaryItem);

        if (prefab == null) {
            return null;
        }

        let item = prefab.getComponent("SummaryItem");

        return item;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): AttackData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<AttackData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
