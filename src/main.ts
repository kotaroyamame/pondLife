import { Pond } from "./Pond";
import { Fish } from 'Fish'
import { Koi } from 'Koi'
import { Funa } from 'Funa'
import { Mizinko } from 'Mizinko'
import { ChartOptions, Chart } from "chart.js";
const POND_SIZE: number = 100;//√池のセル数
const KOI_SIZE: number = 2;//鯉の数
const FUNA_SIZE: number = 50;//フナの数
const MIZINKO_SIZE: number = 20;//ミジンコの数
class Eye {

}



class CanvasController {
  is_down = false;
  startX = 0;
  startY = 0;
  endX = 0;
  endY = 0;
  x = 0;
  y = 0;
  zoomMax = 2;
  zoomMin = 0.1;
  zoom: number = 1;
  endZoom: number = 1;
  mousedown(e: MouseEvent) {
    console.log(e);

    this.startX = e.offsetX;
    this.startY = e.offsetY;
    this.is_down = true;
  }
  mouseup(e: MouseEvent) {
    console.log(e);
    this.is_down = false;
    this.endX = this.x;
    this.endY = this.y;
    this.endZoom = this.zoom;
  }
  mousemove(e: MouseEvent) {

    if (this.is_down) {
      if (e.altKey) {
        if (this.zoom > this.zoomMax && (e.offsetY - this.startY) < 0) {
          this.zoom += (e.offsetY - this.startY) * 0.0001;
        } else if (this.zoom < this.zoomMin && (e.offsetY - this.startY) > 0) {
          this.zoom += (e.offsetY - this.startY) * 0.0001;
        } else if (this.zoom < this.zoomMax && this.zoom > this.zoomMin) {
          this.zoom += (e.offsetY - this.startY) * 0.0001;
        }
      } else {
        this.x = e.offsetX - this.startX + this.endX;
        this.y = e.offsetY - this.startY + this.endY;
      }

    }
  }
}
class Main {
  static pond:Pond;
  static canvas = <HTMLCanvasElement>document.getElementById('js-pond');
  static stageW: number = 0;
  static stageH: number = 0;
  static canvasContext: CanvasRenderingContext2D | null = null;
  static drawCount = 0;
  static canvasController = new CanvasController();
  //池を描画するサイズ
  static fieldWidth: number = 0;
  static fieldHeight: number = 0;
  static widthCoeff: number = 1;
  static ChartData: any = {
    carp: [],
    funa: [],
    setFish: (fishList: Array<Fish>) => {
      Main.ChartData.carp.push(0);
      Main.ChartData.funa.push(0);
      fishList.forEach((fish) => {
        switch (fish.name) {
          case 'koi':
            Main.ChartData.carp[Main.ChartData.carp.length - 1]++;
            break;
          case 'funa':
            Main.ChartData.funa[Main.ChartData.funa.length - 1]++;
            break;
        }
      });
    }
  }
  constructor() {

  }
  static tick() {
    requestAnimationFrame(Main.tick);
    Main.draw();
  }
  static draw() {
    this.drawCount++;
    if (this.drawCount % 300 == 1) {
      this.ChartData.setFish(Main.pond.FishList);
      console.log(this.ChartData.carp);
      //チャート
      const canvas = <HTMLCanvasElement>document.getElementById("fishChart");
      if (canvas) {
        const fishChart = new Chart(canvas, {
          type: 'line',
          data: {
            datasets: [
              {
                label: "Carp",
                data: this.ChartData.carp
              },
              {
                label: "Funa",
                data: this.ChartData.funa
              }
            ],
            labels: [...Array(this.ChartData.carp.length).keys()].map(o => String(o))
          }
        });
      }

    }
    if (Main.canvasContext == null) {
      return;
    }
    // 画面をリセット
    Main.canvasContext.clearRect(0, 0, Main.stageW, Main.stageH);
    Main.canvasContext.lineWidth = 10;

    Main.canvasContext.strokeStyle = `#fff`;
    this.fieldWidth = Math.min(Main.stageW, Main.stageH);
    this.widthCoeff = this.fieldWidth / POND_SIZE;
    const segmentNum = 30;　// 分割数
    const amplitude = Main.stageH / 3; // 振幅
    const time = Date.now() / 1000; // 媒介変数(時間)
    this.pond.getFishPos().forEach((fish) => {
      if (Main.canvasContext == null) {
        return;
      }
      Main.canvasContext.beginPath();
      Main.canvasContext.strokeStyle = fish.color;
      Main.canvasContext.lineWidth = fish.width * Main.canvasController.zoom;
      fish.position.forEach((xy, i) => {
        let [x, y] = [Math.floor(xy[0] * Main.widthCoeff + Main.canvasController.x), Math.floor(xy[1] * Main.widthCoeff + Main.canvasController.y)];
        x = (Main.fieldWidth / 2) + ((x - (Main.fieldWidth / 2)) * Main.canvasController.zoom)
        y = (Main.fieldWidth / 2) + ((y - (Main.fieldWidth / 2)) * Main.canvasController.zoom)
        // 線を描く
        if (Main.canvasContext == null) {
          return;
        }
        if (i === 0) {
          Main.canvasContext.moveTo(x, y);
        } else {
          Main.canvasContext.lineTo(x, y);
        }
      });
      Main.canvasContext.stroke();
    });
  }
  /****
   * Main
   */
  static main() {
    const fishList = [];
    for (let i = 0; i < KOI_SIZE; i++) {
      fishList.push(new Koi(POND_SIZE));
    }
    for (let i = 0; i < FUNA_SIZE; i++) {
      fishList.push(new Funa(POND_SIZE));
    }
    for (let i = 0; i < MIZINKO_SIZE; i++) {
      fishList.push(new Mizinko(POND_SIZE));
    }

    this.pond = new Pond(POND_SIZE, fishList);
    const js_pond = document.getElementById('js-pond');
    if (js_pond) {
      Main.stageW = js_pond.clientWidth * devicePixelRatio;
      Main.stageH = js_pond.clientHeight * devicePixelRatio;
    }
    // canvas要素の参照を取得
    this.canvas = <HTMLCanvasElement>document.getElementById('js-pond');
    // 2Dの描画命令群を取得
    if (Main.canvas) {
      this.canvasContext = Main.canvas.getContext('2d');
      Main.resize();
      Main.tick();
      window.addEventListener('resize', Main.resize);
    }

  }
  static resize() {
    Main.stageW = Main.canvas.clientWidth * devicePixelRatio;
    Main.stageH = Main.canvas.clientHeight * devicePixelRatio;

    Main.canvas.width = Main.stageW;
    Main.canvas.height = Main.stageH;
  }

}
window.onload = () => {
  console.log("onload");
  Main.main();
}

declare var window: any;
window.canvasClick = (e: MouseEvent) => {
  console.log("click");
}
window.canvasMousedown = (e: MouseEvent) => {
  Main.canvasController.mousedown(e);
}
window.canvasMouseleave = (e: MouseEvent) => {
  Main.canvasController.mouseup(e);
}
window.canvasMouseup = (e: MouseEvent) => {
  Main.canvasController.mouseup(e);
}
window.canvasMousemove = (e: MouseEvent) => {

  Main.canvasController.mousemove(e);
}



