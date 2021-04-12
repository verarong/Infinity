import { ConsciousnessData, DomainData, FormulaData, LevelData, PhysiqueData, RootData, SkillData, StrengthenData } from "../Common/JsonData/JsonData";
import { Util } from "../Common/Utils/Util";
import RoleData from "../Data/RoleData";
import { BuildingData } from "../UI/Panel/BuildingPanel/Building/BuildingPanelData";
import { PrefabUrl } from "./PrefabUrl";

export default class DataContainer {

    public token: string;
    public expired: number = 900000

    //  --------------------------------     Store     --------------------------------  //
    public StoreData: any
    public StoreData_last: number
    public get_StoreData() {
        if (new Date().getTime() - this.StoreData_last > this.expired) {
            this.StoreData_last = new Date().getTime()
            let self = this
            window.appContext.WebApi.get_store_info(this, function (data) {
                self.set_StoreData(data)
            });
        }
        return this.StoreData
    }
    public set_StoreData(data) {
        this.StoreData = data
    }

    //  --------------------------------     Skill     --------------------------------  //
    public SkillData: any
    public SkillData_last: number
    public SkillLevel: Map<number, number> = new Map()
    public get_SkillData() {
        if (new Date().getTime() - this.SkillData_last > this.expired) {
            this.SkillData_last = new Date().getTime()
            let self = this
            window.appContext.WebApi.get_character_info("skill", this, function (data) {
                self.set_SkillData(data)
            });
        }
        return this.SkillData
    }
    public set_SkillData(data) {
        this.SkillData = data
        this.SkillLevel.clear()
        for (let x of data.skill) {
            this.SkillLevel.set(x.skill_id, x.level)
        };
    }

    //  --------------------------------     Role     --------------------------------  //
    public RoleData: RoleData
    public RoleData_last: number
    public get_RoleData() {
        if (new Date().getTime() - this.RoleData_last > this.expired) {
            this.RoleData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("main", this, function (data) {
                self.set_RoleData(data)
            })
        }
        return this.RoleData
    }
    public set_RoleData(data) {
        this.RoleData = new RoleData(data)
        return this.RoleData
    }

    //  --------------------------------     Domain     --------------------------------  //
    public DomainData: any
    public DomainData_last: number
    public DomainLevel: Map<number, number> = new Map()
    public get_DomainData() {
        if (new Date().getTime() - this.DomainData_last > this.expired) {
            this.DomainData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("domain", this, function (data) {
                self.set_DomainData(data)
            })
        }
        return this.DomainData
    }
    public set_DomainData(data) {
        this.DomainData = data
        this.DomainLevel.clear()
        for (let x of data.domain) {
            this.DomainLevel.set(x.building_id, x.level)
        };
    }

    //  --------------------------------     Item     --------------------------------  //
    public ItemData: any
    public ItemData_last: number
    public ItemAmount: Map<number, number> = new Map()
    public get_ItemData() {
        if (new Date().getTime() - this.ItemData_last > this.expired) {
            this.ItemData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("item", this, function (data) {
                self.set_ItemData(data)
            })
        }
        return this.ItemData
    }
    public set_ItemData(data) {
        this.ItemData = data
        this.ItemAmount.clear()
        for (let x of data.item) {
            if (this.ItemAmount.has(x.item_id)) {
                let current = this.ItemAmount.get(x.item_id)
                this.ItemAmount.set(x.item_id, current + x.amount)
            }
            else {
                this.ItemAmount.set(x.item_id, x.amount)
            }
        };
        return this.ItemAmount
    }
    public get_item_amount(item_id) {
        if (this.ItemAmount.has(item_id)) {
            return this.ItemAmount.get(item_id)
        }
        else {
            return 0
        }
    }

    //  --------------------------------     Equipment     --------------------------------  //
    public EquipmentData: any
    public EquipmentData_last: number
    public get_EquipmentData() {
        if (new Date().getTime() - this.EquipmentData_last > this.expired) {
            this.EquipmentData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("equipment", this, function (data) {
                self.set_EquipmentData(data)
            })
        }
        return this.EquipmentData
    }
    public set_EquipmentData(data) {
        this.EquipmentData = data
    }

