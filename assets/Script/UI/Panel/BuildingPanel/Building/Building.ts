// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BuildingData } from "./BuildingPanelData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { DomainData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export class Building extends Item<BuildingData> {

    private building_index: number
    private building_data: any
    private _data: BuildingData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Label)
    public name_: cc.Label;

    @property(cc.Label)
    public level: cc.Label;

    @property(cc.Label)
    public resource: cc.Label;

    @property(cc.Label)
    public efficiency: cc.Label;

    @property(cc.Label)
    public btn: cc.Label;

    @property(cc.Node)
    public can_upgrade: cc.Node;

    getData(): BuildingData {
        return this._data;
    }

    showByData(start = "：LV") {
        window.appContext.Pool.setSpriteFrameByUrl(this.building_data.resource, this.icon);
        this.name_.string = this.building_data.building
        this.level.string = start + this.building_data.level
        this.btn.string = this._data.bool_max ? "升级" : "已达顶级"
        this.can_upgrade.active = this._data.can_upgrade

        this.efficiency.string = this.building_data.efficiency_describe + this.building_data.efficiency
        this.resource.string = this.building_data.describe + this._data.amount
        this.resource.enabled = this.building_data.upgrade_ != 0
    }

    bindData(currentIndex: number, data: BuildingData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.building_index = currentIndex
        this._data = data;
        this.building_data = window.appContext.ConfigManager.GetdomainByBuildingIdAndLevel(this._data.building_id, this._data.level)

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {
        return;
    }

    public upgrade_building() {
        let info = [this._data.level, this._data.building_id]
        window.appContext.UIManager.ShowDialog(PrefabUrl.CommonBuildingUpgradeDialog, info)
    }

    getClickButton(): cc.Button {
        return null;
    }
}