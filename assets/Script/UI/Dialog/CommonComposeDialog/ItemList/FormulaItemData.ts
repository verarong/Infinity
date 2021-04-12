import { FormulaData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";


export class FormulaItemData {
    public phase: number;
    public Formula_id: number;
    public Bool_activate: boolean;
    public formula: FormulaData;
    public check_item: boolean = true

    constructor(phase: number, Formula_id: number, Bool_activate: boolean) {
        this.phase = phase;
        this.Formula_id = Formula_id;
        this.Bool_activate = Bool_activate;
        this.formula = window.appContext.ConfigManager.GetformulaById(Formula_id)
        if (this.formula.item1) {
            this.check_item = this.check_item && Util.CheckItem(this.formula.item1, this.formula.amount1)
        }
        if (this.formula.item2) {
            this.check_item = this.check_item && Util.CheckItem(this.formula.item2, this.formula.amount2)
        }
        if (this.formula.item3) {
            this.check_item = this.check_item && Util.CheckItem(this.formula.item3, this.formula.amount3)
        }
        if (this.formula.item4) {
            this.check_item = this.check_item && Util.CheckItem(this.formula.item4, this.formula.amount4)
        }
    }
}