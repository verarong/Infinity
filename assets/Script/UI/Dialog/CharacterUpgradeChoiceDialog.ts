import RoleData from "../../Data/RoleData";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import { BaseDialog } from "../Common/BaseDialog";


const { ccclass, property } = cc._decorator;

@ccclass
export default class CharacterUpgradeChoiceDialog extends BaseDialog {

    public angle = 0
    private role: RoleData

    @property(cc.Node)
    public bg: cc.Node;

    @property(cc.Node)
    public tips_level: cc.Node;

    @property(cc.Node)
    public tips_consciousness: cc.Node;

    @property(cc.Node)
    public tips_physique: cc.Node;

    @property(cc.Node)
    public tips_root: cc.Node;

    update(dt) {
        this.angle += 8 * dt
        this.bg.angle = this.angle % 360
    }

    start() {
        this.fastShowAnim();
    }

    closeDialog(): any {
        this.hide();
    }

    public upgrade_character_fly() {
        this.hide()
        if (window.appContext.DataContainer.RoleData.level % 10 == 0) {
            window.appContext.UIManager.ShowDialog(PrefabUrl.PhaseBreakDialog)
        }
        else {
            window.appContext.UIManager.ShowDialog(PrefabUrl.CommonLevelUpgradeDialog)
        }
    }

    public upgrade_character_consciousness() {
        this.hide()
        window.appContext.UIManager.ShowDialog(PrefabUrl.CommonCharacterUpgradeDialog, "soul")
    }

    public upgrade_character_root() {
        this.hide()
        window.appContext.UIManager.ShowDialog(PrefabUrl.CommonRootUpgradeDialog)
    }


    public upgrade_character_physique() {
        this.hide()
        window.appContext.UIManager.ShowDialog(PrefabUrl.CommonCharacterUpgradeDialog, "gas")
    }


    public ShowByData() {
        this.role = window.appContext.DataContainer.get_RoleData()
        this.tips_level.active = window.appContext.DataContainer.tips_character.get("level")
        this.tips_consciousness.active = window.appContext.DataContainer.tips_character.get("consciousness")
        this.tips_physique.active = window.appContext.DataContainer.tips_character.get("physique")
        this.tips_root.active = window.appContext.DataContainer.tips_character.get("root")
    }

    public bind_data(info: any) {
    }

    public show(info) {
        this.bind_data(info);

        this.ShowByData()
    }
}
