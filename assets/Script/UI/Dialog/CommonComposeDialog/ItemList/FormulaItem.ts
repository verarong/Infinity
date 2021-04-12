// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import CommonComposeDialog from "../CommonComposeDialog";
import { FormulaItemData } from "./FormulaItemData";
import { FormulaData } from "../../../../Common/JsonData/JsonData";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FormulaItem extends Item<FormulaItemData> {

    private index: number;
    private bool_selected: boolean;
    private formula_name: string;
    private _data: FormulaItemData;

    @property(cc.Label)
    public phase_name: cc.Label;

    @property(cc.Sprite)
    public bg: cc.Sprite;

    @property(cc.Sprite)
    public bg_selected: cc.Sprite;

    @property(cc.Node)
    public can_compose: cc.Node;

    getData(): FormulaItemData {
        return this._data;
    }

    showByData(start = "X", split = "·") {
        this.phase_name.string = Util.getRankById(this._data.phase) + split + this.formula_name
        this.can_compose.active = this._data.check_item && this._data.Bool_activate
        window.appContext.Pool.setSpriteFrameByUrl("icon_bg_" + this._data.formula.product_quality, this.bg)
        this.bg_selected.enabled = this.bool_selected
    }

    bindData(currentIndex: number, data: FormulaItemData) {
        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.index = currentIndex
        this.formula_name = data.formula.name
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
            let compose: CommonComposeDialog = window.appContext.UIManager.getDialog(PrefabUrl.CommonComposeDialog)
            if (compose) {
                compose.refresh(false, this.index, false)
            }
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
