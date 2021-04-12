import { BaseDialog } from "../Common/BaseDialog";
import BattleFiledDialog from "./BattleFiledDialog/BattleFiledDialog";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import BattlePanel from "../Panel/BattlePanel/BattlePanel";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResultDialog extends BaseDialog {

    //战斗是否成功
    private bool_succeed: boolean;

    @property(cc.Sprite)
    public succeed: cc.Sprite;

    @property(cc.Sprite)
    public failed: cc.Sprite;

    @property(cc.Label)
    public btn: cc.Label;

    start() {
        // this.fastShowAnim();
    }

    getData(): any {
        return this.bool_succeed;
    }

    closeDialog(): any {
        this.hide();
    }

    public ShowByData() {
        this.succeed.node.active = this.bool_succeed
        this.failed.node.active = !this.bool_succeed
        this.btn.string = this.bool_succeed ? "奖励结算" : "重新来过"
    }

    public bind_data(info: any) {
        this.bool_succeed = info;
    }

    public show(info) {
        this.bind_data(info);

        this.ShowByData()
    }

    public statement() {
        let self = this
        window.appContext.WebApi.battle_statement(this, function (data) {
            self.hide()

            let battle_dialog: BattleFiledDialog = window.appContext.UIManager.getDialog(PrefabUrl.BattleFiledDialog)
            battle_dialog.hide()

            let BattlePanel: BattlePanel = window.appContext.UIManager.getCurrentPanel()
            BattlePanel.statement();

            if (data) {
                let info = [undefined, data.item, data.secret]
                window.appContext.UIManager.ShowDialog(PrefabUrl.AwardDialog, info)
            }
        })
    }
}
