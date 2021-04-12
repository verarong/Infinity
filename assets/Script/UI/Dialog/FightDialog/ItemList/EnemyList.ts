import { ItemList } from "../../../../ItemList/ItemList";
import { Item } from "../../../../ItemList/Item";
import EnemyItem from "./EnemyItem";
import { MonstersData } from "./FightData";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyList extends ItemList<MonstersData> {

    private _datas: Array<MonstersData> = new Array();

    @property(cc.Prefab)
    public EnemyItem;

    public ApplyData(datas: Array<MonstersData>): void {
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
        this.DestroyItemOnDisable();
    }

    slotCount(): number {
        return this._datas.length;
    }

    createItem(): Item<MonstersData> {

        let prefab = window.appContext.Pool.requestInstant(this.EnemyItem);

        if (prefab == null) {
            return null;
        }

        let item = prefab.getComponent("EnemyItem");

        return item;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): MonstersData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<MonstersData>): void {
        Debug.log("onItemSelected");
        return;
    }

    getItemByIndex(index: number): EnemyItem {
        return this.getItem(index) as EnemyItem;
    }
}
