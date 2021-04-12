import { ItemList } from "../../../../ItemList/ItemList";
import { AwardData } from "./AwardsData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AwardList extends ItemList<AwardData> {

    private _datas: Array<AwardData> = new Array();

    @property(cc.Prefab)
    public AwardItem;

    public ApplyData(datas: Array<AwardData>): void {
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

    createItem(): Item<AwardData> {

        let AwardItemPrefab = window.appContext.Pool.requestInstant(this.AwardItem);

        if (AwardItemPrefab == null) {
            return null;
        }

        let AwardItem = AwardItemPrefab.getComponent("AwardItem");

        return AwardItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): AwardData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<AwardData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
