import {Fish} from 'Fish';
export class Funa extends Fish {
    
    constructor(pondSize: number, firestPos?: [number, number]) {
        super(pondSize, firestPos);
    }
    init() {
        this.name = "funa";
        this.width = 8;
        this.taiseki = 3;
        this.color = "#eff";
        this.strongCoeff = 10;
        this.tailSize = 7;
        this.staightRunCoeff = 80 + Math.floor(Math.random() * 15);
        this.jumyou = 60 * 60 + Math.floor((Math.random() * 30));
        this.hansyokuTime = 60 * 15 + Math.floor((Math.random() * 30));
        this.setPosition();
        this.taisha = 1;
        this.caneat = "mizinko";
        this.lifeCicle = 60 * 5;
        this.haraSize = this.taiseki * 7;
    }
    copy() {
        return new Funa(this.pondSize, this.getTailPosition());
    }
}