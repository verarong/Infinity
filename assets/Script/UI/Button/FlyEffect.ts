// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class FlyEffect extends cc.Component {

    @property(cc.Node)
    layerBg: cc.Node = null;

    @property(cc.Prefab)
    labelPfb: cc.Prefab = null;

    private  rollNoticeList:Array<cc.Node>;

    onEnable () {
        this.rollNoticeList = new Array<cc.Node>();
    }

    createShowNode(str) {
        let label = cc.instantiate(this.labelPfb)
        this.layerBg.addChild(label)

        this.rollNoticeList.push(label)
        if (this.rollNoticeList.length > 3) {
            let note = this.rollNoticeList.shift()
            // note.removeFromParent(false)
            note.destroy()
        }

        let rnum = this.rollNoticeList.length
        let spos = cc.v2(0, 0)
        let idx = 1
        for (let i = rnum - 1; i >= 0; --i) {
            let lb = this.rollNoticeList[i]
            if(!lb){
                continue;
            }
            if (i == rnum) {
                spos = cc.v2(lb.x, lb.y)
            } else {
                let newy = spos.y + idx * lb.height
                lb.y = newy
                idx = idx + 1
            }
        }

        label.getComponent(cc.Label).string = str
        
        return label
    }

    public clear(){
        this.rollNoticeList = new Array<cc.Node>();
        this.layerBg.removeAllChildren();
    }

    
    public showRollNotice(str) {
        let label = this.createShowNode(str)

        //时间 秒数
        let holdTime = 2;

         // var callback = cc.callFunc(this.onComplete, this);
        let sequence = cc.sequence(cc.fadeTo(holdTime, 0), cc.callFunc(function(target, score) {
            this.rollNoticeList.shift()
            // target.removeFromParent(false)
            target.destroy()
        }, this))//动作完成后删除
        label.runAction(sequence);
    }

}
