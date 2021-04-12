import { Debug } from "../../Common/Debug";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import { UIComponent } from "./UIComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export class BaseDialog extends cc.Component {
    @property(cc.Node)
    public fadeInNode: cc.Node;

    @property
    private clickBgClose: boolean;

    private _isAnimComplete: boolean = true;

    public prefabUrl: string;

    public hide() {
        if (this._isAnimComplete) {
            this.unscheduleAllCallbacks();
            window.appContext.Pool.returnInstant(this.node);
            window.appContext.UIManager.clearCachedDialog(this.prefabUrl);

            let panel: UIComponent = window.appContext.UIManager.getCurrentPanel()
            if (this.prefabUrl != "UI/Dialog/GuideDialog" && this.prefabUrl != "UI/Dialog/FightDialog" && this.prefabUrl != "UI/Dialog/ActivateFormulaDialog" && panel) {
                panel.ShowGuide(this.prefabUrl)
            }
            else if (panel && panel.prefabUrl != "UI/Panel/BattlePanel") {
                panel.refresh()
            }
        }
    }

    public show(info: any) {
        Debug.log("BasePopDialog show ");
    }

    public boolAnimationDone() {
        return this._isAnimComplete
    }

    protected fadeIn(callback = null, caller: any = null) {
        if (this.fadeInNode == null) {
            return;
        }

        // if (this.clickBgClose) {
        //     this.addClickBackgroundHideEvent();
        // }

        this.fadeInNode.opacity = 0;
        this.fadeInNode.active = true;

        this.scheduleOnce(function () {
            let action = cc.fadeTo(0.25, 255);
            let finishedCallback = cc.callFunc(function () {
                this._isAnimComplete = true;
                if (callback != null) {
                    callback.call(caller);
                }
            }, this);
            let seq = cc.sequence(action, finishedCallback);
            this.fadeInNode.runAction(seq);
        }, 0);
    }

    normalShowAnim() {
        this.node.scale = 0.1;
        // 传0让回调函数在下一帧立即执行
        this.scheduleOnce(function () {
            let action = cc.scaleTo(0.4, 1, 1).easing(cc.easeCubicActionOut());
            this.node.runAction(action);
        }, 0);
    }

    fastShowAnim() {
        this._isAnimComplete = false
        this.fadeInNode.scale = 0.1;
        // 传0让回调函数在下一帧立即执行
        this.scheduleOnce(function () {
            let action = cc.scaleTo(0.15, 1, 1);
            let finishedCallback = cc.callFunc(function () {
                this._isAnimComplete = true;
            }, this);
            let seq = cc.sequence(action, finishedCallback);
            this.fadeInNode.runAction(seq);
        }, 0);
    }

    elasticShowAnim() {
        this.node.scale = 0.1;
        // 传0让回调函数在下一帧立即执行
        this.scheduleOnce(function () {
            let action = cc.scaleTo(0.4, 1, 1).easing(cc.easeCircleActionOut);
            this.node.runAction(action);
        }, 0);
    }

    public ShowGuide() {
        let user_params = window.appContext.DataContainer.get_GuideData()
        //guide
        if (user_params) {
            let guide = window.appContext.ConfigManager.GetGuide(user_params.guide)
            if (guide && this.prefabUrl.lastIndexOf(guide.scene) > -1) {
                window.appContext.UIManager.ShowDialog(PrefabUrl.GuideDialog, [guide, null], false)
            }
            else if (user_params.guide >= 19) {
                //level_trigger_guide
                let level_trigger_guide = window.appContext.ConfigManager.GetLevelTriggerGuide(user_params.level_trigger_guide)
                if (level_trigger_guide && this.prefabUrl.lastIndexOf(level_trigger_guide.scene) > -1 && level_trigger_guide.require_level <= window.appContext.DataContainer.RoleData.level) {
                    window.appContext.UIManager.ShowDialog(PrefabUrl.GuideDialog, [level_trigger_guide, null], false)
                }
            }
        }
    }
}