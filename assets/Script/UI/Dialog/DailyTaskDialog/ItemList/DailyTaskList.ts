import { ItemList } from "../../../../ItemList/ItemList";
import { DailyTaskData } from "./DailyTaskData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";


const { ccclass, property } = cc._decorator;

@ccclass
export default class DailyTaskList extends ItemList<DailyTaskData> {

    private _datas: Array<DailyTaskData> = new Array();

    @property(cc.Prefab)
    public DailyTaskItem;

    public ApplyData(datas: Array<DailyTaskData>): void {
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

    createItem(): Item<DailyTaskData> {

        let DailyTaskItemPrefab = window.appContext.Pool.requestInstant(this.DailyTaskItem);

        if (DailyTaskItemPrefab == null) {
            return null;
        }

        let DailyTaskItem = DailyTaskItemPrefab.getComponent("DailyTaskItem");

        return DailyTaskItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): DailyTaskData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<DailyTaskData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
