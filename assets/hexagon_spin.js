import {animate} from './anime.esm.js';

const hexagon = document.querySelector('#hexagon');

animate(hexagon,  
    {
        rotate: '360',             // full rotation
        duration: 6000,
        ease: 'linear',
        loop: true,
       // transformOrigin: 'center' // center of the group
      });