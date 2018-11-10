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
    this.taisha = 3;
    this.staightRunCoeff = 94 + Math.floor(Math.random() * 5);
    this.jumyou = 60 * 60 * 2 + Math.floor((Math.random() * 30));
    this.hansyokuTime = 60 * 20 + Math.floor((Math.random() * 30));
    this.caneat = "funa";
    this.lifeCicle = 60 * 10;
    this.haraSize = this.taiseki * 3;
    this.setPosition();
  }
  copy() {
    return new Koi(this.pondSize, this.getTailPosition());
  }
}
