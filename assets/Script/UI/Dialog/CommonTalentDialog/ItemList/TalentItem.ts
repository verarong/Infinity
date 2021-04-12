// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { TalentItemData } from "./TalentItemData";
import CommonTalentDialog from "../CommonTalentDialog";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TalentItem extends Item<TalentItemData> {

    private index: number;
    private bool_selected = false
    private _data: TalentItemData;

    @property(cc.Label)
    public level: cc.Label;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public bg: cc.Sprite;

    @property(cc.Sprite)
    public bg_selected: cc.Sprite;

    getData(): TalentItemData {
        return this._data;
    }

    showByData(start = "talent_") {
        window.appContext.Pool.setSpriteFrameByUrl(start + this._data.talent_id.toString(), this.icon);
        if (this.bool_selected) {
            this.bg.enabled = false
            this.bg_selected.enabled = true
        }
        else {
            this.bg.enabled = true
            this.bg_selected.enabled = false
        }
    }

    bindData(currentIndex: number, data: TalentItemData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.index = currentIndex
        if (data.level == 0) {
            this.level.enabled = false
        }
        else {
            this.level.enabled = true
            this.level.string = data.level.toString()
        }
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
            let Talent: CommonTalentDialog = window.appContext.UIManager.getDialog(PrefabUrl.CommonTalentDialog)
            if (Talent) {
                Talent.showBySelected(this.index)
            }
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
