// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { RankEquipmentData, UserRankData } from "./UserRankData";
import RankEquipmentList from "./RankEquipmentList";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UserRankItem extends Item<UserRankData> {

    private _data: UserRankData;

    @property(cc.Sprite)
    public head: cc.Sprite;

    @property(cc.Sprite)
    public frame: cc.Sprite;

    @property(cc.Label)
    public user_name: cc.Label;

    @property(cc.Label)
    public level: cc.Label;

    @property(cc.Label)
    public grade: cc.Label;

    @property(RankEquipmentList)
    public RankEquipmentList: RankEquipmentList;

    getData(): UserRankData {
        return this._data;
    }

    showByData() {
        window.appContext.Pool.setSpriteFrameByUrl("head_" + this._data.user_data.head, this.head);
        window.appContext.Pool.setSpriteFrameByUrl("head_frame_" + this._data.user_data.head_frame, this.frame);
        this.user_name.string = this._data.user_data.name
        this.level.string = window.appContext.ConfigManager.GetlevelById(this._data.user_data.level).name
        this.grade.string = this._data.user_data.grade.toString()

        let data_list: Array<RankEquipmentData> = new Array()
        for (let x of this._data.user_data.equipment) {
            data_list.push(new RankEquipmentData(x))
        }
        this.RankEquipmentList.ApplyData(data_list)
    }

    bindData(currentIndex: number, data: UserRankData) {

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
