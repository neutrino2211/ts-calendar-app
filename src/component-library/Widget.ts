import { Component } from "./component";
import { State, StateTransformers, getRef } from "../utils";

export class Widget extends Component {
    public state: State;
    public root: HTMLElement;
    public transformers: StateTransformers;
    constructor(state: State, transformers?: StateTransformers){
        super();
        this.component = this;
        this.transformers = transformers;
        transformers && this.transformState(transformers, state);
    }

    protected transformState(transformers: StateTransformers, state: State){
        Object.getOwnPropertyNames(transformers).forEach( v => {
            state[v] = transformers[v](state[v]);
        })
    }

    $ref(name: string): Widget {
        return getRef(name);
    }

    public onMount(){}
    public onDismount(){}

    _render(state?: State): string{
        this.transformers && this.transformState(this.transformers, state);
        if(state){
            this.state = state;
        }
        return this.render(state || this.state);
    }

    public render(state: State): string{
        return '';
    }
}