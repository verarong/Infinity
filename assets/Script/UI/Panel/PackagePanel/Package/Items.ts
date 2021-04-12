// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { ItemsData } from "./CharacterPanelData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { EquipmentData, ItemData } from "../../../../Common/JsonData/JsonData";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export class Items extends Item<ItemsData> {

    private item_index: number
    private spare: boolean
    private bool_equipment: boolean
    private _data: ItemsData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public icon_bg: cc.Sprite;

    @property(cc.Sprite)
    public icon_phase: cc.Sprite;

    @property(cc.Label)
    public amount: cc.Label;

    @property(cc.Label)
    public strength: cc.Label;

    @property(cc.Node)
    public locked: cc.Node;

    getData(): ItemsData {
        return this._data;
    }

    showByData() {
        this.amount.string = this._data.amount.toString()

        let item_data: ItemData | EquipmentData
        this.bool_equipment = this._data.item_id >= window.appContext.ConfigManager.GetBasicValueByType("min_equipment_id")
        if (!this.bool_equipment) {
            item_data = window.appContext.ConfigManager.GetitemByItemId(this._data.item_id)
            this.amount.node.active = true
        }
        else {
            item_data = window.appContext.ConfigManager.GetequipmentById(this._data.item_id)
            this.amount.node.active = false
        }

        this.strength.string = "+" + this._data.strengthen_level
        this.strength.node.active = this._data.strengthen_level > 0
        this.locked.active = this._data.bool_lock
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_phase, this.icon_phase);
    }

    bindData(currentIndex: number, data: ItemsData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.item_index = currentIndex
        this._data = data;
        this.spare = data.spare

        if (!this.spare) {
            this.amount.node.active = true
            this.icon.node.active = true
            this.icon_phase.node.active = true
            this.icon_bg.node.active = true
            this.locked.active = true
            this.showByData()
        }
        else {
            this.amount.node.active = false
            this.icon.node.active = false
            this.icon_phase.node.active = false
            this.icon_bg.node.active = false
            this.strength.node.active = false
            this.locked.active = false
        }
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {

        Debug.log("select:" + selected);
        if (!selected) {
            return;
        }
        else if (this.spare) {
            return;
        }
        else if (this.bool_equipment) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.CommonEquipmentDialog, ["item", this._data])
        }
        else {
            window.appContext.UIManager.ShowDialog(PrefabUrl.CommonItemDialog, this._data)
        }
    }

    getClickButton(): cc.Button {
        return this.node.getComponent(cc.Button);
    }
}