import { getRef, State, StateTransformers } from "../utils";
import { Component } from "./component";
import { EventEmitter } from "events";

export class StatefulComponent extends Component {
    public state: State;
    public root: HTMLElement;
    private transformers: StateTransformers;
    private eventEmitter = new EventEmitter();
    constructor(state: State, transformers?: StateTransformers){
        super();
        this.component = this;
        this.transformers = transformers;
        transformers && this.transformState(transformers, state);
        this.setState(state);
        this.on('load',this.onLoad)
    }

    get on(){
        return this.eventEmitter.on;
    }

    get emit(){
        return this.eventEmitter.emit;
    }

    private transformState(transformers: StateTransformers, state: State){
        Object.getOwnPropertyNames(transformers).forEach( v => {
            state[v] = transformers[v](state[v]);
        })
    }

    $ref(name: string): StatefulComponent {
        return getRef(name);
    }

    peerState(component: StatefulComponent){
        component.on('render',()=>{
            this.emit('render');
        })
    }

    setState(state: State){
        this.transformers && Object.keys(this.state).length !== 0 && this.transformState(this.transformers,this.state)
        this.state = Object.assign(this.state || {}, state);
        this.emit('render',this.state);
    }

    public onLoad(){}
    public beforeRender(){}
    public afterRender(){}

    _render(state?: State): string{
        if(state){
            this.state = state;
        }
        return this.render(state || this.state);
    }

    public render(state: State): string{
        return '';
    }
}