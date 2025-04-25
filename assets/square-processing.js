import {animate,createTimeline,stagger} from './anime.esm.js';

let mostrar=true;
const $demo = document.querySelector('#squares');
const $squares = $demo.querySelectorAll('.square');

const $squareUpper = $demo.querySelectorAll('.square-upper');
const $squareLower = $demo.querySelectorAll('.square-lower');
const $squareSecret = $demo.querySelector('#secret-square');
const $outgoingSquare = document.getElementById('outgoing-square');
const tl = createTimeline()
.label('start',0)
.add($squares, { x: '10rem',loop:true,ease:'inOut', delay:500, duration:1000,loopDelay: 500 },500)
.add($squareLower,{y:'-1.5rem',ease:'inOut', loop:true, delay:500, duration:1000,loopDelay: 500,'background-color':"#FFF"},500)
.add($squareUpper,{y:'1.5rem',ease:'inOut', loop:true, delay:500, duration:1000,loopDelay: 500,'background-color':"#FFF"},500)
.add($squareSecret,{scale:1.7,delay:500, loop:true, duration:1000,loopDelay: 500, 'background-color':"#FFF"}, 500)
animate($outgoingSquare, { x: '20rem',loop:true,ease:'inOut',delay:1200, duration:1000,loopDelay: 500 })
animate($outgoingSquare, {scale:1.2,ease:'inOut', duration:750,loop:true,delay:1000, loopDelay:0,
    onLoop: () => {
        if(mostrar){
            $outgoingSquare.style.display='flex';
            mostrar=false;
            console.log('mostrou')
        }else{
            $outgoingSquare.style.display='none';
            mostrar=true;
        }
    }
 })
//.add($squareSecret,{y:'-3rem', },500)

// .add($squareSecret,{x: '10rem',delay:1000, duration:1000},2000)
// .add($squareSecret,{x: '23rem', duration:1000,'display':'block'},1500)
