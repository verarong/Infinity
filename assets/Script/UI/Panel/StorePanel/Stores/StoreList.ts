

import { StorePanelData } from "./StorePanelData";
import StoreItem from "./StoreItem";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";
const {ccclass, property} = cc._decorator;

@ccclass
export default class StoreList extends ItemList<StorePanelData> {

    private _datas :Array<StorePanelData> = new Array();

    @property(cc.Prefab)
    public StoreItem;

    public ApplyData(datas: Array<StorePanelData>):void{
        if(datas == null || datas.length == 0){
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

    createItem(): Item<StorePanelData> {

        let StoreItemPrefab = window.appContext.Pool.requestInstant(this.StoreItem);

        if (StoreItemPrefab == null) {
            return null;
        }

        let StoreItem = StoreItemPrefab.getComponent("StoreItem");
        
        return StoreItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): StorePanelData {

        if(index <0 || index > this.slotCount()){
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<StorePanelData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
