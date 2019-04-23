import { StatefulWidget } from "../component-library/StatefulWidget";

import { State } from "../utils";
import { Header } from "./Header";
import { Day } from "./Day";

export class Body extends StatefulWidget {
    private header: Header;
    constructor(){
        super({});
        this.header = <Header>this.$ref('calendar-header');
        this.peerComponent(this.header);
    }

    onMount(){
        this.root.querySelectorAll('.hover').forEach((li: HTMLLIElement)=>{
            li.addEventListener('mouseover',()=>{
                const [from, to] = this.header.gradient(this.header.state.month);
                li.setAttribute('style','background: linear-gradient(to bottom right,'+from+', '+to+'); color: white;')
            })

            li.addEventListener('mouseleave',()=>{
                li.removeAttribute('style')
            })
        })
    }

    render(state: State){
        const days = new Date(this.header.state.year, this.header.state.month+1, 0).getDate();
        let start_day = new Date(this.header.state.year, this.header.state.month,1).getDay();
        if(start_day > 0){
            start_day -= 1;
        } else {
            start_day = 6;
        }
        let day = 0;
        return `
        <ul class="days"> 
            ${(()=>{
                let html = ''
                while(day < days+start_day){
                    const dayWidget = <Day>document.createElement('calendar-day');
                    if(day >= start_day){
                        const day_number = (day-start_day+1);
                        if(day_number > 0){
                            dayWidget.setAttribute('day',day_number.toString())
                        }
                    }
                    html += dayWidget.outerHTML;
                    day++;
                }
                return html;
            })()}
        </ul>
        `
    }
}
