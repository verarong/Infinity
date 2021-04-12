import { HttpUtil } from "../Common/Utils/HttpUtil";
import { Debug } from "../Common/Debug";
import { Util } from "../Common/Utils/Util";
import { UIComponent } from "../UI/Common/UIComponent";
import DomainPanel from "../UI/Panel/DomainPanel/DomainPanel";
import { PrefabUrl } from "./PrefabUrl";

export default class WebApi {

    public onRequestSucc(
        code,
        res,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null,
        isNeedShowDialog_failed = true,
        isNeedShowDialog_succeed = true,
        Sound_succeed = "ui_succeed",
        Sound_failed = "ui_failed") {
        if (code == 0) {
            let response = JSON.parse(res);
            Debug.log(response);
            let code = response.code;
            let status = response.status;
            let data = response.data;

            let codeData = window.appContext.ConfigManager.GetCodeDataById(code);
            let tip = null;
            if (codeData) {
                tip = codeData.code;
            }
            tip = tip || "系统错误";
            Debug.log(tip);

            if (code == 88) {
                Util.ToastByCode(198, true)
                let panel: UIComponent = window.appContext.UIManager.getCurrentPanel()
                if (panel) {
                    panel.scheduleOnce(function () {
                        window.appContext.UIManager.ShowPanel(PrefabUrl.LoginPanel)
                    }, 1);
                }
            }
            else {
                if (status != "Succeed") {
                    if (isNeedShowDialog_failed) {
                        Util.ToastByCode(code, true)
                    }

                    if (Sound_failed) {
                        window.appContext.SoundManager.playSFX(Sound_failed);
                    }

                    if (caller && failCallback) {
                        failCallback.call(caller, data);
                    }
                }
                else {
                    if (isNeedShowDialog_succeed) {
                        Util.ToastByCode(code)
                    }

                    if (Sound_succeed) {
                        window.appContext.SoundManager.playSFX(Sound_succeed);
                    }

                    let panel: UIComponent = window.appContext.UIManager.getCurrentPanel()
                    if (panel && panel.prefabUrl.lastIndexOf("DomainPanel") > -1) {
                        panel.refresh()
                    }

                    if (caller && succCallback) {
                        succCallback.call(caller, data);
                    }

                    if (window.appContext.DataContainer.bool_init) {
                        window.appContext.DataContainer.calculate_tips()
                    }
                }
            }

        }
    }

    // ===============================================Authentication==============================================================

