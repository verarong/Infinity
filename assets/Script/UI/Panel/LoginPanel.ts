import { Debug } from "../../Common/Debug";
import { Util } from "../../Common/Utils/Util";
import { PrefabUrl } from "../../Manager/PrefabUrl";
import { UIComponent } from "../Common/UIComponent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginPanel extends UIComponent {

    @property(cc.EditBox)
    user_name: cc.EditBox = null;

    @property(cc.EditBox)
    password: cc.EditBox = null;

    //UI加载完成后将参数传进来
    public loadCompleteCall(args) {
        return;
    }

    public onEnable() {
        window.appContext.SoundManager.playerBgm1()
        try {
            let user_name = window.appContext.StoreManager.getItem("user")
            let password = window.appContext.StoreManager.getItem("password")
            if (user_name && password) {
                this.user_name.string = user_name
                this.password.string = password
            }
        }
        catch (error) {
        }
    }

    public login_game() {
        if (this.user_name.string.length < 1 || this.user_name.string.length > 30) {
            Util.ToastByCode(190, true)
        }
        else if (this.password.string.length < 6 || this.password.string.length > 10) {
            Util.ToastByCode(191, true)
        }
        else {
            window.appContext.LoginManager.LoginSever(this.user_name.string, this.password.string, this,
                function (data) {
                    if (data.bool_init_user) {
                        window.appContext.UIManager.ShowDialog(PrefabUrl.CreateCharactorDialog, null, false);
                    } else {
                        window.appContext.DataContainer.INIT()
                    }
                    window.appContext.StoreManager.setItem("user", this.user_name.string)
                    window.appContext.StoreManager.setItem("password", this.password.string)
                    if (!window.appContext.StoreManager.hasItem("music")) {
                        window.appContext.StoreManager.setItem("music", true)
                    }
                    if (!window.appContext.StoreManager.hasItem("sound")) {
                        window.appContext.StoreManager.setItem("sound", true)
                    }
                });
        }
    }
}
