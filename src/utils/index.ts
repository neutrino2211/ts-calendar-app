import { Component } from '../component-library/component';
import { Widget } from '../component-library/Widget';

const global_refs = {};

export type State = any;
export type StateTransformers = any;

export function registerRef(ref: string, component: Widget){
    global_refs[ref] = component;
}

export function getRef(ref: string): Widget{
    return global_refs[ref];
}

export function useComponent(comp: new () => Component){
    return {
        as: (name: string) => {
            customElements.define(name, comp);
        }
    }
}