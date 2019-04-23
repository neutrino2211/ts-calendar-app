import { BaseComponent } from "./BaseComponent";

import { registerRef } from "../utils";
import { Widget } from "./Widget";

export class Component extends BaseComponent {
    public component: Widget;

    constructor(){
        super();
    }


    childrenAvailableCallback(){
        if(this.getAttribute('$ref')){
            registerRef(this.getAttribute('$ref'), this.component);
        }
    }

    disconnectedCallback(){
        this.component.onDismount();
    }
}