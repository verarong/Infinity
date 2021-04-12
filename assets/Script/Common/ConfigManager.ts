import {
    CodeData, ActiontreeData, RootData, BasicData, BuffData, ConsciousnessData,
    DomainData, EquipmentData, EventData, FormulaData, GroupsData, ItemData,
    LevelData, LinesData, MapData, MonsterData, PartnerData, PhysiqueData, Q_colorData,
    SecretData, SkillData, StoreData, TalentData, TransformData, NameData, TitleData,
    SummaryData, BoxData, ThreadData, On_saleData, GuideData, StrengthenData, AvatarData, AchievementData, RemainsData, ChallengeData, PhasebreakData, AllianceData, TechnologyData, PositionData, DailyData
} from "./JsonData/JsonData";
import { Debug } from "./Debug";
import { Util } from "./Utils/Util";
import PhaseBreakDialog from "../UI/Dialog/PhaseBreakDialog/PhaseBreakDialog";

export default class ConfigManager {
    private actiontree: Map<number, ActiontreeData> = new Map();
    private basic: Map<number, BasicData> = new Map();
    private buff: Map<number, BuffData> = new Map();
    private code: Map<number, CodeData> = new Map();
    private consciousness: Map<number, ConsciousnessData> = new Map();
    private domain: Map<number, DomainData> = new Map();
    private equipment: Map<number, EquipmentData> = new Map();
    private event: Map<number, EventData> = new Map();
    private box: Map<number, BoxData> = new Map();
    private thread: Map<number, ThreadData> = new Map();
    private formula: Map<number, FormulaData> = new Map();
    private groups: Map<number, GroupsData> = new Map();
    private item: Map<number, ItemData> = new Map();
    private level: Map<number, LevelData> = new Map();
    private phase_break: Map<number, PhasebreakData> = new Map();
    private lines: Map<number, LinesData> = new Map();
    private map: Map<number, MapData> = new Map();
    private monster: Map<number, MonsterData> = new Map();
    private partner: Map<number, PartnerData> = new Map();
    private physique: Map<number, PhysiqueData> = new Map();
    private qANDc: Map<number, Q_colorData> = new Map();
    private root: Map<number, RootData> = new Map();
    private secret: Map<number, SecretData> = new Map();
    private skill: Map<number, SkillData> = new Map();
    private store: Map<number, StoreData> = new Map();
    private talent: Map<number, TalentData> = new Map();
    private transform: Map<number, TransformData> = new Map();
    private firstName: Array<NameData> = new Array();
    private secondaryName: Array<NameData> = new Array();
    private title: Map<number, TitleData> = new Map();
    private summary: Map<number, SummaryData> = new Map();
    private on_sale: Map<number, On_saleData> = new Map();
    private guide: Map<number, GuideData> = new Map();
    private strengthen: Map<number, StrengthenData> = new Map();
    private avatar: Map<number, AvatarData> = new Map();
    private achievement: Map<number, AchievementData> = new Map();
    private remains: Map<number, RemainsData> = new Map();
    private challenge: Map<number, ChallengeData> = new Map();
    private alliance: Map<number, AllianceData> = new Map();
    private technology: Map<number, TechnologyData> = new Map();
    private position: Map<number, PositionData> = new Map();
    private daily_task: Map<number, DailyData> = new Map();

    constructor() {
        this.initJsonConfigs();
    }
    //#region 根据id 获取json配置表

    private sortById(a: any, b: any) {
        return a.id - b.id
    }

    private sortByIdReverse(a: any, b: any) {
        return b.id - a.id
    }

    public GetDifficultyStringById(difficulty: number) {
        switch (difficulty) {
            case 2:
                return "普通";
            case 3:
                return "远古";
            case 4:
                return "上古";
            case 5:
                return "仙古";
            case 6:
                return "神古";
        }
    }

