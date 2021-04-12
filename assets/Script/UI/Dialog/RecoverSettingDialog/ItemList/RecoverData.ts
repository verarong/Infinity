import { Util } from "../../../../Common/Utils/Util";

export class QualityData {
    public quality: string;
    public bool_selected: boolean;
    constructor(quality: number, bool_selected: boolean) {
        this.quality = Util.getColorById(quality) + "色";
        this.bool_selected = bool_selected;
    }
}

export class PhaseData {
    public phase: string;
    public bool_selected: boolean;
    constructor(phase: number, bool_selected: boolean) {
        this.phase = Util.getRankById(phase) + "级";
        this.bool_selected = bool_selected;
    }
}