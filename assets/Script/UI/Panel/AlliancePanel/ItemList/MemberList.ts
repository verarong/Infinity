import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { Debug } from "../../../../Common/Debug";
import { MemberData } from "./AllianceData";
const { ccclass, property } = cc._decorator;

@ccclass
export class MemberList extends ItemList<MemberData> {

    private _datas: Array<MemberData> = new Array();

    @property(cc.Prefab)
    public Member;

    public ApplyData(datas: Array<MemberData>): void {
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

    createItem(): Item<MemberData> {

        let MemberItemPrefab = window.appContext.Pool.requestInstant(this.Member);

        if (MemberItemPrefab == null) {
            return null;
        }

        let MemberItem = MemberItemPrefab.getComponent("MemberItem");

        return MemberItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): MemberData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<MemberData>): void {
        Debug.log("onItemSelected");
        return;
    }
}