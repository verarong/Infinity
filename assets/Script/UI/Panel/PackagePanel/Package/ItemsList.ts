

import { ItemsData } from "./CharacterPanelData";
import { EquipmentsData } from "./CharacterPanelData";
import { Items } from "./Items";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";
const { ccclass, property } = cc._decorator;

@ccclass
export class ItemsList extends ItemList<ItemsData> {

    private _datas: Array<ItemsData> = new Array();

    @property(cc.Prefab)
    public Items;

    public ApplyData(datas: Array<ItemsData>): void {
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

    createItem(): Item<ItemsData> {

        let ItemsItemPrefab = window.appContext.Pool.requestInstant(this.Items);

        if (ItemsItemPrefab == null) {
            return null;
        }

        let ItemsItem = ItemsItemPrefab.getComponent("Items");

        return ItemsItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): ItemsData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<ItemsData>): void {
        Debug.log("onItemSelected");
        return;
    }
}