import './native-shim.js'
import { useComponent, State } from './utils';
import { Header } from './components/Header';
import { Body } from './components/Body';
import { App } from './components/App';
import { Day } from './components/Day';

console.log("Hello from Typescript!!");

useComponent(Day).as('calendar-day');
useComponent(Header).as('calendar-header');
useComponent(Body).as('calendar-body');
useComponent(App).as('calendar-app');