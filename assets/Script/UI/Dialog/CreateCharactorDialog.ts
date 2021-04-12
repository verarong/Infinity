// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { BaseDialog } from "../Common/BaseDialog";
import { Debug } from "../../Common/Debug";
import { TitleData } from "../../Common/JsonData/JsonData";
import { Util } from "../../Common/Utils/Util";
import { PrefabUrl } from "../../Manager/PrefabUrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CreateCharactorDialog extends BaseDialog {

    private titleDatas: Array<TitleData> = new Array<TitleData>();
    private titleIds: Array<number> = new Array<number>();
    private attrDatas: Array<number> = new Array<number>();
    private head_id: number

    @property(cc.Label)
    Name: cc.Label = null;

    @property(cc.Sprite)
    Head: cc.Sprite = null;

    @property(cc.Node)
    Titles: Array<cc.Node> = new Array<cc.Node>();

    @property(cc.Node)
    Attrs: Array<cc.Node> = new Array<cc.Node>();

    start() {
        this.fastShowAnim();
        this.RandomCharactor();
    }

    public RandomCharactor() {
        let firstName = window.appContext.ConfigManager.GetRandomFirstName();
        let secondName = window.appContext.ConfigManager.GetRandomSecondaryName();
        let name = firstName + secondName
        this.Name.string = name.slice(0, window.appContext.ConfigManager.GetBasicValueByType("name_max_len"));

        this.randomTitle();
        this.randomAttrs();

        this.head_id = Util.getRndInteger(1, 4)
        window.appContext.Pool.setSpriteFrameByUrl("self_" + this.head_id, this.Head);
    }

    private randomTitle() {
        let init_max_title_amount = window.appContext.ConfigManager.GetBasicValueByType("init_max_title_amount");
        let titles = window.appContext.ConfigManager.GetRandomTitleByAmount(init_max_title_amount);
        this.titleDatas = titles;
        this.titleIds = new Array<number>();

        for (let index = 0; index < this.Titles.length; index++) {
            this.Titles[index].active = false;
        }
        for (let index = 0; index < this.titleDatas.length; index++) {
            let titleData = this.titleDatas[index];
            this.titleIds.push(titleData.id);
            if (index < this.Titles.length) {
                let titleName = this.Titles[index].getChildByName("titleName").getComponent(cc.Label);
                titleName.string = titleData.name;

                let attrLabels: Array<cc.Label> = new Array<cc.Label>();
                attrLabels.push(this.Titles[index].getChildByName("attribute1").getComponent(cc.Label));
                attrLabels.push(this.Titles[index].getChildByName("attribute2").getComponent(cc.Label));
                attrLabels.push(this.Titles[index].getChildByName("attribute3").getComponent(cc.Label));

                let attrStr: Array<string> = new Array<string>();

                if (titleData.amount1 != 0) {
                    attrStr.push(window.appContext.ConfigManager.GettransformChnByEng(titleData.attribute1) + "+" + titleData.amount1);
                }
                if (titleData.amount2 != 0) {
                    attrStr.push(window.appContext.ConfigManager.GettransformChnByEng(titleData.attribute2.toString()) + "+" + titleData.amount2);
                }
                if (titleData.amount3 != 0) {
                    attrStr.push(window.appContext.ConfigManager.GettransformChnByEng(titleData.attribute3.toString()) + "+" + titleData.amount3);
                }

                for (let i = 0; i < attrLabels.length; i++) {

                    if (i >= attrStr.length) {
                        attrLabels[i].node.active = false;
                    } else {
                        attrLabels[i].string = attrStr[i];
                        attrLabels[i].node.active = true;
                    }
                }
            }

            this.Titles[index].active = true;
        }
    }

    private randomAttrs() {
        this.attrDatas = new Array<number>();
        var maxValue = new Array<number>();
        let init_attack_min = window.appContext.ConfigManager.GetBasicValueByType("init_attack_min");
        let init_attack_max = window.appContext.ConfigManager.GetBasicValueByType("init_attack_max");
        let init_attack_random = Util.getRndInteger(init_attack_min, init_attack_max);
        this.attrDatas.push(init_attack_random);
        maxValue.push(init_attack_max);

        let init_defence_min = window.appContext.ConfigManager.GetBasicValueByType("init_defence_min");
        let init_defence_max = window.appContext.ConfigManager.GetBasicValueByType("init_defence_max");
        let init_defence_random = Util.getRndInteger(init_defence_min, init_defence_max);
        this.attrDatas.push(init_defence_random);
        maxValue.push(init_defence_max);

        let init_life_min = window.appContext.ConfigManager.GetBasicValueByType("init_life_min");
        let init_life_max = window.appContext.ConfigManager.GetBasicValueByType("init_life_max");
        let init_life_random = Util.getRndInteger(init_life_min, init_life_max);
        this.attrDatas.push(init_life_random);
        maxValue.push(init_life_max);

        let init_speed_min = window.appContext.ConfigManager.GetBasicValueByType("init_speed_min");
        let init_speed_max = window.appContext.ConfigManager.GetBasicValueByType("init_speed_max");
        let init_speed_random = Util.getRndInteger(init_speed_min, init_speed_max);
        this.attrDatas.push(init_speed_random);
        maxValue.push(init_speed_max);

        let init_mf_min = window.appContext.ConfigManager.GetBasicValueByType("init_mf_min");
        let init_mf_max = window.appContext.ConfigManager.GetBasicValueByType("init_mf_max");
        let init_mf_random = Util.getRndInteger(init_mf_min, init_mf_max);
        this.attrDatas.push(init_mf_random);
        maxValue.push(init_mf_max);

        for (let index = 0; index < this.Attrs.length; index++) {
            let attr = this.Attrs[index];
            let sprite = attr.getChildByName("bar_loading").getComponent(cc.Sprite);
            sprite.fillRange = this.attrDatas[index] / maxValue[index];
        }

        Debug.log(this.attrDatas);
    }

    public CreateCharactor() {
        window.appContext.WebApi.set_user_init(this.Name.string, this.titleIds, this.attrDatas, this.head_id, this, function () {
            this.hide();
            window.appContext.DataContainer.INIT();
        });
    }
}
