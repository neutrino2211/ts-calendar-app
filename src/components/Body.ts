import { StatefulComponent } from "../component-library/statefulcomponent";

import { State } from "../utils";
import { Header } from "./Header";

export class Body extends StatefulComponent {
    private header: Header;
    constructor(){
        super({});
        this.header = <Header>this.$ref('calendar-header');
        this.peerComponent(this.header);
    }

    onLoad(){
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
        const [from, to] = this.header.gradient(this.header.state.month);
        return `
        <ul class="days"> 
            ${(()=>{
                let html = ''
                while(day < days+start_day){
                    const li = document.createElement('li');
                    if(day >= start_day){
                        if(
                            this.header.state.date.getDate()-1 == day && 
                            this.header.state.date.getMonth() == this.header.state.month &&
                            this.header.state.year == this.header.state.date.getFullYear()
                        ) {
                            li.setAttribute('class','active');
                            li.setAttribute('style','background: linear-gradient(to bottom right,'+from+', '+to+');')
                        } else {
                            li.classList.add('hover');
                        }

                        const day_number = (day-start_day+1);
                        if(day_number > 0){
                            li.textContent = day_number.toString()
                        }
                    }
                    html += li.outerHTML;
                    day++;
                }
                return html;
            })()}
        </ul>
        `
    }
}
