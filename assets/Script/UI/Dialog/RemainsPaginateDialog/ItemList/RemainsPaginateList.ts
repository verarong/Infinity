import { ItemList } from "../../../../ItemList/ItemList";
import { RemainsPaginateData } from "./RemainsPaginateData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RemainsPaginateList extends ItemList<RemainsPaginateData> {

    private _datas: Array<RemainsPaginateData> = new Array();

    @property(cc.Prefab)
    public RemainsPaginateItem;

    public ApplyData(datas: Array<RemainsPaginateData>): void {
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

    createItem(): Item<RemainsPaginateData> {

        let RemainsPaginateItemPrefab = window.appContext.Pool.requestInstant(this.RemainsPaginateItem);

        if (RemainsPaginateItemPrefab == null) {
            return null;
        }

        let RemainsPaginateItem = RemainsPaginateItemPrefab.getComponent("RemainsPaginateItem");

        return RemainsPaginateItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): RemainsPaginateData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<RemainsPaginateData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