    public login(
        openid: string,
        password: string,
        channel: string,
        token: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {

        let request: any = {};
        request.openid = openid;
        request.password = password;
        request.channel = channel;
        request.token = token;

        HttpUtil.Post("login", request, function (code, res) {
            if (code == 0) {
                let response = JSON.parse(res);
                Debug.log(response);
                let code = response.code;
                let status = response.status;
                let data = response.data;

                let codeData = window.appContext.ConfigManager.GetCodeDataById(code);
                let tip = null;
                if (codeData) {
                    tip = codeData.code;
                }
                tip = tip || "系统错误";
                Debug.log(tip);
                if (status != "Succeed") {
                    window.appContext.UIManager.ShowCommonDialog(tip);
                    if (caller && failCallback) {
                        failCallback.call(caller);
                    }
                } else {
                    window.appContext.DataContainer.token = data.token;
                    if (caller && succCallback) {
                        succCallback.call(caller, data);
                    }
                }
            }
        });
    }

    // ===================================================Get_Character_Info=========================================================

    //get_character_info
    public get_character_info(
        info_type: string | Array<string>,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.info_type = info_type;
        let self = this;
        HttpUtil.Post("get_character_info", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    //get_store_info
    public get_store_info(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("get_store_info", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    //get_secret_info
    public get_secret_info(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("get_secret_info", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    /**
     * 获取世界地图信息
     */
    public get_battle_info(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("get_battle_info", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    /**
     * 获取排行榜信息
     */
    public get_users_rank(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("get_users_rank", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }


    // ====================================================User_handle===========================================================

    //设置角色初始化
    public set_user_init(
        name: string,
        titles: Array<number>,
        init_params: Array<number>,
        head_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null
    ) {
        let request: any = {};
        request.name = name;
        request.titles = titles;
        request.init_params = init_params;
        request.head_id = head_id;

        let self = this;
        HttpUtil.Post("set_user_init", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    //purchase_goods
    public purchase_goods(
        goods_index: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.goods_index = goods_index
        let self = this;
        HttpUtil.Post("purchase_goods", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //refresh_store
    public refresh_store(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("refresh_store", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //purchase_on_sale
    public purchase_on_sale(
        goods_index: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.goods_index = goods_index
        let self = this;
        HttpUtil.Post("purchase_on_sale", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //recharge
    public recharge(
        goods_index: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.jade_id = goods_index
        let self = this;
        HttpUtil.Post("recharge", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //activate_skill
    public activate_skill(
        id: number,
        resource: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.id = id
        request.resource = resource
        let self = this;
        HttpUtil.Post("activate_skill", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //activate_formula
    public activate_formula(
        id: number,
        resource: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.id = id
        request.resource = resource
        let self = this;
        HttpUtil.Post("activate_formula", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //activate_avatar
    public activate_avatar(
        avatar_type: string,
        avatar_id: number,
        resource: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.avatar_type = avatar_type
        request.avatar_id = avatar_id
        request.resource = resource
        let self = this;
        HttpUtil.Post("activate_avatar", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //set_avatar
    public set_avatar(
        avatar_type: string,
        avatar_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.avatar_type = avatar_type
        request.avatar_id = avatar_id
        let self = this;
        HttpUtil.Post("set_avatar", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //set_recover_configs
    public set_recover_configs(
        item_phase_list: Array<boolean>,
        equipment_phase_list: Array<boolean>,
        item_quality_list: Array<boolean>,
        equipment_quality_list: Array<boolean>,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.item_phase_list = item_phase_list
        request.equipment_phase_list = equipment_phase_list
        request.item_quality_list = item_quality_list
        request.equipment_quality_list = equipment_quality_list
        let self = this;
        HttpUtil.Post("set_recover_configs", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //guide_advance
    public guide_advance(
        condition_type: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.condition_type = condition_type
        let self = this;
        HttpUtil.Post("guide_advance", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }


    //skip_guide
    public skip_guide(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("skip_guide", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }
    // -----------------------------------------User_Upgrade-------------------------------------

    //domain_upgrade
    public domain_upgrade(
        building_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.building_id = building_id
        let self = this;
        HttpUtil.Post("domain_upgrade", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //level_upgrade
    public level_upgrade(
        item: number,
        amount: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.item = item
        request.amount = amount
        let self = this;
        HttpUtil.Post("level_upgrade", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //phase_break
    public phase_break(
        break_type: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.break_type = break_type
        let self = this;
        HttpUtil.Post("phase_break", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //consciousness_upgrade
    public consciousness_upgrade(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("consciousness_upgrade", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //physique_upgrade
    public physique_upgrade(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("physique_upgrade", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //root_upgrade
    public root_upgrade(
        root_type: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.root_type = root_type
        let self = this;
        HttpUtil.Post("root_upgrade", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // ====================================================Item_Handle===========================================================

    //recover_item
    public recover_item(
        package_item_id: number,
        amount: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.package_item_id = package_item_id
        request.amount = amount
        let self = this;
        HttpUtil.Post("recover_item", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }


    //recover_item_batch
    public recover_item_batch(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("recover_item_batch", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //wear_equipment
    public wear_equipment(
        package_item_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.package_item_id = package_item_id
        let self = this;
        HttpUtil.Post("wear_equipment", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, true, "ui_equipment");
        });
    }


    //strengthen_equipment
    public strengthen_equipment(
        equipment_class: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.equipment_class = equipment_class
        let self = this;
        HttpUtil.Post("strengthen_equipment", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }


    //use_item
    public use_item(
        item_id: number,
        amount: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.item_id = item_id
        request.amount = amount
        let self = this;
        HttpUtil.Post("use_item", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //lock_item
    public lock_item(
        package_item_id: number,
        use_lock: boolean,
        type: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.package_item_id = package_item_id
        request.use_lock = use_lock
        request.type = type
        let self = this;
        HttpUtil.Post("lock_item", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // ====================================================Skill===========================================================

    //add_talent
    public add_talent(
        talent_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.talent_id = talent_id
        let self = this;
        HttpUtil.Post("add_talent", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //upgrade_skill
    public upgrade_skill(
        skill_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.skill_id = skill_id
        let self = this;
        HttpUtil.Post("upgrade_skill", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //set_skill_list
    public set_skill_list(
        skill_list: Array<number>,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.skill_list = skill_list
        let self = this;
        HttpUtil.Post("set_skill_list", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // ====================================================Compose===========================================================

    //compose
    public compose(
        formula_id: number,
        compose_amount: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.formula_id = formula_id
        request.compose_amount = compose_amount
        let self = this;
        HttpUtil.Post("compose", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }


    // ====================================================Partner===========================================================

    //give_gift
    public give_gift(
        partner_id: number,
        item_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.partner_id = partner_id
        request.item_id = item_id
        let self = this;
        HttpUtil.Post("give_gift", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //get_partner_award
    public get_partner_award(
        partner_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.partner_id = partner_id
        let self = this;
        HttpUtil.Post("get_partner_award", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }


    // ====================================================Battle===========================================================

    /**
    * 仙域战斗
    */
    public battle_init(
        mapId: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.map_id = mapId;
        request.height = 300;
        let self = this;
        HttpUtil.Post("battle_init", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    //get_skill_list 获取当前出站技能
    public get_skill_list(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("get_skill_list", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    //fight_node，战斗指定节点
    public fight_node(
        move_to_node: string,
        buff: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.move_to_node = move_to_node;
        request.buff = buff;
        let self = this;
        HttpUtil.Post("fight_node", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    //campfire_node
    public campfire_node(
        move_to_node: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.move_to_node = move_to_node;
        let self = this;
        HttpUtil.Post("campfire_node", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    //battle_statement，仙域通关后的战斗结算
    public battle_statement(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("battle_statement", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //probe_secret 开始探索秘境
    public probe_secret(
        secret_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.secret_id = secret_id;
        let self = this;
        HttpUtil.Post("probe_secret", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //probe_immediately，使用仙玉提前完成秘境探索
    public probe_immediately(
        secret_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.secret_id = secret_id;
        let self = this;
        HttpUtil.Post("probe_immediately", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //probe_statement 秘境探索奖励结算
    public probe_statement(
        secret_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.secret_id = secret_id;
        let self = this;
        HttpUtil.Post("probe_statement", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //box_node，进入宝箱节点
    public box_node(
        move_to_node: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.move_to_node = move_to_node;
        let self = this;
        HttpUtil.Post("box_node", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //event_node，进入事件节点
    public event_node(
        move_to_node: string,
        choice: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.move_to_node = move_to_node;
        request.choice = choice;
        let self = this;
        HttpUtil.Post("event_node", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //thread_node，进入主线节点
    public thread_node(
        move_to_node: string,
        choice: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.move_to_node = move_to_node;
        request.choice = choice;
        let self = this;
        HttpUtil.Post("thread_node", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }


    // ====================================================Achievement===========================================================

    //get_achievement_award
    public get_achievement_award(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("get_achievement_award", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    //fight_achievement
    public fight_achievement(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("fight_achievement", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false);
        });
    }


    // ====================================================Coupon===========================================================

    // get_coupon
    public get_coupon(
        coupon_id: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.coupon_id = coupon_id;
        let self = this;
        HttpUtil.Post("get_coupon", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }


    // ====================================================Mail===========================================================

    // receive_mail
    public receive_mail(
        mail_index: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.mail_index = mail_index;
        let self = this;
        HttpUtil.Post("receive_mail", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // receive_mail_batch
    public receive_mail_batch(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("receive_mail_batch", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // ====================================================Remains===========================================================

    // get_remains_info
    public get_remains_info(
        remains_quality: number,
        page_index: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.remains_quality = remains_quality;
        request.page_index = page_index;
        let self = this;
        HttpUtil.Post("get_remains_info", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false);
        });
    }

    // remains_capture_free
    public remains_capture_free(
        remains_quality: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.remains_quality = remains_quality;
        let self = this;
        HttpUtil.Post("remains_capture_free", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    // remains_capture_exist
    public remains_capture_exist(
        remains_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.remains_id = remains_id;
        let self = this;
        HttpUtil.Post("remains_capture_exist", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    // remains_harvest
    public remains_harvest(
        remains_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.remains_id = remains_id;
        let self = this;
        HttpUtil.Post("remains_harvest", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // remains_conquer
    public remains_conquer(
        remains_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.remains_id = remains_id;
        let self = this;
        HttpUtil.Post("remains_conquer", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    // remains_emancipate
    public remains_emancipate(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("remains_emancipate", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }


    // ====================================================Challenge===========================================================

    // new_infinity_challenge
    public new_infinity_challenge(
        phase: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.phase = phase;
        let self = this;
        HttpUtil.Post("new_infinity_challenge", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // infinity_challenge
    public infinity_challenge(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("infinity_challenge", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }


    // ====================================================World_Boss===========================================================

    // get_world_boss_info
    public get_world_boss_info(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("get_world_boss_info", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    // world_boss_fight
    public world_boss_fight(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("world_boss_fight", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }


    //====================================================Alliance===========================================================

    // create_alliance
    public create_alliance(
        alliance_name: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.alliance_name = alliance_name;
        let self = this;
        HttpUtil.Post("create_alliance", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // upgrade_alliance
    public upgrade_alliance(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("upgrade_alliance", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // search_alliance
    public search_alliance(
        page_index: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.page_index = page_index;
        let self = this;
        HttpUtil.Post("search_alliance", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }

    // set_join_threshold
    public set_join_threshold(
        threshold: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.threshold = threshold;
        let self = this;
        HttpUtil.Post("set_join_threshold", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // join_alliance
    public join_alliance(
        alliance_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.alliance_id = alliance_id;
        let self = this;
        HttpUtil.Post("join_alliance", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // fire_member
    public fire_member(
        member_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.member_id = member_id;
        let self = this;
        HttpUtil.Post("fire_member", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // apply_for_captain
    public apply_for_captain(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("apply_for_captain", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // exit_alliance
    public exit_alliance(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("exit_alliance", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // upgrade_position
    public upgrade_position(
        member_id: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.member_id = member_id;
        let self = this;
        HttpUtil.Post("upgrade_position", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // donate_resource
    public donate_resource(
        item_id: number,
        amount: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.item_id = item_id;
        request.amount = amount;
        let self = this;
        HttpUtil.Post("donate_resource", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // donate_jade
    public donate_jade(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("donate_jade", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // exchange_award
    public exchange_award(
        item_id: number,
        amount: number,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.item_id = item_id;
        request.amount = amount;
        let self = this;
        HttpUtil.Post("exchange_award", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }

    // upgrade_alliance_technology
    public upgrade_alliance_technology(
        technology_id: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.technology_id = technology_id;
        let self = this;
        HttpUtil.Post("upgrade_alliance_technology", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }


    // fight_alliance_boss
    public fight_alliance_boss(
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        let self = this;
        HttpUtil.Post("fight_alliance_boss", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback, true, false, null, null);
        });
    }


    //====================================================Alliance===========================================================

    // daily_task_done
    public daily_task_done(
        task_progress_type: string,
        caller: any = null,
        succCallback: Function = null,
        failCallback: Function = null) {
        let request: any = {};
        request.task_progress_type = task_progress_type;
        let self = this;
        HttpUtil.Post("daily_task_done", request, function (code, res) {
            self.onRequestSucc(code, res, caller, succCallback, failCallback);
        });
    }
}