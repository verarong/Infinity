import { Debug } from "../../../../Common/Debug";
import { EquipmentData, ItemData } from "../../../../Common/JsonData/JsonData";
import { Item } from "../../../../ItemList/Item";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import AlliancePanel from "../AlliancePanel";
import { ExchangeData } from "./AllianceData";



const { ccclass, property } = cc._decorator;

@ccclass
export class ExchangeItem extends Item<ExchangeData> {

    private item_index: number
    private exchange_amount: number = 1
    private max_exchange: number
    private _data: ExchangeData;

    @property(cc.Sprite)
    public icon: cc.Sprite;

    @property(cc.Sprite)
    public icon_bg: cc.Sprite;

    @property(cc.Sprite)
    public icon_phase: cc.Sprite;

    @property(cc.Label)
    public amount: cc.Label;

    @property(cc.Label)
    public contribution: cc.Label;

    getData(): ExchangeData {
        return this._data;
    }


    public minus() {
        if (this.exchange_amount > 1) {
            this.exchange_amount -= 1
        }
        this.refresh_exchange_amount()
    }

    public add() {
        if (this.exchange_amount < this.max_exchange) {
            this.exchange_amount += 1
        }
        this.refresh_exchange_amount()
    }

    public max() {
        this.exchange_amount = this.max_exchange
        this.refresh_exchange_amount()
    }


    refresh_exchange_amount() {
        this.amount.string = this.exchange_amount.toString()
        this.contribution.string = "贡献 " + this.exchange_amount * this._data.contribution_cost + "/" + window.appContext.DataContainer.get_AllianceParamsData().contribution
    }

    public exchange() {
        window.appContext.WebApi.exchange_award(this._data.item_id, this.exchange_amount, this, function (data) {
            let AlliancePanel: AlliancePanel = window.appContext.UIManager.getCurrentPanel()
            AlliancePanel.refresh(true)
        })
    }

    showByData() {
        this.max_exchange = Math.floor(window.appContext.DataContainer.get_AllianceParamsData().contribution / this._data.contribution_cost)
        this.refresh_exchange_amount()

        window.appContext.Pool.setSpriteFrameByUrl(this._data.item_data.icon, this.icon);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item_data.icon_bg, this.icon_bg);
        window.appContext.Pool.setSpriteFrameByUrl(this._data.item_data.icon_phase, this.icon_phase);
    }

    bindData(currentIndex: number, data: ExchangeData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }
        this.item_index = currentIndex
        this._data = data;

        this.showByData()
    }

    reset(currentIndex: number): void {
        //TODO
    }

    select(selected: boolean): void {
        Debug.log("select:" + selected);
    }

    getClickButton(): cc.Button {
        return this.node.getComponent(cc.Button);
    }
}