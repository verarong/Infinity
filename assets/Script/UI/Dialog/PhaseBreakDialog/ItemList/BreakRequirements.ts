import { Util } from "../../../../Common/Utils/Util";
import { Item } from "../../../../ItemList/Item";
import { BreakRequirementsData } from "./PhaseBreakData";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html




const { ccclass, property } = cc._decorator;

@ccclass
export class BreakRequirements extends Item<BreakRequirementsData> {

    private _data: BreakRequirementsData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Label)
    public amount: cc.Label;

    getData(): BreakRequirementsData {
        return this._data;
    }

    showByData() {
        window.appContext.Pool.setSpriteFrameByUrl(this._data.requirement, this.icon);
        if (this._data.requirement == "exp") {
            this.amount.string = " *" + this._data.amount
        }
        else if (this._data.requirement == "consciousness") {
            this.amount.string = window.appContext.ConfigManager.GetconsciousnessById(this._data.amount).name
        }
        else if (this._data.requirement == "physique") {
            this.amount.string = window.appContext.ConfigManager.GetphysiqueById(this._data.amount).name
        }

        this.amount.node.color = this._data.check_requirement ? Util.ButtonColor("common") : Util.ButtonColor("shortage")
    }

    bindData(currentIndex: number, data: BreakRequirementsData) {
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
