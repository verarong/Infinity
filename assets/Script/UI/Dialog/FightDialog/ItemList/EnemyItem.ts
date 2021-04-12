import { Item } from "../../../../ItemList/Item";
import AspectRatioTool from "../../../Button/AspectRatioTool";
import { Util } from "../../../../Common/Utils/Util";
import FlyEffect from "../../../Button/FlyEffect";
import AttackData from "../AttackData";
import RechargeList from "../../../Panel/StorePanel/Stores/RechargeList";
import Dissolve_color from "../../../../../CocosAwesome/Dissolve_color/Dissolve_color";
import UiEffect from "../../../../Effect/UiEffect";
import { MonstersData } from "./FightData";
import PlayerItem from "./PlayerItem";
import { Debug } from "../../../../Common/Debug";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EnemyItem extends Item<MonstersData> {

    private _data: MonstersData;
    private maxBlood: number;
    private currentBlood: number = 0;
    private iconOriginalPos;
    private attackPos: cc.Vec2 = new cc.Vec2(-145, 0);
    private hitPos: cc.Vec2;

    @property(cc.Label)
    public Name: cc.Label;

    @property(cc.Label)
    public LifeLabel: cc.Label;

    @property(cc.Sprite)
    public Icon: cc.Sprite;

    @property(cc.Sprite)
    public Blood: cc.Sprite;

    @property(FlyEffect)
    public FlyEffect: FlyEffect;

    @property(UiEffect)
    public UiEffect: UiEffect;

    @property(cc.Node)
    public Visible: cc.Node;

    @property(cc.Node)
    public HitNode: cc.Node;

    @property(cc.Animation)
    public skill: cc.Animation;


    getData(): MonstersData {
        return this._data;
    }

    bindData(currentIndex: number, data: MonstersData) {

        if (data == null) {
            this.reset(currentIndex);
            return;
        }

        this._data = data;
        this.Name.string = data.name.toString();
        this.FlyEffect.clear();

        window.appContext.Pool.setSpriteFrameByUrl(data.animation, this.Icon);

        let size: cc.Size = this.Icon.node.getContentSize()
        this.Icon.node.setContentSize(data.scale * size.width, data.scale * size.height)
        this.Icon.node.setScale(data.scaleX, 1)

        this.currentBlood = data.current_life;
        this.maxBlood = data.life;
        this.LifeLabel.string = this.currentBlood + "/" + this.maxBlood;
        this.Blood.fillRange = this.currentBlood / this.maxBlood;
        this.node.position = new cc.Vec2(Util.getRndInteger(-20, 20), this.node.position.y);
        this.iconOriginalPos = this.Icon.node.position;

        for (let i of this._data.skills) {
            window.appContext.Pool.setAtlasByUrl("talent_" + i, this.skill)
        }
    }

    reset(currentIndex: number): void {
        this.Name.string = "";
        this.Icon.spriteFrame = null;
    }

    select(selected: boolean): void {
        if (!selected) {
            return;
        }
    }

    getClickButton(): cc.Button {
        return this.Icon.getComponent(cc.Button);
    }

    //攻擊敵人
    public AttackEnemy(playerItems: Array<PlayerItem>, attackData: AttackData, caller: any, callback: Function) {
        if (playerItems == null || playerItems.length <= 0) {
            Debug.error("沒有可以攻擊的敵人");
            if (caller && callback) {
                callback.call(caller);
            }
        }
        //一次攻擊多個敵人
        if (playerItems.length > 1) {
            this.hitPos = this.attackPos;
        } else {
            let playerItem = playerItems[0];
            let hitPos: cc.Vec2 = playerItem.HitNode.position;
            let pW = playerItem.HitNode.convertToWorldSpaceAR(hitPos);
            let pL = this.node.convertToNodeSpaceAR(pW);
            this.hitPos = pL;
        }
        this.attackAnim(attackData.skillId, function () {
            for (let index = 0; index < playerItems.length; index++) {
                let playerItem = playerItems[index];
                playerItem.TakeDamage(attackData);
            }
        }, function () {
            if (caller && callback) {
                callback.call(caller);
            }
        });
    }

    //收到傷害
    public TakeDamage(attackData: AttackData) {
        let damage = attackData.attackValue;
        this.currentBlood = this.currentBlood - damage <= 0 ? 0 : this.currentBlood - damage;
        this.Blood.fillRange = this.currentBlood / this.maxBlood;
        this.FlyEffect.showRollNotice("-" + damage);
        this.LifeLabel.string = this.currentBlood + "/" + this.maxBlood;

        if (this.currentBlood <= 0) {
            this.die();
        } else {
            this.UiEffect.ShowBeHitEffect(this.Icon);
        }
    }

    private die() {
        this.UiEffect.ShowDissolveEffect(this.Icon);
        let self = this;
        this.scheduleOnce(function () { self.Visible.active = false }, 1)
    }

    private attackAnim(skill_id: number, hitCallback, callback) {

        let action01 = cc.moveTo(0.4, this.hitPos).easing(cc.easeCubicActionOut());
        let action02 = cc.moveTo(0.4, this.iconOriginalPos).easing(cc.easeCubicActionOut());

        let seq1 = cc.sequence(action01,
            cc.callFunc(function () {
                window.appContext.SoundManager.playSFX("talent_" + skill_id)

                this.skill.node.active = true
                this.skill.node.position = new cc.Vec2(this.hitPos.x - 20, this.hitPos.y);
                let animState = this.skill.play("talent_" + skill_id);
                if (animState) {
                    this.skill.on('finished', (event) => {
                        // 处理停止结束时的逻辑
                        this.skill.node.active = false
                    }, this);
                }

                if (hitCallback) {

                    hitCallback();
                }
            }, this),
            action02, cc.callFunc(function () {
                if (callback) {
                    callback();
                }
            }, this));

        this.Icon.node.runAction(seq1);
    }
}
