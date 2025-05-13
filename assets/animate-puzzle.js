import {animate,createTimeline,stagger} from './anime.esm.js';

let mostrar=true;
const puzzle = document.querySelector('#puzzle-piece');
const caixa=document.querySelector("#caixa-puzzle")
animate(puzzle,  
    {
        scale:0.1,rotate:'270',delay:0, loop:true, duration:0,loopDelay: 0
    });


animate(puzzle,  
    {
        scale:1,delay:0, loop:true, duration:1200,loopDelay: 500
    });

animate(puzzle,  
    {
        'left': '9.47vw',ease:'inOut',loop:true, delay:0, duration:1200,loopDelay: 500
    },500);

