export class BadgeData {
    public badge: string;
    public requirement: number;
    public quality: number = 3;

    constructor(badge: string, requirement: number) {
        this.badge = badge
        if (badge == "dragon_badge") {
            this.quality = 3
        }
        else if (badge == "tiger_badge") {
            this.quality = 4
        }
        else if (badge == "phoenix_badge") {
            this.quality = 5
        }
        else if (badge == "tortoise_badge") {
            this.quality = 6
        }
        this.requirement = requirement
    }
}