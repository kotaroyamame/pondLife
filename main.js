 const POND_SIZE=200;//√池のセル数
    class Fish{
      constructor(pondSize,firestPos){
        this.firestPos=firestPos;
        this.caneat="any";
        this.taiseki=10;
        this.strongCoeff=10;
        this.width=10;
        this.color="#fff";
        this.fun=0;
        this.pondSize=pondSize;
        this.positionStack=[];
        this.tailSize=10;
        this.staightRunCoeff=95;
        this.hara=this.taiseki;
        this.haraSize=this.taiseki*6;
        this.count=0;
        this.taisha=1;
        this.is_dead=false;
        this.jumyou=60*60*60*1;
        this.hansyokuTime=60*60*10;
        this.lifeCicle=3600;
      }
      getTailPosition(){
        return this.positionStack[0]||[50,50];
      }
      getNowPosition(){
        return this.positionStack[this.positionStack.length-1];
      }
      taberu(n){
        this.hara+=n;
      }
      getWidth(){
        return this.hara;
      }
      susumu(n){
        n=n%4;
        switch(n){
          case 0://上
            return [0,-1]
          case 1://右
            return [1,0]
          case 2://した
            return [0,1]
          case 3://左
            return [-1,0]
        }
      }
      getNByVec(vec){
        vec=String(vec);
        switch(vec){
          case "0,-1"://上
            return 0
          case "1,0"://右
            return 1
          case "0,1"://した
            return 2
          case "-1,0"://左
            return 3
        }
        return 0;
      }
      copy(){
        return new Fish(this.pondSize);
      }
      hansyoku(){
        if(this.count%this.hansyokuTime==this.hansyokuTime-1){
          if(this.hara>this.taiseki){
            const childSize=Math.floor((this.hara-this.taiseki)/this.taiseki);
            this.hara-=childSize*this.taiseki;
            return [...Array(childSize)].map(o=>this.copy())
          }
        }
        return false;
      }
      life(){
        this.count++;
        if(this.count%this.lifeCicle==0){
          this.hara-=this.taisha;
          this.fun+=this.taisha;
          if(this.hara<0){
            this.is_dead=true;
          }
        }
        if(this.jumyou<this.count){
          this.is_dead=true;
        }
      }
      getNextPosition(prev){
       const a = Math.floor(Math.random()*100)-this.staightRunCoeff;
       if(a<=0){
        return this.susumu(prev+2);
       }else{
        return this.susumu(prev+(Math.floor(Math.random()*2)==0?3:1));
       } 
      }
      setPosition(){
        const firstPos=this.firestPos==null?[50,50]:this.firestPos;//[Math.floor(Math.random()*this.pondSize),Math.floor(Math.random()*this.pondSize)];
        this.positionStack.push(firstPos);
        for(let i=0;i<this.tailSize;i++){
          let nextPos=null;
          if(this.positionStack.length<3){
            nextPos=this.susumu(Math.floor(Math.random()*4));
          }else{
            nextPos=this.getNextPosition(this.getNByVec([this.positionStack[this.positionStack.length-2][0]-this.positionStack[this.positionStack.length-1][0],this.positionStack[this.positionStack.length-2][1]-this.positionStack[this.positionStack.length-1][1]]));
          }
          this.positionStack.push([this.positionStack[this.positionStack.length-1][0]+nextPos[0],this.positionStack[this.positionStack.length-1][1]+nextPos[1]]);
        }
        

      }
      pondSide(n){
        if(n<0){
          return -n;
        }
        if(n>=100){
          return n-1;
        }
        return n;
      }
      getPosition(){
        this.positionStack.shift();
        const next=this.getNextPosition(this.getNByVec([this.positionStack[this.positionStack.length-2][0]-this.positionStack[this.positionStack.length-1][0],this.positionStack[this.positionStack.length-2][1]-this.positionStack[this.positionStack.length-1][1]]));
        let [x,y]=[this.positionStack[this.positionStack.length-1][0]+next[0],this.positionStack[this.positionStack.length-1][1]+next[1]];
        if(x<0||x>this.pondSize||y<0||y>this.pondSize){
          [x,y]=[this.positionStack[this.positionStack.length-1][0]-next[0],this.positionStack[this.positionStack.length-1][1]-next[1]];
        }
        this.positionStack.push([x,y]);
        this.life();
        return this.positionStack;
      }
    }
    class Funa extends Fish{
      constructor(pondSize,firestPos){
        super(pondSize,firestPos=null);
        this.firestPos=firestPos;
        this.width=8;
        this.taiseki=3;
        this.color="#f00";
        this.strongCoeff=10;
        this.tailSize=7;
        this.name="funa";
        this.staightRunCoeff=80+Math.floor(Math.random()*15);
        this.jumyou=60*60*(Math.random()*3);
        this.hansyokuTime=Math.floor(60*45+Math.random()*20);
        this.setPosition();
        this.taisha=1;
        this.caneat="mizinko";
        this.lifeCicle=60*20;
      }
      copy(){
        return new Funa(this.pondSize,this.getTailPosition());
      }
    }
    class Koi extends Fish{
      constructor(pondSize,firestPos){
        super(pondSize,firestPos=null);
        this.firestPos=firestPos;
        this.taiseki=8;
        this.tailSize=25;
        this.width=12;
        this.color="#0f0";
        this.strongCoeff=20;
        this.name="koi";
        this.taisha=3;
        this.staightRunCoeff=94+Math.floor(Math.random()*5);
        this.jumyou=60*60*(Math.random()*10);
        this.hansyokuTime=Math.floor(60*60+Math.random()*20);
        this.caneat="funa";
        this.lifeCicle=60*35;
        this.setPosition();
      }
      copy(){
        return new Koi(this.pondSize,this.getTailPosition());
      }
    }
    class Mizinko extends Fish{
      constructor(pondSize,firestPos=null){
        super(pondSize,firestPos=null);
        this.firestPos=firestPos;
        this.taiseki=1;
        this.width=3;
        this.color="#0ff";
        this.strongCoeff=1;
        this.tailSize=2;
        this.hara=1;
        this.name="mizinko";
        this.staightRunCoeff=20+Math.floor(Math.random()*5);
        this.setPosition();
      }
      getNextPosition(prev){
       const a = Math.floor(Math.random()*100)-this.staightRunCoeff;
       if(a<=0){
        return this.susumu(prev+2);
       }else{
        return this.susumu(prev+(Math.floor(Math.random()*2.2)==0?3:1));
       } 
      }
      life(){
      }
      hansyoku(){
        return false;
      }
    }
    class Pond{
      constructor(fishList){
        this.fishList=fishList;
      }
      getFishPos(){
        this.fishList=this.fishList.filter(o=>o);
        //死んだ魚排除
        for(let i=this.fishList.length-1;i>=0;i--){
          if(this.fishList[i].is_dead){
            for(let j=0;j<this.fishList[i].hara+this.fishList[i].fun;j++){
              try{
                this.fishList.push(new Mizinko(POND_SIZE,fishList[i].getTailPosition()));
              }catch(e){
                console.log(e);
                console.log(fishList[i]);
              }
            }
            this.fishList.splice(i,1);
          }else{
            //ふんをする
            for(let j=0;j<this.fishList[i].fun;j++){
              this.fishList.push(new Mizinko(POND_SIZE,fishList[i].getTailPosition()));
            }
            this.fishList[i].fun=0;
          }
        }
        
        this.fishList=this.fishList.filter(fish=>!fish.is_dead);
        //繁殖
        for(let i=this.fishList.length-1;i>=0;i--){
          const hansyoku=this.fishList[i].hansyoku();
          if(hansyoku){
            for(let j=0;j<hansyoku.length;j++){
              this.fishList.push(hansyoku[j]);
            }
          }
        }
        //捕食
        for(let i=this.fishList.length-1;i>=0;i--){
          const i_position=this.fishList[i].getNowPosition();
          for(let j=this.fishList.length-1;j>=0;j--){
            if(i==j){
              continue;
            }
            const j_position=this.fishList[j].getNowPosition();
            if(i_position[0]==j_position[0]&&i_position[1]==j_position[1]){
              if(this.fishList[i].strongCoeff>this.fishList[j].strongCoeff){
                if(this.fishList[i].caneat==this.fishList[j].name&&this.fishList[i].hara<this.fishList[i].haraSize){
                  this.fishList[i].taberu(this.fishList[j].taiseki);
                  this.fishList.splice(j,1); 
                }
                
              }
            }
          }
        }
        return this.fishList.map((o,i,ar)=>{
          return {
            "position":o.getPosition(),
            "color":o.color,
            "width":o.getWidth()
          }
        })
      }
    }
    
    const fishList =[];
    for(let i=0;i<3;i++){
      fishList.push(new Koi(POND_SIZE));
    } 
    for(let i=0;i<80;i++){
      fishList.push(new Funa(POND_SIZE));
    }
    for(let i=0;i<500;i++){
      fishList.push(new Mizinko(POND_SIZE));
    }

    const pond = new Pond(fishList);

    let stageW = 0; // 画面の幅
    let stageH = 0; // 画面の高さ
    

    // canvas要素の参照を取得
    const canvas = document.querySelector('canvas');
    // 2Dの描画命令群を取得
    const context = canvas.getContext('2d');

    resize();
    tick();
    window.addEventListener('resize', resize);
    
    /** エンターフレームのタイミングです。 */
    function tick() {
      requestAnimationFrame(tick);
      draw();
    }

        /** 描画します。 */
    function draw() {
      // 画面をリセット
      context.clearRect(0, 0, stageW, stageH);
      context.lineWidth = 10;
      
      context.strokeStyle = `#fff`;
      fieldWidth = Math.min(stageW, stageH);
      widthCoeff=fieldWidth/POND_SIZE;
      const segmentNum = 30;　// 分割数
      const amplitude = stageH / 3; // 振幅
      const time = Date.now() / 1000; // 媒介変数(時間)
      pond.getFishPos().forEach((fish) => {
        context.beginPath();
        context.strokeStyle = fish.color;
        context.lineWidth = fish.width;
        fish.position.forEach((xy,i) => {
          const [x,y]=[Math.floor(xy[0]*widthCoeff),Math.floor(xy[1]*widthCoeff)];
          // 線を描く
          if (i === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        context.stroke();  
      });  
    }


    /** リサイズ時のイベントです。 */
    function resize() {
      stageW = innerWidth * devicePixelRatio;
      stageH = innerHeight * devicePixelRatio;

      canvas.width = stageW;
      canvas.height = stageH;
    }