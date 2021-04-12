const {ccclass, property} = cc._decorator;

export enum ToastType{
     // 普通Toast 深色字
     Normal =0,

     // 普通Toast，但是字体是红色
     Error = 1,
}

@ccclass
export class Toast extends cc.Component {

    @property(cc.Label)
    content: cc.Label = null;

    @property(cc.Node)
    public bg: cc.Node = null;

    private lifeTime: number = 2;

    private timer:number;

    initToast(data) {
        this.timer = 0;

        let finalString = data.content;

        if(data.type == ToastType.Error ){
            this.content.node.color = cc.Color.RED;
        }
        this.content.string = finalString;
        this.node.opacity = 255;
        let self = this;
        this.scheduleOnce(function () {
            let w = Math.floor(this.content.node.width * this.content.node.scaleX);
            this.bg.width = w;
            let h = Math.floor(this.content.node.height * this.content.node.scaleY);
            this.bg.height = h;
            let action = cc.fadeTo(this.lifeTime,100);
            self.node.runAction(action);
        }, 0);
    }

    update(dt) {
        if (this.timer < 0) {
            return;
        }

        this.timer += dt;
        if (this.timer > this.lifeTime) {
            this.hide();
        }
        
    }

    hide(){
        this.timer = -1;
        if (this.node != null) {
            this.node.destroy();
        }
    }
}
