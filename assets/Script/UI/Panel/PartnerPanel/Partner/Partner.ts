// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { PartnerPanelData } from "./PartnerPanelData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { PartnerData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";
import PartnerPanel from "../PartnerPanel";
import { PartnerMemoryList } from "./PartnerMemoryList";

const { ccclass, property } = cc._decorator;

@ccclass
export class Partner extends Item<PartnerPanelData> {

    private index: number;
    private can_give: boolean;
    private rest: number;
    private partner: PartnerData;
    private _data: PartnerPanelData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Label)
    public name_: cc.Label;

    @property(cc.Label)
    public phase: cc.Label;

    @property(cc.Label)
    public describe: cc.Label;

    @property(cc.Label)
    public give: cc.Label;

    @property(cc.Label)
    public attribute: cc.Label;

    @property(cc.Node)
    public award: cc.Node;

    @property(cc.Node)
    public cold_down: cc.Node;

    @property(PartnerMemoryList)
    public PartnerMemoryList: PartnerMemoryList;

    getData(): PartnerPanelData {
        return this._data;
    }

    show_by_datetime() {
        if (this.rest > 0) {
            this.give.string = Util.FormatCountDown(this.rest)
            this.cold_down.active = false
            this.can_give = false
            this.rest--
        }
        else {
            this.give.string = "赠礼"
            this.cold_down.active = true
            this.can_give = true
        }
    }

    showByData() {
        window.appContext.Pool.setSpriteFrameByUrl(this.partner.icon, this.icon);
        this.name_.string = this.partner.name
        this.phase.string = this.partner['phase_name' + (this._data.phase + 1)] + "(" + this._data.intimacy + "/" + window.appContext.ConfigManager.GetpartnerIntimacyByPhase(this._data.phase) + ")"
        this.describe.string = this.partner.describe
        let attribute_expand: any = {}
        let k = this._data.partner["phase_attribute" + (this._data.phase + 1)]
        let v = this._data.partner["phase_amount" + (this._data.phase + 1)]
        attribute_expand[k] = v
        this.attribute.string = Util.ParseParams([attribute_expand])

        //this.award.active = this._data.phase > this._data.phase_award
        this.award.active = false

        this.PartnerMemoryList.ApplyData(this._data.memories)

        this.rest = this._data.last_give_gift + 4 * 3600 - Math.floor(new Date().getTime() / 1000)
        this.unscheduleAllCallbacks();
        this.schedule(this.show_by_datetime, 1, cc.macro.REPEAT_FOREVER, 0)
    }

    bindData(currentIndex: number, data: PartnerPanelData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.index = currentIndex
        this._data = data;
        this.partner = data.partner

        this.unscheduleAllCallbacks();
        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {
        return;
    }

    public give_gift() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.GiveGiftDialog, this.partner)
    }

    getClickButton(): cc.Button {
        return null;
    }
}