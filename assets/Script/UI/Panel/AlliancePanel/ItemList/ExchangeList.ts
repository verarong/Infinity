import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { ItemList } from "../../../../ItemList/ItemList";
import { ExchangeData } from "./AllianceData";

const { ccclass, property } = cc._decorator;

@ccclass
export class ExchangeList extends ItemList<ExchangeData> {

    private _datas: Array<ExchangeData> = new Array();

    @property(cc.Prefab)
    public Exchange;

    public ApplyData(datas: Array<ExchangeData>): void {
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

    createItem(): Item<ExchangeData> {

        let ExchangeItemPrefab = window.appContext.Pool.requestInstant(this.Exchange);

        if (ExchangeItemPrefab == null) {
            return null;
        }

        let ExchangeItem = ExchangeItemPrefab.getComponent("ExchangeItem");

        return ExchangeItem;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): ExchangeData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<ExchangeData>): void {
        Debug.log("onExchangeelected");
        return;
    }
}