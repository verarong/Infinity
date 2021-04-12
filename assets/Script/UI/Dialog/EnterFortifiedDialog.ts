// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseDialog } from "../Common/BaseDialog";
import FortifiedData from "../Panel/BattlePanel/ItemList/FortifiedData";
import BattlePanel from "../Panel/BattlePanel/BattlePanel";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import { Util } from "../../Common/Utils/Util";
import { MapData } from "../../Common/JsonData/JsonData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnterFortifiedDialog extends BaseDialog {

    private _data: FortifiedData;

    @property(cc.Label)
    title: cc.Label = null;

    @property(cc.Label)
    content: cc.Label = null;

    @property(cc.Label)
    grade: cc.Label;

    @property(cc.Sprite)
    public Icon: cc.Sprite;

    public showByData() {
        this.title.string = this._data.name;
        window.appContext.Pool.setSpriteFrameByUrl("Fortified_" + this._data.difficulty, this.Icon);
        let phase = "副本等级：" + this._data.phase + " (" + Util.getRankById(this._data.phase) + "级) "
        let difficulty = "难度级别：" + this._data.difficulty + " (" + window.appContext.ConfigManager.GetDifficultyStringById(this._data.difficulty) + ")"
        let thread = this._data.thread ? "主线任务：" + window.appContext.ConfigManager.GetthreadById(this._data.thread).name : "主线任务：无"
        this.content.string = Util.join("\n", [phase, difficulty, thread])

        let map: MapData = window.appContext.ConfigManager.GetMapByPhaseAndQuality(this._data.phase, this._data.difficulty)
        this.grade.string = "推荐战力：" + map.grade
        this.grade.node.color = window.appContext.DataContainer.get_UserAttributeData().grade < map.grade ? Util.ButtonColor("shortage") : Util.ButtonColor("common")
    }

    public bind_data(data) {
        this._data = data;
    }

    //UI加载完成后将参数传进来
    public show(data: FortifiedData) {
        this.bind_data(data)

        this.showByData()
    }

    public OnCombatBtnClick() {
        if (window.appContext.DataContainer.BattleData.label > 0) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.BattleFiledDialog);
        }
        else {
            window.appContext.WebApi.battle_init(this._data.id, this,
                function (succeed_data) {
                    window.appContext.DataContainer.set_BattleData(succeed_data)
                    let BattlePanel: BattlePanel = window.appContext.UIManager.getCurrentPanel();
                    BattlePanel.refresh()
                });
        }
        this.hide();
    }
}
