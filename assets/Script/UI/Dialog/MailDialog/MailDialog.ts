import { Debug } from "../../../Common/Debug";
import { PrefabUrl } from "../../../Manager/PrefabUrl";
import { BaseDialog } from "../../Common/BaseDialog";
import DomainPanel from "../../Panel/DomainPanel/DomainPanel";
import MailAwardList from "./ItemList/MailAwardList";
import { MailAwardData, MailData } from "./ItemList/MailData";
import { MailList } from "./ItemList/MailList";



const { ccclass, property } = cc._decorator;

@ccclass
export default class MailDialog extends BaseDialog {

      private selected: number = 0;
      private mail_amount: number = 0;
      private mails: Array<MailData> = new Array();
      private mail_data: MailData;

      @property(cc.Label)
      public title: cc.Label;

      @property(cc.Label)
      public content: cc.Label;

      @property(MailList)
      public MailList: MailList;

      @property(MailAwardList)
      public MailAwardList: MailAwardList;

      @property(cc.Node)
      public receive: cc.Node;

      @property(cc.Node)
      public receive_batch: cc.Node;

      @property(cc.Node)
      public fight_summary: cc.Node;

      start() {
            this.fastShowAnim();
      }

      reset(currentIndex: number): void {
            //TODO
      }

      getData(): any {
            return this.mails;
      }

      closeDialog(): any {
            this.hide();
            let domain: DomainPanel = window.appContext.UIManager.getCurrentPanel()
            domain.refresh()
      }

      public showBySelected(select = null) {
            this.selected = select ? select : 0
            this.mail_data = this.mails[this.selected]

            this.title.string = this.mail_data.title
            this.content.string = this.mail_data.content

            if (this.mail_data.award) {
                  this.MailAwardList.node.active = true
                  let awards: Array<MailAwardData> = new Array()
                  for (let item of this.mail_data.award) {
                        awards.push(new MailAwardData(item))
                  }
                  this.MailAwardList.ApplyData(awards)
            }
            else {
                  this.MailAwardList.node.active = false
            }

            this.fight_summary.active = this.mail_data.fight_summary ? true : false
      }

      public showFightSummary() {
            if (this.mail_data.fight_summary) {
                  window.appContext.UIManager.ShowDialog(PrefabUrl.FightDialog, this.mail_data.fight_summary)
            }
      }

      public ShowByData() {
            let data = window.appContext.DataContainer.get_MailData()
            let mails: Array<MailData> = new Array()
            if (this.selected == null) {
                  this.selected = 0
            }

            this.mail_amount = data.mail.length
            //{"user_id": self.user_id, "mail": self.mail}
            if (data.mail.length) {
                  this.title.node.active = true
                  this.content.node.active = true
                  this.MailList.node.active = true
                  this.MailAwardList.node.active = true
                  this.fight_summary.active = true
                  this.receive.active = true
                  this.receive_batch.active = true

                  for (let x of data.mail) {
                        mails.push(new MailData(x))
                  }
                  this.mails = mails.reverse()
                  this.MailList.ApplyData(this.mails, this.selected);
                  this.showBySelected(this.selected)
            }
            else {
                  this.title.node.active = false
                  this.content.node.active = false
                  this.MailList.node.active = false
                  this.MailAwardList.node.active = false
                  this.fight_summary.active = false
                  this.receive.active = false
                  this.receive_batch.active = false
            }
      }

      public refresh(refresh: boolean = false, select = null) {
            this.selected = select

            let self = this
            if (refresh) {
                  window.appContext.WebApi.get_character_info(["mail", "main", "item"], this, function (data) {
                        window.appContext.DataContainer.set_MailData(data.mail)
                        window.appContext.DataContainer.set_RoleData(data.main)
                        window.appContext.DataContainer.set_ItemData(data.item)
                        self.ShowByData()
                  });
            }
            else {
                  this.ShowByData()
            }
      }

      public bind_data(info: number) {
            Debug.log(info);
      }

      public show(info: any) {
            //this.bind_data(info);
            this.refresh()
      }

      public receive_mail() {
            let self = this
            window.appContext.WebApi.receive_mail(this.mail_amount - 1 - this.selected, this, function (succData) {
                  self.refresh(true)
            });
      }

      public receive_mail_batch() {
            let self = this
            window.appContext.WebApi.receive_mail_batch(this, function (succData) {
                  self.refresh(true)
            });
      }
}
