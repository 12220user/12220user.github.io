let timeFrame = 25;
let timeWait = 2000;
let randomChar = "1234567890";


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function ConsoleLoop(idName , textVar){
    let textBody = document.getElementById(idName);
    let textDefould = textBody.innerHTML;
    let textvl = textVar;
    let per = 0;
    
    let iter = 15;

    while (true){
        for(let i = 0; i < iter; i++ ){
            effect1(textBody , textDefould)
            await sleep(timeFrame);
        }
        textBody.innerText = textDefould;
        await sleep(timeWait);
        per ++;
        if(per == textvl.length){
            per =0;
        }
        textDefould = textvl[per];
    }
}

function effect1(textBody , textDefould){
    let str = '';
        for(let x = 0; x < textDefould.length; x++ ){
            if(textDefould[x] != ' '){
                let rnd = Math.floor( (randomChar.length-1) * Math.random());
                str+= randomChar[rnd];
            }
            else
            {
                str+=' '
            }
        }
    textBody.innerHTML = str;
}

ConsoleLoop("TextGlitch" , ['12220 GAMES' , 'MAKE GAMES' , "CREATE ASSETS"]  );
ConsoleLoop("glitchPrg" , ['Projects']  );