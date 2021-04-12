
import SkillList from "./Skills/SkillList";
import { SkillPanelData } from "./Skills/SkillPanelData";
import { UIComponent } from "../../Common/UIComponent";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { Util } from "../../../Common/Utils/Util";
import RoleData from "../../../Data/RoleData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SkillPanel extends UIComponent {

    @property(cc.Node)
    public btn: cc.Node;

    @property(SkillList)
    public SkillList: SkillList;

    @property(cc.Node)
    public can_upgrade_0: cc.Node;

    @property(cc.Node)
    public can_upgrade_1: cc.Node;

    @property(cc.Node)
    public can_upgrade_2: cc.Node;

    @property(cc.Node)
    public can_upgrade_3: cc.Node;

    public BackBtnClick() {
        window.appContext.UIManager.ShowPanel(PrefabUrl.DomainPanel);
    }

    public ClickTalent1() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.CommonTalentDialog, 1)
    }

    public ClickTalent2() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.CommonTalentDialog, 2)
    }

    public ClickTalent3() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.CommonTalentDialog, 3)
    }

    public ClickTalent4() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.CommonTalentDialog, 4)
    }

    public SetBattleSkill() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.BattleSkillDialog)
    }

    public ShowByData(terminal = "阶功法") {
        this.can_upgrade_0.active = window.appContext.DataContainer.RoleData.talent_point > 0
        this.can_upgrade_1.active = window.appContext.DataContainer.RoleData.talent_point > 0
        this.can_upgrade_2.active = window.appContext.DataContainer.RoleData.talent_point > 0
        this.can_upgrade_3.active = window.appContext.DataContainer.RoleData.talent_point > 0
        this.btn.active = window.appContext.DataContainer.get_TalentData().talent.length > 0

        //[{"id": self.id, "skill_id": self.skill_id, "level": self.level},……]
        let skill_data: Map<number, number> = window.appContext.DataContainer.SkillLevel
        let phase: number = window.appContext.DataContainer.get_RoleData().phase
        let data_list: Array<SkillPanelData> = new Array();
        for (let i = phase; i > 0; i--) {
            let title = Util.getRankById(i) + terminal
            let skills: Array<number> = window.appContext.ConfigManager.GetskillIdsByPhase(i);
            let levels: Array<number> = new Array();
            for (let skill_id of skills) {
                levels.push(skill_data.get(skill_id))
            }
            data_list.push(new SkillPanelData(title, i, skills, levels))
        }
        this.SkillList.ApplyData(data_list);
    }

    public refresh(re_post: boolean = false) {
        if (re_post || window.appContext.DataContainer.get_SkillData() == undefined) {
            window.appContext.WebApi.get_character_info(["skill", "main"], this, function (data) {
                window.appContext.DataContainer.set_SkillData(data.skill)
                window.appContext.DataContainer.set_RoleData(data.main)
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
