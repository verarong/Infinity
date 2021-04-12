// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


export default class CommonDialogData {
    
    public Title:string;

    public Content:string;

    public Caller:any;

    public ConfirmCallback:Function;

    public CancelCallback:Function;

    public IsShowCancel:boolean;

    public isShowOk:boolean;

    constructor(content:string,title:string ="提示",isShowCancel = false, caller:any = null,confirmCallback:Function = null,cancelCallback:Function = null,isShowOk = true){
        this.Content = content;
        this.Title = title;
        this.Caller = caller;
        this.CancelCallback = cancelCallback;
        this.ConfirmCallback = confirmCallback;
        this.IsShowCancel = isShowCancel;
        this.isShowOk = isShowOk;
    }
}
