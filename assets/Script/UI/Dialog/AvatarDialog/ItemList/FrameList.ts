

import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { FrameData } from "./AvatarData";

const { ccclass, property } = cc._decorator;

@ccclass
export class FrameList extends ItemList<FrameData> {

    private _datas: Array<FrameData> = new Array();

    @property(cc.Prefab)
    public FrameItem;

    public ApplyData(datas: Array<FrameData>): void {
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

    createItem(): Item<FrameData> {

        let FrameItemPrefab = window.appContext.Pool.requestInstant(this.FrameItem);

        if (FrameItemPrefab == null) {
            return null;
        }

        let FrameItem = FrameItemPrefab.getComponent("FrameItem");

        return FrameItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): FrameData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<FrameData>): void {
        Debug.log("onItemSelected");
        return;
    }
}