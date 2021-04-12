const { ccclass, property } = cc._decorator;

@ccclass
export default class Dissolve_color extends cc.Component {
  // @property(cc.Label)
  // tip: cc.Label = null;
  materialList: cc.Material[] = [];
  fadePct: number = 0; // 溶解百分比
  activeFlag: boolean = false; // 溶解进行中
  symbol: number = 1; // 色彩叠加的正负
  speed: number = 0.3; // 色彩叠加的速度

  // start() {
  //   this.materialList.push(
  //     this.node.getChildByName('ghost').getComponent(cc.Sprite).getMaterial(0),
  //     this.node.getChildByName('man').getComponent(cc.Sprite).getMaterial(0)
  //   );
  // }

  public StartShowEffect(sprite:cc.Sprite){
    this.materialList =[];
    this.materialList.push(sprite.getMaterial(0));

    if (this.activeFlag) return;
    this.activeFlag = true;
  }


  toggle() {
    if (this.activeFlag) return;
    this.activeFlag = true;
  }

  update(dt) {
    if (!this.activeFlag) return;
    this.materialList.forEach((material) => material.setProperty('fade_pct', this.fadePct));

    if (this.fadePct >= 0 && this.fadePct <= 1) {
      this.fadePct += this.symbol * dt * this.speed;
      // this.tip.string = "溶解程度 " + this.fadePct.toFixed(1);
    } else {
      this.fadePct = this.fadePct > 1 ? 1 : 0;
      this.symbol = -this.symbol;
      this.activeFlag = false;
    }
  }
}
