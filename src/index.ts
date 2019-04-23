import './native-shim.js'
import { useComponent, State } from './utils';
import { Header } from './components/Header';
import { Month } from './components/Month';
import { App } from './components/App';
import { Day } from './components/Day';
import { Body } from './components/Body';

console.log("Hello from Typescript!!");

useComponent(Day).as('calendar-day');
useComponent(Month).as('calendar-month');
useComponent(Header).as('calendar-header');
useComponent(Body).as('calendar-body');
useComponent(App).as('calendar-app');