    //  --------------------------------     Talent     --------------------------------  //
    public TalentData: any
    public TalentData_last: number
    public get_TalentData() {
        if (new Date().getTime() - this.TalentData_last > this.expired) {
            this.TalentData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("talent", this, function (data) {
                self.set_TalentData(data)
            })
        }
        return this.TalentData
    }
    public set_TalentData(data) {
        this.TalentData = data
    }

    //  --------------------------------     Formula     --------------------------------  //
    public FormulaData: any
    public FormulaData_last: number
    public Formulas: Array<number> = new Array()
    public get_FormulaData() {
        if (new Date().getTime() - this.FormulaData_last > this.expired) {
            this.FormulaData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("formula", this, function (data) {
                self.set_FormulaData(data)
            })
        }
        return this.FormulaData
    }
    public set_FormulaData(data) {
        this.FormulaData = data

        this.Formulas = new Array()
        for (let x of data.formula) {
            this.Formulas.push(x.formula_id)
        }
        return this.Formulas
    }

    //  --------------------------------     BattleSkill     --------------------------------  //
    public BattleSkillData: any
    public BattleSkillData_last: number
    public get_BattleSkillData() {
        if (new Date().getTime() - this.BattleSkillData_last > this.expired) {
            this.BattleSkillData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("battle_skill", this, function (data) {
                self.set_BattleSkillData(data)
            })
        }
        return this.BattleSkillData
    }
    public set_BattleSkillData(data) {
        this.BattleSkillData = data
    }

    //  --------------------------------     Partner     --------------------------------  //
    public PartnerData: any
    public PartnerData_last: number
    public PartnerDetail: Map<number, any> = new Map()
    // {"partner_id": self.partner_id, "intimacy": self.intimacy, "phase": self.phase,
    // "phase_award": self.phase_award, "last_give_gift": self.last_give_gift}
    public get_PartnerData() {
        if (new Date().getTime() - this.PartnerData_last > this.expired) {
            this.PartnerData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("partner", this, function (data) {
                self.set_PartnerData(data)
            })
        }
        return this.PartnerData
    }
    public set_PartnerData(data) {
        this.PartnerData = data
        this.PartnerDetail.clear()
        for (let x of data.partner) {
            this.PartnerDetail.set(x.partner_id, x)
        };
    }

    //  --------------------------------     Map     --------------------------------  //
    public MapData: any
    public MapData_last: number
    public get_MapData() {
        if (new Date().getTime() - this.MapData_last > this.expired) {
            this.MapData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("map", this, function (data) {
                self.set_MapData(data)
            })
        }
        return this.MapData
    }
    public set_MapData(data) {
        this.MapData = data
    }

    //  --------------------------------     Battle     --------------------------------  //
    public BattleData: any
    public BattleData_last: number
    public get_BattleData() {
        if (new Date().getTime() - this.BattleData_last > this.expired) {
            this.BattleData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_battle_info(this, function (data) {
                self.set_BattleData(data)
            })
        }
        return this.BattleData
    }
    public set_BattleData(data) {
        this.BattleData = data
    }

    //  --------------------------------     Map_loc     -------------------------------  //
    public posArray = new Array<cc.Vec2>()

    //  --------------------------------     Secret     --------------------------------  //
    public SecretData: any
    public SecretData_last: number
    public Secrets: Map<number, any> = new Map()
    public get_SecretData() {
        if (new Date().getTime() - this.SecretData_last > this.expired) {
            this.SecretData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_secret_info(this, function (data) {
                self.set_SecretData(data)
            })
        }
        return this.SecretData
    }
    public set_SecretData(data) {
        this.SecretData = data
        this.Secrets.clear()
        for (let x of this.SecretData) {
            this.Secrets.set(x.secret_id, x)
        }
    }

