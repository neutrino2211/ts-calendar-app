import { BaseComponent } from "./basecomponent";

import { StatefulComponent } from "./statefulcomponent";

import { State, registerRef } from "../utils";

export class Component extends BaseComponent {
    public component: StatefulComponent;
    constructor(){
        super();
    }

    connectedCallback(){
        this.setup();
        this.component.root = this;
        let state: State = {};
        for(let i=0; i<this.attributes.length; i++){
            const attr= this.attributes[i];
            state[attr.name] = attr.value;
        }
        let componentState = Object.assign({}, this.component.state)
        state = Object.assign(componentState, state);
        this.innerHTML = this.component._render(state);
        this.component.on('render',(state: State)=>{
            let componentState = Object.assign({}, this.component.state)
            state = Object.assign(componentState, state);
            this.innerHTML = this.component._render(state);
            this.component.emit('load')
        })
        this.component.emit('load')
    }

    childrenAvailableCallback(){
        console.log(this.getAttribute('$ref'))
        if(this.getAttribute('$ref')){
            registerRef(this.getAttribute('$ref'), this.component);
        }
    }

    disconnectedCallback(){

    }
}