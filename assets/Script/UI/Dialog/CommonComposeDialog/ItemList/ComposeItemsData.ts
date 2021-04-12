import { ItemData } from "../../../../Common/JsonData/JsonData";

export class ComposeItemsData {
    public item_id: number;
    public requirement: number;
    public total: number;
    public item: ItemData
    public compose_amount: number;
    //{"id": self.id, "item_id": self.item_id, "amount": self.amount, "bool_lock": self.bool_lock,
    //"params": self.params}
    constructor(compose_amount: number, item_id: number, requirement: number, require_id: number) {
        this.compose_amount = compose_amount
        this.item_id = item_id
        this.requirement = requirement
        if (window.appContext.DataContainer.ItemAmount.has(require_id)) {
            this.total = window.appContext.DataContainer.ItemAmount.get(require_id)
        }
        else {
            this.total = 0
        }
        this.item = window.appContext.ConfigManager.GetitemByItemId(item_id)
    }
}