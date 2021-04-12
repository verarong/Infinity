import { ItemList } from "../../../../ItemList/ItemList";
import { UserAttributeData } from "./UserAttributeData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UserAttributeList extends ItemList<UserAttributeData> {

    private _datas: Array<UserAttributeData> = new Array();

    @property(cc.Prefab)
    public UserAttributeItem;

    public ApplyData(datas: Array<UserAttributeData>): void {
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

    createItem(): Item<UserAttributeData> {

        let UserAttributeItemPrefab = window.appContext.Pool.requestInstant(this.UserAttributeItem);

        if (UserAttributeItemPrefab == null) {
            return null;
        }

        let UserAttributeItem = UserAttributeItemPrefab.getComponent("UserAttributeItem");

        return UserAttributeItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): UserAttributeData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<UserAttributeData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
