import { BaseDialog } from "../../Common/BaseDialog";
import { Debug } from "../../../Common/Debug";
import { FormulaData, ItemData, EquipmentData } from "../../../Common/JsonData/JsonData";
import FormulaList from "./ItemList/FormulaList";
import ComposeList from "./ItemList/ComposeList";
import { ComposeItemsData } from "./ItemList/ComposeItemsData";
import { FormulaItemData } from "./ItemList/FormulaItemData";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { Util } from "../../../Common/Utils/Util";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonComposeDialog extends BaseDialog {

      private art_type: string;
      private bool_activate: boolean;
      public selected: number = 0;
      private current_formula: FormulaData;
      private current_product_quality: number = 1;
      private compose_amount: number = 1;
      private max_compose: number;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Sprite)
      public icon: cc.Sprite;

      @property(cc.Sprite)
      public icon_bg: cc.Sprite;

      @property(cc.Sprite)
      public icon_phase: cc.Sprite;

      @property(cc.Label)
      public product: cc.Label;

      @property(cc.Label)
      public describe: cc.Label;

      @property(cc.Label)
      public compose_selected_amount: cc.Label;

      @property(cc.Label)
      public button: cc.Label;

      @property(FormulaList)
      public FormulaList: FormulaList;

      @property(ComposeList)
      public ComposeList: ComposeList;

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

      public minus() {
            if (this.compose_amount > 1) {
                  this.compose_amount -= 1
            }
            this.refresh_compose_amount()
      }

      public add() {
            if (this.compose_amount < this.max_compose) {
                  this.compose_amount += 1
            }
            this.refresh_compose_amount()
      }

      public max() {
            this.compose_amount = this.max_compose
            this.refresh_compose_amount()
      }

      public get_max_compose() {
            if (this.current_formula.product_id < window.appContext.ConfigManager.GetBasicValueByType("min_equipment_id")) {
                  this.max_compose = window.appContext.ConfigManager.GetBasicValueByType("package_amount") == window.appContext.DataContainer.ItemData.item.length ? 0 : window.appContext.ConfigManager.GetBasicValueByType("max_stack_amount")
            }
            else {
                  this.max_compose = window.appContext.ConfigManager.GetBasicValueByType("package_amount") - window.appContext.DataContainer.ItemData.item.length
            }
            if (this.current_formula.item1) {
                  let amount1 = Math.floor(window.appContext.DataContainer.ItemAmount.get(this.current_formula.item1) / this.current_formula.amount1)
                  amount1 = window.appContext.DataContainer.ItemAmount.has(this.current_formula.item1) ? amount1 : 0
                  this.max_compose = this.max_compose <= amount1 ? this.max_compose : amount1
            }
            if (this.current_formula.item2) {
                  let amount2 = Math.floor(window.appContext.DataContainer.ItemAmount.get(this.current_formula.item2) / this.current_formula.amount2)
                  amount2 = window.appContext.DataContainer.ItemAmount.has(this.current_formula.item2) ? amount2 : 0
                  this.max_compose = this.max_compose <= amount2 ? this.max_compose : amount2
            }
            if (this.current_formula.item3) {
                  let amount3 = Math.floor(window.appContext.DataContainer.ItemAmount.get(this.current_formula.item3) / this.current_formula.amount3)
                  amount3 = window.appContext.DataContainer.ItemAmount.has(this.current_formula.item3) ? amount3 : 0
                  this.max_compose = this.max_compose <= amount3 ? this.max_compose : amount3
            }
            if (this.current_formula.item4) {
                  let amount4 = Math.floor(window.appContext.DataContainer.ItemAmount.get(this.current_formula.item4) / this.current_formula.amount4)
                  amount4 = window.appContext.DataContainer.ItemAmount.has(this.current_formula.item4) ? amount4 : 0
                  this.max_compose = this.max_compose <= amount4 ? this.max_compose : amount4
            }
            this.max_compose = this.max_compose > 1 ? this.max_compose : 1
      }

      public refresh_compose_amount(split = "/") {
            this.get_max_compose()
            this.compose_selected_amount.string = this.compose_amount + split + this.max_compose
            let compose_data: Array<ComposeItemsData> = new Array();
            if (this.current_formula.item1) {
                  compose_data.push(new ComposeItemsData(this.compose_amount, this.current_formula.item1, this.current_formula.amount1, this.current_formula.item1))
            }
            if (this.current_formula.item2) {
                  compose_data.push(new ComposeItemsData(this.compose_amount, this.current_formula.item2, this.current_formula.amount2, this.current_formula.item2))
            }
            if (this.current_formula.item3) {
                  compose_data.push(new ComposeItemsData(this.compose_amount, this.current_formula.item3, this.current_formula.amount3, this.current_formula.item3))
            }
            if (this.current_formula.item4) {
                  compose_data.push(new ComposeItemsData(this.compose_amount, this.current_formula.item4, this.current_formula.amount4, this.current_formula.item4))
            }
            this.ComposeList.ApplyData(compose_data)
      }

      public ShowByFormulaData(apply) {
            let data = window.appContext.DataContainer.Formulas
            this.title.string = this.art_type
            let data_list: Array<FormulaItemData> = new Array();
            let phase: number = window.appContext.DataContainer.DomainLevel.get(5)
            for (let i = phase; i > 0; i--) {
                  let formulas: Array<number> = window.appContext.ConfigManager.GetformulaIdsByPhaseType(i, this.art_type);
                  for (let formula_id of formulas) {
                        data_list.push(new FormulaItemData(i, formula_id, data.indexOf(formula_id) > -1))
                  }
            }
            if (apply) {
                  this.FormulaList.ApplyData(data_list, this.selected);
            }

            let formula: FormulaItemData = data_list[this.selected]
            this.current_formula = formula.formula
            this.bool_activate = formula.Bool_activate
            this.product.string = this.current_formula.product
            let product: ItemData | EquipmentData

            let describe: string = ""
            if (this.current_formula.product_id < window.appContext.ConfigManager.GetBasicValueByType("min_equipment_id")) {
                  product = window.appContext.ConfigManager.GetitemByItemId(this.current_formula.product_id)
                  describe += product.poem
                  this.current_product_quality = product.item_quality
            }
            else {
                  product = window.appContext.ConfigManager.GetequipmentById(this.current_formula.product_id)
                  describe += Util.GetEquipmentBasicAttribute(this.current_formula.product_id)
                  this.current_product_quality = product.equipment_quality

                  if (product.lines) {
                        describe += "\n\n随机" + product.lines + "条词缀"
                  }
            }
            this.describe.string = describe

            window.appContext.Pool.setSpriteFrameByUrl(product.icon, this.icon);
            window.appContext.Pool.setSpriteFrameByUrl(product.icon_bg, this.icon_bg);
            window.appContext.Pool.setSpriteFrameByUrl(product.icon_phase, this.icon_phase);
            if (this.bool_activate) {
                  this.button.string = "合成"
            }
            else {
                  this.button.string = "修习"
            }
      }

      public refresh(refresh: boolean = false, select = null, apply: boolean = true) {
            this.selected = select ? select : 0
            this.compose_amount = 1
            let self = this

            if (refresh) {
                  window.appContext.WebApi.get_character_info(["formula", "item", "main", "daily_task"], this, function (data) {
                        window.appContext.DataContainer.set_FormulaData(data.formula)
                        window.appContext.DataContainer.set_ItemData(data.item)
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_DailyTaskData(data.daily_task)
                        self.ShowByFormulaData(apply)
                        self.refresh_compose_amount()
                  });
            }
            else {
                  this.ShowByFormulaData(apply)
                  this.refresh_compose_amount()
            }
      }

      public bind_data(art_type: string) {
            Debug.log(art_type);
            this.art_type = art_type
      }

      public show(info: any) {
            this.bind_data(info);

            this.refresh()
      }

      public Compose() {
            let self = this
            if (this.bool_activate) {
                  window.appContext.WebApi.compose(this.current_formula.id, this.compose_amount, this,
                        function (succData) {
                              self.refresh(true, self.selected)
                        });
            }
            else if (this.current_product_quality > 4) {
                  Util.ToastByCode(133, true)
            }
            else {
                  window.appContext.UIManager.ShowDialog(PrefabUrl.ActivateFormulaDialog, this.current_formula.id)
            }

      }
}
