import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import { FormulaData } from "../../Common/JsonData/JsonData";
import CommonComposeDialog from "./CommonComposeDialog/CommonComposeDialog";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import { Util } from "../../Common/Utils/Util";



const { ccclass, property } = cc._decorator;

@ccclass
export default class ActivateFormulaDialog extends BaseDialog {

      private formula_id: number;
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
            return this.formula_id;
      }

      closeDialog(): any {
            this.hide();
      }

      public bind(info: any) {
            Debug.log(info);
            this.formula_id = info;
      }

      public show(info: any, start = "消耗 ", mid_money = " 灵石修习", mid_jade = " 仙玉修习") {
            this.bind(info);

            let formula: FormulaData = window.appContext.ConfigManager.GetformulaById(this.formula_id);
            this.title.string = formula.name;
            this.choice1.string = start + formula.activate_jade + mid_jade + formula.name;
            this.choice2.string = start + formula.activate_money + mid_money + formula.name;
            if (!Util.CheckResource("jade", formula.activate_jade)) {
                  this.choice1.node.color = Util.ButtonColor("shortage")
                  this.choice1.getComponent(cc.LabelOutline).enabled = false
                  this.check_requirement_choice1 = false
            }
            else {
                  this.choice1.node.color = Util.ButtonColor("highlight")
                  this.choice1.getComponent(cc.LabelOutline).enabled = true
                  this.check_requirement_choice1 = true
            }
            if (!Util.CheckResource("money", formula.activate_money)) {
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
            window.appContext.WebApi.activate_formula(this.formula_id, resource_type, this, function (succData) {
                  this.hide();
                  let ComposeDialog: CommonComposeDialog = window.appContext.UIManager.getDialog(PrefabUrl.CommonComposeDialog);
                  ComposeDialog.refresh(true, ComposeDialog.selected)
            });
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
