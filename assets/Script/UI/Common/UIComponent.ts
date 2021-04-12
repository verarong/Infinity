import { PrefabUrl } from "../../Manager/PrefabUrl";

const { ccclass, property } = cc._decorator;

@ccclass
export class UIComponent extends cc.Component {

    public prefabUrl: string;

    @property
    private blackBg: cc.Node;

    //UI加载完成后将参数传进来
    public loadCompleteCall(args) {

    }

    public refresh() {

    }

    setBlackBgAlpha() {
        if (this.blackBg != null) {
            this.blackBg.opacity = 178;
        }
    }

    public ShowGuide(from_dialog: string = null) {

        let user_params = window.appContext.DataContainer.get_GuideData()
        //guide
        if (user_params) {
            let guide = window.appContext.ConfigManager.GetGuide(user_params.guide)
            //Debug.log(guide.scene, this.prefabUrl);

            if (guide && this.prefabUrl.lastIndexOf(guide.scene) > -1) {
                if (guide.condition_value != 5 || (guide.condition_value == 5 && from_dialog == "UI/Dialog/AwardDialog"))
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
