
import { BuildingList } from "./Building/BuildingList";
import { UIComponent } from "../../Common/UIComponent";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { BuildingData } from "./Building/BuildingPanelData";
import RoleData from "../../../Data/RoleData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BuildingPanel extends UIComponent {

    private resource_amount: Array<number>;

    @property(BuildingList)
    public BuildingList: BuildingList;

    @property(cc.Label)
    public dragon_amount: cc.Label;

    @property(cc.Label)
    public tiger_amount: cc.Label;

    @property(cc.Label)
    public phoenix_amount: cc.Label;

    @property(cc.Label)
    public tortoise_amount: cc.Label;

    public BackBtnClick() {
        window.appContext.UIManager.ShowPanel(PrefabUrl.DomainPanel);
    }

    private sortById(a: any, b: any) {
        return a.building_id - b.building_id
    }

    public ShowByRoleData() {
        let data: RoleData = window.appContext.DataContainer.get_RoleData()
        this.resource_amount = [data.exp, data.soul, data.chaos, data.gas]

        this.dragon_amount.string = data.dragon_badge.toString()
        this.tiger_amount.string = data.tiger_badge.toString()
        this.phoenix_amount.string = data.phoenix_badge.toString()
        this.tortoise_amount.string = data.tortoise_badge.toString()
    }

    public ShowByBuildingData() {
        let data: any = window.appContext.DataContainer.get_DomainData()
        let data_list: Array<BuildingData> = new Array();
        let domain = data.domain.sort(this.sortById)
        for (let i = 0; i < domain.length; i++) {
            data_list.push(new BuildingData(domain[i], this.resource_amount[i]))
        }
        this.BuildingList.ApplyData(data_list);
    }

    public refresh(refresh: boolean = false) {
        let self = this
        if (refresh || window.appContext.DataContainer.get_RoleData() == undefined || window.appContext.DataContainer.get_DomainData() == undefined) {
            window.appContext.WebApi.get_character_info(["main", "domain"], this, function (data) {
                window.appContext.DataContainer.set_RoleData(data.main)
                window.appContext.DataContainer.set_DomainData(data.domain)
                self.ShowByRoleData()
                self.ShowByBuildingData()
            });
        }
        else {
            this.ShowByRoleData()
            this.ShowByBuildingData()
        }
    }

    onEnable() {
        this.refresh()
    }
}
