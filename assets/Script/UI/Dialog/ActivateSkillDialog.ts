import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import { SkillData } from "../../Common/JsonData/JsonData";
import SkillPanel from "../Panel/SkillPanel/SkillPanel";
import { Util } from "../../Common/Utils/Util";



const { ccclass, property } = cc._decorator;

@ccclass
export default class ActivateSkillDialog extends BaseDialog {

      private skill_id: number;
      private check_requirement_choice1: boolean = true;
      private check_requirement_choice2: boolean = true;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public choice1: cc.Label;

      @property(cc.Label)
      public choice2: cc.Label;

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return this.skill_id;
      }

      closeDialog(): any {
            this.hide();
      }

      public bind(info: any) {
            Debug.log(info);
            this.skill_id = info;
      }

      public show(info: any, start = "消耗 ", mid_money = " 灵石研习", mid_jade = " 仙玉研习") {
            this.bind(info);

            let skill: SkillData = window.appContext.ConfigManager.GetskillById(this.skill_id);
            this.title.string = skill.name;
            this.choice1.string = start + skill.activate_jade + mid_jade + skill.name;
            this.choice2.string = start + skill.activate_money + mid_money + skill.name;
            if (!Util.CheckResource("jade", skill.activate_jade)) {
                  this.choice1.node.color = Util.ButtonColor("shortage")
                  this.choice1.getComponent(cc.LabelOutline).enabled = false
                  this.check_requirement_choice1 = false
            }
            else {
                  this.choice1.node.color = Util.ButtonColor("highlight")
                  this.choice1.getComponent(cc.LabelOutline).enabled = true
                  this.check_requirement_choice1 = true
            }
            if (!Util.CheckResource("money", skill.activate_money)) {
                  this.choice2.node.color = Util.ButtonColor("shortage")
                  this.choice2.getComponent(cc.LabelOutline).enabled = false
                  this.check_requirement_choice2 = false
            }
            else {
                  this.choice2.node.color = Util.ButtonColor("highlight")
                  this.choice2.getComponent(cc.LabelOutline).enabled = true
                  this.check_requirement_choice2 = true
            }
      }

      public choice(resource_type: string) {
            window.appContext.WebApi.activate_skill(this.skill_id, resource_type, this,
                  function (succData) {
                        this.hide();
                        let SkillPanel: SkillPanel = window.appContext.UIManager.getCurrentPanel<SkillPanel>();
                        SkillPanel.refresh(true)
                  }
            );
      }

      public choice_1() {
            if (this.check_requirement_choice1) {
                  this.choice("jade")
            }
      }

      public choice_2() {
            if (this.check_requirement_choice2) {
                  this.choice("money")
            }
      }
}
