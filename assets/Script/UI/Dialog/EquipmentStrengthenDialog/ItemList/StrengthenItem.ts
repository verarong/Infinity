// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import EquipmentStrengthenDialog from "../EquipmentStrengthenDialog";
import { StrengthenItemData } from "./StrengthenItemData";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StrengthenItem extends Item<StrengthenItemData> {

    private index: number;
    private bool_selected: boolean;
    private _data: StrengthenItemData;

    @property(cc.Label)
    public name_strengthen: cc.Label;

    @property(cc.Sprite)
    public bg: cc.Sprite;

    @property(cc.Sprite)
    public bg_selected: cc.Sprite;

    @property(cc.Node)
    public can_strengthen: cc.Node;

    getData(): StrengthenItemData {
        return this._data;
    }

    showByData() {
        this.name_strengthen.string = this._data.equipment_name + "+" + this._data.strengthen_level;
        this.can_strengthen.active = this._data.can_strengthen
        window.appContext.Pool.setSpriteFrameByUrl("icon_bg_" + this._data.equipment_quality, this.bg)
        this.bg_selected.enabled = this.bool_selected
    }

    bindData(currentIndex: number, data: StrengthenItemData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.index = currentIndex
        this._data = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {

        Debug.log("select:" + selected);
        if (!selected) {
            this.bool_selected = false
            this.showByData()
            return;
        }
        else {
            this.bool_selected = true
            this.showByData()
            let strengthen: EquipmentStrengthenDialog = window.appContext.UIManager.getDialog(PrefabUrl.EquipmentStrengthenDialog)
            if (strengthen) {
                strengthen.refresh(false, this.index, false)
            }
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
