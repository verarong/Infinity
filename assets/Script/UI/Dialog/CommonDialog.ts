import { BaseDialog } from "../Common/BaseDialog";
import CommonDialogData from "./CommonDialogData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CommonDialog extends BaseDialog {
    @property(cc.Label)
    public Title: cc.Label;

    @property(cc.Label)
    public Content: cc.Label;

    @property(cc.Node)
    public CancelBtn: cc.Node;

    @property(cc.Node)
    public OkBtn: cc.Node;

    private caller;

    private confirmCallback;

    private cancelCallback;

    //UI加载完成后将参数传进来
    public show(data:CommonDialogData) {
        this.Title.string =  data.Title;
        this.Content.string = data.Content;
        this.caller = data.Caller;
        this.confirmCallback = data.ConfirmCallback;
        this.cancelCallback = data.CancelCallback;
        this.CancelBtn.active = data.IsShowCancel;
        this.OkBtn.active = data.isShowOk;
    }

    onEnable() {
        this.fastShowAnim();
    }

    public ConfirmCallback(){
        
        if(this.caller&& this.confirmCallback){
            this.confirmCallback.call(this.caller);
        }
        this.hide();
    } 

    public CancelCallback(){
        if(this.caller&& this.cancelCallback){
            this.cancelCallback.call(this.caller);
        }
        this.hide();
    }
}
