// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { RankEquipmentData } from "./UserRankData";
import { Debug } from "../../../../Common/Debug";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RankEquipmentItem extends Item<RankEquipmentData> {

    private _data: RankEquipmentData;

    @property(cc.Label)
    public strength: cc.Label;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public icon_bg: cc.Sprite;

    @property(cc.Sprite)
    public icon_phase: cc.Sprite;

    getData(): RankEquipmentData {
        return this._data;
    }

    showByData() {
        this.strength.string = "+" + this._data.strengthen_level
        this.strength.node.active = this._data.strengthen_level > 0
        window.appContext.Pool.setSpriteFrameByUrl(this._data.equipment.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.equipment.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.equipment.icon_phase, this.icon_phase);
    }

    bindData(currentIndex: number, data: RankEquipmentData) {

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
        if (!selected) {
            return;
        } else {
            let info = ["rank", this._data]
            window.appContext.UIManager.ShowDialog(PrefabUrl.CommonEquipmentDialog, info)
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
