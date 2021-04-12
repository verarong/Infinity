import Dissolve_color from "../../CocosAwesome/Dissolve_color/Dissolve_color";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UiEffect extends cc.Component {

    private Dissolve_color: Dissolve_color;

    @property(cc.Material)
    public reversalMaterial: cc.Material;

    @property(cc.Material)
    public dissolveMaterial: cc.Material;

    start () {
        this.Dissolve_color = this.node.addComponent(Dissolve_color);
    }

    public ShowDissolveEffect(sprite){
        this.Dissolve_color.StartShowEffect(sprite);
    }

    public ShowBeHitEffect(sprite){
        let self = this;
        sprite.setMaterial(0, this.reversalMaterial, 0);
        this.scheduleOnce(function(){
            sprite.setMaterial(0, self.dissolveMaterial)
             self.scheduleOnce(function(){
                sprite.setMaterial(0, this.reversalMaterial, 0);
                 self.scheduleOnce(function(){
                    sprite.setMaterial(0, self.dissolveMaterial)
                },0.05);
            },0.05);
        },0.05);
    }

}
