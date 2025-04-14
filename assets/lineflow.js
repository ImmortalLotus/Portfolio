import {animate} from './anime.esm.js';

const line = document.querySelector('#dottedLine');

animate(line,  
    {strokeDashoffset: ['0', '-100'],
        duration: 3000,
        ease: 'linear',
        loop: true});