    //  --------------------------------     Configs     --------------------------------  //
    public ConfigsData: any
    public ConfigsData_last: number
    public get_ConfigsData() {
        if (new Date().getTime() - this.ConfigsData_last > this.expired) {
            this.ConfigsData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("user_configs", this, function (data) {
                self.set_ConfigsData(data)
            })
        }
        return this.ConfigsData
    }
    public refresh_ConfigsData() {
        this.ConfigsData_last = new Date().getTime()
        let self = this;
        window.appContext.WebApi.get_character_info("user_configs", this, function (data) {
            self.set_ConfigsData(data)
        })
    }
    public set_ConfigsData(data) {
        this.ConfigsData = data
    }


    //  --------------------------------     OnSale     --------------------------------  //
    public OnSaleData: any
    public OnSaleData_last: number
    public get_OnSaleData() {
        if (new Date().getTime() - this.OnSaleData_last > this.expired) {
            this.OnSaleData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("on_sale", this, function (data) {
                self.set_OnSaleData(data)
            })
        }
        return this.OnSaleData
    }
    public set_OnSaleData(data) {
        //[{"user_id": self.user_id, "on_sale_id": self.on_sale_id, "purchase_times": self.purchase_times}...]
        this.OnSaleData = data
    }
    public get_PurchaseTimes(on_sale_id): number {
        for (let on_sale of this.OnSaleData) {
            if (on_sale.on_sale_id == on_sale_id) {
                return on_sale.purchase_times
            }
        }
        return 0
    }


    //  --------------------------------     Guide     --------------------------------  //
    public GuideData: any
    public GuideData_last: number
    public get_GuideData() {
        if (new Date().getTime() - this.GuideData_last > this.expired) {
            this.GuideData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("role_params", this, function (data) {
                self.set_GuideData(data)
            })
        }
        return this.GuideData
    }
    public set_GuideData(data) {
        //{"user_id": self.user_id, "guide": self.guide, "level_trigger_guide": self.level_trigger_guide,
        //"achievement": self.achievement, "achievement_done": self.achievement_done}
        this.GuideData = data
    }


    //  --------------------------------     Avatar     --------------------------------  //
    public AvatarData: any
    public AvatarData_last: number
    public get_AvatarData() {
        if (new Date().getTime() - this.AvatarData_last > this.expired) {
            this.AvatarData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("avatar", this, function (data) {
                self.set_AvatarData(data)
            })
        }
        return this.AvatarData
    }
    public set_AvatarData(data) {
        //{"user_id": self.user_id, "head": self.head, "head_frame": self.head_frame,
        //"fight_animation": self.fight_animation, "heads": self.heads, "head_frames": self.head_frames,
        //"fight_animations": self.fight_animations}
        this.AvatarData = data
    }


    //  --------------------------------     Mail     --------------------------------  //
    public MailData: any
    public MailData_last: number
    public get_MailData() {
        if (new Date().getTime() - this.MailData_last > this.expired) {
            this.MailData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("mail", this, function (data) {
                self.set_MailData(data)
            })
        }
        return this.MailData
    }
    public set_MailData(data) {
        //{"user_id": self.user_id, "mail": self.mail}
        this.MailData = data
    }
    public check_MailData() {
        return this.MailData.mail.length ? true : false
    }


    //  --------------------------------     DailyParams     --------------------------------  //
    public DailyParamsData: any
    public DailyParamsData_last: number
    public get_DailyParamsData() {
        if (new Date().getTime() - this.DailyParamsData_last > this.expired) {
            this.DailyParamsData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("daily_params", this, function (data) {
                self.set_DailyParamsData(data)
            })
        }
        return this.DailyParamsData
    }
    public set_DailyParamsData(data) {
        //{"user_id": self.user_id, "head": self.head, "head_frame": self.head_frame,
        //"fight_animation": self.fight_animation, "heads": self.heads, "head_frames": self.head_frames,
        //"fight_animations": self.fight_animations}
        this.DailyParamsData = data
    }


    //  --------------------------------     Remains     --------------------------------  //
    public RemainsData: any
    public RemainsData_last: number
    public get_RemainsData() {
        if (new Date().getTime() - this.RemainsData_last > this.expired) {
            this.RemainsData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("remains", this, function (data) {
                self.set_RemainsData(data)
            })
        }
        return this.RemainsData
    }
    public set_RemainsData(data) {
        //{"user_id": self.user_id, "head": self.head, "head_frame": self.head_frame,
        //"fight_animation": self.fight_animation, "heads": self.heads, "head_frames": self.head_frames,
        //"fight_animations": self.fight_animations}
        this.RemainsData = data
    }