    public GetActiontreeById(id: number): ActiontreeData {
        var data = this.actiontree.get(id) as ActiontreeData;
        return data;
    }

    public GetBasicById(id: number): BasicData {
        var data = this.basic.get(id) as BasicData;
        return data;
    }

    public GetBasicValueByType(type: string): number {
        for (let basicData of this.basic.values()) {
            if (basicData.type == type) {
                return basicData.value;
            }
        }
        return 0;
    }

    public GetBuffById(id: number): BuffData {
        var data = this.buff.get(id) as BuffData;
        return data;
    }

    //获取codeConfig
    public GetCodeDataById(id: number): CodeData {
        var data = this.code.get(id) as CodeData;
        return data;
    }

    public GetconsciousnessById(id: number): ConsciousnessData {
        var data = this.consciousness.get(id) as ConsciousnessData;
        return data;
    }

    public GetMaxConsciousnessLevel(): number {
        return Math.max(...this.consciousness.keys());
    }

    public GetdomainById(id: number): DomainData {
        var data = this.domain.get(id) as DomainData;
        return data;
    }

    public GetdomainByBuildingIdAndLevel(buildingId: number, level: number): DomainData {
        for (let domainData of this.domain.values()) {
            if (domainData.building_id == buildingId && domainData.level == level) {
                return domainData;
            }
        }

        return null;
    }

    public GetMaxDomainLevelByBuildingId(buildingId: number): number {
        let max: number = 0
        for (let domainData of this.domain.values()) {
            if (domainData.building_id == buildingId) {
                max = domainData.level >= max ? domainData.level : max
            }
        }

        return max;
    }

    public GetequipmentById(equipmentid: number): EquipmentData {
        var data = this.equipment.get(equipmentid) as EquipmentData;
        return data;
    }

    public GeteventById(id: number): EventData {
        var data = this.event.get(id) as EventData;
        return data;
    }

    public GetboxById(id: number): BoxData {
        var data = this.box.get(id) as BoxData;
        return data;
    }

    public GetthreadById(id: number): ThreadData {
        var data = this.thread.get(id) as ThreadData;
        return data;
    }

    public GetthreadByPartnerAndStep(partner_id: number, step: number): ThreadData {
        for (let thread of this.thread.values()) {
            if (thread.partner == partner_id && thread.step == step) {
                return thread
            }
        }
    }

    public checkBoolTerminalThread(id: number): boolean {
        var data = this.thread.get(id) as ThreadData;
        for (let thread of this.thread.values()) {
            if (thread.map_id == data.map_id && thread.step > data.step) {
                return false
            }
        }
        return true
    }

    public GetformulaById(id: number): FormulaData {
        var data = this.formula.get(id) as FormulaData;
        return data;
    }

    public GetformulaIdsByPhaseType(phase: number, art_type: string, ascending: boolean = true): Array<number> {
        let formulas: Array<number> = new Array();
        for (let [id, formula] of this.formula) {
            if (formula.require_level == phase && formula.art_type == art_type) {
                formulas.push(id);
            }
        }
        if (ascending) {
            formulas = formulas.sort(this.sortById);
        }
        else {
            formulas = formulas.sort(this.sortByIdReverse);
        }
        return formulas;
    }

    public GetgroupsById(id: number): GroupsData {
        var data = this.groups.get(id) as GroupsData;
        return data;
    }

    public GetRechargeItems(): Map<number, StoreData> {
        return this.store;
    }

    public GetItemsByPhase(phase: number): Array<number> {
        let data_list: Array<number> = new Array()
        for (let item of this.item.values()) {
            if (item.phase == phase) {
                data_list.push(item.item_id)
            }
        }
        return data_list;
    }

    public GetItemsByStorePhase(phase: number): Array<number> {
        let data_list: Array<number> = new Array()
        for (let item of this.item.values()) {
            if (item.store_phase == phase) {
                data_list.push(item.item_id)
            }
        }
        return data_list;
    }

