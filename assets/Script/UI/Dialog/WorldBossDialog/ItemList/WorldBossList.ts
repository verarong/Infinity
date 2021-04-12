import { ItemList } from "../../../../ItemList/ItemList";
import { WorldBossData } from "./WorldBossData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";


const { ccclass, property } = cc._decorator;

@ccclass
export default class WorldBossList extends ItemList<WorldBossData> {

    private _datas: Array<WorldBossData> = new Array();

    @property(cc.Prefab)
    public WorldBossItem;

    public ApplyData(datas: Array<WorldBossData>): void {
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

    createItem(): Item<WorldBossData> {

        let WorldBossItemPrefab = window.appContext.Pool.requestInstant(this.WorldBossItem);

        if (WorldBossItemPrefab == null) {
            return null;
        }

        let WorldBossItem = WorldBossItemPrefab.getComponent("WorldBossItem");

        return WorldBossItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): WorldBossData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<WorldBossData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