    //  --------------------------------     Challenge     --------------------------------  //
    public ChallengeData: any
    public ChallengeData_last: number
    public get_ChallengeData() {
        if (new Date().getTime() - this.ChallengeData_last > this.expired) {
            this.ChallengeData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("infinity_mode", this, function (data) {
                self.set_ChallengeData(data)
            })
        }
        return this.ChallengeData
    }
    public set_ChallengeData(data) {
        //{"user_id": self.user_id, "phase": self.phase, "step": self.step}
        this.ChallengeData = data
    }



    //  --------------------------------     UserAttribute     --------------------------------  //
    public UserAttributeData: any
    public UserAttributeData_last: number
    public get_UserAttributeData() {
        if (new Date().getTime() - this.UserAttributeData_last > this.expired) {
            this.UserAttributeData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("attribute", this, function (data) {
                self.set_UserAttributeData(data)
            })
        }
        return this.UserAttributeData
    }
    public set_UserAttributeData(data) {
        //{"attribute": attribute.attribute, "grade": attribute.grade}
        this.UserAttributeData = data
    }


    //  --------------------------------     Alliance     --------------------------------  //
    public AllianceData: any
    public AllianceData_last: number
    public get_AllianceData() {
        if (new Date().getTime() - this.AllianceData_last > this.expired) {
            this.AllianceData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("alliance", this, function (data) {
                self.set_AllianceData(data)
            })
        }
        return this.AllianceData
    }
    public set_AllianceData(data) {
        //{"alliance": alliance.summary(), "members": [x.summary() for x in members]}
        this.AllianceData = data
    }


    //  --------------------------------     AllianceParams     --------------------------------  //
    public AllianceParamsData: any
    public AllianceParamsData_last: number
    public get_AllianceParamsData() {
        if (new Date().getTime() - this.AllianceParamsData_last > this.expired) {
            this.AllianceParamsData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("alliance_params", this, function (data) {
                self.set_AllianceParamsData(data)
            })
        }
        return this.AllianceParamsData
    }
    public set_AllianceParamsData(data) {
        //{"user_id": self.user_id, "user_name": self.user_name, "alliance_id": self.alliance_id,
        // "position": self.position, "contribution": self.contribution,
        // "contribution_history": self.contribution_history, "last_login": self.last_login,
        // "last_exit": self.last_exit, "last_donate": self.last_donate}
        this.AllianceParamsData = data
    }


    //  --------------------------------     DailyTask     --------------------------------  //
    public DailyTaskData: any
    public DailyTaskData_last: number
    public get_DailyTaskData() {
        if (new Date().getTime() - this.DailyTaskData_last > this.expired) {
            this.DailyTaskData_last = new Date().getTime()
            let self = this;
            window.appContext.WebApi.get_character_info("daily_task", this, function (data) {
                self.set_DailyTaskData(data)
            })
        }
        return this.DailyTaskData
    }
    public set_DailyTaskData(data) {
        //{"user_id": self.user_id, "task": {task_type: {"times": 1 if task_progress_type == task_type else 0,
        // "requirements": configs.get_value("daily", task_type, "requirement"),
        // "done": False}}
        this.DailyTaskData = data
    }


