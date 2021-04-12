

import ResourceItem from "./ResourceItem";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { ResourceData } from "./AwardsData";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResourceList extends ItemList<ResourceData> {

    private _datas: Array<ResourceData> = new Array();

    @property(cc.Prefab)
    public ResourceItem;

    public ApplyData(datas: Array<ResourceData>): void {
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

    createItem(): Item<ResourceData> {

        let ResourceItemPrefab = window.appContext.Pool.requestInstant(this.ResourceItem);

        if (ResourceItemPrefab == null) {
            return null;
        }

        let ResourceItem = ResourceItemPrefab.getComponent("ResourceItem");

        return ResourceItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): ResourceData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<ResourceData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
