 const POND_SIZE:number=100;//√池のセル数
 const KOI_SIZE:number=2;//鯉の数
 const FUNA_SIZE:number=50;//フナの数
 const MIZINKO_SIZE:number=20;//ミジンコの数
 class Eye{

 }
    class Fish{
      name:string="";
      mouseSize=2;
      caneat="any";
      taiseki=10;
      strongCoeff=10;
      width=10;
      color="#fff";
      fun=0;
      positionStack:Array<[number,number]>=[];
      tailSize=10;
      staightRunCoeff=95;
      hara=this.taiseki;
      haraSize=this.taiseki*7;
      count=0;
      taisha=1;
      is_dead=false;
      jumyou=60*60*60*1;
      hansyokuTime=60*60*10;
      lifeCicle=3600;
      constructor(protected pondSize:number,protected firestPos?:[number,number]){

      }
      getTailPosition(){
        return this.positionStack[0]||[50,50];
      }
      getNowPosition(){
        return this.positionStack[this.positionStack.length-1];
      }
      taberu(n:number){
        this.hara+=n;
      }
      getWidth(){
        return this.hara;
      }
      susumu(n:number):[number,number]{
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
        return [0,-1];
      }
      getNByVec(vec:Array<number>):number{
        const stvec=String(vec);
        switch(stvec){
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
      hansyoku():Array<any>{
        if(this.count%this.hansyokuTime==this.hansyokuTime-1){
          if(this.hara>this.taiseki*2){
            const childSize=Math.floor((this.hara-this.taiseki)/this.taiseki);
            this.hara-=childSize*this.taiseki;
            return [...Array(childSize)].map(o=>this.copy())
          }
        }
        return [];
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
      getNextPosition(prev:number):[number,number]{
       const a = Math.floor(Math.random()*100)-this.staightRunCoeff;
       if(a<=0){
        return this.susumu(prev+2);
       }else{
        return this.susumu(prev+(Math.floor(Math.random()*2)==0?3:1));
       } 
      }
      setPosition(){
        const firstPos:[number,number]=this.firestPos==null?[50,50]:this.firestPos;//[Math.floor(Math.random()*this.pondSize),Math.floor(Math.random()*this.pondSize)];
        this.positionStack.push(firstPos);
        for(let i=0;i<this.tailSize;i++){
          let nextPos:[number,number]|false;
          if(this.positionStack.length<3){
            nextPos=this.susumu(Math.floor(Math.random()*4));
          }else{
            nextPos=this.getNextPosition(this.getNByVec([this.positionStack[this.positionStack.length-2][0]-this.positionStack[this.positionStack.length-1][0],this.positionStack[this.positionStack.length-2][1]-this.positionStack[this.positionStack.length-1][1]]));
          }
          if(nextPos){
            this.positionStack.push([this.positionStack[this.positionStack.length-1][0]+nextPos[0],this.positionStack[this.positionStack.length-1][1]+nextPos[1]]);
          } 
        }
      }
      pondSide(n:number){
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
      name="funa";
      constructor(pondSize:number,firestPos?:[number,number]){
        super(pondSize,firestPos);
      }
      init(){
        this.width=8;
        this.taiseki=3;
        this.color="#eff";
        this.strongCoeff=10;
        this.tailSize=7;
        this.staightRunCoeff=80+Math.floor(Math.random()*15);
        this.jumyou=60*60+Math.floor((Math.random()*30));
        this.hansyokuTime=60*15+Math.floor((Math.random()*30));
        this.setPosition();
        this.taisha=1;
        this.caneat="mizinko";
        this.lifeCicle=60*5;
        this.haraSize=this.taiseki*7;
      }
      copy(){
        return new Funa(this.pondSize,this.getTailPosition());
      }
    }
    class Koi extends Fish{
      name="koi";
      taiseki=25;
      tailSize=25;
      width=12;
      color="#0f0";
      strongCoeff=20;
      taisha=3;
      staightRunCoeff=94+Math.floor(Math.random()*5);
      jumyou=60*60*2+Math.floor((Math.random()*30));
      hansyokuTime=60*20+Math.floor((Math.random()*30));
      caneat="funa";
      lifeCicle=60*10;
      haraSize=this.taiseki*7;
      constructor(pondSize:number,firestPos?:[number,number]){
        super(pondSize,firestPos);
        
      }
      init(){

        this.setPosition();
      }
      copy(){
        return new Koi(this.pondSize,this.getTailPosition());
      }
    }
    class Mizinko extends Fish{
      taiseki=1;
      width=3;
      color="#0ff";
      strongCoeff=1;
      tailSize=2;
      hara=1;
      name="mizinko";
      staightRunCoeff=20+Math.floor(Math.random()*5);
      constructor(pondSize:number,firestPos?:[number,number]){
        super(pondSize,firestPos);

        this.setPosition();
      }
      getNextPosition(prev:number){
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
        return [];
      }
    }
    class Pond{
      mouseShadow:Array<Array<any>>;
      constructor(private pondSize:number,private fishList:Array<Fish>){
        this.mouseShadow=[...Array(pondSize)].map(o=>[...Array(pondSize)].map(p=>[]));
      }
      resetShadow(){
        this.mouseShadow.forEach(o=>{
          o.forEach(p=>{
            p=[];
          })
        })
      }
      getFishPos(){
        this.fishList=this.fishList.filter(o=>o);
        //死んだ魚排除
        let fishSize=this.fishList.length-1;
        for(let i=fishSize;i>=0;i--){
          if(!this.fishList[i]){this.fishList.splice(i,1);continue;}
          if(this.fishList[i].is_dead){
            for(let j=0;j<this.fishList[i].hara+this.fishList[i].fun;j++){
              try{
                this.fishList.push(new Mizinko(POND_SIZE,this.fishList[i].getTailPosition()));
              }catch(e){
                console.log(e);
                console.log(this.fishList[i]);
              }
            }
            this.fishList.splice(i,1);
            continue;
          }else{
            for(let i=fishSize;i>=0;i--){
            //ふんをする
            for(let j=0;j<this.fishList[i].fun;j++){
              try{
                this.fishList.push(new Mizinko(POND_SIZE,this.fishList[i].getTailPosition()));
              }catch(e){
                console.log(e);
                console.log(this.fishList[i]);
              }
            }
            this.fishList[i].fun=0;
          }
          }
        }
        
        
        this.fishList=this.fishList.filter(fish=>!fish.is_dead);
        //繁殖
        for(let i=this.fishList.length-1;i>=0;i--){
          const hansyoku=this.fishList[i].hansyoku();
          for(let j=0;j<hansyoku.length;j++){
            this.fishList.push(hansyoku[j]);
          }
        }
        //捕食
        for(let i=this.fishList.length-1;i>=0;i--){
          const i_position=this.fishList[i].getNowPosition();
          //インデックスを落とす
          if(this.mouseShadow[i_position[0]]&&this.mouseShadow[i_position[0]][i_position[1]]){
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
        for(let i=0;i<this.mouseShadow.length;i++){
          for(let j=0;j<this.mouseShadow[i].length;j++){
            if(this.mouseShadow[i][j].length>1){
              //口の影が被っている魚同士を比較
              const _shadowList=this.mouseShadow[i][j];
              for(let k=0;k<_shadowList.length;k++){
                this.fishList[_shadowList[k]]
              }
            }
          }
        }
        this.resetShadow();
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
    for(let i=0;i<KOI_SIZE;i++){
      fishList.push(new Koi(POND_SIZE));
    } 
    for(let i=0;i<FUNA_SIZE;i++){
      fishList.push(new Funa(POND_SIZE));
    }
    for(let i=0;i<MIZINKO_SIZE;i++){
      fishList.push(new Mizinko(POND_SIZE));
    }

    const pond = new Pond(POND_SIZE,fishList);

    let stageW = 0; // 画面の幅
    let stageH = 0; // 画面の高さ
    class CanvasController{
      is_down=false;
      startX=0;
      startY=0;
      endX=0;
      endY=0;
      x=0;
      y=0;
      zoomMax=2;
      zoomMin=0.1;
      zoom:number=1;
      endZoom:number=1;
      mousedown(e:MouseEvent){
        console.log(e);
        
        this.startX=e.offsetX;
        this.startY=e.offsetY;
        this.is_down=true;
      }
      mouseup(e:MouseEvent){
        console.log(e);
        this.is_down=false;
        this.endX=this.x;
        this.endY=this.y;
        this.endZoom=this.zoom;
      }
      mousemove(e:MouseEvent){

        if(this.is_down){
          if(e.altKey){
            if(this.zoom>this.zoomMax&&(e.offsetY-this.startY)<0){
              this.zoom+=(e.offsetY-this.startY)*0.0001;
            }else if(this.zoom<this.zoomMin&&(e.offsetY-this.startY)>0){
              this.zoom+=(e.offsetY-this.startY)*0.0001;
            }else if(this.zoom<this.zoomMax&&this.zoom>this.zoomMin){
              this.zoom+=(e.offsetY-this.startY)*0.0001;
            }
          }else{
            this.x=e.offsetX-this.startX+this.endX;
            this.y=e.offsetY-this.startY+this.endY;
          }
          
        }
      }
    }
    class Main{
      stageW:number = 0;
      stageH:number = 0;
      canvasContext:CanvasRenderingContext2D|null=null;
      drawCount=0;
      canvasController=new CanvasController();
      ChartData:any={
        carp:[],
        funa:[],
        setFish:(fishList:Array<Fish>)=>{
          this.ChartData.carp.push(0);
          this.ChartData.funa.push(0);
          fishList.forEach((fish)=>{
            switch(fish.name){
              case 'koi':
              this.ChartData.carp[this.ChartData.carp.length-1]++;
              break;
              case 'funa':
              this.ChartData.funa[this.ChartData.funa.length-1]++;
              break;
            }
          });
        }
      }
      constructor(){
        const js_pond=document.getElementById('js-pond');
        if(js_pond){
          this.stageW = js_pond.clientWidth * devicePixelRatio;
          this.stageH = js_pond.clientHeight * devicePixelRatio;
        }
      }
      tick() {
        requestAnimationFrame(this.tick);
        this.draw();
      }
      draw() {
        this.drawCount++;
        if(this.drawCount%300==1){
          this.ChartData.setFish(pond.fishList);
          console.log(this.ChartData.carp);
          //チャート
          const ctx = document.getElementById("fishChart");
          const fishChart = new Chart(ctx, {
            type: 'line',
            data: {
              datasets:[
                {
                  label:"Carp",
                  data:this.ChartData.carp
                },
                {
                  label:"Funa",
                  data:this.ChartData.funa
                }
              ],
              labels:[...Array(this.ChartData.carp.length).keys()]
            }
        });
        }
        if(this.canvasContext==null){
          return;
        }
        // 画面をリセット
        this.canvasContext.clearRect(0, 0, stageW, stageH);
        this.canvasContext.lineWidth = 10;
        
        this.canvasContext.strokeStyle = `#fff`;
        fieldWidth = Math.min(stageW, stageH);
        widthCoeff=fieldWidth/POND_SIZE;
        const segmentNum = 30;　// 分割数
        const amplitude = stageH / 3; // 振幅
        const time = Date.now() / 1000; // 媒介変数(時間)
        pond.getFishPos().forEach((fish) => {
          this.canvasContext.beginPath();
          this.canvasContext.strokeStyle = fish.color;
          this.canvasContext.lineWidth = fish.width*canvasController.zoom;
          fish.position.forEach((xy,i) => {
            let [x,y]=[Math.floor(xy[0]*widthCoeff+canvasController.x),Math.floor(xy[1]*widthCoeff+canvasController.y)];
              x=(fieldWidth/2)+((x-(fieldWidth/2))*canvasController.zoom)
              y=(fieldWidth/2)+((y-(fieldWidth/2))*canvasController.zoom)
            // 線を描く
            if (i === 0) {
              this.canvasContext.moveTo(x, y);
            } else {
              this.canvasContext.lineTo(x, y);
            }
          });
          this.canvasContext.stroke();  
        });  
      }
      static main(){
        // canvas要素の参照を取得
        const canvas = document.getElementById('js-pond');
        // 2Dの描画命令群を取得
        this.context = canvas.getContext('2d');
        this.resize();
        this.tick();
        window.addEventListener('resize', resize);
      }
      resize() {
        stageW = document.getElementById('js-pond').clientWidth * devicePixelRatio;
        stageH = document.getElementById('js-pond').clientHeight * devicePixelRatio;
  
        canvas.width = stageW;
        canvas.height = stageH;
      }
   
    }


    function canvasClick(e:MouseEvent){
      console.log("click");
    }
    function canvasMousedown(e:MouseEvent){
      canvasController.mousedown(e);
    }
    function canvasMouseleave(e:MouseEvent){
      canvasController.mouseup(e);
    }
    function canvasMouseup(e:MouseEvent){
      canvasController.mouseup(e);
    }
    function canvasMousemove(e:MouseEvent){

      canvasController.mousemove(e);
    }


    
