import { Debug } from "../../../../Common/Debug";
import { ItemData, EquipmentData } from "../../../../Common/JsonData/JsonData";

export class WorldBossData {
    public rank: number;
    public damage: number;
    public name: string
    public bool_self: boolean

    constructor(index: number, self: boolean, data: any) {
        this.rank = index
        this.bool_self = self
        this.name = data[1] == 0 ? "" : data[0]
        this.damage = data[1]
    }
}