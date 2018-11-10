import { Pond } from "./Pond";

export class Fish {
    name: string = "";
    mouseSize = 2;
    caneat = "any";
    taiseki = 10;
    strongCoeff = 10;
    width = 10;
    color = "#fff";
    fun = 0;
    positionStack: Array<[number, number]> = [];
    tailSize = 10;
    staightRunCoeff = 95;
    hara = this.taiseki;
    haraSize = this.taiseki * 7;
    count = 0;
    taisha = 1;
    is_dead = false;
    jumyou = 60 * 60 * 60 * 1;
    hansyokuTime = 60 * 60 * 10;
    lifeCicle = 3600;
    constructor(protected pondSize: number, protected firestPos?: [number, number]) {

    }
    getTailPosition() {
        return this.positionStack[0] || [50, 50];
    }
    getNowPosition() {
        return this.positionStack[this.positionStack.length - 1];
    }
    taberu(n: number) {
        this.hara += n;
    }
    getWidth() {
        return this.hara;
    }
    susumu(n: number): [number, number] {
        n = n % 4;
        switch (n) {
            case 0://上
                return [0, -1]
            case 1://右
                return [1, 0]
            case 2://した
                return [0, 1]
            case 3://左
                return [-1, 0]
        }
        return [0, -1];
    }
    getNByVec(vec: Array<number>): number {
        const stvec = String(vec);
        switch (stvec) {
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
    copy() {
        return new Fish(this.pondSize);
    }
    hansyoku(): Array<any> {
        if (this.count % this.hansyokuTime == this.hansyokuTime - 1) {
            if (this.hara > this.taiseki * 2) {
                const childSize = Math.floor((this.hara - this.taiseki) / this.taiseki);
                this.hara -= childSize * this.taiseki;
                return [...Array(childSize)].map(o => this.copy())
            }
        }
        return [];
    }
    life() {
        this.count++;
        if (this.count % this.lifeCicle == 0) {
            this.hara -= this.taisha;
            this.fun += this.taisha;
            if (this.hara < 0) {
                this.is_dead = true;
            }
        }
        if (this.jumyou < this.count) {
            this.is_dead = true;
        }
    }
    getNextPosition(prev: number): [number, number] {
        const a = Math.floor(Math.random() * 100) - this.staightRunCoeff;
        if (a <= 0) {
            return this.susumu(prev + 2);
        } else {
            return this.susumu(prev + (Math.floor(Math.random() * 2) == 0 ? 3 : 1));
        }
    }
    setPosition() {
        const firstPos: [number, number] = this.firestPos == null ? [50, 50] : this.firestPos;//[Math.floor(Math.random()*this.pondSize),Math.floor(Math.random()*this.pondSize)];
        this.positionStack.push(firstPos);
        for (let i = 0; i < this.tailSize; i++) {
            let nextPos: [number, number] | false;
            if (this.positionStack.length < 3) {
                nextPos = this.susumu(Math.floor(Math.random() * 4));
            } else {
                nextPos = this.getNextPosition(this.getNByVec([this.positionStack[this.positionStack.length - 2][0] - this.positionStack[this.positionStack.length - 1][0], this.positionStack[this.positionStack.length - 2][1] - this.positionStack[this.positionStack.length - 1][1]]));
            }
            if (nextPos) {
                this.positionStack.push([this.positionStack[this.positionStack.length - 1][0] + nextPos[0], this.positionStack[this.positionStack.length - 1][1] + nextPos[1]]);
            }
        }
    }
    pondSide(n: number) {
        if (n < 0) {
            return -n;
        }
        if (n >= 100) {
            return n - 1;
        }
        return n;
    }
    getPosition() {
        this.positionStack.shift();
        const next = this.getNextPosition(this.getNByVec([this.positionStack[this.positionStack.length - 2][0] - this.positionStack[this.positionStack.length - 1][0], this.positionStack[this.positionStack.length - 2][1] - this.positionStack[this.positionStack.length - 1][1]]));
        let [x, y] = [this.positionStack[this.positionStack.length - 1][0] + next[0], this.positionStack[this.positionStack.length - 1][1] + next[1]];
        if (x < 0 || x > this.pondSize || y < 0 || y > this.pondSize) {
            [x, y] = [this.positionStack[this.positionStack.length - 1][0] - next[0], this.positionStack[this.positionStack.length - 1][1] - next[1]];
        }
        this.positionStack.push([x, y]);
        this.life();
        return this.positionStack;
    }
}
