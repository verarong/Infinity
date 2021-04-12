export class RemainsPaginateData {
    public remains_id: number;
    public user_id: number;
    public user_name: string;
    public conquer_user_id: number;
    public conquer_user_name: string;
    public quality: number;
    public capture_timestamp: number;
    public flag: string;
    //{"id": self.id, "user_id": self.user_id, "user_name": self.user_name,
    //"conquer_user_id": self.conquer_user_id, "conquer_user_name": self.conquer_user_name
    //, "quality": self.quality, "capture_timestamp": self.capture_timestamp}..
    constructor(data: any, remains_quality: number = null, flag = "占") {
        if (data && data != "free") {
            this.remains_id = data.id
            this.user_id = data.user_id
            this.user_name = data.user_name
            this.conquer_user_id = data.conquer_user_id
            this.conquer_user_name = data.conquer_user_name
            this.quality = data.quality
            this.capture_timestamp = data.capture_timestamp
        }
        //地图上空置的矿脉位置
        else if (remains_quality) {
            this.remains_id = 0
            this.user_id = 0
            this.user_name = ""
            this.conquer_user_id = 0
            this.conquer_user_name = ""
            this.quality = remains_quality
            this.capture_timestamp = 0
        }
        //个人空置的占领、征服矿脉格子
        else {
            this.remains_id = 0
            this.user_id = 0
            this.user_name = ""
            this.conquer_user_id = 0
            this.conquer_user_name = ""
            this.quality = 0
            this.capture_timestamp = 0
        }
        this.flag = flag
    }
}