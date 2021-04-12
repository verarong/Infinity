// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { OnSalePanelData } from "./StorePanelData";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";

const {ccclass, property} = cc._decorator;

@ccclass
export default class OnSaleList extends ItemList<OnSalePanelData> {

    private _datas :Array<OnSalePanelData> = new Array();

    @property(cc.Prefab)
    public OnSaleItem;

    public ApplyData(datas: Array<OnSalePanelData>):void{
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

    createItem(): Item<OnSalePanelData> {

        let OnSaleItemPrefab = window.appContext.Pool.requestInstant(this.OnSaleItem);

        if (OnSaleItemPrefab == null) {
            return null;
        }

        let OnSaleItem = OnSaleItemPrefab.getComponent("OnSaleItem");
        
        return OnSaleItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): OnSalePanelData {

        if(index <0 || index > this.slotCount()){
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<OnSalePanelData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
