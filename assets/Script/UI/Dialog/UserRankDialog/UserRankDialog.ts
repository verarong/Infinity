import { Debug } from "../../../Common/Debug";
import { MonsterData } from "../../../Common/JsonData/JsonData";
import { Util } from "../../../Common/Utils/Util";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { BaseDialog } from "../../Common/BaseDialog";
import { UserRankData } from "./ItemList/UserRankData";
import UserRankList from "./ItemList/UserRankList";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UserRankDialog extends BaseDialog {

    public data: any

    @property(UserRankList)
    public UserRankList: UserRankList;

    start() {
        this.fastShowAnim();
    }

    getData(): any {
    }

    closeDialog(): any {
        this.hide();
    }

    public ShowByData() {
        let data_list: Array<UserRankData> = new Array()
        for (let i = 0; i < this.data.length; i++) {
            data_list.push(new UserRankData(i, this.data[i]))
        }
        this.UserRankList.ApplyData(data_list)
    }

    public refresh(refresh: boolean = true) {
        let self = this
        if (refresh) {
            window.appContext.WebApi.get_users_rank(this, function (data) {
                self.data = data
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
