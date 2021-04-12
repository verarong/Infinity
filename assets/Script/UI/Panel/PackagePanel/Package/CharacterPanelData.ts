import ConfigManager from "../../../../Common/ConfigManager";
import { EquipmentData, LinesData } from "../../../../Common/JsonData/JsonData";
import { Util } from "../../../../Common/Utils/Util";

export class ItemsData {
    public package_item_id: number;
    public item_id: number;
    public amount: number;
    public bool_lock: boolean;
    public params: string;
    public spare: boolean;
    public strengthen_level: number;
    //{"id": self.id, "item_id": self.item_id, "amount": self.amount, "bool_lock": self.bool_lock,
    //"params": self.params}
    constructor(spare: boolean, data: any = null) {
        this.spare = spare
        if (data) {
            this.package_item_id = data.id
            this.item_id = data.item_id;
            this.amount = data.amount;
            this.bool_lock = data.bool_lock == 1

            if (data.params) {
                this.strengthen_level = data.params.strengthen
                this.params = data.params.lines
            }
            else {
                this.strengthen_level = 0
                this.params = ""
            }
        }
    }
}


export class EquipmentsData {
    public package_item_id: number;
    public item_id: number;
    public equipment_class: number;
    public bool_lock: boolean;
    public params: string;
    public strengthen_level: number;
    //{"id": self.id, "equipment_id": self.equipment_id, "equipment_class": self.equipment_class,
    //"bool_lock": self.bool_lock, "params": self.params}

    constructor(data: any) {
        this.package_item_id = data.id
        this.item_id = data.equipment_id;
        this.equipment_class = data.equipment_class;
        this.bool_lock = data.bool_lock == 1

        //this.params = Util.GetEquipmentBasicAttribute(this.item_id)
        //[{attribute: amount},...]
        this.strengthen_level = data.params.strengthen
        this.params = data.params.lines
    }
}

export class EquipmentLinesData {
    public attribute: string;
    public amount: number;
    public min: number;
    public max: number;
    public quality: number;
    public color: string;
    constructor(line: any, equipment_id: number) {
        let equipment = window.appContext.ConfigManager.GetequipmentById(equipment_id);
        for (let attribute in line) {
            this.attribute = window.appContext.ConfigManager.GettransformChnByEng(attribute)
            this.amount = line[attribute]
            let line_data: LinesData = window.appContext.ConfigManager.GetlinesByPhaseAndAttribute(equipment.phase, attribute)
            if (line_data) {
                this.min = line_data.min
                this.max = line_data.max
            }
            else {
                this.min = 1
                this.max = Math.ceil(equipment.phase / 3)
            }
            let step: number = (this.max - this.min) / 6
            if (this.amount >= (this.min + 5 * step)) {
                this.quality = 6
            }
            else if (this.amount >= (this.min + 4 * step)) {
                this.quality = 5
            }
            else if (this.amount >= (this.min + 3 * step)) {
                this.quality = 4
            }
            else if (this.amount >= (this.min + 2 * step)) {
                this.quality = 3
            }
            else if (this.amount >= (this.min + step)) {
                this.quality = 2
            }
            else {
                this.quality = 1
            }
            this.color = window.appContext.ConfigManager.GetColorcByQuality(this.quality)
        }
    }
}