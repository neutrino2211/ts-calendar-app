import { StatefulWidget } from "../component-library/StatefulWidget";
import { State } from "../utils";

let timer: number;

export class App extends StatefulWidget {
    constructor(){
        super({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }

    debounce(func: (UIEvent)=>void){
        return (event: UIEvent) => {
            if(timer) clearTimeout(timer);
            timer = setTimeout(func,300,event);
        };
    }

    onMount(){
        window.addEventListener('resize',this.debounce((ev)=>{
            const target = <Window>ev.target;
            this.setState({
                width: target.innerWidth,
                height: target.innerHeight
            });
        }))
    }

    render(state: State){
        console.log(state.width,'x',state.height)
        if(state.width < 226 || state.height < 490){
            return `
            <h1> Oh no!!, the current resolution (${state.width}x${state.height}) is too small to render the app </h1>
            <h2> Please use a screen with a width greater than 226px and a height greater than 490px</h2>
            `;
        } else {
            return `
            <calendar-header $ref="calendar-header"></calendar-header>
        
            <ul class="weekdays">
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
                <li>Su</li>
            </ul>
            <calendar-body></calendar-body>
            `
        }
    }
}