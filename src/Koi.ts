import {Fish} from 'Fish';
export class Koi extends Fish {
  name = "koi";
  taiseki = 25;
  tailSize = 25;
  width = 12;
  color = "#0f0";
  strongCoeff = 20;
  taisha = 3;
  staightRunCoeff = 94 + Math.floor(Math.random() * 5);
  jumyou = 60 * 60 * 2 + Math.floor((Math.random() * 30));
  hansyokuTime = 60 * 20 + Math.floor((Math.random() * 30));
  caneat = "funa";
  lifeCicle = 60 * 10;
  haraSize = this.taiseki * 7;
  constructor(pondSize: number, firestPos?: [number, number]) {
    super(pondSize, firestPos);

  }
  init() {

    this.setPosition();
  }
  copy() {
    return new Koi(this.pondSize, this.getTailPosition());
  }
}
