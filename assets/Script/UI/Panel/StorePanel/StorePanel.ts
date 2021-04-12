
import StoreList from "./Stores/StoreList";

import { StorePanelData, RechargePanelData, OnSalePanelData } from "./Stores/StorePanelData";
import { UIComponent } from "../../Common/UIComponent";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { ItemData, StoreData } from "../../../Common/JsonData/JsonData";
import RechargeList from "./Stores/RechargeList";
import OnSaleList from "./Stores/OnSaleList";
import { Util } from "../../../Common/Utils/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StorePanel extends UIComponent {

    public last_update: number;
    public check_refresh_cost: boolean;

    @property(cc.Label)
    public time: cc.Label;

    @property(cc.Sprite)
    public cost: cc.Sprite;

    @property(cc.Label)
    public amount: cc.Label;

    @property(StoreList)
    public StoreList: StoreList;

    @property(RechargeList)
    public RechargeList: RechargeList;

    @property(OnSaleList)
    public OnSaleList: OnSaleList;

    public BackBtnClick() {
        window.appContext.UIManager.ShowPanel(PrefabUrl.DomainPanel);
        this.unscheduleAllCallbacks();
    }

    //UI加载完成后将参数传进来
    public loadCompleteCall(args) {
        return;
    }

    public refreshStore() {
        if (this.check_refresh_cost) {
            let self = this
            window.appContext.WebApi.refresh_store(this, function (succeed_data) {
                window.appContext.WebApi.get_character_info(["main", "item", "store"], this, function (data) {
                    window.appContext.DataContainer.set_RoleData(data.main)
                    window.appContext.DataContainer.set_ItemData(data.item)
                    window.appContext.DataContainer.set_StoreData(data.store)
                    self.refresh();
                });
            })
        }
        else {
            Util.ToastByCode(196, true)
        }
    }

    public showRefreshStoreCost(refresh_hour = 4) {
        let item_id: number = window.appContext.ConfigManager.GetBasicValueByType("refresh_store_item_cost")
        let item: ItemData = window.appContext.ConfigManager.GetitemByItemId(item_id)
        let cost: number = window.appContext.ConfigManager.GetBasicValueByType("refresh_store_jade_cost")
        if (Util.CheckItem(item_id, 1)) {
            window.appContext.Pool.setSpriteFrameByUrl(item.icon, this.cost);
            this.amount.string = "*1"
            this.check_refresh_cost = true
            this.amount.node.color = Util.ButtonColor("common")
        }
        else {
            window.appContext.Pool.setSpriteFrameByUrl("jade", this.cost);
            this.amount.string = "*" + cost
            this.check_refresh_cost = Util.CheckResource("jade", cost)
            this.amount.node.color = this.check_refresh_cost ? Util.ButtonColor("common") : Util.ButtonColor("shortage")
        }

        let rest: number = this.last_update + 3600 * refresh_hour - Math.floor(new Date().getTime() / 1000)
        this.unscheduleAllCallbacks();
        this.schedule(function () {
            if (rest > 0) {
                this.time.string = Util.FormatCountDown(rest)
                rest--
            }
            else {
                this.refresh(true)
            }
        }, 1, cc.macro.REPEAT_FOREVER, 0)
    }

    public ShowByData() {
        this.showRefreshStoreCost()

        let data = window.appContext.DataContainer.get_StoreData()
        this.last_update = data.last_update;

        let data_list: Array<StorePanelData> = new Array();
        for (let i = 0; i < data.goods.length; i++) {
            data_list.push(new StorePanelData(data.goods[i], data.bool_purchased[i]))
        };
        this.StoreList.ApplyData(data_list);
    }

    public refresh(refresh: boolean = false) {
        let self = this
        if (refresh || window.appContext.DataContainer.get_StoreData() == undefined) {
            window.appContext.WebApi.get_character_info(["store", "item", "main", "on_sale", "daily_task"], this, function (data) {
                window.appContext.DataContainer.set_StoreData(data.store)
                window.appContext.DataContainer.set_ItemData(data.item)
                window.appContext.DataContainer.set_RoleData(data.main)
                window.appContext.DataContainer.set_OnSaleData(data.on_sale)
                window.appContext.DataContainer.set_DailyTaskData(data.daily_task)
                self.ShowByData()
                self.ShowOnSale()
            });
        }
        else {
            this.ShowByData()
            this.ShowOnSale()
        }
    }

    public ShowRecharge() {
        let recharge_items: Map<number, StoreData> = window.appContext.ConfigManager.GetRechargeItems();
        let data_list: Array<RechargePanelData> = new Array();

        for (let recharge_item of recharge_items.values()) {
            let data_ = new RechargePanelData(recharge_item.item_id, recharge_item.jade, recharge_item.rmb)
            data_list.push(data_)
        }

        this.RechargeList.ApplyData(data_list);
    }

    public ShowOnSale() {
        let data_list: Array<OnSalePanelData> = new Array()
        for (let x of window.appContext.ConfigManager.GetOnSale()) {
            data_list.push(new OnSalePanelData(x))
        }
        this.OnSaleList.ApplyData(data_list);
    }

    public onEnable() {
        this.refresh()
        this.ShowRecharge()
        this.ShowOnSale()
    }
}
