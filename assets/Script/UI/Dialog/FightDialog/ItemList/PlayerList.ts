import { ItemList } from "../../../../ItemList/ItemList";
import { Item } from "../../../../ItemList/Item";
import { GamersData } from "./FightData";
import PlayerItem from "./PlayerItem";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerList extends ItemList<GamersData> {

    private _datas: Array<GamersData> = new Array();

    @property(cc.Prefab)
    public PlayerItem;

    public ApplyData(datas: Array<GamersData>): void {
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

    createItem(): Item<GamersData> {

        let prefab = window.appContext.Pool.requestInstant(this.PlayerItem);

        if (prefab == null) {
            return null;
        }

        let item = prefab.getComponent("PlayerItem");

        return item;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): GamersData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<GamersData>): void {
        Debug.log("onItemSelected");
        return;
    }

    getItemByIndex(index: number): PlayerItem {
        return this.getItem(index) as PlayerItem;
    }
}
