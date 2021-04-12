import { Util } from "../../../../Common/Utils/Util";

export class GiftData {
    public package_item_id: number;
    public item_id: number;
    public amount: number;
    public bool_lock: boolean;
    public params: string;
    public strengthen_level: number;
    //{"id": self.id, "item_id": self.item_id, "amount": self.amount, "bool_lock": self.bool_lock,
    //"params": self.params}
    constructor(data: any = null) {
        this.package_item_id = data.id
        this.item_id = data.item_id;
        this.amount = data.amount;
        this.bool_lock = data.bool_lock == 1

        if (data.params) {
            this.strengthen_level = data.params.strengthen
            this.params = Util.ParseParams(data.params.lines, this.strengthen_level)
        }
        else {
            this.strengthen_level = 0
            this.params = ""
        }
    }
}