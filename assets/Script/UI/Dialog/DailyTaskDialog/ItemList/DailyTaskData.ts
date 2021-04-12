import { DailyData } from "../../../../Common/JsonData/JsonData";

export class DailyTaskData {
    public daily: DailyData;
    // 0:"done",1:"progress",2:"awarded"
    public state: number;
    public state_cn: string;

    constructor(data: DailyData) {
        this.daily = data
        let daily_task = window.appContext.DataContainer.get_DailyTaskData()
        if (daily_task) {
            if (daily_task.task[data.task_type]["done"]) {
                this.state = 2
                this.state_cn = "已领取"
            }
            else if (daily_task.task[data.task_type]["times"] == data.requirement) {
                this.state = 0
                this.state_cn = "已完成"
            }
            else {
                this.state = 1
                this.state_cn = "未完成"
            }
        }
        else {
            this.state = 1
            this.state_cn = "未完成"
        }
    }
}