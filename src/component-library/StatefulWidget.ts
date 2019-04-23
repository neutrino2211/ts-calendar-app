import { getRef, State, StateTransformers } from "../utils";
import { EventEmitter } from "events";
import { Widget } from "./Widget";

export class StatefulWidget extends Widget {
    eventEmitter = new EventEmitter();
    constructor(state: State, transformers?: StateTransformers){
        super(state, transformers);
        this.setState(state);
        this.on('load',this.onMount)
    }

    connectedCallback(){
        this.setup();
        this.root = this;
        let state: State = {};
        for(let i=0; i<this.attributes.length; i++){
            const attr= this.attributes[i];
            state[attr.name] = attr.value;
        }
        let componentState = Object.assign({}, this.state)
        state = Object.assign(componentState, state);
        this.beforeRender()
        this.innerHTML = this._render(state);
        this.on('render',(state: State)=>{
            let componentState = Object.assign({}, this.state)
            state = Object.assign(componentState, state);
            this.beforeRender()
            this.innerHTML = this._render(state);
            this.emit('load')
            this.afterRender()
        })
        this.emit('load')
        this.afterRender()
    }

    get emitter(){
        return this.eventEmitter;
    }

    get on(){
        return this.eventEmitter.on;
    }

    get emit(){
        return this.eventEmitter.emit;
    }

    peerComponent(component: StatefulWidget){
        component.on('render',()=>{
            this.emit('render');
        })
    }

    setState(state: State){
        this.transformers && Object.keys(this.state).length !== 0 && this.transformState(this.transformers,this.state)
        this.state = Object.assign(this.state || {}, state);
        this.emit('render',this.state);
    }
    
    public beforeRender(){}
    public afterRender(){}
}