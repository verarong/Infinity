// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import SecretData from "./SecretData";
import { Util } from "../../../../Common/Utils/Util";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import BattlePanel from "../BattlePanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SecretItem extends Item<SecretData> {

    private index: number;
    private rest: number;
    private _data: SecretData;

    @property(cc.Label)
    public Name: cc.Label;

    @property(cc.Sprite)
    public Icon: cc.Sprite;

    @property(cc.Sprite)
    public icon_phase: cc.Sprite;

    @property(cc.Node)
    public can_probe: cc.Node;

    show_by_datetime() {
        if (this._data.state == 1) {
            if (this.rest > 0) {
                this.Name.string = Util.FormatCountDown(this.rest)
                this.rest--
            }
            else {
                this.unscheduleAllCallbacks();
                this.scheduleOnce(function () {
                    let BattlePanle: BattlePanel = window.appContext.UIManager.getCurrentPanel()
                    BattlePanle.refresh(false, false, true)
                }, 15);
            }
        }
    }

    getData(): SecretData {
        return this._data;
    }

    public showByData() {
        this.can_probe.active = ((window.appContext.DataContainer.tips.get("secret") && this._data.state == 0) || this._data.state == 2) && this._data.bool_free != 1
        if (this._data.bool_free == 1) {
            this.Name.enabled = false
            this.icon_phase.enabled = false
            this.Icon.enabled = false
        }
        else {
            this.Name.enabled = true
            this.icon_phase.enabled = true
            this.Icon.enabled = true
            window.appContext.Pool.setSpriteFrameByUrl("secret_" + this._data.quality, this.Icon);
            window.appContext.Pool.setSpriteFrameByUrl("icon_phase_" + this._data.phase, this.icon_phase);
            if (this._data.state == 2) {
                this.Name.string = "探索完成"
            }
            else if (this._data.state == 0) {
                this.Name.string = this._data.name
            }
            else if (this._data.state == 1) {
                let secret = window.appContext.ConfigManager.GetsecretByPhaseAndQuality(this._data.phase, this._data.quality)
                this.rest = this._data.start + secret.probe_hours * 3600 - Math.floor(new Date().getTime() / 1000)
                this.Name.string = Util.FormatCountDown(this.rest)
                this.schedule(this.show_by_datetime, 1, cc.macro.REPEAT_FOREVER, 0)
            }
        }
    }

    bindData(currentIndex: number, data: SecretData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }

        this.index = currentIndex
        this._data = data;

        this.unscheduleAllCallbacks();
        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {
        if (!selected) {
            return;
        }
        else if (this._data.bool_free != 1) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.CommonSecretDialog, this._data.secret_id);
        }
    }

    getClickButton(): cc.Button {
        return this.node.getComponent(cc.Button);
    }
}
