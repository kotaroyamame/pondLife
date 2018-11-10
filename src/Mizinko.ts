import {Fish} from 'Fish';
export class Mizinko extends Fish {

  constructor(pondSize: number, firestPos?: [number, number]) {
    super(pondSize, firestPos);
  }
  init(){
    this.taiseki = 1;
    this.width = 3;
    this.color = "#0ff";
    this.strongCoeff = 1;
    this.tailSize = 2;
    this.hara = 1;
    this.name = "mizinko";
    this.staightRunCoeff = 20 + Math.floor(Math.random() * 5);
    this.caneat = "none";
    this.setPosition();
  }
  getNextPosition(prev: number) {
    const a = Math.floor(Math.random() * 100) - this.staightRunCoeff;
    if (a <= 0) {
      return this.susumu(prev + 2);
    } else {
      return this.susumu(prev + (Math.floor(Math.random() * 2.2) == 0 ? 3 : 1));
    }
  }
  life() {
  }
  copy(){
    return new Mizinko(this.pondSize);
  }
  hansyoku() {
    return [];
  }
}
