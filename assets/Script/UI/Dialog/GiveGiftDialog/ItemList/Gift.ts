import { Debug } from "../../../../Common/Debug";
import { EquipmentData, ItemData } from "../../../../Common/JsonData/JsonData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import GiveGiftDialog from "../GiveGiftDialog";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { GiftData } from "./GiftData";



const { ccclass, property } = cc._decorator;

@ccclass
export class Gift extends Item<GiftData> {

    private item_index: number
    private bool_selected: boolean
    private _data: GiftData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public icon_bg: cc.Sprite;

    @property(cc.Sprite)
    public icon_phase: cc.Sprite;

    @property(cc.Label)
    public amount: cc.Label;

    @property(cc.Sprite)
    public mask: cc.Sprite;

    @property(cc.Label)
    public strength: cc.Label;

    getData(): GiftData {
        return this._data;
    }

    refresh_select() {
        this.mask.node.active = this.bool_selected
    }

    showByData(start = "") {
        this.refresh_select()

        this.amount.string = this._data.amount.toString()

        let item_data: ItemData | EquipmentData
        if (this._data.item_id < window.appContext.ConfigManager.GetBasicValueByType("min_equipment_id")) {
            item_data = window.appContext.ConfigManager.GetitemByItemId(this._data.item_id)
            this.amount.node.active = true
        }
        else {
            item_data = window.appContext.ConfigManager.GetequipmentById(this._data.item_id)
            this.amount.node.active = false
        }

        this.strength.string = "+" + this._data.strengthen_level
        this.strength.node.active = this._data.strengthen_level > 0
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_phase, this.icon_phase);
    }

    bindData(currentIndex: number, data: GiftData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.item_index = currentIndex
        this._data = data;

        this.amount.enabled = true
        this.icon.enabled = true
        this.icon_phase.enabled = true
        this.icon_bg.enabled = true
        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {

        Debug.log("select:" + selected);
        if (!selected) {
            this.bool_selected = false
            this.refresh_select()
        }
        else {
            this.bool_selected = true
            this.refresh_select()
            let GiveGiftDialog: GiveGiftDialog = window.appContext.UIManager.getDialog(PrefabUrl.GiveGiftDialog)
            GiveGiftDialog.select(this._data.item_id)
        }
    }

    getClickButton(): cc.Button {
        return this.node.getComponent(cc.Button);
    }
}