import {Fish} from 'Fish';
export class Funa extends Fish {
    
    constructor(pondSize: number, firestPos?: [number, number]) {
        super(pondSize, firestPos);
    }
    init() {
        this.name = "funa";
        this.taiseki = 5;
        this.tailSize = 10;
        this.width = 5;
        this.color = "#fff";
        this.strongCoeff = 10;
        this.taisha = 1;
        this.staightRunCoeff = 90 + Math.floor(Math.random() * 5);
        this.jumyou = 60 * 60 * 1 + Math.floor((Math.random() * 30));
        this.hansyokuTime = 60 * 10 + Math.floor((Math.random() * 30));
        this.caneat = "mizinko";
        this.hara = this.taiseki;
        this.lifeCicle = 60 * 5;
        this.haraSize = this.taiseki * 7;
        this.setPosition();
    }
    copy() {
        console.log("funa");
        return new Funa(this.pondSize, this.getTailPosition());
    }
}