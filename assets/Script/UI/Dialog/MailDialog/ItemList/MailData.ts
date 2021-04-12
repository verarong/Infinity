import { EquipmentData, ItemData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";

export class MailData {
    public title: string;
    public content: string;
    public award: Array<any>;
    public fight_summary: any;
    //{"title": title, "content": content, "award": award,"fight_summary":fight_summary}
    constructor(data: any = null) {
        this.title = data.title;
        this.content = data.content;
        this.award = data.award;
        this.fight_summary = data.fight_summary;
    }
}


export class MailAwardData {
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