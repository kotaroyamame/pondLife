import {Mizinko} from 'Mizinko';
import {Fish} from 'Fish';
export class Pond {
  mouseShadow: Array<Array<any>>;
  constructor(private pondSize: number, private fishList: Array<Fish>) {
    this.mouseShadow = [...Array(pondSize)].map(o => [...Array(pondSize)].map(p => []));
  }
  resetShadow() {
    this.mouseShadow.forEach(o => {
      o.forEach(p => {
        p = [];
      })
    })
  }
  get FishList(){
    return this.fishList;
  }
  getFishPos() {
    this.fishList = this.fishList.filter(o => o);
    //死んだ魚排除
    let fishSize = this.fishList.length - 1;
    for (let i = fishSize; i >= 0; i--) {
      if (!this.fishList[i]) { this.fishList.splice(i, 1); continue; }
      if (this.fishList[i].is_dead) {
        for (let j = 0; j < this.fishList[i].hara + this.fishList[i].fun; j++) {
          try {
            this.fishList.push(new Mizinko(this.pondSize, this.fishList[i].getTailPosition()));
          } catch (e) {
            console.log(e);
            console.log(this.fishList[i]);
          }
        }
        this.fishList.splice(i, 1);
        continue;
      } else {
        for (let i = fishSize; i >= 0; i--) {
          //ふんをする
          for (let j = 0; j < this.fishList[i].fun; j++) {
            try {
              this.fishList.push(new Mizinko(this.pondSize, this.fishList[i].getTailPosition()));
            } catch (e) {
              console.log(e);
              console.log(this.fishList[i]);
            }
          }
          this.fishList[i].fun = 0;
        }
      }
    }


    this.fishList = this.fishList.filter(fish => !fish.is_dead);
    //繁殖
    for (let i = this.fishList.length - 1; i >= 0; i--) {
      const hansyoku = this.fishList[i].hansyoku();
      for (let j = 0; j < hansyoku.length; j++) {
        this.fishList.push(hansyoku[j]);
      }
    }
    //捕食
    for (let i = this.fishList.length - 1; i >= 0; i--) {
      const i_position = this.fishList[i].getNowPosition();
      //インデックスを落とす
      if(!i_position){
        continue;
      }
      if (this.mouseShadow[i_position[0]] && this.mouseShadow[i_position[0]][i_position[1]]) {
        this.mouseShadow[i_position[0]][i_position[1]].push(i);
      }


      // for(let j=this.fishList.length-1;j>=0;j--){
      //   if(i==j){
      //     continue;
      //   }
      //   const j_position=this.fishList[j].getNowPosition();
      //   if(i_position[0]==j_position[0]&&i_position[1]==j_position[1]){
      //     if(this.fishList[i].strongCoeff>this.fishList[j].strongCoeff){
      //       if(this.fishList[i].caneat==this.fishList[j].name&&this.fishList[i].hara<this.fishList[i].haraSize){
      //         this.fishList[i].taberu(this.fishList[j].taiseki);
      //         this.fishList.splice(j,1); 
      //       }

      //     }
      //   }
      // }

    }
    for (let i = 0; i < this.mouseShadow.length; i++) {
      for (let j = 0; j < this.mouseShadow[i].length; j++) {
        if (this.mouseShadow[i][j].length > 1) {
          //口の影が被っている魚同士を比較
          const _shadowList = this.mouseShadow[i][j];
          for (let k = 0; k < _shadowList.length; k++) {
            this.fishList[_shadowList[k]]
          }
        }
      }
    }
    this.resetShadow();
    return this.fishList.map((o, i, ar) => {
      return {
        "position": o.getPosition(),
        "color": o.color,
        "width": o.getWidth()
      }
    })
  }
}
