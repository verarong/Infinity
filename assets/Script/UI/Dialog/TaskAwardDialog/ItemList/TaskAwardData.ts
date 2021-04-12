import { ItemData, EquipmentData } from "../../../../Common/JsonData/JsonData";

export class TaskAwardData {
    public item_id: number;
    public amount: number;
    public params: string
    public item: ItemData | EquipmentData
    //[[item, amount, params]...]
    constructor(data: any) {
        [this.item_id, this.amount, this.params] = data
        if (this.item_id < window.appContext.ConfigManager.GetBasicValueByType("min_equipment_id")) {
            this.item = window.appContext.ConfigManager.GetitemByItemId(this.item_id)
        }
        else {
            this.item = window.appContext.ConfigManager.GetequipmentById(this.item_id)
        }
    }
}