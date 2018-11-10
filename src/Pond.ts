import {Mizinko} from 'Mizinko';
import {Fish} from 'Fish';
import {combination} from 'js-combinatorics';
export class Pond {
  mouseShadow: Array<Array<any>>;
  constructor(private pondSize: number, private fishList: Array<Fish>) {
    this.mouseShadow = [...Array(pondSize)].map(o => [...Array(pondSize)].map(p => []));
  }
  resetShadow() {
    for(let i=0;i<this.mouseShadow.length;i++){
      for(let j=0;j<this.mouseShadow[i].length;j++){
        this.mouseShadow[i][j]=[];
      }
    }
  }
  get FishList(){
    return this.fishList;
  }
  getFishPos() {
    this.fishList = this.fishList.filter(o => {
      if(!o){
        return false;
      }
      return !o.is_eatdead;
    });
    //死んだ魚排除
    let fishSize = this.fishList.length - 1;
    for (let i = fishSize; i >= 0; i--) {
      if (!this.fishList[i]) { 
        this.fishList.splice(i, 1); 
        continue;
      }
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
    }
    for (let i = 0; i < this.mouseShadow.length; i++) {
      for (let j = 0; j < this.mouseShadow[i].length; j++) {
        if (this.mouseShadow[i][j].length > 1) {
          //口の影が被っている魚同士を比較
          const _shadowList = this.mouseShadow[i][j];
          if(_shadowList.length>1) {
            const cmb=combination(_shadowList,2);
            let c:any;
            while(c=cmb.next()){
              console.log(c);
              if(this.fishList[c[0]]&&this.fishList[c[1]]){
                if(this.fishList[c[0]].caneat==this.fishList[c[1]].name){
                  this.fishList[c[0]].taberu(this.fishList[c[1]].taiseki+this.fishList[c[1]].hara);
                  this.fishList[c[1]].is_eatdead=true;
                }else if(this.fishList[c[1]].caneat==this.fishList[c[0]].name){
                  this.fishList[c[1]].taberu(this.fishList[c[0]].taiseki+this.fishList[c[0]].hara);
                  this.fishList[c[0]].is_eatdead=true;
                }
                
              }
            }
            
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
