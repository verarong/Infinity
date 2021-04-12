const {ccclass, property} = cc._decorator;

@ccclass
export  abstract class Item<T> extends cc.Component {

   /// <summary>
    /// 返回当前绑定的数据。
    /// </summary>
    /// <returns></returns> 
    abstract getData (): T 

    /// <summary>
    /// 绑定数据。data 是一个object
    /// </summary>
    /// <param name="currentIndex"></param>
    /// <param name="data"></param>
    abstract bindData (currentIndex: number, data : T)

    /// <summary>
    /// 重置。
    /// </summary>
    abstract reset (currentIndex : number):void 

    /// <summary>
    /// 选中状态改变。
    /// </summary>
    /// <param name="selected"></param>
    abstract select (selected): void 

    /// <summary>
    /// 返回Item中被Click的Button组件。
    /// </summary>
    /// <returns></returns>
    abstract getClickButton (): cc.Button
}
