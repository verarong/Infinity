// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Debug } from "../../../../Common/Debug";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import BattleSkillDialog from "../BattleSkillDialog";


const { ccclass, property } = cc._decorator;

@ccclass
export default class WarItem extends Item<number> {

    private index: number;
    private talent_id: number;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    getData(): number {
        return this.talent_id;
    }

    showByData(start = "talent_") {
        window.appContext.Pool.setSpriteFrameByUrl(start + this.talent_id.toString(), this.icon);
    }

    bindData(currentIndex: number, data: number) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.index = currentIndex
        this.talent_id = data;

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
            BattleSkillDialog.remove(this.talent_id)
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