    //  --------------------------------     INIT     --------------------------------  //
    public bool_init: boolean = false
    public INIT() {
        let self = this;
        window.appContext.WebApi.get_character_info("all", this, function (data) {
            self.set_BattleData(data.battle)
            self.set_BattleSkillData(data.battle_skill)
            self.set_DomainData(data.domain)
            self.set_EquipmentData(data.equipment)
            self.set_FormulaData(data.formula)
            self.set_ItemData(data.item)
            self.set_MapData(data.map)
            self.set_PartnerData(data.partner)
            self.set_RoleData(data.main)
            self.set_SecretData(data.secret)
            self.set_SkillData(data.skill)
            self.set_StoreData(data.store)
            self.set_TalentData(data.talent)
            self.set_ConfigsData(data.user_configs)
            self.set_OnSaleData(data.on_sale)
            self.set_GuideData(data.role_params)
            self.set_AvatarData(data.avatar)
            self.set_MailData(data.mail)
            self.set_DailyParamsData(data.daily_params)
            self.set_RemainsData(data.remains)
            self.set_ChallengeData(data.infinity_mode)
            self.set_UserAttributeData(data.attribute)
            self.set_AllianceData(data.alliance)
            self.set_AllianceParamsData(data.alliance_params)
            self.set_DailyTaskData(data.daily_task)
            window.appContext.UIManager.ShowPanel(PrefabUrl.DomainPanel);
            self.bool_init = true
            self.calculate_tips()
        })
    }


