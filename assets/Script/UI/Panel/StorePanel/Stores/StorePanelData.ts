import { ItemData, On_saleData } from "../../../../Common/JsonData/JsonData";

export class StorePanelData {
    public item_id: number;
    public amount: number;
    public resource: string;
    public price: number;
    public bool_purchased: boolean;
    public item_data: ItemData;
    public bool_learned: boolean;
    //{"item_id": item_id, "amount": amount, "cost": {"money": shop_price_money}}
    constructor(data: any, bool_purchased: number) {
        this.item_id = data.item_id;
        this.amount = data.amount;
        let cost = data.cost;
        let resources = ["money", "jade"]
        for (let x of resources) {
            if (cost.hasOwnProperty(x)) {
                this.resource = x;
                this.price = cost[x];
            };
        }
        this.item_data = window.appContext.ConfigManager.GetitemByItemId(this.item_id);
        this.bool_learned = this.item_data.resource_type == "skill" && window.appContext.DataContainer.SkillLevel.has(this.item_data.resource_id)
        this.bool_purchased = bool_purchased == 1
    }
}


export class RechargePanelData {
    public item_id: number;
    public amount: number;
    public resource: string;
    public price: number;
    //{"item_id": item_id, "amount": amount, "cost": {"money": shop_price_money}}
    constructor(item_id: number, amount: number, price: number, resource = "rmb") {
        this.item_id = item_id;
        this.amount = amount;
        this.resource = resource;
        this.price = price;
    }
}


export class OnSalePanelData {
    public data: On_saleData;
    constructor(data: On_saleData) {
        this.data = data;
    }
}