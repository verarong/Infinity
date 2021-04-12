import { BaseDialog } from "../../Common/BaseDialog";
import BattleFiledList from "./ItemList/BattleFiledList";
import { Util } from "../../../Common/Utils/Util";
import { BattleFiledData } from "./ItemList/BattleFiledData";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { BuffList } from "./ItemList/BuffList";
import MapBuffData from "./ItemList/BuffData";


const { ccclass, property } = cc._decorator;

@ccclass
export default class BattleFiledDialog extends BaseDialog {

    @property(cc.Label)
    public life: cc.Label;

    @property(BuffList)
    public BuffList: BuffList;

    @property(BattleFiledList)
    public BattlefieldList: BattleFiledList;

    @property(cc.Node)
    public Content: cc.Node;

    private maxHeight: number;

    private offset: cc.Vec2 = new cc.Vec2(0, -50);

    //当前打过的节点
    private currentLoc: string;

    private contentPos: cc.Vec2;

    onLoad() {
        this.contentPos = this.Content.position.clone();
    }

    onEnable() {
        this.refresh();

        let state: number = window.appContext.DataContainer.get_BattleData().label
        if (state == 2) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.ResultDialog, false);
        }
        else if (state == 3) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.ResultDialog, true);
        }
        this.Content.position = this.contentPos;
    }

    public showByData() {

        /***
        {
            "code": 60,
            "data": {
                "buff": [],
                "difficulty": 2,
                "label": 1,
                "life": 13700,
                "loc": "init",
                "maps": {
                    "0": {
                        "detail": [
                            1,
                            2,
                            111
                        ],
                        "drop": {
                            "money": 10
                        },
                        "loc": [
                            64,
                            206
                        ],
                        "parents": [
                            "10",
                            "11"
                        ],
                        "type": "warden"
                    }
                },
                "node_done": [],
                "phase": 1,
                "user_id": 8
            },
            "status": "Succeed"
        }
        ***/

        let data = window.appContext.DataContainer.get_BattleData()
        this.life.string = data.current_life + "/" + data.life
        let data_list: Array<MapBuffData> = new Array()
        for (let buff_id of data.buff) {
            data_list.push(new MapBuffData(buff_id))
        }
        this.BuffList.ApplyData(data_list)

        let maps = data.maps;
        let height = new Array<number>();
        let battleFiledDatas = new Array<BattleFiledData>();
        //window.appContext.DataContainer.RoleData.life = data.life;

        for (let key in maps) {
            height.push(maps[key].loc[1]);
        }
        let max_height = Math.max.apply(null, height);

        for (let key in maps) {
            let battleFiledData = new BattleFiledData(key, maps[key], max_height, this.offset, data.loc);
            battleFiledData.battleFieldList = this.BattlefieldList;
            battleFiledDatas.push(battleFiledData);
        }

        let canGoNode: Array<string> = [];
        if (data.loc == "init") {
            canGoNode = this.getNoChildNodes(battleFiledDatas);
        } else {
            canGoNode = this.getBattleFiledDataByKey(data);
        }

        for (let battle_item of battleFiledDatas) {
            //刷新已经打过的节点
            for (let done of data.node_done) {
                if (battle_item.key == done) {
                    battle_item.setDone()
                }
            }
            for (let legal of canGoNode) {
                if (battle_item.key == legal) {
                    battle_item.setLegal()
                }
            }
        }

        this.maxHeight = max_height;
        if (this.BattlefieldList != null && this.BattlefieldList.node != null) {
            this.BattlefieldList.node.height = this.maxHeight - this.offset.y;
        }
        this.BattlefieldList.ApplyData(battleFiledDatas);

    }

    public refresh(refresh: boolean = false) {
        let self = this;
        if (refresh) {
            window.appContext.WebApi.get_character_info(["battle", "main", "item", "partner"], this, function (data) {
                window.appContext.DataContainer.set_BattleData(data.battle)
                window.appContext.DataContainer.set_RoleData(data.main)
                window.appContext.DataContainer.set_ItemData(data.item)
                window.appContext.DataContainer.set_PartnerData(data.partner)
                self.showByData()
            })
        }
        else {
            this.showByData()
        }
    }

    //找出没有子节点的节点
    private getNoChildNodes(battleFiledDatas: Array<BattleFiledData>): Array<string> {
        let tempDatas: Array<string> = new Array();
        for (let battle_filed of battleFiledDatas) {
            if (parseInt(battle_filed.key) < 10) {
                tempDatas.push(battle_filed.key)
            }
        }
        return tempDatas;
    }

    private getBattleFiledDataByKey(data: any): Array<string> {
        let loc = data.loc
        let map = data.maps
        return map[loc].parents
    }
}
