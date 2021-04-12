const {ccclass, property} = cc._decorator;

@ccclass
export abstract class BaseComponent extends cc.Component {

    abstract loadCompleteCall(args: Array<any>): void;
}
