// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { AllianceListData } from "./AllianceData";
import { Item } from "../../../../ItemList/Item";
import AlliancePanel from "../AlliancePanel";
import { Util } from "../../../../Common/Utils/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export class AllianceItem extends Item<AllianceListData> {

    private _data: AllianceListData;

    @property(cc.Label)
    public alliance_name: cc.Label;

    @property(cc.Label)
    public alliance_level: cc.Label;

    @property(cc.Label)
    public captain_name: cc.Label;

    @property(cc.Label)
    public join_threshold: cc.Label;

    @property(cc.Node)
    public btn: cc.Node;

    getData(): AllianceListData {
        return this._data;
    }

    showByData() {
        this.alliance_name.string = this._data.name
        this.alliance_level.string = this._data.level.toString()
        this.captain_name.string = this._data.captain_name
        this.join_threshold.string = this._data.join_threshold.toString()
        let grade_reach: boolean = window.appContext.DataContainer.get_UserAttributeData().grade >= this._data.join_threshold
        this.join_threshold.node.color = grade_reach ? Util.ButtonColor("common") : Util.ButtonColor("shortage")
        this.btn.active = grade_reach
    }

    bindData(currentIndex: number, data: AllianceListData) {
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

    public join_alliance() {
        window.appContext.WebApi.join_alliance(this._data.alliance_id, this, function (data) {
            let AlliancePanel: AlliancePanel = window.appContext.UIManager.getCurrentPanel()
            AlliancePanel.refresh(true,true)
        })
    }

    getClickButton(): cc.Button {
        return null;
    }
}