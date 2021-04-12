// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EquipmentsData } from "./CharacterPanelData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export class Equipments extends Item<EquipmentsData> {

    private equipment_index: number
    private _data: EquipmentsData;

    @property(cc.Label)
    public strength: cc.Label;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public icon_bg: cc.Sprite;

    @property(cc.Sprite)
    public icon_phase: cc.Sprite;
    
    @property(cc.Node)
    public locked: cc.Node;

    getData(): EquipmentsData {
        return this._data;
    }

    showByData() {
        let item_data = window.appContext.ConfigManager.GetequipmentById(this._data.item_id);
        this.strength.string = "+" + this._data.strengthen_level
        this.strength.node.active = this._data.strengthen_level > 0
        this.locked.active = this._data.bool_lock
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(item_data.icon_phase, this.icon_phase);
    }

    bindData(currentIndex: number, data: EquipmentsData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.equipment_index = currentIndex
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
            let info = [this.equipment_index, this._data]
            window.appContext.UIManager.ShowDialog(PrefabUrl.CommonEquipmentDialog, info)
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
