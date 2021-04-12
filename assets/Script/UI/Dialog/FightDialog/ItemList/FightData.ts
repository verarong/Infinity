export class GamersData {
    public life: number;
    public current_life: number;
    public name: string;
    public animation: number | string;
    public scale: number;
    public skills: Array<number>;
    constructor(data: any, bool_gamer_fight: boolean, gamers_amount: number) {
        this.current_life = data.current_life
        this.life = data.life
        this.name = data.name
        this.animation = "animation_" + data.animation
        this.scale = 1 / gamers_amount
        this.skills = data.skill
    }
}

export class MonstersData {
    public current_life: number;
    public life: number;
    public name: string;
    public animation: number | string;
    public scale: number;
    public scaleX: number = 1;
    public skills: Array<number>;
    constructor(data: any, bool_gamer_fight: boolean, monsters_amount: number) {
        this.current_life = data.current_life
        this.life = data.life
        this.name = data.name
        this.skills = data.skill
        if (bool_gamer_fight) {
            this.scale = 3 / monsters_amount
            this.animation = "animation_" + data.animation
            this.scaleX = -1
        }
        else {
            if (data.type == "warden") {
                this.scale = 2
            }
            else if (data.type == "boss" || data.type == "world_boss") {
                this.scale = 3
            }
            else {
                this.scale = 1
            }
            this.animation = data.animation
        }
    }
}