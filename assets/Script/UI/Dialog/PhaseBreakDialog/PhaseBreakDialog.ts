import { Debug } from "../../../Common/Debug";
import { PhasebreakData } from "../../../Common/JsonData/JsonData";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { BaseDialog } from "../../Common/BaseDialog";
import DomainPanel from "../../Panel/DomainPanel/DomainPanel";
import { BreakAwardsList } from "./ItemList/BreakAwardsList";
import { BreakItemsList } from "./ItemList/BreakItemsList";
import { BreakRequirementsList } from "./ItemList/BreakRequirementsList";
import { BreakSkillsList } from "./ItemList/BreakSkillsList";
import { BreakAwardsData, BreakItemsData, BreakRequirementsData, BreakSkillsData } from "./ItemList/PhaseBreakData";



const { ccclass, property } = cc._decorator;

@ccclass
export default class PhaseBreakDialog extends BaseDialog {

      private selected: number = 1;
      private phase_break_1: PhasebreakData;
      private phase_break_2: PhasebreakData;
      private phase_break_3: PhasebreakData;

      @property(cc.Label)
      public break_1: cc.Label;

      @property(cc.Label)
      public break_2: cc.Label;

      @property(cc.Label)
      public break_3: cc.Label;

      @property(cc.Node)
      public bg1_selected: cc.Node;

      @property(cc.Node)
      public bg2_selected: cc.Node;

      @property(cc.Node)
      public bg3_selected: cc.Node;

      @property(BreakRequirementsList)
      public BreakRequirementsList: BreakRequirementsList;

      @property(BreakSkillsList)
      public BreakSkillsList: BreakSkillsList;

      @property(BreakItemsList)
      public BreakItemsList: BreakItemsList;

      @property(BreakAwardsList)
      public BreakAwardsList: BreakAwardsList;

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return;
      }

      closeDialog(): any {
            this.hide();
      }

      public jumpToStore() {
            this.hide()
            window.appContext.UIManager.ShowPanel(PrefabUrl.StorePanel)
      }

      public jumpToChallenge() {
            this.hide()
            window.appContext.UIManager.ShowPanel(PrefabUrl.BattlePanel)
            window.appContext.UIManager.ShowDialog(PrefabUrl.ChallengeDialog)
            let battle = window.appContext.UIManager.getDialog(PrefabUrl.BattleFiledDialog)
            if (battle) {
                  battle.hide()
            }
      }

      public selectRen() {
            this.refresh_selected(1)
      }

      public selectDi() {
            this.refresh_selected(2)
      }

      public selectTian() {
            this.refresh_selected(3)
      }

      public showRequirements() {
            let data_list: Array<BreakRequirementsData> = new Array()
            data_list.push(new BreakRequirementsData("exp", this.phase_break_3.exp_require))
            data_list.push(new BreakRequirementsData("consciousness", this.phase_break_3.consciousness_require))
            data_list.push(new BreakRequirementsData("physique", this.phase_break_3.physique_require))
            this.BreakRequirementsList.ApplyData(data_list)
      }

      public showSkills() {
            let data_list: Array<BreakSkillsData> = new Array()
            data_list.push(new BreakSkillsData(this.phase_break_3.skill_require1, this.phase_break_3.skill_level1))
            data_list.push(new BreakSkillsData(this.phase_break_3.skill_require2, this.phase_break_3.skill_level2))
            data_list.push(new BreakSkillsData(this.phase_break_3.skill_require3, this.phase_break_3.skill_level3))
            data_list.push(new BreakSkillsData(this.phase_break_3.skill_require4, this.phase_break_3.skill_level4))
            data_list.push(new BreakSkillsData(this.phase_break_3.skill_require5, this.phase_break_3.skill_level5))
            data_list.push(new BreakSkillsData(this.phase_break_3.skill_require6, this.phase_break_3.skill_level6))
            data_list.push(new BreakSkillsData(this.phase_break_3.skill_require7, this.phase_break_3.skill_level7))
            data_list.push(new BreakSkillsData(this.phase_break_3.skill_require8, this.phase_break_3.skill_level8))
            this.BreakSkillsList.ApplyData(data_list)
      }

      public showItems() {
            let data_list: Array<BreakItemsData> = new Array()
            data_list.push(new BreakItemsData(this.phase_break_3.item_require1, this.phase_break_3.item_amount1))
            data_list.push(new BreakItemsData(this.phase_break_3.item_require2, this.phase_break_3.item_amount2))
            data_list.push(new BreakItemsData(this.phase_break_3.item_require3, this.phase_break_3.item_amount3))
            data_list.push(new BreakItemsData(this.phase_break_3.item_require4, this.phase_break_3.item_amount4))
            this.BreakItemsList.ApplyData(data_list)
      }

      public showAwardsBySelected(selected) {
            let data: PhasebreakData
            if (selected == 1) {
                  data = this.phase_break_1
            }
            else if (selected == 2) {
                  data = this.phase_break_2
            }
            else if (selected == 3) {
                  data = this.phase_break_3
            }
            let data_list: Array<BreakAwardsData> = new Array()
            if (data.award_item1) {
                  data_list.push(new BreakAwardsData(data.award_item1, data.award_amount1))
            }
            if (data.award_item2) {
                  data_list.push(new BreakAwardsData(data.award_item2, data.award_amount2))
            }
            if (data.award_item3) {
                  data_list.push(new BreakAwardsData(data.award_item3, data.award_amount3))
            }
            if (data.award_item4) {
                  data_list.push(new BreakAwardsData(data.award_item4, data.award_amount4))
            }
            if (data.award_item5) {
                  data_list.push(new BreakAwardsData(data.award_item5, data.award_amount5))
            }
            this.BreakAwardsList.ApplyData(data_list)
      }

      public refresh_selected(selected = 3) {
            this.selected = selected
            this.BreakSkillsList.node.active = this.selected > 1
            this.BreakItemsList.node.active = this.selected > 2
            this.bg1_selected.active = selected == 1
            this.bg2_selected.active = selected == 2
            this.bg3_selected.active = selected == 3
            this.showAwardsBySelected(selected)
      }

      public refresh() {
            this.showRequirements()
            this.showSkills()
            this.showItems()

            this.refresh_selected()
      }

      public bind_data(info: any) {
            Debug.log(info);
            let level = window.appContext.DataContainer.RoleData.level
            this.phase_break_1 = window.appContext.ConfigManager.GetphaseBreakByLevelAndType(level, 1)
            this.phase_break_2 = window.appContext.ConfigManager.GetphaseBreakByLevelAndType(level, 2)
            this.phase_break_3 = window.appContext.ConfigManager.GetphaseBreakByLevelAndType(level, 3)
            this.break_1.string = this.phase_break_1.title
            this.break_2.string = this.phase_break_2.title
            this.break_3.string = this.phase_break_3.title
      }

      public show(info: any) {
            this.bind_data(info);

            this.refresh()
      }

      public phaseBreak() {
            let self = this
            window.appContext.WebApi.phase_break(this.selected, this, function (succeed_data) {
                  window.appContext.WebApi.get_character_info(["main", "item", "role_params", "attribute"], this, function (data) {
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_ItemData(data.item)
                        window.appContext.DataContainer.set_GuideData(data.role_params)
                        window.appContext.DataContainer.set_UserAttributeData(data.attribute)
                        let DomainPanel: DomainPanel = window.appContext.UIManager.getCurrentPanel<DomainPanel>();
                        DomainPanel.refresh()
                        window.appContext.UIManager.ShowDialog(PrefabUrl.TaskAwardDialog, succeed_data)
                        self.hide()
                  });
            });
      }
}
