import { PartnerData, ThreadData } from "../../../../Common/JsonData/JsonData";

export class PartnerPanelData {
    public partner_id: number;
    public intimacy: number;
    public phase: number;
    public phase_award: number;
    public bool_award: boolean;
    public last_give_gift: number;
    public partner: PartnerData;
    public memories: Array<PartnerMemoryPanelData>
    //{"partner_id": self.partner_id, "intimacy": self.intimacy, "phase": self.phase,
    //"phase_award": self.phase_award, "last_give_gift": self.last_give_gift, "memory": self.
    //memory}
    constructor(data) {
        this.partner_id = data.partner_id;
        this.intimacy = data.intimacy;
        this.phase = data.phase;
        this.phase_award = data.phase_award;
        this.last_give_gift = data.last_give_gift;
        this.bool_award = data.phase > data.phase_award;
        this.partner = window.appContext.ConfigManager.GetpartnerById(data.partner_id)

        let memories: Array<PartnerMemoryPanelData> = new Array()
        for (let i of data.memory.split(",")) {
            memories.push(new PartnerMemoryPanelData(this.partner_id, i))
        }
        this.memories = memories
    }
}

export class PartnerMemoryPanelData {
    public memory: string;
    public step: number;
    public bool_branch: boolean;
    public thread: ThreadData;
    constructor(partner_id: number, memory: string) {
        this.memory = memory
        if (memory.slice(memory.length - 1) == "-") {
            this.step = parseInt(memory.slice(0, memory.length - 1))
            this.bool_branch = true
        }
        else {
            this.step = parseInt(memory)
            this.bool_branch = false
        }
        this.thread = window.appContext.ConfigManager.GetthreadByPartnerAndStep(partner_id, this.step)
    }
}