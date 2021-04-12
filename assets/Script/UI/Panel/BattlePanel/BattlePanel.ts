import { UIComponent } from "../../Common/UIComponent";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { Debug } from "../../../Common/Debug";
import { Util } from "../../../Common/Utils/Util";
import FortifiedList from "./ItemList/FortifiedList";
import FortifiedData from "./ItemList/FortifiedData";
import SecretList from "./ItemList/SecretList";
import SecretData from "./ItemList/SecretData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BattlePanel extends UIComponent {
    //据点范围左上角
    private fortifiedLeftTop: cc.Vec2 = new cc.Vec2(-193, 406);
    //据点范围右下角
    private fortifiedRightBottom: cc.Vec2 = new cc.Vec2(350, -400);

    //x,y 的随机偏移
    private offsetRange: cc.Vec2 = new cc.Vec2(10, 10);

    //横向据点数量随机范围
    private horizontalCountRange: cc.Vec2 = new cc.Vec2(4, 7);

    //横向随机据点区域数量
    private horizontalCount: number = 6;

    //纵向据点数量
    private verticalCount: number = 2;

    private posArray: Array<cc.Vec2> = new Array()

    @property(cc.Node)
    public challenge: cc.Node;

    @property(FortifiedList)
    public FortifiedList: FortifiedList;

    @property(SecretList)
    public Secrets: SecretList;

    public nodeArray: Array<cc.Node> = new Array<cc.Node>();

    private sortById(a: SecretData, b: SecretData) {
        return a.secret_id - b.secret_id
    }

    public refresh_loc() {
        let indexArray = this.getFortifiedHorizontalIndex();
        this.posArray = this.getPosArrayByIndexArray(indexArray);
        window.appContext.DataContainer.posArray = this.posArray
    }

    public showByMapData(refresh_loc: boolean = false) {
        this.challenge.active = window.appContext.DataContainer.get_GuideData().guide >= 16
        let data = window.appContext.DataContainer.get_MapData()
        if (data == null || data.length == 0) {
            window.appContext.UIManager.ShowCommonDialog("获取据点数据失败");
            return;
        }

        this.verticalCount = data.map.length;
        this.horizontalCount = Util.getRndInteger(this.horizontalCountRange.x, this.horizontalCountRange.y);

        if (refresh_loc || window.appContext.DataContainer.posArray.length == 0) {
            this.refresh_loc()
        }
        else {
            this.posArray = window.appContext.DataContainer.posArray
        }

        let fortifiedDataArray: Array<FortifiedData> = new Array<FortifiedData>();
        if (this.verticalCount == 1) {
            fortifiedDataArray.push(new FortifiedData(data.map[0], new cc.Vec2(10, 0)))
            this.FortifiedList.ApplyData(fortifiedDataArray);
        }
        else {
            for (let index in data.map) {
                fortifiedDataArray.push(new FortifiedData(data.map[index], this.posArray[index]))
            }
            this.FortifiedList.ApplyData(fortifiedDataArray);
        }
    }

    public showByBattleData() {
        if (window.appContext.DataContainer.get_BattleData().label != 0) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.BattleFiledDialog);
        }
    }

    public showBySecretData() {
        let data = window.appContext.DataContainer.get_SecretData()
        let data_list: Array<SecretData> = new Array()
        for (let secret of data) {
            data_list.push(new SecretData(secret))
        }
        data_list.sort(this.sortById)
        this.Secrets.ApplyData(data_list)
    }

    public refresh(re_map: boolean = false, re_battle: boolean = false, re_secret: boolean = false) {
        let self = this;

        if (re_map || window.appContext.DataContainer.get_MapData() == undefined) {
            window.appContext.WebApi.get_character_info("map", this, function (data) {
                window.appContext.DataContainer.set_MapData(data)
                self.showByMapData(true)
            })
        }
        else {
            this.showByMapData()
        }

        if (re_battle || window.appContext.DataContainer.get_BattleData() == undefined) {
            window.appContext.WebApi.get_character_info("battle", this, function (data) {
                window.appContext.DataContainer.set_BattleData(data)
                self.showByBattleData()
            })
        }
        else {
            this.showByBattleData()
        }

        if (re_secret || window.appContext.DataContainer.get_SecretData() == undefined) {
            window.appContext.WebApi.get_character_info("secret", this, function (data) {
                window.appContext.DataContainer.set_SecretData(data)
                self.showBySecretData()
            })
        }
        else {
            this.showBySecretData()
        }
    }

    public statement() {
        let self = this;
        window.appContext.WebApi.get_character_info(["map", "battle", "secret", "main", "item", "role_params", "daily_task"], this, function (data) {
            window.appContext.DataContainer.set_RoleData(data.main)
            window.appContext.DataContainer.set_ItemData(data.item)
            window.appContext.DataContainer.set_MapData(data.map)
            window.appContext.DataContainer.set_BattleData(data.battle)
            window.appContext.DataContainer.set_SecretData(data.secret)
            window.appContext.DataContainer.set_GuideData(data.role_params)
            window.appContext.DataContainer.set_DailyTaskData(data.daily_task)

            self.showByMapData(true)
            //self.showByBattleData(data.battle)
            self.showBySecretData()
        })
    }

    onEnable() {
        window.appContext.SoundManager.playerBgm2()
        this.refresh()
    }

    onDisable() {
        for (let index = 0; index < this.nodeArray.length; index++) {
            this.nodeArray[index].removeFromParent();
        }
        window.appContext.SoundManager.playerBgm1()
    }

    //随机获取横向据点的索引，长度为纵向数量
    private getFortifiedHorizontalIndex(): Array<number> {

        let horizontalIndexArray = new Array<number>();

        if (this.horizontalCount >= this.verticalCount) {
            horizontalIndexArray = Util.shuffleArithmetic(this.verticalCount, 0, this.horizontalCount - 1);
        } else {
            let count = Math.floor(this.verticalCount / this.horizontalCount);
            let lastCount = this.verticalCount % this.horizontalCount;
            for (let i = 0; i < count; i++) {
                let onceArray = new Array<number>();
                if (i == 0) {
                    onceArray = Util.shuffleArithmetic(this.horizontalCount, 0, this.horizontalCount - 1);
                    horizontalIndexArray = horizontalIndexArray.concat(onceArray);
                } else {
                    let lastIndex = horizontalIndexArray[horizontalIndexArray.length - 1];
                    let newArray = new Array<number>();
                    for (let index = 0; index < this.horizontalCount; index++) {
                        newArray.push(index);
                    }
                    if (newArray.length > 1) {
                        newArray.splice(newArray.indexOf(lastIndex), 1);
                    }
                    let tempArray = Util.shuffleArithmeticByArray(newArray.length, newArray);
                    tempArray.push(lastIndex);
                    horizontalIndexArray = horizontalIndexArray.concat(tempArray);
                }
            }

            let lastArray = new Array<number>();
            let lastIndex = horizontalIndexArray[horizontalIndexArray.length - 1];
            for (let index = 0; index < this.horizontalCount; index++) {
                lastArray.push(index);
            }
            if (lastArray.length > 1) {
                lastArray.splice(lastArray.indexOf(lastIndex), 1);
            }
            horizontalIndexArray = horizontalIndexArray.concat(Util.shuffleArithmeticByArray(lastCount, lastArray));
        }

        Debug.log(horizontalIndexArray)
        return (horizontalIndexArray);
    }

    private getPosArrayByIndexArray(indexArray: Array<number>) {
        let horizontalLength = this.fortifiedRightBottom.x - this.fortifiedLeftTop.x;
        let verticalLength = this.fortifiedRightBottom.y - this.fortifiedLeftTop.y;

        let horizontalUnit = horizontalLength / this.horizontalCount;
        let verticalUnit = verticalLength / this.verticalCount;

        let posArray = new Array<cc.Vec2>();
        for (let index = 0; index < this.verticalCount; index++) {
            let offsetX = Util.getRndInteger(-this.offsetRange.x, this.offsetRange.x + 1);
            let offsetY = Util.getRndInteger(-this.offsetRange.y, this.offsetRange.y + 1);
            posArray.push(new cc.Vec2(this.fortifiedLeftTop.x + horizontalUnit * indexArray[index] + offsetX,
                this.fortifiedLeftTop.y + verticalUnit * index + offsetY));
        }

        return posArray;
    }

    public BackBtnClick() {
        window.appContext.UIManager.ShowPanel(PrefabUrl.DomainPanel);
    }

    public onChallengeClick() {
        window.appContext.UIManager.ShowDialog(PrefabUrl.ChallengeDialog)
    }
}
