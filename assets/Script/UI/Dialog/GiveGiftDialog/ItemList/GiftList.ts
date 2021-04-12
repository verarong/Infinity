import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { GiftData } from "./GiftData";

const { ccclass, property } = cc._decorator;

@ccclass
export class GiftList extends ItemList<GiftData> {

    private _datas: Array<GiftData> = new Array();

    @property(cc.Prefab)
    public Gift;

    public ApplyData(datas: Array<GiftData>): void {
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

    createItem(): Item<GiftData> {

        let GiftItemPrefab = window.appContext.Pool.requestInstant(this.Gift);

        if (GiftItemPrefab == null) {
            return null;
        }

        let GiftItem = GiftItemPrefab.getComponent("Gift");

        return GiftItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): GiftData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<GiftData>): void {
        Debug.log("onGiftelected");
        return;
    }
}