// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { PrefabUrl } from "../Manager/PrefabUrl";
import { Debug } from "../Common/Debug";
import { HttpUtil } from "../Common/Utils/HttpUtil";
import { Util } from "../Common/Utils/Util";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadingAllRes extends cc.Component {

    @property(cc.Label)
    Txt_Progress: cc.Label = null;

    @property(cc.Sprite)
    LoadingBar: cc.Sprite = null;

    @property(cc.Node)
    loading_node: cc.Node = null;

    private loading: boolean;

    private index: number;

    private lastProcessCount: number;

    private curProcessCount: number;

    private processCount: number;

    private tempProcess: number;

    private loadTime: number;

    private startLoad: boolean;

    private proccess: number;

    start() {
        this.lastProcessCount = 0;

        this.curProcessCount = 0;

        this.processCount = PrefabUrl.UrlList.length;

        this.index = 0;

        this.loading = true;

        this.tempProcess = 0;

        this.loadTime = 0;

    }

    update(dt) {
        if (!this.loading_node.active) {
            return
        }

        if (!this.startLoad) {
            return;
        }

        if (this.tempProcess < 10) {

            this.proccess = (this.tempProcess * 5 + Math.floor(Math.random() * 5))
            this.Txt_Progress.string = "Loading " + this.proccess + "%";
            this.tempProcess++;
            this.LoadingBar.fillRange = this.proccess / 100;

            return;
        }

        this.load();

        if (this.curProcessCount != this.lastProcessCount) {
            this.proccess = (Math.floor(this.curProcessCount * 50 / this.processCount) + 50);
            this.Txt_Progress.string = "Loading " + this.proccess + "%";
            this.lastProcessCount = this.curProcessCount;
            this.LoadingBar.fillRange = this.proccess / 100;
        }

        if (this.loading && this.loadTime < 30 && this.curProcessCount < this.processCount) {
            return;
        }

        this.loading_node.active = false
        Debug.log("资源加载完成");

        window.appContext.UIManager.ShowPanel(PrefabUrl.LoginPanel)
    }

    load() {

        if (!this.loading) {
            return;
        }

        var self = this;

        var url = PrefabUrl.UrlList[this.index];

        if (url) {

            cc.loader.loadRes(url, function (err, prefab) {
                self.curProcessCount++;
            });

            this.index++;
            return;
        }
    }

    startLoadRes() {
        this.startLoad = true;
    }
}