    public GetitemByItemId(itemId: number): ItemData {

        var data = this.item.get(itemId) as ItemData;
        return data;
    }

    public GetlevelById(id: number): LevelData {
        var data = this.level.get(id) as LevelData;
        return data;
    }

    public GetMaxLevel(): number {
        return Math.max(...this.level.keys());
    }

    public GetLegalAttribute(): Set<string> {
        let legal_attributes: Set<string> = new Set();
        for (let line of this.lines.values()) {
            legal_attributes.add(line.attribute)
        }
        return legal_attributes
    }

    public GetlinesById(id: number): LinesData {
        var data = this.lines.get(id) as LinesData;
        return data;
    }

    public GetlinesByPhaseAndAttribute(phase: number, attribute: string): LinesData {
        for (let [id, lines] of this.lines) {
            if (lines.phase == phase && lines.attribute == attribute) {
                return lines
            }
        }
    }

    public GetmapById(id: number): MapData {
        var data = this.map.get(id) as MapData;
        return data;
    }

    public GetMapByPhaseAndQuality(phase: number, quality: number): MapData {
        for (let map of this.map.values()) {
            if (map.phase == phase && map.difficulty == quality) {
                return map
            }
        }
        return null;
    }

    public GetmonsterById(id: number): MonsterData {
        var data = this.monster.get(id) as MonsterData;
        return data;
    }

    public GetpartnerById(id: number): PartnerData {
        var data = this.partner.get(id) as PartnerData;
        return data;
    }

    public GetpartnerIntimacyByPhase(phase: number): number {
        var data = this.partner.get(1) as PartnerData;
        if (phase == 0) {
            return data.phase_intimacy1
        }
        else if (phase == 1) {
            return data.phase_intimacy2
        }
        else if (phase == 2) {
            return data.phase_intimacy3
        }
        else if (phase == 3) {
            return data.phase_intimacy4
        }
        else {
            return data.phase_intimacy5
        }
    }

    public GetphysiqueById(id: number): PhysiqueData {
        var data = this.physique.get(id) as PhysiqueData;
        return data;
    }

    public GetMaxPhysiqueLevel(): number {
        return Math.max(...this.physique.keys());
    }

    public GetColorcByQuality(quality: number): string {
        var data = this.qANDc.get(quality) as Q_colorData;
        return data.code;
    }

    public GetrootById(id: number): RootData {
        var data = this.root.get(id) as RootData;
        return data;
    }

    public GetMaxRootLevel(): number {
        return Math.max(...this.root.keys());
    }

    public GetsecretById(id: number): SecretData {
        var data = this.secret.get(id) as SecretData;
        return data;
    }

    public GetsecretByPhaseAndQuality(phase: number, quality: number): SecretData {
        for (let [id, secret] of this.secret) {
            if (secret.phase == phase && secret.quality == quality) {
                return secret
            }
        }
    }

    public GetphaseBreakByLevelAndType(level: number, type: number): PhasebreakData {
        for (let break_data of this.phase_break.values()) {
            if (break_data.level == level && break_data.break_type == type) {
                return break_data
            }
        }
    }

    public Getskills(): Map<number, SkillData> {
        return this.skill;
    }

    public GetskillById(id: number): SkillData {
        var data = this.skill.get(id) as SkillData;
        return data;
    }

    public GetskillIdsByPhase(phase: number, ascending: boolean = true): Array<number> {
        let skills: Array<number> = new Array();
        for (let [id, skill] of this.skill) {
            if (skill.phase == phase) {
                skills.push(id);
            }
        }
        if (ascending) {
            skills = skills.sort(this.sortById);
        }
        else {
            skills = skills.sort(this.sortByIdReverse);
        }
        return skills;
    }

    public GetstoreById(id: number): StoreData {
        var data = this.store.get(id) as StoreData;
        return data;
    }

    public GettalentById(id: number): TalentData {
        var data = this.talent.get(id) as TalentData;
        return data;
    }

