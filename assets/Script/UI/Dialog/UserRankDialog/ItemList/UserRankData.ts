import { EquipmentData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";

export class UserRankData {
    public rank: number;
    public user_data: any;

    constructor(index: number, user_data: any) {
        this.rank = index + 1
        this.user_data = user_data
    }
}

export class RankEquipmentData {
    public package_item_id: number;
    public item_id: number;
    public equipment_class: number;
    public bool_lock: boolean;
    public params: string;
    public strengthen_level: number;
    public equipment: EquipmentData
    //{"id": self.id, "equipment_id": self.equipment_id, "equipment_class": self.equipment_class,
    //"bool_lock": self.bool_lock, "params": self.params}

    constructor(data: any) {
        this.package_item_id = data.id
        this.item_id = data.equipment_id;
        this.equipment_class = data.equipment_class;
        this.bool_lock = data.bool_lock == 1
        this.equipment = window.appContext.ConfigManager.GetequipmentById(this.item_id);
        //this.params = Util.GetEquipmentBasicAttribute(this.item_id)
        //[{attribute: amount},...]
        this.strengthen_level = data.params.strengthen
        this.params = data.params.lines
    }
}