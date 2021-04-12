// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { ChallengeItemData } from "./ChallengeItemData";
import CommonChallengeDialog from "../ChallengeDialog";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChallengeItem extends Item<ChallengeItemData> {

    private index: number;
    private bool_selected = false
    private _data: ChallengeItemData;

    @property(cc.Label)
    public phase: cc.Label;

    @property(cc.Sprite)
    public bg: cc.Sprite;

    @property(cc.Sprite)
    public bg_selected: cc.Sprite;

    @property(cc.Node)
    public fighting: cc.Node;

    getData(): ChallengeItemData {
        return this._data;
    }

    showByData() {
        this.phase.string = this._data.challenge.name;
        this.fighting.active = !this._data.free
        if (this.bool_selected) {
            this.bg.enabled = false
            this.bg_selected.enabled = true
        }
        else {
            this.bg.enabled = true
            this.bg_selected.enabled = false
        }
    }

    bindData(currentIndex: number, data: ChallengeItemData) {
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
            this.bool_selected = false
            this.showByData()
            return;
        }
        else {
            this.bool_selected = true
            this.showByData()
            let Challenge: CommonChallengeDialog = window.appContext.UIManager.getDialog(PrefabUrl.ChallengeDialog)
            if (Challenge) {
                Challenge.showBySelected(this.index)
            }
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
