import { ItemList } from "../../../../ItemList/ItemList";
import { Item } from "../../../../ItemList/Item";
import BattleFiledItem from "./BattleFiledItem";
import { BattleFiledData } from "./BattleFiledData";
import { Debug } from "../../../../Common/Debug";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BattleFiledList extends ItemList<BattleFiledData> {

    private _datas :Array<BattleFiledData> = new Array();

    @property(cc.Prefab)
    public BattleFiledItem;

    public  ApplyData(datas: Array<BattleFiledData>):void{
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
        this.DestroyItemOnDisable();
    }

    slotCount(): number {
        return this._datas.length;
    }

    createItem(): Item<BattleFiledData> {

        let prefab = window.appContext.Pool.requestInstant(this.BattleFiledItem);

        if (prefab == null) {
            return null;
        }

        let item = prefab.getComponent("BattleFiledItem");
        
        return item;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): BattleFiledData {

        if(index <0 || index > this.slotCount()){
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<BattleFiledData>): void {
        Debug.log("onItemSelected");
        return;
    }

    public GetParentBattleFieldItems( battleFiledItem:BattleFiledItem):Array<BattleFiledItem>{
        let data = battleFiledItem.getData();
        let parentIds = data.parents;

        let parentBattleFiledItems = new Array<BattleFiledItem>();
        if(parentIds == null || parentIds.length == 0){
            return parentBattleFiledItems;
        }

        for (let i = 0; i < this._datas.length; i++) {
            let item = this.getItem(i) as BattleFiledItem;
            let currentData = item.getData();

            for (let j = 0; j < parentIds.length; j++) {
                if(currentData.key == parentIds[j]){
                    parentBattleFiledItems.push(item);
                    continue;
                }
            }
        }
        return parentBattleFiledItems;
    }
}