    public GettalentsByType(type: number, ascending: boolean = true): Array<TalentData> {
        let talents: Array<TalentData> = new Array();
        for (let talent of this.talent.values()) {
            if (talent.class == type) {
                talents.push(talent);
            }
        }
        if (ascending) {
            talents = talents.sort(this.sortById);
        }
        else {
            talents = talents.sort(this.sortByIdReverse);
        }
        return talents;
    }

    public GettransformById(id: number): TransformData {
        var data = this.transform.get(id) as TransformData;
        return data;
    }

    public GettransformChnByEng(eng: string): string {
        for (let transformData of this.transform.values()) {
            if (transformData.eng == eng) {
                return transformData.chn;
            }
        }
        return "";
    }

    public GetRandomFirstName(): string {
        var index = Util.getRndInteger(0, this.firstName.length);
        return this.firstName[index].name;
    }

    public GetRandomSecondaryName(): string {
        var index = Util.getRndInteger(0, this.secondaryName.length);
        return this.secondaryName[index].name;
    }

    public GetTitleDataById(id: number): TitleData {
        var data = this.title.get(id) as TitleData;
        if (data == null) {
            Debug.error("GetTitleformById:" + id);
        }
        return data;
    }

    public GetRandomTitleByAmount(titleAmount: number): Array<TitleData> {
        let randomTitleCount = Util.getRndInteger(1, titleAmount + 1);
        let titleCount = this.title.size;
        let titleIndexs = Util.shuffleArithmetic(randomTitleCount, 1, titleCount);
        let titles = new Array();
        for (let i of titleIndexs) {
            titles.push(this.GetTitleDataById(i))
        }
        return titles;
    }

    public GetsummaryDataById(id: number): SummaryData {
        var data = this.summary.get(id) as SummaryData;
        if (data == null) {
            Debug.error("GetsummaryDataById:" + id);
        }
        return data;
    }

    //根据type获取summary 数组
    public GetSummaryDatasByType(type: number): Array<SummaryData> {
        let summaryDatas = new Array<SummaryData>();
        this.summary.forEach(data => {
            if (data.type == type) {
                summaryDatas.push(data);
            }
        });

        return summaryDatas;
    }

    public GetOnSaleByid(id: number = 1): On_saleData {
        let data = this.on_sale.get(id)
        return data
    }

    public GetOnSale(first_loc: number = 1, secondary_loc: number = 2): Array<On_saleData> {
        let data_list: Array<On_saleData> = new Array()
        let now: number = Math.floor(new Date().getTime() / 1000);
        for (let data of this.on_sale.values()) {
            if (data.loc == first_loc && data.valid_start < now && now < data.valid_terminal) {
                data_list.push(data);
                break;
            }
        }
        for (let data of this.on_sale.values()) {
            if (data.loc == secondary_loc && data.valid_start < now && now < data.valid_terminal) {
                data_list.push(data);
                break;
            }
        }
        return data_list
    }

    public GetGuideById(guide_id: number): GuideData {
        return this.guide.get(guide_id)
    }

    public GetGuide(condition_value: number): GuideData {
        for (let data of this.guide.values()) {
            if (data.condition_type == "guide" && data.condition_value == condition_value) {
                return data
            }
        }
    }

    public GetLevelTriggerGuide(condition_value: number): GuideData {
        for (let data of this.guide.values()) {
            if (data.condition_type == "level_trigger" && data.condition_value == condition_value) {
                return data
            }
        }
    }

    public GetStrengthen(strengthen_level: number): StrengthenData {
        let data = this.strengthen.get(strengthen_level)
        return data
    }

    public GetMaxStrengthen(): number {
        return Math.max(...this.strengthen.keys())
    }

    public GetAvatar(avatar_type: string, avatar_id: number): AvatarData {
        for (let data of this.avatar.values()) {
            if (data.avatar_type == avatar_type && data.avatar_id == avatar_id) {
                return data
            }
        }
    }

