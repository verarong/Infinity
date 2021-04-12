import CommonDialogData from "../../UI/Dialog/CommonDialogData";
import { Debug } from "../Debug";
import { Util } from "./Util";

export class HttpUtil {

    private static readonly App_Id: string = "wxdd69e7758b0e3ba5";
    private static readonly Assist_Url: string = "https://hfapi.ttigd.cn/friend-assistance/assistance/assist";
    private static readonly Assist_Query_Url: string = "https://hfapi.ttigd.cn/friend-assistance/assistance/consume";
    private static readonly ShareOpen_Query_Url: string = "https://hfapi.ttigd.cn/friend-assistance/shareFlag/query";

    public static assist(activityId: string, playerId: string, friendId: string): void {

        let callBack = function (rescode: number, res: string): void {

            if (rescode != 0) {
                Debug.log("助力Http请求异常");
                return;
            }

            try {
                let json = JSON.parse(res);
                if (json.res != 0) {
                    Debug.log("助力Http返回失败：" + json.err);
                    return;
                }
                Debug.log("助力成功");
            } catch (error) {
                console.error(error);
                Debug.log("助力Http返回数据异常,res:" + res);
            }
        };

        let url = this.Assist_Url + "?appId=" + this.App_Id + "&activityId=" + activityId + "&sourceId=" + playerId + "&targetId=" + friendId;

        this.httpGets(url, callBack);
    }

    public static assistQuery(activityId: string, playerId: string, queryCallback: (activityId: string, count: number) => void): void {

        let callBack = function (rescode: number, res: string): void {

            if (rescode != 0) {
                Debug.log("助力查询Http请求异常");
                return;
            }

            try {
                let json = JSON.parse(res);
                if (json.res != 0) {
                    Debug.log("助力查询Http返回失败：" + json.err);
                    return;
                }

                let count = json.data.count;
                if (queryCallback != null) {
                    queryCallback(activityId, count);
                }
                Debug.log("助力查询成功, count:" + count);
            } catch (error) {
                Debug.log("助力查询Http返回数据异常,res:" + res);
                console.error(error);
            }
        };

        let url = this.Assist_Query_Url + "?appId=" + this.App_Id + "&activityId=" + activityId + "&playerId=" + playerId;

        this.httpGets(url, callBack);
    }

    public static getShareConfig(callBack: (show: boolean) => void) {
        let url = this.ShareOpen_Query_Url + "?appId=" + this.App_Id;
        let httpCallBack = function (rescode: number, res: string): void {
            if (rescode != 0) {
                Debug.log("share查询Http请求异常");
                return;
            }

            try {
                let json = JSON.parse(res);
                if (json.res != 0) {
                    Debug.log("share查询Http返回失败：" + json.err);
                    return;
                }

                let share = json.data.shareFlag;
                if (callBack != null) {
                    callBack(share);
                }
                Debug.log("share查询成功, count:" + share);
            } catch (error) {
                Debug.log("share查询Http返回数据异常,res:" + res);
                console.error(error);
            }

        }
        this.httpGets(url, httpCallBack);
    }

    public static httpGets(url: string, httpCallback: (rescode: number, res: string) => void) {

        try {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    let respone = xhr.responseText;
                    if (httpCallback) {
                        httpCallback(0, respone);
                    }
                    Debug.log("httpGet succ");
                }
            };

            xhr.open("GET", url, true);
            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }
            xhr.timeout = 5000;
            xhr.send();
        } catch (error) {
            Debug.log(error);
            if (httpCallback) {
                httpCallback(1, null);
            }
        }
    }

    public static Post(api: string, dataObj: any, httpCallback: (rescode: number, res: string) => void) {
        let url = window.appContext.GameConfig.gameSeverUrl + api;

        let token = window.appContext.DataContainer.token;
        if (token) {
            dataObj.token = token;
        }

        var result = false;
        let dataStr = JSON.stringify(dataObj);
        try {
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                    if (result) {
                        return;
                    }
                    result = true;
                    var response = xhr.responseText;
                    if (httpCallback) {
                        httpCallback(0, response);
                    }
                    Debug.log("httpPost succ:" + this.response);
                }
            };

            xhr.open("POST", url, true);
            if (cc.sys.isNative) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.timeout = 5000;
            xhr.send(dataStr);
        }
        catch (error) {
            if (result) {
                return;
            }
            result = true;
            console.error("httpPost fail:" + error);
            if (httpCallback) {
                httpCallback(1, error);
                Util.ToastByCode(199, true);
            }
        }

        setTimeout(() => {
            if (result) {
                return;
            }
            result = true;
            if (httpCallback) {
                httpCallback(-1, "请求超时");
                Util.ToastByCode(199, true);
            }
        }, 5000);
    }
}
