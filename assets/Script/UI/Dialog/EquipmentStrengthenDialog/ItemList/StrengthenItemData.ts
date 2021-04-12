import { EquipmentData, StrengthenData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";


export class StrengthenItemData {
    public package_item_id: number;
    public equipment_id: number;
    public equipment_class: number;
    public equipment_name: string
    public equipment_quality:number
    public bool_lock: boolean;
    public params: string;
    public strengthen_level: number;
    public can_strengthen: boolean;
    //{"id": self.id, "equipment_id": self.equipment_id, "equipment_class": self.equipment_class,
    //"bool_lock": self.bool_lock, "params": self.params}

    constructor(data: any) {
        this.package_item_id = data.id
        this.equipment_id = data.equipment_id;
        this.equipment_class = data.equipment_class;
        if (data.bool_lock == 1) {
            this.bool_lock = true
        } else {
            this.bool_lock = false
        }
        let equipment_data: EquipmentData = window.appContext.ConfigManager.GetequipmentById(this.equipment_id);
        this.equipment_name = equipment_data.name
        this.equipment_quality=equipment_data.equipment_quality

        //this.params = Util.GetEquipmentBasicAttribute(this.item_id)
        //[{attribute: amount},...]
        this.strengthen_level = data.params.strengthen
        this.params = Util.ParseParams(data.params.lines, this.strengthen_level)

        let strengthen: StrengthenData = window.appContext.ConfigManager.GetStrengthen(this.strengthen_level)
        let max = window.appContext.ConfigManager.GetMaxStrengthen()
        this.can_strengthen == this.strengthen_level < max && Util.CheckItem(strengthen.item_id, strengthen.item_amount)
    }
}