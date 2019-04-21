export class BaseComponent extends HTMLElement {
    private parentNodes = [];
    private baseMutationObserver
    constructor() {
        super()
    }
  
    setup() {
        // collect the parentNodes
        let el: Node = this;
        while (el.parentNode) {
            el = el.parentNode
            this.parentNodes.push(el)
        }
        // check if the parser has already passed the end tag of the component
        // in which case this element, or one of its parents, should have a nextSibling
        // if not (no whitespace at all between tags and no nextElementSiblings either)
        // resort to DOMContentLoaded or load having triggered
        if ([this, ...this.parentNodes].some(el=> el.nextSibling) || document.readyState !== 'loading') {
            this.childrenAvailableCallback();
        } else {
            this.baseMutationObserver = new MutationObserver(() => {
                if ([this, ...this.parentNodes].some(el=> el.nextSibling) || document.readyState !== 'loading') {
                    this.childrenAvailableCallback()
                    this.baseMutationObserver.disconnect()
                }
            });
    
            this.baseMutationObserver.observe(this, {childList: true});
        }
    }

    childrenAvailableCallback(){}
}