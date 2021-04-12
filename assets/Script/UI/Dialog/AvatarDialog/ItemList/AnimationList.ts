

import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { AnimationData } from "./AvatarData";

const { ccclass, property } = cc._decorator;

@ccclass
export class AnimationList extends ItemList<AnimationData> {

    private _datas: Array<AnimationData> = new Array();

    @property(cc.Prefab)
    public AnimationItem;

    public ApplyData(datas: Array<AnimationData>): void {
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

    createItem(): Item<AnimationData> {

        let AnimationItemPrefab = window.appContext.Pool.requestInstant(this.AnimationItem);

        if (AnimationItemPrefab == null) {
            return null;
        }

        let AnimationItem = AnimationItemPrefab.getComponent("AnimationItem");

        return AnimationItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): AnimationData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<AnimationData>): void {
        Debug.log("onItemSelected");
        return;
    }
}