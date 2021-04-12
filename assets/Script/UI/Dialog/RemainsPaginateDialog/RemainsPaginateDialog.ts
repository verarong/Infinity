
import { BaseDialog } from "../../Common/BaseDialog";
import { Debug } from "../../../Common/Debug";
import RemainsPaginateList from "./ItemList/RemainsPaginateList";
import { RemainsPaginateData } from "./ItemList/RemainsPaginateData";
import { Util } from "../../../Common/Utils/Util";




const { ccclass, property } = cc._decorator;

@ccclass
export default class RemainsPaginateDialog extends BaseDialog {

      private remains_quality: number;
      private page_index: number;
      private bool_page_up: boolean;
      private bool_page_down: boolean;
      //{"bool_last_page": bool_last_page, "summary": summary}
      private _data: any

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Sprite)
      public page_up_btn: cc.Sprite;

      @property(cc.Sprite)
      public page_down_btn: cc.Sprite;

      @property(RemainsPaginateList)
      public RemainsPaginateList: RemainsPaginateList;

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
            this.hide();
      }

      public ShowByData() {
            this.title.string = window.appContext.ConfigManager.GetRemainsByQuality(this.remains_quality).name + "·" + Util.changeToCN(this.page_index)
            this.bool_page_up = this.page_index > 0
            this.page_up_btn.node.active = this.bool_page_up
            this.bool_page_down = !this._data.bool_last_page
            this.page_down_btn.node.active = this.bool_page_down

            let data_list: Array<RemainsPaginateData> = new Array()
            for (let x of this._data.summary) {
                  data_list.push(new RemainsPaginateData(x, this.remains_quality))
            }
            this.RemainsPaginateList.ApplyData(data_list)
      }

      public refresh(refresh: boolean = true, offset: number = 0) {
            if (refresh) {
                  this.page_index += offset
                  this.get_remains_paginate()
            }
            else {
                  this.ShowByData()
            }
      }

      public bind_data(info: number) {
            Debug.log(info);
            this.page_index = 0;
            this.remains_quality = info;
      }

      public show(info: any) {
            this.bind_data(info);

            this.refresh()
      }

      public page_up() {
            if (this.bool_page_up) {
                  this.refresh(true, -1)
            }
      }

      public page_down() {
            if (this.bool_page_down) {
                  this.refresh(true, 1)
            }
      }

      public get_remains_paginate() {
            let self = this;
            window.appContext.WebApi.get_remains_info(this.remains_quality, this.page_index, this,
                  function (succeed_data) {
                        self._data = succeed_data
                        this.ShowByData()
                  });
      }
}
