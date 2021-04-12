import { PrefabUrl } from "../../Manager/PrefabUrl";
import { BaseDialog } from "../Common/BaseDialog";


const { ccclass, property } = cc._decorator;

@ccclass
export default class ArtsChoiceDialog extends BaseDialog {

    public angle = 0

    @property(cc.Node)
    public bg: cc.Node;

    @property(cc.Node)
    public tips_dan: cc.Node;

    @property(cc.Node)
    public tips_qi: cc.Node;

    @property(cc.Node)
    public tips_fu: cc.Node;

    @property(cc.Node)
    public tips_zhen: cc.Node;

    @property(cc.Node)
    public tips_kui: cc.Node;

    @property(cc.Node)
    public tips_xing: cc.Node;

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

    public ClickArt(art_type: string) {
        this.hide()
        window.appContext.UIManager.ShowDialog(PrefabUrl.CommonComposeDialog, art_type)
    }

    public onClickDan() {
        this.ClickArt("丹道")
    }

    public onClickQi() {
        this.ClickArt("器道")
    }

    public onClickFu() {
        this.ClickArt("符道")
    }

    public onClickZhen() {
        this.ClickArt("阵道")
    }

    public onClickKui() {
        this.ClickArt("傀道")
    }

    public onClickXing() {
        this.ClickArt("星道")
    }

    public ShowByData() {
        this.tips_dan.active = window.appContext.DataContainer.tips_compose.get("丹道")
        this.tips_qi.active = window.appContext.DataContainer.tips_compose.get("器道")
        this.tips_fu.active = window.appContext.DataContainer.tips_compose.get("符道")
        this.tips_zhen.active = window.appContext.DataContainer.tips_compose.get("阵道")
        this.tips_kui.active = window.appContext.DataContainer.tips_compose.get("傀道")
        this.tips_xing.active = window.appContext.DataContainer.tips_compose.get("星道")
    }

    public bind_data(info: any) {
    }

    public show(info) {
        this.bind_data(info);

        this.ShowByData()
    }
}
