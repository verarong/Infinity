import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { MailData } from "./MailData";

const { ccclass, property } = cc._decorator;

@ccclass
export class MailList extends ItemList<MailData> {

    private _datas: Array<MailData> = new Array();

    @property(cc.Prefab)
    public Mail;

    public ApplyData(datas: Array<MailData>, selected: number): void {
        if (datas == null || datas.length == 0) {
            return;
        }
        this._datas = new Array()
        for (let index = 0; index < datas.length; index++) {
            const element = datas[index];
            this._datas.push(element);
        }
        //this.selectEmpty();

        this.refreshContent();
        this.setSelectSlot(selected)
        this.refreshSelectState()
    }

    slotCount(): number {
        return this._datas.length;
    }

    createItem(): Item<MailData> {

        let MailItemPrefab = window.appContext.Pool.requestInstant(this.Mail);

        if (MailItemPrefab == null) {
            return null;
        }

        let MailItem = MailItemPrefab.getComponent("Mail");

        return MailItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): MailData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<MailData>): void {
        Debug.log("onMailelected");
        return;
    }
}