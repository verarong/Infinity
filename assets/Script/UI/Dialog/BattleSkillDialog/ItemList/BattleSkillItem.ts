// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { BattleSkillItemData } from "./BattleSkills";
import BattleSkillDialog from "../BattleSkillDialog";
import { Debug } from "../../../../Common/Debug";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BattleSkillItem extends Item<BattleSkillItemData> {

    private index: number;
    private _data: BattleSkillItemData;

    @property(cc.Label)
    public level: cc.Label;

    @property(cc.Label)
    public name_: cc.Label;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    getData(): BattleSkillItemData {
        return this._data;
    }

    showByData(start = "talent_") {
        window.appContext.Pool.setSpriteFrameByUrl(start + this._data.talent_id.toString(), this.icon);
        this.name_.string = this._data.name
        this.level.string = this._data.level.toString()
    }

    bindData(currentIndex: number, data: BattleSkillItemData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.index = currentIndex
        this._data = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {

        Debug.log("select:" + selected);
        if (!selected) {
            return;
        }
        else {
            let BattleSkillDialog: BattleSkillDialog = window.appContext.UIManager.getDialog(PrefabUrl.BattleSkillDialog)
            BattleSkillDialog.set(this._data.talent_id)
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
