import { ItemList } from "../../../../ItemList/ItemList";
import { TaskAwardData } from "./TaskAwardData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";


const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskAwardList extends ItemList<TaskAwardData> {

    private _datas: Array<TaskAwardData> = new Array();

    @property(cc.Prefab)
    public TaskAwardItem;

    public ApplyData(datas: Array<TaskAwardData>): void {
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

    createItem(): Item<TaskAwardData> {

        let TaskAwardItemPrefab = window.appContext.Pool.requestInstant(this.TaskAwardItem);

        if (TaskAwardItemPrefab == null) {
            return null;
        }

        let TaskAwardItem = TaskAwardItemPrefab.getComponent("TaskAwardItem");

        return TaskAwardItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): TaskAwardData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<TaskAwardData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
