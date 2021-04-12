import { Debug } from "../../../../Common/Debug";
import { EquipmentData, ItemData } from "../../../../Common/JsonData/JsonData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import MailDialog from "../MailDialog";
import { MailData } from "./MailData";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html




const { ccclass, property } = cc._decorator;

@ccclass
export class Mail extends Item<MailData> {

    private index: number;
    private bool_selected = false
    private _data: MailData;

    @property(cc.Sprite)
    public bg: cc.Sprite;

    @property(cc.Sprite)
    public bg_selected: cc.Sprite;

    getData(): MailData {
        return this._data;
    }

    showByData() {
        this.bg.enabled = !this.bool_selected
        this.bg_selected.enabled = this.bool_selected
    }

    bindData(currentIndex: number, data: MailData) {
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
            let Mail: MailDialog = window.appContext.UIManager.getDialog(PrefabUrl.MailDialog)
            if (Mail) {
                Mail.showBySelected(this.index)
            }
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