    public GetAvatars() {
        return this.avatar.values()
    }

    public GetAchievement(achievement_id: number): AchievementData {
        let data = this.achievement.get(achievement_id)
        return data
    }

    public GetRemainsByQuality(remains_quality: number): RemainsData {
        return this.remains.get(remains_quality)
    }

    public GetRemains(): Array<RemainsData> {
        return Array.from(this.remains.values())
    }

    public GetChallengeByPhase(phase: number): ChallengeData {
        return this.challenge.get(phase)
    }

    public GetAlliances() {
        return this.alliance
    }

    public GetAllianceByLevel(level: number): AllianceData {
        return this.alliance.get(level)
    }

    public GetMaxAllianceLevel(): number {
        let max_level: number = 0
        for (let alliance of this.alliance.values()) {
            max_level = alliance.level > max_level ? alliance.level : max_level
        }
        return max_level
    }

    public GetMaxLevelByTechnologyId(technology_id: string): number {
        let max_level = 0
        for (let technology of this.technology.values()) {
            if (technology.technology_id == technology_id) {
                max_level = max_level > technology.level ? max_level : technology.level
            }
        }
        return max_level
    }

    public GetTechnologyByIdAndLevel(technology_id: string, level: number): TechnologyData {
        for (let technology of this.technology.values()) {
            if (technology.technology_id == technology_id && technology.level == level) {
                return technology
            }
        }
    }

    public GetPositionById(position_id: number): PositionData {
        return this.position.get(position_id)
    }

    public GetMaxPosition(): number {
        let max_position: number = 0
        for (let position of this.position.values()) {
            max_position = position.position_id > max_position ? position.position_id : max_position
        }
        return max_position
    }

    public GetDailyTasks() {
        return this.daily_task
    }

