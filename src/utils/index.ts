import { Component } from '../component-library/component';
import { StatefulComponent } from '../component-library/statefulcomponent';

const global_refs = {};

export type State = any;
export type StateTransformers = any;

export function registerRef(ref: string, component: StatefulComponent){
    global_refs[ref] = component;
}

export function getRef(ref: string): StatefulComponent{
    return global_refs[ref];
}

export function useComponent(comp: new () => Component){
    return {
        as: (name: string) => {
            customElements.define(name, comp);
        }
    }
}