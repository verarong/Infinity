import { ItemData, EquipmentData } from "../../../../Common/JsonData/JsonData";

export class AwardData {
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


export class ResourceData {
    public resource: string;
    public amount: number;
    public quality: number = 2
    //{resource_id:  amount...}
    constructor(key: string, value: number) {
        if (key == "money") {
            this.quality = 2
        }
        else if (key == "dragon_badge") {
            this.quality = 3
        }
        else if (key == "tiger_badge") {
            this.quality = 4
        }
        else if (key == "phoenix_badge") {
            this.quality = 5
        }
        else if (key == "tortoise_badge") {
            this.quality = 6
        }
        this.resource = key
        this.amount = value
    }
}