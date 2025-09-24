function max(a,b,c){
    if(a>b && a>c){
        return a;
    }else if(b>a && b>c){
        return b;
    }else if(c>a && c>b){
        return c;
    }
}

function min(a,b,c){
    if(a<b && a<c){
        return a;
    }else if(b<a && b<c){
        return b;
    }else if(c<a && c<b){
        return c;
    }
}

function print(arr) {
    for (const ele of arr) {
        console.log(ele);
    }
}

const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let a;
let b;
let c;

rl.question(`Podaj a `, inputA => {
    a = Number(inputA);
    rl.question(`Podaj b `, inputB => {
        b = Number(inputB);
        rl.question(`podaj c `, inputC => {
            c = Number(inputC);

            const arr = new Array(a,b,c);

            print(arr);

            console.log(max(a,b,c) + " Największa z podanych liczb");
            console.log(min(a,b,c) + " Najmniejsza z podanych liczb\n\n\n");

            let linia = "";

            for (let i = 0; i < "HelloWorld".length; i++) {
                for (let j = 0; j < "HelloWorld".length; j++) {
                    linia += i==j ? " " : "HelloWorld"[j];
                }
                console.log(linia);
                linia = "";
            }
            rl.close();
        });
    });
});


