import { StatefulComponent } from "../component-library/statefulcomponent";

import { State } from "../utils";
import { Header } from "./Header";

export class Body extends StatefulComponent {
    private header: Header;
    constructor(){
        super({});
        this.header = <Header>this.$ref('calendar-header');
        this.peerState(this.header);
    }

    render(state: State){
        return `
        <ul class="days"> 
            ${(()=>{
                let html = ''
                const days = new Date(this.header.state.year, this.header.state.month+1, 0).getDate();
                let start_day = new Date(this.header.state.year, this.header.state.month,1).getDay();
                if(start_day > 0){
                    start_day -= 1;
                } else {
                    start_day = 6;
                }
                let day = 0;
                console.log(start_day)
                while(day < days+start_day){
                    if(day >= start_day){
                        html += `<li ${
                            this.header.state.date.getDate()-1 == day && 
                            this.header.state.date.getMonth() == this.header.state.month
                            ? 'class="active"'
                            : '' 
                        }>${day+1-start_day}</li>`;
                    } else {
                        html += `<li></li>`;
                    }
                    day++;
                }
                return html;
            })()}
        </ul>
        `
    }
}
