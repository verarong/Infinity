import { ItemList } from "../../../../ItemList/ItemList";
import { MailAwardData } from "./MailData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MailAwardList extends ItemList<MailAwardData> {

    private _datas: Array<MailAwardData> = new Array();

    @property(cc.Prefab)
    public MailAwardItem;

    public ApplyData(datas: Array<MailAwardData>): void {
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

    createItem(): Item<MailAwardData> {

        let MailAwardItemPrefab = window.appContext.Pool.requestInstant(this.MailAwardItem);

        if (MailAwardItemPrefab == null) {
            return null;
        }

        let MailAwardItem = MailAwardItemPrefab.getComponent("MailAwardItem");

        return MailAwardItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): MailAwardData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<MailAwardData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
