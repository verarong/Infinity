import { Debug } from "../../../../Common/Debug";
import { EquipmentData, ItemData } from "../../../../Common/JsonData/JsonData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import MapBuffData from "./BuffData";



const { ccclass, property } = cc._decorator;

@ccclass
export class Buff extends Item<MapBuffData> {

    private _data: MapBuffData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Label)
    public describe: cc.Label;

    getData(): MapBuffData {
        return this._data;
    }

    showByData(start = "") {
        window.appContext.Pool.setSpriteFrameByUrl(this._data.buff.icon, this.icon);
        this.describe.string = this._data.buff.describe_
    }

    bindData(currentIndex: number, data: MapBuffData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this._data = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {
        Debug.log("select:" + selected);
    }

    getClickButton(): cc.Button {
        return this.node.getComponent(cc.Button);
    }
}