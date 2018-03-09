import { createElement, detach, rippleEffect, setValue } from '@syncfusion/ej2-base';
import { getValue, addClass } from '@syncfusion/ej2-base';

/**
 * Initialize wrapper element for angular.
 * @private
 */
export function wrapperInitialize(tag: string, type: string, element: HTMLInputElement, WRAPPER: string): HTMLInputElement {
    if (element.tagName === tag) {
        let ejInstance: Object = getValue('ej2_instances', element);
        let input: Element = createElement('input', { attrs: { 'type': type } });
        let props: string[] = ['change', 'cssClass', 'label', 'labelPosition'];
        let wrapper: Element = createElement(tag, {
            className: WRAPPER, attrs: { 'role': type, 'aria-checked': 'false' }
        });
        for (let index: number = 0, len: number = element.attributes.length; index < len; index++) {
            if (props.indexOf(element.attributes[index].nodeName) === -1) {
                input.setAttribute(element.attributes[index].nodeName, element.attributes[index].nodeValue);
            }
        }
        element.parentNode.insertBefore(input, element);
        detach(element);
        element = input as HTMLInputElement;
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
        setValue('ej2_instances', ejInstance, element);
    }
    return element;
}

export function getTextNode(element: HTMLElement): Node {
    let node: Node;
    let childnode: NodeList = element.childNodes;
    for (let i: number = 0; i < childnode.length; i++) {
        node = childnode[i];
        if (node.nodeType === 3) {
            return node;
        }
    }
    return null;
}

/**
 * Creates CheckBox component UI with theming and ripple support.
 * @private
 */
export function createCheckBox(enableRipple: boolean = false, options: CheckBoxUtilModel = {}): Element {
    let wrapper: Element = createElement('div', { className: 'e-checkbox-wrapper e-css' });
    if (options.cssClass) {
        addClass([wrapper], options.cssClass.split(' '));
    }
    if (options.enableRtl) {
        wrapper.classList.add('e-rtl');
    }
    if (enableRipple) {
        let rippleSpan: HTMLElement = createElement('span', { className: 'e-ripple-container' });
        rippleEffect(rippleSpan, { isCenterRipple: true, duration: 400 });
        wrapper.appendChild(rippleSpan);
    }
    let frameSpan: Element = createElement('span', { className: 'e-frame e-icons' });
    if (options.checked) {
        frameSpan.classList.add('e-check');
    }
    wrapper.appendChild(frameSpan);
    if (options.label) {
        let labelSpan: Element = createElement('span', { className: 'e-label', innerHTML: options.label });
        wrapper.appendChild(labelSpan);
    }
    return wrapper;
}

export function rippleMouseHandler(e: MouseEvent, rippleSpan: Element): void {
    if (rippleSpan) {
        let event: MouseEvent = document.createEvent('MouseEvents');
        event.initEvent(e.type, false, true);
        rippleSpan.dispatchEvent(event);
    }
}

export interface CheckBoxUtilModel {
    checked?: boolean;
    label?: string;
    enableRtl?: boolean;
    cssClass?: string;
}