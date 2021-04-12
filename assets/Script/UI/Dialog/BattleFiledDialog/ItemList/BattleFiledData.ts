
export enum NodeType {
    Fight = 0,
    Box = 1,
    Event = 2,
    Thread = 3,
    Campfire = 4,
}

export class BattleFiledData {
    public key: string;
    public detail: Array<number>;
    public drop: any;
    //最後一次打的節點 等于init 说明没有打过
    public loc: Array<number>;
    public parents: Array<string>;
    public type: string;
    public maxHeight: number;
    public battleFieldList: any;
    public offset: cc.Vec2;
    public currentNodeKey: string;//当前节点key
    public legal_buff: Array<number>;

    //是否當前可以打的節點
    public isCanGo: boolean;

    //是否已经完成的节点
    public hasDone;

    //是否是根节点，打完根节点成功就结算
    public isRootNode;

    public nodeType: NodeType;

    public setLegal() {
        this.isCanGo = true
    }

    public setDone() {
        this.hasDone = true
    }

    constructor(key: string, data: any, maxHeight: number, offset, currentNodeKey) {
        this.key = key;
        this.detail = data.detail;
        this.drop = data.drop;
        this.loc = data.loc;
        this.parents = data.parents;
        this.type = data.type;
        this.legal_buff = data.legal_buff
        this.maxHeight = maxHeight;
        this.offset = offset;
        this.currentNodeKey = currentNodeKey;
        this.isCanGo = false;
        this.hasDone = false;
        this.isRootNode = this.parents.length == 0;

        switch (this.type) {
            case "monster":
            case "warden":
            case "boss":
                this.nodeType = NodeType.Fight;
                break;
            case "box":
                this.nodeType = NodeType.Box;
                break;
            case "event":
                this.nodeType = NodeType.Event;
                break;
            case "thread":
                this.nodeType = NodeType.Thread;
                break;
            case "campfire":
                this.nodeType = NodeType.Campfire;
                break;
        }
    }
}
