import {Fish} from 'Fish';
export class Koi extends Fish {

  constructor(pondSize: number, firestPos?: [number, number]) {
    super(pondSize, firestPos);

  }
  init() {
    this.name = "koi";
    this.taiseki = 25;
    this.tailSize = 25;
    this.width = 12;
    this.color = "#0f0";
    this.strongCoeff = 20;
    this.taisha = 5;
    this.staightRunCoeff = 94 + Math.floor(Math.random() * 5);
    this.jumyou = 60 * 60 * 2 + Math.floor((Math.random() * 30));
    this.hansyokuTime = 60 * 50 + Math.floor((Math.random() * 30));
    this.caneat = "funa";
    this.hara = this.taiseki;
    this.lifeCicle = 60 * 5;
    this.mouseSize = 2;
    this.haraSize = this.taiseki * 3;
    this.setPosition();
  }
  copy() {
    return new Koi(this.pondSize, this.getTailPosition());
  }
}
