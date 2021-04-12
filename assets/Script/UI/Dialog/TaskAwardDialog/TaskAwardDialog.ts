
import { BaseDialog } from "../../Common/BaseDialog";
import { Debug } from "../../../Common/Debug";
import TaskAwardList from "./ItemList/TaskAwardList";
import { TaskAwardData } from "./ItemList/TaskAwardData";




const { ccclass, property } = cc._decorator;

@ccclass
export default class TaskAwardDialog extends BaseDialog {

      private item_data: any;

      @property(TaskAwardList)
      public items: TaskAwardList;

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return;
      }

      closeDialog(): any {
            window.appContext.SoundManager.play_get_gold();
            this.hide();
      }

      public ShowByData() {
            let data_list: Array<TaskAwardData> = new Array()
            for (let x of this.item_data) {
                  data_list.push(new TaskAwardData(x))
            }
            this.items.ApplyData(data_list)
      }

      public bind_data(info: any) {
            Debug.log(info);
            this.item_data = info;
      }

      public show(info: any) {
            this.bind_data(info);

            this.ShowByData()
      }
}
