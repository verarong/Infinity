import { BaseDialog } from "../../Common/BaseDialog";
import { DailyTaskData } from "./ItemList/DailyTaskData";
import DailyTaskList from "./ItemList/DailyTaskList";



const { ccclass, property } = cc._decorator;

@ccclass
export default class DailyTaskDialog extends BaseDialog {

    @property(DailyTaskList)
    public DailyTaskList: DailyTaskList;

    start() {
        this.fastShowAnim();
    }

    getData(): any {
    }

    closeDialog(): any {
        this.hide();
    }

    private sortByState(a: DailyTaskData, b: DailyTaskData) {
        return a.state - b.state
    }

    public ShowByData() {
        let data_list: Array<DailyTaskData> = new Array()
        for (let daily_task of window.appContext.ConfigManager.GetDailyTasks().values()) {
            data_list.push(new DailyTaskData(daily_task))
        }

        this.DailyTaskList.ApplyData(data_list.sort(this.sortByState))
    }

    public refresh(refresh: boolean = false) {
        let self = this
        if (refresh) {
            window.appContext.WebApi.get_character_info(["main", "daily_task", "item"], this, function (data) {
                window.appContext.DataContainer.set_RoleData(data.main)
                window.appContext.DataContainer.set_ItemData(data.item)
                window.appContext.DataContainer.set_DailyTaskData(data.daily_task)
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
