
export default class AttackDetail{

    public attackValue:number;

    public fire:number;

    public gold:number;
  
    public soil:number;
    
    public water:number;
    
    public wood:number;

    constructor(data) {
        this.attackValue = data.attack;
        this.fire = data.fire;
        this.gold = data.gold;
        this.soil = data.soil;
        this.water = data.water;
        this.wood = data.wood;
    }
}
