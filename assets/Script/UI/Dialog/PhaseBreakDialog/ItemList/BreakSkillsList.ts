import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { BreakSkillsData } from "./PhaseBreakData";

const { ccclass, property } = cc._decorator;

@ccclass
export class BreakSkillsList extends ItemList<BreakSkillsData> {

    private _datas: Array<BreakSkillsData> = new Array();

    @property(cc.Prefab)
    public BreakSkills;

    public ApplyData(datas: Array<BreakSkillsData>): void {
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

    createItem(): Item<BreakSkillsData> {

        let BreakSkillsItemPrefab = window.appContext.Pool.requestInstant(this.BreakSkills);

        if (BreakSkillsItemPrefab == null) {
            return null;
        }

        let BreakSkillsItem = BreakSkillsItemPrefab.getComponent("BreakSkills");

        return BreakSkillsItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): BreakSkillsData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<BreakSkillsData>): void {
        Debug.log("onBreakSkillselected");
        return;
    }
}