

import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { HeadData } from "./AvatarData";

const { ccclass, property } = cc._decorator;

@ccclass
export class HeadList extends ItemList<HeadData> {

    private _datas: Array<HeadData> = new Array();

    @property(cc.Prefab)
    public HeadItem;

    public ApplyData(datas: Array<HeadData>): void {
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

    createItem(): Item<HeadData> {

        let HeadItemPrefab = window.appContext.Pool.requestInstant(this.HeadItem);

        if (HeadItemPrefab == null) {
            return null;
        }

        let HeadItem = HeadItemPrefab.getComponent("HeadItem");

        return HeadItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): HeadData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<HeadData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
