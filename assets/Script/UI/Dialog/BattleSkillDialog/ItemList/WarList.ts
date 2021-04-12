import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";



const { ccclass, property } = cc._decorator;

@ccclass
export default class WarList extends ItemList<number> {

    private _datas: Array<number> = new Array();

    @property(cc.Prefab)
    public WarItem;

    public ApplyData(datas: Array<number>): void {
        // if (datas == null || datas.length == 0) {
        //     return;
        // }
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

    createItem(): Item<number> {

        let WarItemPrefab = window.appContext.Pool.requestInstant(this.WarItem);

        if (WarItemPrefab == null) {
            return null;
        }

        let WarItem = WarItemPrefab.getComponent("WarItem");

        return WarItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): number {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<number>): void {
        Debug.log("onItemSelected");
        return;
    }
}
