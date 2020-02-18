import {Config} from './config';
import * as p5 from 'p5';

export class App
{
    constructor(p: p5)
    {
        let config = new Config();
        console.log(config, p5);
    }
}