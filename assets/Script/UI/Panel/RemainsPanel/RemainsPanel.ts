import { UIComponent } from "../../Common/UIComponent";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { Debug } from "../../../Common/Debug";
import { Util } from "../../../Common/Utils/Util";
import RemainsList from "./Remains/RemainsList";
import RemainsOwnList from "./Remains/RemainsOwnList";
import { RemainsPaginateData } from "../../Dialog/RemainsPaginateDialog/ItemList/RemainsPaginateData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RemainsPanel extends UIComponent {

    @property(cc.Label)
    public remains_capture_limit: cc.Label;

    @property(cc.Label)
    public remains_conquer_limit: cc.Label;

    @property(cc.Label)
    public remains_emancipate_limit: cc.Label;

    @property(RemainsList)
    public RemainsList: RemainsList;

    @property(RemainsOwnList)
    public CaptureRemains: RemainsOwnList;

    @property(RemainsOwnList)
    public ConquerRemains: RemainsOwnList;

    public show_times_limit() {
        this.remains_capture_limit.string = window.appContext.DataContainer.DailyParamsData.remains_capture + "/" + window.appContext.ConfigManager.GetBasicValueByType("remains_capture_limit")
        this.remains_conquer_limit.string = window.appContext.DataContainer.DailyParamsData.remains_conquer + "/" + window.appContext.ConfigManager.GetBasicValueByType("remains_conquer_limit")
        this.remains_emancipate_limit.string = window.appContext.DataContainer.DailyParamsData.remains_emancipate + "/" + window.appContext.ConfigManager.GetBasicValueByType("remains_emancipate_limit")
    }

    public showByData() {
        this.RemainsList.ApplyData(window.appContext.ConfigManager.GetRemains())

        //{"remains_capture": remains_capture_summary, "remains_conquer": remains_conquer_summary}
        //
        //[{"id": self.id, "user_id": self.user_id, "user_name": self.user_name,
        //"conquer_user_id": self.conquer_user_id, "conquer_user_name": self.conquer_user_name
        //, "quality": self.quality, "capture_timestamp": self.capture_timestamp}...]
        let data = window.appContext.DataContainer.get_RemainsData()
        let captures: Array<RemainsPaginateData> = new Array()
        for (let i = 0; i < window.appContext.ConfigManager.GetBasicValueByType("remains_capture_max"); i++) {
            captures.push(new RemainsPaginateData(data.remains_capture[i]))
        }
        this.CaptureRemains.ApplyData(captures)

        let conquers: Array<RemainsPaginateData> = new Array()
        for (let i = 0; i < window.appContext.ConfigManager.GetBasicValueByType("remains_conquer_max"); i++) {
            conquers.push(new RemainsPaginateData(data.remains_conquer[i], null, "征"))
        }
        this.ConquerRemains.ApplyData(conquers)
    }

    public refresh(refresh: boolean = false) {
        let self = this;
        if (refresh || window.appContext.DataContainer.get_RemainsData() == undefined) {
            window.appContext.WebApi.get_character_info(["remains", "mail", "daily_params", "daily_task"], this, function (data) {
                window.appContext.DataContainer.set_RemainsData(data.remains)
                window.appContext.DataContainer.set_MailData(data.mail)
                window.appContext.DataContainer.set_DailyParamsData(data.daily_params)
                window.appContext.DataContainer.set_DailyTaskData(data.daily_task)
                self.showByData()
                self.show_times_limit()
            })
        }
        else {
            this.showByData()
            this.show_times_limit()
        }
    }

    onEnable() {
        window.appContext.SoundManager.playerBgm2()
        this.refresh()
    }

    onDisable() {
        window.appContext.SoundManager.playerBgm1()
    }

    public BackBtnClick() {
        window.appContext.UIManager.ShowPanel(PrefabUrl.DomainPanel);
    }
}
