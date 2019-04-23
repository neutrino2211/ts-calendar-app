import { StatelessWidget } from "../component-library/StatelessWidget";
import { Header } from "./Header";
import { State } from "../utils";

export class Day extends StatelessWidget {
    private header: Header;
    constructor(){
        super({
            day: ''
        })
        this.header = <Header>this.$ref('calendar-header');
    }

    onMount(){
        const li = this.root.querySelector('li');
        const [from, to] = this.header.gradient(this.header.state.month);
        if(
            this.header.state.date.getDate()-1 == this.state.day && 
            this.header.state.date.getMonth() == this.header.state.month &&
            this.header.state.year == this.header.state.date.getFullYear()
        ) {
            li.setAttribute('class','active');
            li.setAttribute('style','background: linear-gradient(to bottom right,'+from+', '+to+');')
        } else {
            li.classList.add('hover');
        }
    }

    onDismount(){
        console.log(`Dismounted ${this.header.state.year}/${this.header.state.month}/${this.state.day}`);
    }

    render(state: State){
        return `<li>${state.day || ''}</li>`
    }
}