// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { WorldBossData } from "./WorldBossData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class WorldBossItem extends Item<WorldBossData> {

    private _data: WorldBossData;

    @property(cc.Label)
    public rank: cc.Label;

    @property(cc.Label)
    public user_name: cc.Label;

    @property(cc.Label)
    public damage: cc.Label;

    @property(cc.Node)
    public self: cc.Node;

    getData(): WorldBossData {
        return this._data;
    }

    showByData() {
        this.rank.string = this._data.rank == 0 ? "无" : this._data.rank.toString()
        this.user_name.string = this._data.name
        this.damage.string = this._data.damage == 0 ? "" : this._data.damage.toString()
        this.self.active = this._data.bool_self
    }

    bindData(currentIndex: number, data: WorldBossData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this._data = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {

        if (!selected) {
            return;
        }
    }

    getClickButton(): cc.Button {
        return this.getComponent(cc.Button);
    }
}
