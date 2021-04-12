

import BattleSkillItem from "./BattleSkillItem";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { BattleSkillItemData } from "./BattleSkills";
import { Debug } from "../../../../Common/Debug";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BattleSkillList extends ItemList<BattleSkillItemData> {

    private _datas: Array<BattleSkillItemData> = new Array();

    @property(cc.Prefab)
    public BattleSkillItem;

    public ApplyData(datas: Array<BattleSkillItemData>): void {
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

    createItem(): Item<BattleSkillItemData> {

        let BattleSkillItemPrefab = window.appContext.Pool.requestInstant(this.BattleSkillItem);

        if (BattleSkillItemPrefab == null) {
            return null;
        }

        let BattleSkillItem = BattleSkillItemPrefab.getComponent("BattleSkillItem");

        return BattleSkillItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): BattleSkillItemData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<BattleSkillItemData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
