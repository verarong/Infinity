export default class SecretData {
    public secret_id: number;
    public bool_free: number;
    public name: string;
    public phase: number;
    public quality: number;
    public state: number;
    public start: number;
    public resource: number;
    public award: number;

    //{"user_id": self.user_id, "secret_id": self.secret_id, "bool_free": self.bool_free, "name": self.name,
    //"phase": self.phase, "quality": self.quality, "state": self.state, "start": self.start,
    //"resource": self.resource, "award": self.get_award()}
    constructor(data: any) {
        this.secret_id = data.secret_id;
        this.bool_free = data.bool_free;
        this.name = data.name;
        this.phase = data.phase;
        this.quality = data.quality;
        this.state = data.state;
        this.start = data.start;
        this.resource = data.resource;
        this.award = data.award;
    }
}
