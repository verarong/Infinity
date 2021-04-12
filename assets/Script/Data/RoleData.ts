export default class RoleData {

    //
    //return {"id": self.id, "openid": self.openid, "channel": self.channel, "name": self.name,
    //"money": self.money, "jade": self.jade, "soul": self.soul, "gas": self.gas, "chaos": self.chaos,
    //"dragon_badge": self.dragon_badge, "tiger_badge": self.tiger_badge,
    //"phoenix_badge": self.phoenix_badge, "tortoise_badge": self.tortoise_badge, "level": self.level,
    //"exp": self.exp, "consciousness": self.consciousness, "physique": self.physique, "root": self.root,
    //"talent_point": self.talent_point, "environment": configs.environment}
    //

    public id: number;

    //角色名
    public name: string;

    //鸿蒙紫气
    public chaos: number;

    //神识
    public consciousness: number;

    //经验
    public exp: number;

    //仙灵力
    public gas: number;

    //仙玉
    public jade: number;

    //等级
    public level: number;

    //阶段名
    public levelName: string;

    //灵石
    public money: number;

    //青龙徽记
    public dragon_badge: number;

    //白虎徽记
    public tiger_badge: number;

    //朱雀徽记
    public phoenix_badge: number;

    //玄武徽记
    public tortoise_badge: number;

    //锻体
    public physique: number;

    //灵根
    public root: string

    //魂晶
    public soul: number;

    //天赋点
    public talent_point: number;

    //气象
    public environment: number;

    //阶段
    public phase: number;

    //阶级
    public step: number;

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.chaos = data.chaos;
        this.consciousness = data.consciousness;
        this.exp = data.exp;
        this.gas = data.gas;
        this.jade = data.jade;
        this.level = data.level;
        this.levelName = window.appContext.ConfigManager.GetlevelById(this.level).name;
        this.money = data.money;
        this.dragon_badge = data.dragon_badge;
        this.tiger_badge = data.tiger_badge;
        this.phoenix_badge = data.phoenix_badge;
        this.tortoise_badge = data.tortoise_badge;
        this.physique = data.physique;
        this.root = data.root;
        this.soul = data.soul;
        this.talent_point = data.talent_point;
        this.environment = data.environment;
        this.phase = Math.floor((this.level - 1) / 10) + 1;
        this.step = this.level - (this.phase - 1) * 10;
    }
}