    //#end region
    private initJsonConfigs() {
        let self = this;
        cc.loader.loadResDir("json", cc.JsonAsset, function (err, objs) {
            Debug.log(objs);
            objs.forEach(json => {
                if (json == null || !json.isValid) {
                    Debug.error(json.name + " json table invalid");
                } else {
                    let data = json.json;
                    switch (json.name) {
                        case "actiontree":
                            data.forEach(data => {
                                self.actiontree.set(data.id, new ActiontreeData(data));
                            });
                            break;
                        case "basic":
                            data.forEach(data => {
                                self.basic.set(data.id, new BasicData(data));
                            });
                            break;
                        case "buff":
                            data.forEach(data => {
                                self.buff.set(data.id, new BuffData(data));
                            });
                            break;
                        case "code":
                            data.forEach(data => {
                                self.code.set(data.id, new CodeData(data));
                            });
                            break;

                        case "consciousness":
                            data.forEach(data => {
                                self.consciousness.set(data.id, new ConsciousnessData(data));
                            });
                            break;
                        case "domain":
                            data.forEach(data => {
                                self.domain.set(data.id, new DomainData(data));
                            });
                            break;
                        case "event":
                            data.forEach(data => {
                                self.event.set(data.id, new EventData(data));
                            });
                            break;
                        case "box":
                            data.forEach(data => {
                                self.box.set(data.id, new BoxData(data));
                            });
                            break;
                        case "thread":
                            data.forEach(data => {
                                self.thread.set(data.id, new ThreadData(data));
                            });
                            break;
                        case "formula":
                            data.forEach(data => {
                                self.formula.set(data.id, new FormulaData(data));
                            });
                            break;
                        case "groups":
                            data.forEach(data => {
                                self.groups.set(data.id, new GroupsData(data));
                            });
                            break;
                        case "equipment":
                            data.forEach(data => {
                                self.equipment.set(data.equipment_id, new EquipmentData(data));
                            });
                            break;
                        case "item":
                            data.forEach(data => {
                                self.item.set(data.item_id, new ItemData(data));
                            });
                            break;
                        case "level":
                            data.forEach(data => {
                                self.level.set(data.id, new LevelData(data));
                            });
                            break;
                        case "phasebreak":
                            data.forEach(data => {
                                self.phase_break.set(data.id, new PhasebreakData(data));
                            });
                            break;
                        case "lines":
                            data.forEach(data => {
                                self.lines.set(data.id, new LinesData(data));
                            });
                            break;
                        case "map":
                            data.forEach(data => {
                                self.map.set(data.id, new MapData(data));
                            });
                            break;
                        case "monster":
                            data.forEach(data => {
                                self.monster.set(data.id, new MonsterData(data));
                            });
                            break;
                        case "partner":
                            data.forEach(data => {
                                self.partner.set(data.id, new PartnerData(data));
                            });
                            break;
                        case "physique":
                            data.forEach(data => {
                                self.physique.set(data.id, new PhysiqueData(data));
                            });
                            break;

                        case "q_color":
                            data.forEach(data => {
                                self.qANDc.set(data.id, new Q_colorData(data));
                            });
                            break;
                        case "root":
                            data.forEach(data => {
                                self.root.set(data.id, new RootData(data));
                            });
                            break;

                        case "secret":
                            data.forEach(data => {
                                self.secret.set(data.id, new SecretData(data));
                            });
                            break;
                        case "skill":
                            data.forEach(data => {
                                self.skill.set(data.id, new SkillData(data));
                            });
                            break;

                        case "store":
                            data.forEach(data => {
                                self.store.set(data.id, new StoreData(data));
                            });
                            break;
                        case "talent":
                            data.forEach(data => {
                                self.talent.set(data.id, new TalentData(data));
                            });
                            break;

                        case "transform":
                            data.forEach(data => {
                                self.transform.set(data.id, new TransformData(data));
                            });
                            break;

                        case "name":
                            data.forEach(data => {
                                if (data.type == "first") {
                                    self.firstName.push(new NameData(data));
                                } else if (data.type == "secondary") {
                                    self.secondaryName.push(new NameData(data));
                                }
                            });
                            break;
                        case "title":
                            data.forEach(data => {
                                self.title.set(data.id, new TitleData(data));
                            });
                            break;

                        case "summary":
                            data.forEach(data => {
                                self.summary.set(data.id, new SummaryData(data));
                            });
                            break;
                        case "on_sale":
                            data.forEach(data => {
                                self.on_sale.set(data.id, new On_saleData(data));
                            });
                            break;
                        case "guide":
                            data.forEach(data => {
                                self.guide.set(data.id, new GuideData(data));
                            });
                            break;
                        case "strengthen":
                            data.forEach(data => {
                                self.strengthen.set(data.id, new StrengthenData(data));
                            });
                            break;
                        case "avatar":
                            data.forEach(data => {
                                self.avatar.set(data.id, new AvatarData(data));
                            });
                            break;
                        case "achievement":
                            data.forEach(data => {
                                self.achievement.set(data.id, new AchievementData(data));
                            });
                            break;
                        case "remains":
                            data.forEach(data => {
                                self.remains.set(data.quality, new RemainsData(data));
                            });
                            break;
                        case "challenge":
                            data.forEach(data => {
                                self.challenge.set(data.phase, new ChallengeData(data));
                            });
                            break;
                        case "alliance":
                            data.forEach(data => {
                                self.alliance.set(data.level, new AllianceData(data));
                            });
                            break;
                        case "technology":
                            data.forEach(data => {
                                self.technology.set(data.id, new TechnologyData(data));
                            });
                            break;
                        case "position":
                            data.forEach(data => {
                                self.position.set(data.position_id, new PositionData(data));
                            });
                            break;
                        case "daily":
                            data.forEach(data => {
                                self.daily_task.set(data.task_type, new DailyData(data));
                            });
                            break;
                    }
                }
            });
        })
    }
}
