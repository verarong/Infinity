// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { ItemList } from "../../../../ItemList/ItemList";
import SecretData from "./SecretData";
import { Item } from "../../../../ItemList/Item";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SecretList extends ItemList<SecretData> {

    private _datas: Array<SecretData> = new Array();

    @property(cc.Prefab)
    public SecretItem;

    public ApplyData(datas: Array<SecretData>): void {
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

    createItem(): Item<SecretData> {

        let prefab = window.appContext.Pool.requestInstant(this.SecretItem);

        if (prefab == null) {
            return null;
        }

        let item = prefab.getComponent("SecretItem");

        return item;
    }

    dataUpdateTime(): number {
        return 0;
    }

    dataCount(): number {
        return this._datas.length;
    }

    getData(index: number): SecretData {

        if (index < 0 || index > this.slotCount()) {
            return null;
        }
        return this._datas[index];
    }

    onItemSelected(item: Item<SecretData>): void {
        Debug.log("onItemSelected");
        return;
    }
}
