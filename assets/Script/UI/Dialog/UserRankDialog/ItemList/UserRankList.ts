import { ItemList } from "../../../../ItemList/ItemList";
import { UserRankData } from "./UserRankData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UserRankList extends ItemList<UserRankData> {

    private _datas: Array<UserRankData> = new Array();

    @property(cc.Prefab)
    public UserRankItem;

    public ApplyData(datas: Array<UserRankData>): void {
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

    createItem(): Item<UserRankData> {

        let UserRankItemPrefab = window.appContext.Pool.requestInstant(this.UserRankItem);

        if (UserRankItemPrefab == null) {
            return null;
        }

        let UserRankItem = UserRankItemPrefab.getComponent("UserRankItem");

        return UserRankItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): UserRankData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<UserRankData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
