// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import AlliancePanel from "../AlliancePanel";
import { MemberData } from "./AllianceData";

const { ccclass, property } = cc._decorator;

@ccclass
export class MemberItem extends Item<MemberData> {

    private _data: MemberData;

    @property(cc.Label)
    public member_name: cc.Label;

    @property(cc.Label)
    public position: cc.Label;

    @property(cc.Label)
    public contribution_history: cc.Label;

    @property(cc.Label)
    public last_login: cc.Label;

    @property(cc.Node)
    public fire_btn: cc.Node;

    @property(cc.Node)
    public upgrade_position_btn: cc.Node;

    getData(): MemberData {
        return this._data;
    }

    showByData() {
        this.member_name.string = this._data.user_name
        this.position.string = window.appContext.ConfigManager.GetPositionById(this._data.position).name
        this.contribution_history.string = this._data.contribution_history.toString()
        let last = Math.floor((new Date().getTime() / 1000 - this._data.last_login) / 3600)
        this.last_login.string = last ? last + "小时前" : "刚刚"

        let bool_position_greater: boolean = window.appContext.DataContainer.get_AllianceParamsData().position > this._data.position
        this.fire_btn.active = window.appContext.DataContainer.get_AllianceParamsData().position >= window.appContext.ConfigManager.GetBasicValueByType("min_fire_member_position") && bool_position_greater
        this.upgrade_position_btn.active = window.appContext.DataContainer.get_AllianceParamsData().position >= window.appContext.ConfigManager.GetBasicValueByType("min_upgrade_position_position") && bool_position_greater
    }

    bindData(currentIndex: number, data: MemberData) {
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

    public fire_member() {
        window.appContext.WebApi.fire_member(this._data.user_id, this, function (data) {
            let AlliancePanel: AlliancePanel = window.appContext.UIManager.getCurrentPanel()
            AlliancePanel.refresh(true, true)
        })
    }

    public upgrade() {
        window.appContext.WebApi.upgrade_position(this._data.user_id, this, function (data) {
            let AlliancePanel: AlliancePanel = window.appContext.UIManager.getCurrentPanel()
            AlliancePanel.refresh(true, true)
        })
    }

    public upgrade_position() {
        if (this._data.position == window.appContext.ConfigManager.GetMaxPosition() - 1) {
            window.appContext.UIManager.ShowCommonDialog("是否确认转移门主", "提示", false, this, this.upgrade, null, true)
        }
        else {
            this.upgrade()
        }
    }

    getClickButton(): cc.Button {
        return null;
    }
}