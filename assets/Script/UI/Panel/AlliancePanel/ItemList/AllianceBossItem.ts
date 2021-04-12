// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { AllianceBossData } from "./AllianceData";
import AlliancePanel from "../AlliancePanel";


const { ccclass, property } = cc._decorator;

@ccclass
export default class AllianceBossItem extends Item<AllianceBossData> {

    private rest: number;
    private _data: AllianceBossData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Label)
    public phase: cc.Label;

    @property(cc.Label)
    public monster: cc.Label;

    @property(cc.Label)
    public life: cc.Label;

    @property(cc.Sprite)
    public btn_done: cc.Sprite;

    @property(cc.Label)
    public btn: cc.Label;

    getData(): AllianceBossData {
        return this._data;
    }

    show_by_datetime() {
        if (this.rest > 0) {
            this.btn.string = Util.FormatCountDown(this.rest)
            this.rest--
        }
        else {
            this.unscheduleAllCallbacks();
            this.btn.string = this._data.state_cn
        }
    }

    showByData() {
        window.appContext.Pool.setSpriteFrameByUrl(this._data.monster.icon, this.icon);
        this.phase.string = Util.changeToCN(this._data.phase)
        this.monster.string = this._data.monster.name
        let current_life = this._data.state == 0 ? window.appContext.DataContainer.get_AllianceData().alliance.current_life : this._data.monster.life
        this.life.string = current_life + "/" + this._data.monster.life

        this.rest = window.appContext.DataContainer.get_AllianceParamsData().last_boss + window.appContext.ConfigManager.GetBasicValueByType("alliance_boss_colddown") - Math.floor(new Date().getTime() / 1000)
        this.unscheduleAllCallbacks();
        this.schedule(this.show_by_datetime, 1, cc.macro.REPEAT_FOREVER, 0)

        if (this._data.state == 0) {
            this.btn_done.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'))
        }
        else {
            this.btn_done.setMaterial(0, cc.Material.createWithBuiltin(cc.Material.BUILTIN_NAME.GRAY_SPRITE, 0))
        }
        this.btn_done.node.active = this._data.state != 1
    }

    bindData(currentIndex: number, data: AllianceBossData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this._data = data;

        this.showByData()
    }

    public fight_alliance_boss() {
        if (this._data.state == 0) {
            window.appContext.WebApi.fight_alliance_boss(this, function (succData) {
                window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, succData);
                let AlliancePanel: AlliancePanel = window.appContext.UIManager.getCurrentPanel()
                AlliancePanel.refresh(true, true)
            })
        }
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {

        if (!selected) {
            return;
        }
    }

    getClickButton(): cc.Button {
        return;
    }
}
