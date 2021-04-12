import { Debug } from "../Common/Debug";
import CommonDialogData from "../UI/Dialog/CommonDialogData";
import { PrefabUrl } from "./PrefabUrl";
import { Toast, ToastType } from "../UI/Toast/Toast";
import { UIComponent } from "../UI/Common/UIComponent";
import { BaseDialog } from "../UI/Common/BaseDialog";

const { ccclass, property } = cc._decorator;

@ccclass
export class UIManager extends cc.Component {

    @property(cc.Node)//panel根节点
    public panelRootNode: cc.Node;

    @property(cc.Node)//对话框根节点
    private dialogRootNode: cc.Node;

    @property(cc.Node)//提示根节点
    private tipNode: cc.Node;

    @property(cc.Prefab)//Toast
    private toastPrefab: cc.Prefab;

    private windowArray: Array<any> = new Array();

    private dialogCache: Map<string, any> = new Map();

    //所有的toast
    private _toasts: Array<Toast> = new Array();

    private toastDefaultYOffset: number = 500;

    private toastDistance: number = -16;

    private loading: boolean;//是否正在生成

    //当前打开的panel
    private currentPanel: cc.Node;

    //当前打开的panel
    private panelUrl: string;

    onLoad() {

        // cc.game.addPersistRootNode(this.node);

        // this.showMainWindow();
    }

    public ShowPanel(boardUrl: string, args: any = null) {

        var boardData: any = {};
        boardData.url = boardUrl;
        boardData.args = args;

        this.windowArray.push(boardData);
    }

    update(dt) {

        if (this.windowArray.length <= 0 || this.loading) {

            return;
        }

        var boardData = this.windowArray.shift();
        if (boardData == null || boardData.url == null || boardData.url == "") {
            return;
        }

        this.showBoard(boardData.url, boardData.args);
    }

    private showBoard(panelUrl: string, args: any = null) {

        if (!panelUrl) {

            return;
        }

        if (this.currentPanel && this.currentPanel.active) {

            if (this.panelUrl == panelUrl) {
                return;
            } else {
                window.appContext.Pool.returnInstant(this.currentPanel);

                this.currentPanel = null;
            }
        }

        this.loading = true;
        var self = this;

        window.appContext.Pool.requestInstantByUrl(panelUrl, function (err, instant: cc.Node) {

            instant.parent = self.panelRootNode;
            let comp: UIComponent = instant.getComponent("UIComponent");
            comp.prefabUrl = panelUrl

            self.panelUrl = panelUrl;

            self.currentPanel = instant;

            self.loading = false;

            comp.ShowGuide()
        }, args);
    }

    clearBoard() {
        if (this.currentPanel) {
            window.appContext.Pool.returnInstant(this.currentPanel);

            this.currentPanel = null;
        }
        this.windowArray = new Array();
    }

    // //*************************dialog */
    public ShowDialog(prefabUrl: string, info: any = null, use_sound = true) {
        if (!prefabUrl || prefabUrl == "") {
            return;
        }

        if (this.dialogCache.has(prefabUrl)) {
            Debug.log("window is already opened");
            return;
        }

        if (use_sound) {
            window.appContext.SoundManager.playSFX("ui_common");
        }

        let self = this;
        window.appContext.Pool.requestInstantByUrl(prefabUrl, function (err, instant: cc.Node) {

            if (instant == null) {
                return;
            }

            instant.parent = self.dialogRootNode;
            let comp: BaseDialog = instant.getComponent("BaseDialog");
            if (comp == null) {
                Debug.error("对话框" + instant.name + "上没挂组件");
            } else {
                comp.prefabUrl = prefabUrl;
                comp.show(info);
            }

            self.dialogCache.set(prefabUrl, comp);

            comp.ShowGuide()
        }, null);
    }

    public clearCachedDialog(prefabUrl: string) {
        if (this.dialogCache.has(prefabUrl)) {
            this.dialogCache.delete(prefabUrl);
        }
    }

    public getDialog(prefabUrl: string) {
        if (!prefabUrl || prefabUrl == "") {
            return;
        }

        if (!this.dialogCache.has(prefabUrl)) {
            Debug.log("dialog hasn't been opened");
            return;
        }

        return this.dialogCache.get(prefabUrl)
    }

    public ShowCommonDialog(content: string, title: string = "提示", isShowCancel = false, caller: any = null, confirmCallback: Function = null, cancelCallback: Function = null, isShowOk = false) {
        this.ShowDialog(PrefabUrl.CommonDialog, new CommonDialogData(content, title, isShowCancel, caller, confirmCallback, cancelCallback, isShowOk));
    }

    public getCurrentPanel<T>(): T {

        if (this.currentPanel == null) {
            return null;
        }
        let baseDialog = this.currentPanel.getComponent("UIComponent") as T;
        return baseDialog;
    }

    public ShowToast(content: string, error: boolean = false, delay = 0) {
        let self = this;
        this.scheduleOnce(function () {
            self.createToast(content, error);
        }, delay);
    }

    private createToast(content: string, error: boolean) {
        //把多余的删掉
        if (this._toasts.length > 2) {
            let numToDelete = this._toasts.length - 2;
            for (let k = 0; k < numToDelete; k++) {
                this._toasts[0].hide();
                this._toasts.splice(0, 1);
            }
        }

        let type = error ? ToastType.Error : ToastType.Normal;
        let self = this;

        let toastObj = cc.instantiate(this.toastPrefab);

        if (toastObj == null) {
            return;
        }

        let toast = toastObj.getComponent("Toast");
        let data = { content: content, type: type };
        toast.initToast(data);
        toastObj.setPosition(0, self.toastDefaultYOffset);
        self.tipNode.addChild(toastObj);

        //抬高其他
        let heightToRaise = self.toastDistance + toast.bg.height * 0.5;
        if (self._toasts.length > 0) {
            let lastToast = self._toasts[self._toasts.length - 1];
            if (lastToast != null && lastToast.node != null) {
                heightToRaise += lastToast.node.height * 0.5;
            } else {
                heightToRaise += 70;
            }

            for (let i = this._toasts.length - 1; i > -1; i--) {
                let pToast = this._toasts[i];
                if (pToast == null || pToast.node == null) {
                    continue;
                }

                pToast.node.y += heightToRaise;
            }
        }

        self._toasts.push(toast);
    }
}
