import { StatefulComponent } from "../component-library/statefulcomponent";

import { State } from "../utils";

export class Header extends StatefulComponent {
    constructor(){
        const date = new Date();
        super({
            date: date,
            year: date.getFullYear(),
            month: date.getMonth()
        })
    }

    get month(): string {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this.state.month%12]
    }

    onLoad(){
        this.root.querySelector('.next').addEventListener('click',()=>{
            if(this.state.month === 11){
                this.state.month = -1;
                this.state.year += 1;
            }
            this.setState({
                month: this.state.month+1,
                year: this.state.year
            })
        })

        this.root.querySelector('.prev').addEventListener('click',()=>{
            if(this.state.month === 0){
                this.state.month = 12;
                this.state.year -= 1
            }
            this.setState({
                month: this.state.month-1,
                year: this.state.year
            })
        })
    }

    render(state: State){
        return `
        <div class="month"> 
            <ul>
                <li class="prev">&#10094;</li>
                <li class="next">&#10095;</li>
                <li>${this.month}<br><br><span style="font-size:18px">${state.year}</span></li>
            </ul>
        </div>
        `
    }
}