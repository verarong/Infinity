import { Util } from "../../../../Common/Utils/Util";
import { Item } from "../../../../ItemList/Item";
import { BreakSkillsData } from "./PhaseBreakData";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html




const { ccclass, property } = cc._decorator;

@ccclass
export class BreakSkills extends Item<BreakSkillsData> {

    private _data: BreakSkillsData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public icon_bg: cc.Sprite;

    @property(cc.Sprite)
    public icon_phase: cc.Sprite;

    @property(cc.Label)
    public level: cc.Label;

    getData(): BreakSkillsData {
        return this._data;
    }

    showByData() {
        window.appContext.Pool.setSpriteFrameByUrl(this._data.skill.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.skill.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.skill.icon_phase, this.icon_phase);
        this.level.string = "LV" + this._data.level
        this.level.node.color = this._data.check_skill ? Util.ButtonColor("common") : Util.ButtonColor("shortage")
    }

    bindData(currentIndex: number, data: BreakSkillsData) {
        this._data = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
