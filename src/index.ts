import './native-shim.js'
import { useComponent, State } from './utils';
import { Header } from './components/Header';
import { Body } from './components/Body';

console.log("Hello from Typescript!!");

useComponent(Header).as('calendar-header');
useComponent(Body).as('calendar-body');