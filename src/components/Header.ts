import { StatefulWidget } from "../component-library/StatefulWidget";

import { State } from "../utils";

export class Header extends StatefulWidget {
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

    gradient(index: number): [string,string] {
        const gradients = ['#1acc9c','#1abc9c','#1a9c9c','#1a7c9c','#1a7090','#1a6090','#1a5090','#1a6090','#1a7090','#1a7c9c','#1a9c9c','#1abc9c','#1acc9c'];
        return [gradients[index],gradients[index+1]];
    }

    onMount(){
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
        const [from, to] = this.gradient(state.month);
        return `
        <div class="month" style="background: linear-gradient(to bottom right, ${from}, ${to});"> 
            <ul>
                <li class="prev">&#10094;</li>
                <li class="next">&#10095;</li>
                <li>${this.month}<br><br><span style="font-size:18px">${state.year}</span></li>
            </ul>
        </div>
        `
    }
}