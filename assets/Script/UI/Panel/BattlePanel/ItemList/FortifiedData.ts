export default class FortifiedData {
    public name: string;
    public difficulty: number;
    public phase: number;
    public pos: cc.Vec2;
    public id: number;
    public thread: number;
    public challenging: boolean;

    constructor(data: any, pos: cc.Vec2) {
        // map summary
        // {"id": self.id, "name": self.name, "phase": self.phase, "difficulty": self.difficulty,
        //         "map_id": self.map_id, "thread": self.thread}

        // battle Summary
        // label = mongodb.IntField()  # 0初始化1闯关中2失败3通关
        // {"user_id": self.user_id, "maps": self.maps, "phase": self.phase,
        //            "difficulty": self.difficulty, "loc": self.loc, "label": self.label, "buff": self.buff,
        //            "node_done": self.node_done, "thread": self.thread, "map_id": self.map_id}
        this.name = data.name;
        this.difficulty = data.difficulty;
        this.phase = data.phase;
        this.id = data.id;
        this.thread = data.thread
        this.pos = pos;
        this.challenging = window.appContext.DataContainer.BattleData.label > 0 && (window.appContext.DataContainer.BattleData.map_id == data.map_id)
    }
}
