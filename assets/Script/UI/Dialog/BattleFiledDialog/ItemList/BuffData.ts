import { BuffData } from "../../../../Common/JsonData/JsonData"

export default class MapBuffData {
    public buff_id: number
    public buff: BuffData

    constructor(buff_id: number) {
        this.buff_id = buff_id
        this.buff = window.appContext.ConfigManager.GetBuffById(buff_id)
    }
}
