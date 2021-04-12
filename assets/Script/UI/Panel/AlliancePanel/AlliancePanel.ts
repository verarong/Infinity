import { UIComponent } from "../../Common/UIComponent";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { AllianceList } from "./ItemList/AllianceList";
import { AllianceBossData, AllianceListData, AllianceTechnologyData, DonateData, ExchangeData, MemberData } from "./ItemList/AllianceData";
import { Util } from "../../../Common/Utils/Util";
import { MemberList } from "./ItemList/MemberList";
import { Debug } from "../../../Common/Debug";
import { DonateList } from "./ItemList/DonateList";
import { EquipmentData, ItemData } from "../../../Common/JsonData/JsonData";
import { ExchangeList } from "./ItemList/ExchangeList";
import { TechnologyList } from "./ItemList/TechnologyList";
import AllianceBossList from "./ItemList/AllianceBossList";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AlliancePanel extends UIComponent {

    private selected: string = "alliance_main"
    private current_page: number = 0
    private max_page: number = 0
    private donate_item: number = 0
    private rest: number = 0

    @property(cc.Node)
    public alliance_none: cc.Node;

    @property(cc.Node)
    public alliance_info: cc.Node;

    @property(cc.Node)
    public alliance_main: cc.Node;

    @property(cc.Node)
    public alliance_donate: cc.Node;

    @property(cc.Node)
    public alliance_exchange: cc.Node;

    @property(cc.Node)
    public alliance_technology: cc.Node;

    @property(cc.Node)
    public alliance_battle: cc.Node;

    @property(cc.Node)
    public alliance_main_selected: cc.Node;

    @property(cc.Node)
    public alliance_donate_selected: cc.Node;

    @property(cc.Node)
    public alliance_exchange_selected: cc.Node;

    @property(cc.Node)
    public alliance_technology_selected: cc.Node;

    @property(cc.Node)
    public alliance_battle_selected: cc.Node;

    @property(AllianceList)
    public AllianceList: AllianceList;

    @property(cc.Node)
    public pageUp_btn: cc.Node;

    @property(cc.Node)
    public pageDown_btn: cc.Node;

    @property(cc.EditBox)
    public create_alliance_name: cc.EditBox;

    @property(cc.Label)
    public create_alliance_cost: cc.Label;

    @property(cc.Label)
    public alliance_name: cc.Label;

    @property(cc.Label)
    public alliance_level: cc.Label;

    @property(cc.Label)
    public alliance_fund: cc.Label;

    @property(cc.Label)
    public alliance_threshold: cc.Label;

    @property(cc.Node)
    public upgrade_alliance_btn: cc.Node;

    @property(cc.Node)
    public set_threshold_btn: cc.Node;

    @property(cc.EditBox)
    public set_new_threshold: cc.EditBox;

    @property(cc.Node)
    public apply_captain_btn: cc.Node;

    @property(cc.Node)
    public exit_alliance_btn: cc.Node;

    @property(MemberList)
    public MemberList: MemberList;

    @property(DonateList)
    public DonateList: DonateList;

    @property(cc.Label)
    public donate_money: cc.Label;

    @property(cc.Label)
    public donate_contribution: cc.Label;

    @property(cc.Label)
    public donate_fund: cc.Label;

    @property(cc.Label)
    public donate_jade: cc.Label;

    @property(cc.Label)
    public donate_jade_contribution: cc.Label;

    @property(cc.Label)
    public donate_jade_fund: cc.Label;

    @property(cc.Label)
    public donate_btn: cc.Label;

    @property(ExchangeList)
    public ExchangeList: ExchangeList;

    @property(TechnologyList)
    public TechnologyList: TechnologyList;

    @property(AllianceBossList)
    public AllianceBossList: AllianceBossList;

    private sortByItemId(a: DonateData, b: DonateData) {
        return a.item_id - b.item_id
    }

    private sortByPosition(a: MemberData, b: MemberData) {
        return b.position - a.position
    }

    private sortByState(a: AllianceBossData, b: AllianceBossData) {
        return a.state - b.state
    }

    public showAlliances(offset: number = 0) {
        //    summary = [alliance.sub_summary() for alliance in page.items]
        //{"bool_last_page": page.has_next, "summary": summary}
        let self = this
        this.current_page += offset
        window.appContext.WebApi.search_alliance(this.current_page, this, function (data) {
            self.max_page = data.bool_last_page ? self.current_page : self.max_page
            self.pageUp_btn.active = self.current_page > 0
            self.pageDown_btn.active = self.max_page && self.current_page < self.max_page

            let data_list: Array<AllianceListData> = new Array()
            for (let alliance of data.summary) {
                data_list.push(new AllianceListData(alliance))
            }
            self.AllianceList.ApplyData(data_list)
        })
    }

    public pageUp() {
        this.showAlliances(-1)
    }

    public pageDown() {
        this.showAlliances(1)
    }

    public clickMain() {
        this.clickTab("alliance_main")
    }

    public clickDonate() {
        this.clickTab("alliance_donate")
    }

    public clickExchange() {
        this.clickTab("alliance_exchange")
    }

    public clickTechnology() {
        this.clickTab("alliance_technology")
    }

    public clickBattle() {
        this.clickTab("alliance_battle")
    }

    public clickTab(selected: string) {
        this.selected = selected
        this.showByData()
    }

    public donateSelect(selected_item: DonateData = null) {
        if (!selected_item) {
            this.donate_item = 0
            this.donate_money.string = "0"
            this.donate_contribution.string = "0"
            this.donate_fund.string = "0"
        }
        else {
            this.donate_item = selected_item.item_id
            let base: number = selected_item.phase + selected_item.quality
            this.donate_money.string = (base * window.appContext.ConfigManager.GetBasicValueByType("donate_money_ratio")).toString()
            this.donate_contribution.string = (base * window.appContext.ConfigManager.GetBasicValueByType("donate_contribution_ratio")).toString()
            this.donate_fund.string = (base * window.appContext.ConfigManager.GetBasicValueByType("donate_contribution_ratio")).toString()
        }
    }

    show_by_datetime() {
        if (this.rest > 0) {
            this.donate_btn.string = Util.FormatCountDown(this.rest)
            this.rest--
        }
        else {
            this.unscheduleAllCallbacks();
            this.donate_btn.string = "捐献"
        }
    }

    public showAllianceBase() {
        let alliance = window.appContext.DataContainer.get_AllianceData().alliance
        this.alliance_name.string = alliance.name
        let max = window.appContext.ConfigManager.GetMaxAllianceLevel()
        this.alliance_level.string = alliance.level == max ? alliance.level + "级仙门(已达顶级)" : alliance.level + "级仙门"
        this.alliance_fund.string = "仙门资金 " + alliance.fund + "/" + window.appContext.ConfigManager.GetAllianceByLevel(alliance.level).fund_cost
        this.alliance_threshold.string = "准入战力 " + alliance.join_threshold
        let position = window.appContext.DataContainer.get_AllianceParamsData().position
        this.upgrade_alliance_btn.active = position >= window.appContext.ConfigManager.GetBasicValueByType("min_upgrade_alliance_position") && alliance.level < max
        this.set_threshold_btn.active = position >= window.appContext.ConfigManager.GetBasicValueByType("min_set_join_threshold_position")
        this.apply_captain_btn.active = position >= window.appContext.ConfigManager.GetBasicValueByType("min_apply_for_captain_position") && window.appContext.DataContainer.get_AllianceData().captain_miss
        this.exit_alliance_btn.active = position < window.appContext.ConfigManager.GetMaxPosition()
    }

    public showBySelected(page: string) {
        if (page == "alliance_none") {
            let cost: number = window.appContext.ConfigManager.GetBasicValueByType("create_alliance_jade")
            this.create_alliance_cost.string = cost.toString()
            this.create_alliance_cost.node.color = window.appContext.DataContainer.get_RoleData().jade >= cost ? Util.ButtonColor("common") : Util.ButtonColor("shortage")
            this.showAlliances()
        }
        else if (page == "alliance_main") {
            let members = window.appContext.DataContainer.get_AllianceData().members
            let data_list: Array<MemberData> = new Array()
            for (let member of members) {
                data_list.push(new MemberData(member))
            }
            data_list.sort(this.sortByPosition)
            this.MemberList.ApplyData(data_list)
        }
        else if (page == "alliance_donate") {
            let data_list: Array<DonateData> = new Array();
            let data = window.appContext.DataContainer.get_ItemData()
            for (let i of data.item) {
                data_list.push(new DonateData(i))
            }
            this.DonateList.ApplyData(data_list.sort(this.sortByItemId));

            this.donateSelect()
            let donate_jade: number = window.appContext.ConfigManager.GetBasicValueByType("donate_jade_base")
            this.donate_jade.string = donate_jade.toString()
            this.donate_jade.node.color = window.appContext.DataContainer.get_RoleData().jade >= donate_jade ? Util.ButtonColor("highlight") : Util.ButtonColor("shortage")
            this.donate_jade_contribution.string = (donate_jade * window.appContext.ConfigManager.GetBasicValueByType("donate_jade_contribution_ratio")).toString()
            this.donate_jade_fund.string = (donate_jade * window.appContext.ConfigManager.GetBasicValueByType("donate_jade_contribution_ratio")).toString()

            this.rest = window.appContext.DataContainer.get_AllianceParamsData().last_donate + window.appContext.ConfigManager.GetBasicValueByType("donate_colddown") - Math.floor(new Date().getTime() / 1000)
            this.unscheduleAllCallbacks();
            this.schedule(this.show_by_datetime, 1, cc.macro.REPEAT_FOREVER, 0)
        }
        else if (page == "alliance_exchange") {
            let items = window.appContext.ConfigManager.GetItemsByStorePhase(99)
            for (let i = 1; i < window.appContext.DataContainer.get_RoleData().phase; i++) {
                items = items.concat(window.appContext.ConfigManager.GetItemsByStorePhase(100 + i))
            }
            let data_list: Array<ExchangeData> = new Array()
            for (let item_id of items) {
                data_list.push(new ExchangeData(item_id))
            }
            this.ExchangeList.ApplyData(data_list)
        }
        else if (page == "alliance_technology") {
            let technology = window.appContext.DataContainer.get_AllianceData().alliance.technology
            let data_list: Array<AllianceTechnologyData> = new Array()
            for (const technology_id in technology) {
                data_list.push(new AllianceTechnologyData(technology_id, technology[technology_id]))
            }
            this.TechnologyList.ApplyData(data_list)
        }
        else if (page == "alliance_battle") {
            let current = window.appContext.DataContainer.get_AllianceData().alliance.boss
            let data_list: Array<AllianceBossData> = new Array()
            for (let alliance of window.appContext.ConfigManager.GetAlliances().values()) {
                data_list.push(new AllianceBossData(alliance.boss, alliance.level, current))
            }
            this.AllianceBossList.ApplyData(data_list.sort(this.sortByState))
        }
    }

    public showByData() {
        if (!window.appContext.DataContainer.get_AllianceData()) {
            this.alliance_info.active = false
            this.alliance_none.active = true
            this.showBySelected("alliance_none")
        }
        else {
            this.alliance_info.active = true
            this.alliance_none.active = false
            this.alliance_main.active = this.alliance_main_selected.active = this.selected == "alliance_main"
            this.alliance_donate.active = this.alliance_donate_selected.active = this.selected == "alliance_donate"
            this.alliance_exchange.active = this.alliance_exchange_selected.active = this.selected == "alliance_exchange"
            this.alliance_technology.active = this.alliance_technology_selected.active = this.selected == "alliance_technology"
            this.alliance_battle.active = this.alliance_battle_selected.active = this.selected == "alliance_battle"
            this.showAllianceBase()
            this.showBySelected(this.selected)
        }
    }

    public refresh(refresh: boolean = false, refresh_alliance: boolean = false) {
        let self = this;
        if (refresh && refresh_alliance) {
            window.appContext.WebApi.get_character_info(["alliance", "alliance_params", "main"], this, function (data) {
                window.appContext.DataContainer.set_AllianceData(data.alliance)
                window.appContext.DataContainer.set_AllianceParamsData(data.alliance_params)
                window.appContext.DataContainer.set_RoleData(data.main)
                self.showByData()
            })
        }
        else if (refresh) {
            window.appContext.WebApi.get_character_info(["alliance_params", "daily_task", "main", "item"], this, function (data) {
                window.appContext.DataContainer.set_AllianceParamsData(data.alliance_params)
                window.appContext.DataContainer.set_DailyTaskData(data.daily_task)
                window.appContext.DataContainer.set_RoleData(data.main)
                window.appContext.DataContainer.set_ItemData(data.item)
                self.showByData()
            })
        }
        else {
            this.showByData()
        }
    }

    onEnable() {
        window.appContext.SoundManager.playerBgm2()
        this.refresh()
    }

    public BackBtnClick() {
        window.appContext.UIManager.ShowPanel(PrefabUrl.DomainPanel);
    }

    public onCreateAlliance() {
        if (this.create_alliance_name.string.length < 1 || this.create_alliance_name.string.length > 8) {
            Util.ToastByCode(202, true)
        }
        else {
            let self = this
            window.appContext.WebApi.create_alliance(this.create_alliance_name.string, this, function (data) {
                self.refresh(true, true)
            })
        }
    }

    public onUpgradeAlliance() {
        let self = this
        window.appContext.WebApi.upgrade_alliance(this, function (data) {
            self.refresh(true, true)
        })
    }

    public onSetThreshold() {
        try {
            parseInt(this.set_new_threshold.string)
        }
        catch (error) {
            Debug.log(error);
            Util.ToastByCode(245, true)
        }

        let self = this
        window.appContext.WebApi.set_join_threshold(parseInt(this.set_new_threshold.string), this, function (data) {
            self.refresh(true, true)
        })
    }

    public onApplyCaptain() {
        let self = this
        window.appContext.WebApi.apply_for_captain(this, function (data) {
            self.refresh(true, true)
        })
    }

    public onExitAlliance() {
        let self = this
        window.appContext.WebApi.exit_alliance(this, function (data) {
            self.refresh(true, true)
        })
    }

    public onDonate() {
        let self = this
        window.appContext.WebApi.donate_resource(this.donate_item, 1, this, function (data) {
            self.refresh(true, true)
        })
    }

    public onDonateJade() {
        let self = this
        window.appContext.WebApi.donate_jade(this, function (data) {
            self.refresh(true, true)
        })
    }
}
