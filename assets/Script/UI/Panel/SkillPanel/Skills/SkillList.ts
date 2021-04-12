

import { SkillPanelData } from "./SkillPanelData";
import SkillItem from "./SkillItem";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";
const { ccclass, property } = cc._decorator;

@ccclass
export default class SkillList extends ItemList<SkillPanelData> {

    private _datas: Array<SkillPanelData> = new Array();

    @property(cc.Prefab)
    public SkillItem;

    public ApplyData(datas: Array<SkillPanelData>): void {
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

    createItem(): Item<SkillPanelData> {

        let skillItemPrefab = window.appContext.Pool.requestInstant(this.SkillItem);

        if (skillItemPrefab == null) {
            return null;
        }

        let skillItem = skillItemPrefab.getComponent("SkillItem");

        return skillItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): SkillPanelData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<SkillPanelData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
