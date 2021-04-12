import { UIComponent } from "../../Common/UIComponent";
import { PrefabUrl } from "../../../Manager/PrefabUrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChancePanel extends UIComponent {



    public BackBtnClick() {
        window.appContext.UIManager.ShowPanel(PrefabUrl.DomainPanel);
    }

    //UI加载完成后将参数传进来
    public loadCompleteCall(args) {
        let a = args;
    }

    public sortPackage() {
        return;
    }

    public sellBatch() {
        return;
    }

    public onLoad() {
        let self = this;
        //progress......
    }

    start() {
    }
}