import {Fish} from 'Fish';
export class Mizinko extends Fish {
  taiseki = 1;
  width = 3;
  color = "#0ff";
  strongCoeff = 1;
  tailSize = 2;
  hara = 1;
  name = "mizinko";
  staightRunCoeff = 20 + Math.floor(Math.random() * 5);
  constructor(pondSize: number, firestPos?: [number, number]) {
    super(pondSize, firestPos);

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
  hansyoku() {
    return [];
  }
}
