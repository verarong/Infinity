// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Util } from "../../../../Common/Utils/Util";
import { Item } from "../../../../ItemList/Item";
import AlliancePanel from "../AlliancePanel";
import { AllianceTechnologyData } from "./AllianceData";

const { ccclass, property } = cc._decorator;

@ccclass
export class TechnologyItem extends Item<AllianceTechnologyData> {

    private _data: AllianceTechnologyData;

    @property(cc.Sprite)
    public technology_icon: cc.Sprite;

    @property(cc.Label)
    public technology_name: cc.Label;

    @property(cc.Label)
    public level: cc.Label;

    @property(cc.Label)
    public describe: cc.Label;

    @property(cc.Label)
    public fund_cost: cc.Label;

    @property(cc.Label)
    public upgrade: cc.Label;

    @property(cc.Node)
    public upgrade_btn: cc.Node;

    getData(): AllianceTechnologyData {
        return this._data;
    }

    showByData() {
        window.appContext.Pool.setSpriteFrameByUrl(this._data.technology.attribute, this.technology_icon);
        this.technology_name.string = this._data.technology.name
        this.level.string = "LV" + this._data.level
        this.describe.string = "提升" + window.appContext.ConfigManager.GettransformChnByEng(this._data.technology.attribute) + "获取效率至" + Math.floor(this._data.technology.efficiency_ratio * 100) + "%"

        let requirement: boolean = window.appContext.DataContainer.get_AllianceData().fund >= this._data.technology.fund_cost
        let bool_max_level: boolean = window.appContext.ConfigManager.GetMaxLevelByTechnologyId(this._data.technology_id) == this._data.level
        this.fund_cost.string = this._data.technology.fund_cost + "/" + window.appContext.DataContainer.get_AllianceData().alliance.fund
        this.fund_cost.node.color = requirement ? Util.ButtonColor("common") : Util.ButtonColor("shortage")
        this.upgrade.string = bool_max_level ? "顶级" : "升级"
        this.upgrade_btn.active = window.appContext.DataContainer.get_AllianceParamsData().position >= window.appContext.ConfigManager.GetBasicValueByType("min_upgrade_technology_position")
    }

    bindData(currentIndex: number, data: AllianceTechnologyData) {
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
        return;
    }

    public upgrade_alliance_technology() {
        window.appContext.WebApi.upgrade_alliance_technology(this._data.technology_id, this, function (data) {
            let AlliancePanel: AlliancePanel = window.appContext.UIManager.getCurrentPanel()
            AlliancePanel.refresh(true, true)
        })
    }

    getClickButton(): cc.Button {
        return null;
    }
}