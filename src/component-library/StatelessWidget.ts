import { getRef, State, StateTransformers } from "../utils";
import { Widget } from "./Widget";

export class StatelessWidget extends Widget {

    constructor(state: State, transformers?: StateTransformers){
        super(state, transformers);
    }

    connectedCallback(){
        this.setup();
        this.root = this;
        let state: State = {};
        for(let i=0; i<this.attributes.length; i++){
            const attr= this.attributes[i];
            state[attr.name] = attr.value;
        }
        let componentState = {};
        Object.assign(componentState, this.state)
        Object.assign(componentState, state);
        this.innerHTML = this._render(componentState);
        this.onMount()
    }

    $ref(name: string): Widget {
        return getRef(name);
    }

    public onMount(){}
}