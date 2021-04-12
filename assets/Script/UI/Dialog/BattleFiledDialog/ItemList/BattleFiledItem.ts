import { Item } from "../../../../ItemList/Item";
import LineList from "./LineList";
import { Debug } from "../../../../Common/Debug";
import { Util } from "../../../../Common/Utils/Util";
import LineData from "./LineData";
import AspectRatioTool from "../../../Button/AspectRatioTool";
import { PrefabUrl } from "../../../../Manager/PrefabUrl";
import Flashing from "../../../Button/Flashing";
import { BattleFiledData, NodeType } from "./BattleFiledData";
import BattleFiledDialog from "../BattleFiledDialog";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BattleFiledItem extends Item<BattleFiledData> {

    private _data: BattleFiledData;
    private click: boolean;
    private line_done: boolean = false

    @property(cc.Sprite)
    public Icon: cc.Sprite;

    @property(cc.Prefab)
    public LineList: cc.Prefab;

    @property(AspectRatioTool)
    public AspectRatioTool: AspectRatioTool;

    @property(Flashing)
    public Flashing: Flashing;

    public Test: number;

    private lineItemHeight = 20;


    private LineLists: Array<cc.Node> = new Array<cc.Node>();
    getData(): BattleFiledData {
        return this._data;
    }

    onEnable() {

    }

    bindData(currentIndex: number, data: BattleFiledData) {
        this._data = data;
        this.click = true;
        this.node.position = new cc.Vec2(data.loc[0] + data.offset.x, data.loc[1] + data.offset.y);
        window.appContext.Pool.setSpriteFrameByUrl(data.type, this.Icon);
        let scale: number = data.type == "boss" ? 2.3 : (data.type == "monster" ? 1 : 1.3)
        this.Icon.node.scale = scale
        this.Icon.node.color = data.hasDone || data.key == data.currentNodeKey ? cc.Color.RED : cc.Color.WHITE

        if (data.isCanGo) {
            this.Flashing.startFlashing(scale);
        } else {
            this.Flashing.stopFlashing();
        }

        this.scheduleOnce(function () {
            if (!this.line_done) {
                this.refreshLine();   //需要延时操作的内容
            }
            this.line_done = true
        }, 0.2);
    }

    refreshLine() {
        this.LineLists = new Array<cc.Node>();
        let parentBattleFieldItems = this._data.battleFieldList.GetParentBattleFieldItems(this);
        let currentPos = this.node.position;
        let parentPos: Array<cc.Vec2> = new Array<cc.Vec2>();
        for (let index = 0; index < parentBattleFieldItems.length; index++) {
            let parentBattleFieldItem = parentBattleFieldItems[index] as BattleFiledItem;
            let lineListNode = window.appContext.Pool.requestInstantWithArgs(this.LineList, new cc.Vec2(0, 20), 0, this.node);
            let lineList = lineListNode.getComponent(LineList);
            // lineListNode.lookAt(parentBattleFieldItem.node.position)
            let distance = Util.getDistance(currentPos, parentBattleFieldItem.node.position);

            distance = distance - (distance * 0.2);

            let vec = Util.getVectorByTwoPoint(currentPos, parentBattleFieldItem.node.position);
            vec = Util.normalizeVec(vec);
            let angle: number = Util.getAngle(Util.angleToY(vec));

            let childCount = Math.floor(distance / this.lineItemHeight);
            lineListNode.angle = angle;

            let lineDatas: Array<LineData> = new Array<LineData>();
            for (let index = 0; index < childCount; index++) {
                let lineData = new LineData();
                lineDatas.push(lineData);
            }

            lineList.ApplyData(lineDatas);

            this.LineLists.push(lineListNode);
        }
    }

    reset(currentIndex: number): void {
        this.Icon.spriteFrame = null;
    }

    select(selected: boolean): void {
        if (!selected) {
            return;
        }
        else if (this._data.isCanGo) {
            switch (this._data.nodeType) {
                case NodeType.Fight:
                    this.gotoFightNode();
                    break;
                case NodeType.Box:
                    this.gotoBoxNode();
                    break;
                case NodeType.Event:
                    this.gotoEventNode();
                    break;
                case NodeType.Thread:
                    this.gotoThread();
                    break;
                case NodeType.Campfire:
                    this.gotoCampfire();
                    break;
            }
            this.click = false
        }
        else {
            Util.ToastByCode(65, true)
        }
    }

    private gotoFightNode() {
        if (this._data.legal_buff.length) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.BuffChoiceDialog, this._data)
        }
        else {
            window.appContext.WebApi.fight_node(this._data.key, null, this,
                //战斗成功
                function (succData) {
                    window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, succData);
                    window.appContext.WebApi.get_character_info(["battle", "main"], this, function (data) {
                        window.appContext.DataContainer.set_BattleData(data.battle)
                        window.appContext.DataContainer.set_RoleData(data.main)
                        let battleFiledDialog = window.appContext.UIManager.getDialog(PrefabUrl.BattleFiledDialog) as BattleFiledDialog;
                        battleFiledDialog.refresh()
                    })
                }
            );
        }
    }

    private gotoCampfire() {
        window.appContext.WebApi.campfire_node(this._data.key, this,
            function (succData) {
                window.appContext.WebApi.get_character_info(["battle"], this, function (data) {
                    window.appContext.DataContainer.set_BattleData(data.battle)
                    let battleFiledDialog = window.appContext.UIManager.getDialog(PrefabUrl.BattleFiledDialog) as BattleFiledDialog;
                    battleFiledDialog.refresh()
                })
            }
        );
        let ratio: number = window.appContext.ConfigManager.GetBasicValueByType("campfire_healing_ratio")
        window.appContext.UIManager.ShowCommonDialog("您美美的睡了一觉\n恢复" + Math.round(ratio * 100) + "%生命值", "篝火", false, null, null, null, true)
    }

    private gotoBoxNode() {
        let info = [this._data.key, this._data.detail]
        window.appContext.UIManager.ShowDialog(PrefabUrl.BoxDialog, info)
    }

    private gotoEventNode() {
        let info = [this._data.key, this._data.detail]
        window.appContext.UIManager.ShowDialog(PrefabUrl.EventDialog, info)
    }

    private gotoThread() {
        let info = [this._data.key, this._data.detail, this.click, false]
        window.appContext.UIManager.ShowDialog(PrefabUrl.ThreadDialog, info)
    }

    getClickButton(): cc.Button {
        return this.Icon.getComponent(cc.Button);
    }
}
