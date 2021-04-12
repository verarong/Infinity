import { PrefabUrl } from "./PrefabUrl";
import { Util } from "../Common/Utils/Util";

export default class LoginManager {
    public LoginSever(user_name: string, password: string, caller = null, callback = null) {
        //let randomNum = Util.getRndInteger(0, 100000);
        window.appContext.WebApi.login(user_name, password, "TapTap", "", caller, callback);
    }
}