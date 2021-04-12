// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import FortifiedData from "./FortifiedData";
import { Util } from "../../../../Common/Utils/Util";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { ThreadData } from "../../../../Common/JsonData/JsonData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FortifiedItem extends Item<FortifiedData> {

    private _data: FortifiedData;

    @property(cc.Sprite)
    public bg: cc.Sprite;

    @property(cc.Label)
    public Name: cc.Label;

    @property(cc.Sprite)
    public Icon: cc.Sprite;

    @property(cc.Label)
    public thread: cc.Label;

    @property(cc.Node)
    public challenging: cc.Node;

    @property(cc.Node)
    public arrow: cc.Node;

    getData(): FortifiedData {
        return this._data;
    }

    public showByData() {
        this.challenging.active = this._data.challenging
        this.Icon.node.active = !this._data.challenging
        this.Name.string = Util.getRankById(this._data.phase) + "·" + this._data.name;
        this.node.position = this._data.pos;
        window.appContext.Pool.setSpriteFrameByUrl("Fortified_" + this._data.difficulty, this.Icon);

        let bool_arrow: boolean = false
        let guide = window.appContext.DataContainer.get_GuideData()
        let achievement_data = window.appContext.ConfigManager.GetAchievement(guide.achievement)
        if (achievement_data && achievement_data.class == "statement" && guide.achievement_done == 0 && achievement_data.phase == this._data.phase && achievement_data.level == this._data.difficulty) {
            bool_arrow = true
        }
        else if (achievement_data && (achievement_data.class != "statement" || guide.achievement_done != 0) && this._data.thread && window.appContext.DataContainer.get_GuideData().guide >= 16) {
            bool_arrow = true
        }

        if (this._data.thread && window.appContext.DataContainer.get_GuideData().guide >= 16) {
            this.bg.node.height = 110
            this.thread.node.active = true
            let thread: ThreadData = window.appContext.ConfigManager.GetthreadById(this._data.thread)
            this.thread.string = "？" + thread.name
        }
        else {
            this.bg.node.height = 85
            this.thread.node.active = false
        }

        if (bool_arrow) {
            this.arrow.active = true
            this.arrow.runAction(Util.getBlink());
        }
        else {
            this.arrow.active = false
        }
    }

    bindData(currentIndex: number, data: FortifiedData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this._data = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
        this.Name.string = "";
        this.Icon.spriteFrame = null;
    }

    select(selected: boolean): void {
        if (!selected) {
            return;
        }

        window.appContext.UIManager.ShowDialog(PrefabUrl.EnterFortifiedDialog, this._data);
    }

    getClickButton(): cc.Button {
        return this.node.getComponent(cc.Button);
    }
}
