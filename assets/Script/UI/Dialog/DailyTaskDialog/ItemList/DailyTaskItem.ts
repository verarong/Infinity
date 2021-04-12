// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { Item } from "../../../../ItemList/Item";
import { Util } from "../../../../Common/Utils/Util";
import { DailyTaskData } from "./DailyTaskData";
import DailyTaskDialog from "../DailyTaskDialog";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class DailyTaskItem extends Item<DailyTaskData> {

    private _data: DailyTaskData;

    @property(cc.Label)
    public describe: cc.Label;

    @property(cc.Label)
    public amount: cc.Label;

    @property(cc.Sprite)
    public btn_done: cc.Sprite;

    @property(cc.Label)
    public btn: cc.Label;

    getData(): DailyTaskData {
        return this._data;
    }

    showByData() {
        this.describe.string = this._data.daily.describe
        this.btn.string = this._data.state_cn
        if (this._data.state == 0) {
            this.btn_done.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'))
        }
        else {
            this.btn_done.setMaterial(0, cc.Material.createWithBuiltin(cc.Material.BUILTIN_NAME.GRAY_SPRITE, 0))
        }

        let daily_task = window.appContext.DataContainer.get_DailyTaskData()
        let times = daily_task ? daily_task.task[this._data.daily.task_type]["times"] : 0
        this.amount.string = times + "/" + this._data.daily.requirement
    }

    bindData(currentIndex: number, data: DailyTaskData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this._data = data;

        this.showByData()
    }

    public task_done() {
        if (this._data.state == 0) {
            window.appContext.WebApi.daily_task_done(this._data.daily.task_type, this, function (data) {
                window.appContext.UIManager.ShowDialog(PrefabUrl.TaskAwardDialog, data)
                let DailyTaskDialog: DailyTaskDialog = window.appContext.UIManager.getDialog(PrefabUrl.DailyTaskDialog)
                DailyTaskDialog.refresh(true)
            })
        }
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