    //  --------------------------------     TIPS     --------------------------------  //
    public tips: Map<string, boolean> = new Map()
    public tips_compose: Map<string, boolean> = new Map()
    public tips_character: Map<string, boolean> = new Map()
    public calculate_tips() {
        this.tips.set("equipment", this.calculate_equipment_strength())
        this.tips_compose = this.calculate_compose()
        this.tips.set("compose", this.tips_compose.size ? true : false)
        this.tips_character.set("level", this.calculate_level())
        this.tips_character.set("consciousness", this.calculate_consciousness())
        this.tips_character.set("physique", this.calculate_physique())
        this.tips_character.set("root", this.calculate_root())
        this.tips.set("character", this.tips_character.get("level") || this.tips_character.get("consciousness") || this.tips_character.get("physique") || this.tips_character.get("root"))
        this.tips.set("partner", this.calculate_partner())
        this.tips.set("skill", this.calculate_skill())
        this.tips.set("building", this.calculate_building())
        this.tips.set("secret", this.calculate_secret())
        this.tips.set("world_boss", this.calculate_world_boss())
        this.tips.set("daily_task", this.calculate_daily_task())
        for (let [type_, bool_tip] of this.tips) {
            this.tips.set(type_, bool_tip && this.get_GuideData().guide >= 16)
        }
    }
    public calculate_equipment_strength() {
        let strengthen_level: Array<number> = new Array()
        for (let i of this.EquipmentData.equipment) {
            strengthen_level.push(i.params.strengthen)
        }
        let min = Math.min(...strengthen_level)
        let strengthen: StrengthenData = window.appContext.ConfigManager.GetStrengthen(min)
        let max = window.appContext.ConfigManager.GetMaxStrengthen()
        return min < max && Util.CheckItem(strengthen.item_id, strengthen.item_amount)
    }
    public calculate_compose() {
        let can_compose: Map<string, boolean> = new Map()
        for (let i of this.Formulas) {
            let formula: FormulaData = window.appContext.ConfigManager.GetformulaById(i)
            let check_item: boolean = true
            if (formula.item1) {
                check_item = check_item && Util.CheckItem(formula.item1, formula.amount1)
            }
            if (formula.item2) {
                check_item = check_item && Util.CheckItem(formula.item2, formula.amount2)
            }
            if (formula.item3) {
                check_item = check_item && Util.CheckItem(formula.item3, formula.amount3)
            }
            if (formula.item4) {
                check_item = check_item && Util.CheckItem(formula.item4, formula.amount4)
            }
            if (check_item) {
                can_compose.set(formula.art_type, true)
            }
        }
        return can_compose
    }
    public calculate_level() {
        let level: LevelData = window.appContext.ConfigManager.GetlevelById(this.RoleData.level)
        let max: number = window.appContext.ConfigManager.GetMaxLevel()
        let check_level: boolean = true
        check_level = this.RoleData.level < max && Util.CheckResource("exp", level.exp_require)
        if (level.consciousness_require) {
            check_level = check_level && Util.CheckRequirement("consciousness", level.consciousness_require)
        }
        if (level.physique_require) {
            check_level = check_level && Util.CheckRequirement("physique", level.physique_require)
        }
        return check_level
    }
    public calculate_consciousness() {
        let level: ConsciousnessData = window.appContext.ConfigManager.GetconsciousnessById(this.RoleData.consciousness)
        let max: number = window.appContext.ConfigManager.GetMaxConsciousnessLevel()
        return this.RoleData.consciousness < max && Util.CheckResource("soul", level.soul_require)
    }
    public calculate_physique() {
        let level: PhysiqueData = window.appContext.ConfigManager.GetphysiqueById(this.RoleData.physique)
        let max: number = window.appContext.ConfigManager.GetMaxPhysiqueLevel()
        return this.RoleData.physique < max && Util.CheckResource("gas", level.gas_require)
    }
    public calculate_root() {
        let root: Array<string> = this.RoleData.root.split(",");
        for (let i of root) {
            let level: RootData = window.appContext.ConfigManager.GetrootById(parseInt(i))
            let max: number = window.appContext.ConfigManager.GetMaxRootLevel()
            if (level.amount) {
                if (parseInt(i) < max && Util.CheckItem(level.item_require, level.amount)) {
                    return true
                }
            }
            else {
                if (parseInt(i) < max && Util.CheckResource("chaos", level.chaos_require)) {
                    return true
                }
            }
        }
        return false
    }
    public calculate_partner() {
        for (let i of this.PartnerData.partner) {
            if (i.last_give_gift + 4 * 3600 - Math.floor(new Date().getTime() / 1000) <= 0) {
                return true
            }
        }
        return false
    }
    public calculate_skill() {
        for (let i of this.SkillData.skill) {
            let skill: SkillData = window.appContext.ConfigManager.GetskillById(i.skill_id)
            if (i.level < skill.max_level && Util.CheckResource(skill.resource, skill.cost_per_level * i.level)) {
                return true
            }
        }
        return this.RoleData.talent_point > 0
    }
    public calculate_building() {
        for (let i of this.DomainData.domain) {
            let building: DomainData = window.appContext.ConfigManager.GetdomainByBuildingIdAndLevel(i.building_id, i.level)
            let max: number = window.appContext.ConfigManager.GetMaxDomainLevelByBuildingId(i.building_id)
            let check_badge: boolean = true
            if (building.dragon_badge) {
                check_badge = check_badge && Util.CheckResource("dragon_badge", building.dragon_badge)
            }
            if (building.tiger_badge) {
                check_badge = check_badge && Util.CheckResource("tiger_badge", building.tiger_badge)
            }
            if (building.phoenix_badge) {
                check_badge = check_badge && Util.CheckResource("phoenix_badge", building.phoenix_badge)
            }
            if (building.tortoise_badge) {
                check_badge = check_badge && Util.CheckResource("tortoise_badge", building.tortoise_badge)
            }
            if (i.level < max && check_badge) {
                return true
            }
        }
        return false
    }
    public calculate_secret() {
        for (let secret of this.SecretData) {
            if (secret.state == 1) {
                return false
            }
        }
        return true
    }
    private getNowDate(split = "/"): string {
        const date = new Date();
        let month: string | number = date.getMonth() + 1;
        let strDate: string | number = date.getDate();
        if (month <= 9) {
            month = "0" + month;
        }
        if (strDate <= 9) {
            strDate = "0" + strDate;
        }
        return date.getFullYear() + split + month + split + strDate
    }
    public calculate_world_boss() {
        let current = new Date()
        let now_data = this.getNowDate()
        let [begin, end] = window.appContext.ConfigManager.GetBasicValueByType("world_boss_time_range").toString().split(" - ")
        let beginDate = new Date(now_data + " " + begin)
        let endDate = new Date(now_data + " " + end)
        if (current >= beginDate && current <= endDate) {
            return true;
        }
        return false
    }
    public calculate_daily_task() {
        let daily_task = window.appContext.DataContainer.get_DailyTaskData()
        if (daily_task) {
            for (let data of window.appContext.ConfigManager.GetDailyTasks().values()) {
                if (!daily_task.task[data.task_type]["done"] && daily_task.task[data.task_type]["times"] == data.requirement) {
                    return true
                }
            }
        }
        return false
    }
}


