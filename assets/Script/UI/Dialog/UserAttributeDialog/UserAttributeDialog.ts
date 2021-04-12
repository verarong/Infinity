import { Debug } from "../../../Common/Debug";
import { MonsterData } from "../../../Common/JsonData/JsonData";
import { Util } from "../../../Common/Utils/Util";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { BaseDialog } from "../../Common/BaseDialog";
import { UserAttributeData } from "./ItemList/UserAttributeData";
import UserAttributeList from "./ItemList/UserAttributeList";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UserAttributeDialog extends BaseDialog {

    @property(cc.Label)
    public grade: cc.Label;

    @property(UserAttributeList)
    public UserAttributeList: UserAttributeList;

    start() {
        this.fastShowAnim();
    }

    getData(): any {
    }

    closeDialog(): any {
        this.hide();
    }

    public ShowByData() {
        let data = window.appContext.DataContainer.get_UserAttributeData()

        let legal = ["attack", "defence", "life", "speed", "hit", "dodge", "crit", "gold_attack",
            "wood_attack", "water_attack", "fire_attack", "soil_attack", "gold_resistance",
            "wood_resistance", "water_resistance", "fire_resistance", "soil_resistance",
            "all_resistance", "ignore_defence", "ignore_resistance"]
        let data_list: Array<UserAttributeData> = new Array()
        let sum_: number = 0
        for (let key of legal) {
            let value = Object.prototype.hasOwnProperty.call(data.attribute, key) ? data.attribute[key] : 0
            data_list.push(new UserAttributeData(key, value))
            sum_ += value
        }

        this.grade.string = "战力 " + data.grade
        this.UserAttributeList.ApplyData(data_list)
    }

    public refresh(refresh: boolean = false) {
        let self = this
        if (refresh || window.appContext.DataContainer.get_UserAttributeData() == undefined) {
            window.appContext.WebApi.get_character_info("attribute", this, function (data) {
                window.appContext.DataContainer.set_UserAttributeData(data)
                self.ShowByData()
            })
        }
        else {
            this.ShowByData()
        }
    }

    public show() {
        this.refresh()
    }
}
