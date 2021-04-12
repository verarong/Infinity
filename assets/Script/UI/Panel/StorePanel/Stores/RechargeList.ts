// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { RechargePanelData } from "./StorePanelData";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RechargeList extends ItemList<RechargePanelData> {

    private _datas :Array<RechargePanelData> = new Array();

    @property(cc.Prefab)
    public RechargeItem;

    public ApplyData(datas: Array<RechargePanelData>):void{
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

    createItem(): Item<RechargePanelData> {

        let RechargeItemPrefab = window.appContext.Pool.requestInstant(this.RechargeItem);

        if (RechargeItemPrefab == null) {
            return null;
        }

        let RechargeItem = RechargeItemPrefab.getComponent("RechargeItem");
        
        return RechargeItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): RechargePanelData {

        if(index <0 || index > this.slotCount()){
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<RechargePanelData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
