import { Debug } from "../../../../Common/Debug";
import { EquipmentData, ItemData } from "../../../../Common/JsonData/JsonData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import AlliancePanel from "../AlliancePanel";
import { DonateData } from "./AllianceData";



const { ccclass, property } = cc._decorator;

@ccclass
export class DonateItem extends Item<DonateData> {

    private item_index: number
    private bool_selected: boolean
    private _data: DonateData;

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

    getData(): DonateData {
        return this._data;
    }

    refresh_select() {
        this.mask.node.active = this.bool_selected
    }

    showByData(start = "") {
        this.refresh_select()

        this.strength.string = "+" + this._data.strengthen_level
        this.strength.node.active = this._data.strengthen_level > 0
        this.amount.string = this._data.amount.toString()
        this.amount.node.active = this._data.item_id < window.appContext.ConfigManager.GetBasicValueByType("min_equipment_id")
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item_data.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item_data.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item_data.icon_phase, this.icon_phase);
    }

    bindData(currentIndex: number, data: DonateData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.item_index = currentIndex
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
            this.refresh_select()
        }
        else {
            this.bool_selected = true
            this.refresh_select()
            let AlliancePanel: AlliancePanel = window.appContext.UIManager.getCurrentPanel()
            AlliancePanel.donateSelect(this._data)
        }
    }

    getClickButton(): cc.Button {
        return this.node.getComponent(cc.Button);
    }
}