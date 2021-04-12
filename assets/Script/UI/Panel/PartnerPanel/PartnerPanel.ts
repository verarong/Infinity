
import { PartnerList } from "./Partner/PartnerList";
import { UIComponent } from "../../Common/UIComponent";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { PartnerPanelData } from "./Partner/PartnerPanelData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class PartnerPanel extends UIComponent {

    @property(PartnerList)
    public PartnerList: PartnerList;

    public BackBtnClick() {
        window.appContext.UIManager.ShowPanel(PrefabUrl.DomainPanel);
    }

    public ShowByData() {
        let data_list: Array<PartnerPanelData> = new Array();
        let data = window.appContext.DataContainer.get_PartnerData()
        for (let partner of data.partner) {
            data_list.push(new PartnerPanelData(partner))
        };
        this.PartnerList.ApplyData(data_list);
    }

    public refresh(refresh: boolean = false) {
        if (refresh) {
            window.appContext.WebApi.get_character_info(["partner", "item"], this, function (data) {
                window.appContext.DataContainer.set_PartnerData(data.partner)
                window.appContext.DataContainer.set_ItemData(data.item)
                this.ShowByData()
            });
        }
        else {
            this.ShowByData()
        }
    }

    onEnable() {
        this.refresh()
    }
}
