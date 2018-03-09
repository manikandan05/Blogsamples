import { Component, Event, EventHandler, NotifyPropertyChanges, Property, addClass, createElement, detach, getInstance, getUniqueID, getValue, isRippleEnabled, removeClass, rippleEffect, setValue } from '@syncfusion/ej2-base';

/**
 * Initialize wrapper element for angular.
 * @private
 */
function wrapperInitialize(tag, type, element, WRAPPER) {
    if (element.tagName === tag) {
        var ejInstance = getValue('ej2_instances', element);
        var input = createElement('input', { attrs: { 'type': type } });
        var props = ['change', 'cssClass', 'label', 'labelPosition'];
        var wrapper = createElement(tag, {
            className: WRAPPER, attrs: { 'role': type, 'aria-checked': 'false' }
        });
        for (var index = 0, len = element.attributes.length; index < len; index++) {
            if (props.indexOf(element.attributes[index].nodeName) === -1) {
                input.setAttribute(element.attributes[index].nodeName, element.attributes[index].nodeValue);
            }
        }
        element.parentNode.insertBefore(input, element);
        detach(element);
        element = input;
        element.parentNode.insertBefore(wrapper, element);
        wrapper.appendChild(element);
        setValue('ej2_instances', ejInstance, element);
    }
    return element;
}
function getTextNode(element) {
    var node;
    var childnode = element.childNodes;
    for (var i = 0; i < childnode.length; i++) {
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
function createCheckBox(enableRipple, options) {
    if (enableRipple === void 0) { enableRipple = false; }
    if (options === void 0) { options = {}; }
    var wrapper = createElement('div', { className: 'e-checkbox-wrapper e-css' });
    if (options.cssClass) {
        addClass([wrapper], options.cssClass.split(' '));
    }
    if (options.enableRtl) {
        wrapper.classList.add('e-rtl');
    }
    if (enableRipple) {
        var rippleSpan = createElement('span', { className: 'e-ripple-container' });
        rippleEffect(rippleSpan, { isCenterRipple: true, duration: 400 });
        wrapper.appendChild(rippleSpan);
    }
    var frameSpan = createElement('span', { className: 'e-frame e-icons' });
    if (options.checked) {
        frameSpan.classList.add('e-check');
    }
    wrapper.appendChild(frameSpan);
    if (options.label) {
        var labelSpan = createElement('span', { className: 'e-label', innerHTML: options.label });
        wrapper.appendChild(labelSpan);
    }
    return wrapper;
}
function rippleMouseHandler(e, rippleSpan) {
    if (rippleSpan) {
        var event_1 = document.createEvent('MouseEvents');
        event_1.initEvent(e.type, false, true);
        rippleSpan.dispatchEvent(event_1);
    }
}

/**
 * Common modules
 */

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var cssClassName = {
    RTL: 'e-rtl',
    BUTTON: 'e-btn',
    PRIMARY: 'e-primary',
    ICONBTN: 'e-icon-btn'
};
/**
 * The Button is a graphical user interface element that triggers an event on its click action. It can contain a text, an image, or both.
 * ```html
 * <button id="button">Button</button>
 * ```
 * ```typescript
 * <script>
 * var btnObj = new Button();
 * btnObj.appendTo("#button");
 * </script>
 * ```
 */
var Button = /** @__PURE__ @class */ (function (_super) {
    __extends(Button, _super);
    /**
     * Constructor for creating the widget
     * @param  {ButtonModel} options?
     * @param  {string|HTMLButtonElement} element?
     */
    function Button(options, element) {
        return _super.call(this, options, element) || this;
    }
    Button.prototype.preRender = function () {
        // pre render code snippets
    };
    /**
     * Initialize the control rendering
     * @returns void
     * @private
     */
    Button.prototype.render = function () {
        this.initialize();
    };
    Button.prototype.initialize = function () {
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
        }
        if (this.isPrimary) {
            this.element.classList.add(cssClassName.PRIMARY);
        }
        if (this.content) {
            this.element.innerHTML = this.content;
        }
        this.setIconCss();
        if (this.enableRtl) {
            this.element.classList.add(cssClassName.RTL);
        }
        if (this.disabled) {
            this.controlStatus(this.disabled);
        }
        else {
            this.wireEvents();
        }
        rippleEffect(this.element, { selector: '.' + cssClassName.BUTTON });
    };
    Button.prototype.controlStatus = function (disabled) {
        this.element.disabled = disabled;
    };
    Button.prototype.setIconCss = function () {
        if (this.iconCss) {
            var span = createElement('span', { className: 'e-btn-icon ' + this.iconCss });
            if (!this.element.textContent.trim()) {
                this.element.classList.add(cssClassName.ICONBTN);
            }
            else {
                span.classList.add('e-icon-' + this.iconPosition.toLowerCase());
            }
            var node = this.element.childNodes[0];
            if (node && (this.iconPosition === 'Left')) {
                this.element.insertBefore(span, node);
            }
            else {
                this.element.appendChild(span);
            }
        }
    };
    Button.prototype.wireEvents = function () {
        if (this.isToggle) {
            EventHandler.add(this.element, 'click', this.btnClickHandler, this);
        }
    };
    Button.prototype.unWireEvents = function () {
        if (this.isToggle) {
            EventHandler.remove(this.element, 'click', this.btnClickHandler);
        }
    };
    Button.prototype.btnClickHandler = function () {
        if (this.element.classList.contains('e-active')) {
            this.element.classList.remove('e-active');
        }
        else {
            this.element.classList.add('e-active');
        }
    };
    /**
     * Destroys the widget.
     * @returns void
     */
    Button.prototype.destroy = function () {
        var span;
        var element = this.element;
        _super.prototype.destroy.call(this);
        removeClass([this.element], [cssClassName.PRIMARY, cssClassName.RTL, cssClassName.ICONBTN, 'e-success',
            'e-info', 'e-danger', 'e-warning', 'e-flat', 'e-outline', 'e-small', 'e-bigger', 'e-active', 'e-round']);
        ['e-ripple', 'disabled'].forEach(function (value) {
            element.removeAttribute(value);
        });
        if (this.content) {
            element.innerHTML = element.innerHTML.replace(this.content, '');
        }
        span = element.querySelector('span.e-btn-icon');
        if (span) {
            detach(span);
        }
        this.unWireEvents();
    };
    /**
     * Get component name.
     * @returns string
     * @private
     */
    Button.prototype.getModuleName = function () {
        return 'btn';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     * @returns string
     */
    Button.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Called internally if any of the property value changed.
     * @param  {Button} newProp
     * @param  {Button} oldProp
     * @returns void
     * @private
     */
    Button.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'isPrimary':
                    if (newProp.isPrimary) {
                        this.element.classList.add(cssClassName.PRIMARY);
                    }
                    else {
                        this.element.classList.remove(cssClassName.PRIMARY);
                    }
                    break;
                case 'disabled':
                    this.controlStatus(newProp.disabled);
                    this.unWireEvents();
                    break;
                case 'iconCss':
                    var span = this.element.querySelector('span.e-btn-icon');
                    if (span) {
                        span.className = 'e-btn-icon ' + newProp.iconCss;
                        if (this.element.textContent.trim()) {
                            if (this.iconPosition === 'Left') {
                                span.classList.add('e-icon-left');
                            }
                            else {
                                span.classList.add('e-icon-right');
                            }
                        }
                    }
                    else {
                        this.setIconCss();
                    }
                    break;
                case 'iconPosition':
                    span = this.element.querySelector('span.e-btn-icon');
                    if (span) {
                        detach(span);
                    }
                    this.setIconCss();
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass.split(' '));
                    }
                    addClass([this.element], newProp.cssClass.split(' '));
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        this.element.classList.add(cssClassName.RTL);
                    }
                    else {
                        this.element.classList.remove(cssClassName.RTL);
                    }
                    break;
                case 'content':
                    var node = getTextNode(this.element);
                    if (!node) {
                        this.element.classList.remove(cssClassName.ICONBTN);
                    }
                    this.element.innerHTML = newProp.content;
                    this.setIconCss();
                    break;
                case 'isToggle':
                    if (newProp.isToggle) {
                        EventHandler.add(this.element, 'click', this.btnClickHandler, this);
                    }
                    else {
                        EventHandler.remove(this.element, 'click', this.btnClickHandler);
                        removeClass([this.element], ['e-active']);
                    }
                    break;
            }
        }
    };
    __decorate([
        Property('Left')
    ], Button.prototype, "iconPosition", void 0);
    __decorate([
        Property('')
    ], Button.prototype, "iconCss", void 0);
    __decorate([
        Property(false)
    ], Button.prototype, "disabled", void 0);
    __decorate([
        Property(false)
    ], Button.prototype, "isPrimary", void 0);
    __decorate([
        Property('')
    ], Button.prototype, "cssClass", void 0);
    __decorate([
        Property('')
    ], Button.prototype, "content", void 0);
    __decorate([
        Property(false)
    ], Button.prototype, "isToggle", void 0);
    Button = __decorate([
        NotifyPropertyChanges
    ], Button);
    return Button;
}(Component));

/**
 * Button modules
 */

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CHECK = 'e-check';
var DISABLED = 'e-checkbox-disabled';
var FRAME = 'e-frame';
var INDETERMINATE = 'e-stop';
var LABEL = 'e-label';
var RIPPLE = 'e-ripple-container';
var RIPPLECHECK = 'e-ripple-check';
var RIPPLEINDETERMINATE = 'e-ripple-stop';
var RTL = 'e-rtl';
var WRAPPER = 'e-checkbox-wrapper';
/**
 * The CheckBox is a graphical user interface element that allows you to select one or more options from the choices.
 * It contains checked, unchecked, and indeterminate states.
 * ```html
 * <input type="checkbox" id="checkbox"/>
 * <script>
 * var checkboxObj = new CheckBox({ label: "Default" });
 * checkboxObj.appendTo("#checkbox");
 * </script>
 * ```
 */
var CheckBox = /** @__PURE__ @class */ (function (_super) {
    __extends$1(CheckBox, _super);
    /**
     * Constructor for creating the widget
     * @private
     */
    function CheckBox(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isKeyPressed = false;
        return _this;
    }
    CheckBox.prototype.changeState = function (state) {
        var ariaState;
        var rippleSpan;
        var frameSpan = this.getWrapper().getElementsByClassName(FRAME)[0];
        if (isRippleEnabled) {
            rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
        }
        if (state === 'check') {
            frameSpan.classList.remove(INDETERMINATE);
            frameSpan.classList.add(CHECK);
            if (rippleSpan) {
                rippleSpan.classList.remove(RIPPLEINDETERMINATE);
                rippleSpan.classList.add(RIPPLECHECK);
            }
            ariaState = 'true';
            this.element.checked = true;
        }
        else if (state === 'uncheck') {
            removeClass([frameSpan], [CHECK, INDETERMINATE]);
            if (rippleSpan) {
                removeClass([rippleSpan], [RIPPLECHECK, RIPPLEINDETERMINATE]);
            }
            ariaState = 'false';
            this.element.checked = false;
        }
        else {
            frameSpan.classList.remove(CHECK);
            frameSpan.classList.add(INDETERMINATE);
            if (rippleSpan) {
                rippleSpan.classList.remove(RIPPLECHECK);
                rippleSpan.classList.add(RIPPLEINDETERMINATE);
            }
            ariaState = 'mixed';
            this.element.indeterminate = true;
        }
        this.getWrapper().setAttribute('aria-checked', ariaState);
    };
    CheckBox.prototype.clickHandler = function (event) {
        this.focusOutHandler();
        if (this.indeterminate) {
            this.changeState(this.checked ? 'check' : 'uncheck');
            this.indeterminate = false;
            this.element.indeterminate = false;
        }
        else if (this.checked) {
            this.changeState('uncheck');
            this.checked = false;
        }
        else {
            this.changeState('check');
            this.checked = true;
        }
        var changeEventArgs = { checked: this.element.checked, event: event };
        this.trigger('change', changeEventArgs);
    };
    /**
     * Destroys the widget.
     * @returns void
     */
    CheckBox.prototype.destroy = function () {
        var _this = this;
        var wrapper = this.getWrapper();
        _super.prototype.destroy.call(this);
        if (!this.disabled) {
            this.unWireEvents();
        }
        if (this.tagName === 'INPUT') {
            wrapper.parentNode.insertBefore(this.element, wrapper);
            detach(wrapper);
            this.element.checked = false;
            if (this.indeterminate) {
                this.element.indeterminate = false;
            }
            ['name', 'value', 'disabled'].forEach(function (key) {
                _this.element.removeAttribute(key);
            });
        }
        else {
            ['role', 'aria-checked', 'class'].forEach(function (key) {
                wrapper.removeAttribute(key);
            });
            if (this.element.id) {
                wrapper.setAttribute('id', this.element.id);
            }
            wrapper.innerHTML = '';
        }
    };
    CheckBox.prototype.focusHandler = function () {
        if (this.isKeyPressed) {
            this.getWrapper().classList.add('e-focus');
        }
    };
    CheckBox.prototype.focusOutHandler = function () {
        this.getWrapper().classList.remove('e-focus');
    };
    /**
     * Gets the module name.
     * @private
     */
    CheckBox.prototype.getModuleName = function () {
        return 'checkbox';
    };
    /**
     * Gets the properties to be maintained in the persistence state.
     * @private
     */
    CheckBox.prototype.getPersistData = function () {
        return this.addOnPersist(['checked', 'indeterminate']);
    };
    CheckBox.prototype.getWrapper = function () {
        return this.element.parentElement.parentElement;
    };
    CheckBox.prototype.initialize = function () {
        if (this.name) {
            this.element.setAttribute('name', this.name);
        }
        if (this.value) {
            this.element.setAttribute('value', this.value);
        }
        if (this.checked) {
            this.changeState('check');
        }
        if (this.indeterminate) {
            this.changeState();
        }
        if (this.disabled) {
            this.setDisabled();
        }
    };
    CheckBox.prototype.initWrapper = function () {
        var wrapper = this.element.parentElement;
        if (!wrapper.classList.contains(WRAPPER)) {
            wrapper = createElement('div', {
                className: WRAPPER, attrs: { 'role': 'checkbox', 'aria-checked': 'false' }
            });
            this.element.parentNode.insertBefore(wrapper, this.element);
        }
        var label = createElement('label', { attrs: { for: this.element.id } });
        var frameSpan = createElement('span', { className: 'e-icons ' + FRAME });
        if (this.enableRtl) {
            wrapper.classList.add(RTL);
        }
        if (this.cssClass) {
            addClass([wrapper], this.cssClass.split(' '));
        }
        wrapper.appendChild(label);
        label.appendChild(this.element);
        label.appendChild(frameSpan);
        if (isRippleEnabled) {
            var rippleSpan = createElement('span', { className: RIPPLE });
            if (this.labelPosition === 'Before') {
                label.appendChild(rippleSpan);
            }
            else {
                label.insertBefore(rippleSpan, frameSpan);
            }
            rippleEffect(rippleSpan, { duration: 400, isCenterRipple: true });
        }
        if (this.label) {
            this.setText(this.label);
        }
    };
    CheckBox.prototype.keyDownHandler = function () {
        this.isKeyPressed = true;
    };
    CheckBox.prototype.labelMouseHandler = function (e) {
        var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
        rippleMouseHandler(e, rippleSpan);
    };
    CheckBox.prototype.mouseDownHandler = function () {
        this.isKeyPressed = false;
    };
    /**
     * Called internally if any of the property value changes.
     * @private
     */
    CheckBox.prototype.onPropertyChanged = function (newProp, oldProp) {
        var wrapper = this.getWrapper();
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'checked':
                    this.indeterminate = false;
                    this.element.indeterminate = false;
                    this.changeState(newProp.checked ? 'check' : 'uncheck');
                    break;
                case 'indeterminate':
                    if (newProp.indeterminate) {
                        this.changeState();
                    }
                    else {
                        this.element.indeterminate = false;
                        this.changeState(this.checked ? 'check' : 'uncheck');
                    }
                    break;
                case 'disabled':
                    if (newProp.disabled) {
                        this.setDisabled();
                        this.unWireEvents();
                    }
                    else {
                        this.element.disabled = false;
                        wrapper.classList.remove(DISABLED);
                        wrapper.setAttribute('aria-disabled', 'false');
                        this.wireEvents();
                    }
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        wrapper.classList.remove(oldProp.cssClass);
                    }
                    wrapper.classList.add(newProp.cssClass);
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        wrapper.classList.add(RTL);
                    }
                    else {
                        wrapper.classList.remove(RTL);
                    }
                    break;
                case 'label':
                    this.setText(newProp.label);
                    break;
                case 'labelPosition':
                    var label = wrapper.getElementsByClassName(LABEL)[0];
                    var labelWrap = wrapper.getElementsByTagName('label')[0];
                    detach(label);
                    if (newProp.labelPosition === 'After') {
                        labelWrap.appendChild(label);
                    }
                    else {
                        labelWrap.insertBefore(label, wrapper.getElementsByClassName(FRAME)[0]);
                    }
                    break;
                case 'name':
                    this.element.setAttribute('name', newProp.name);
                    break;
                case 'value':
                    this.element.setAttribute('value', newProp.value);
                    break;
            }
        }
    };
    /**
     * Initialize Angular, React and Unique ID support.
     * @private
     */
    CheckBox.prototype.preRender = function () {
        var element = this.element;
        this.tagName = this.element.tagName;
        element = wrapperInitialize('EJS-CHECKBOX', 'checkbox', element, WRAPPER);
        this.element = element;
        if (this.element.getAttribute('type') !== 'checkbox') {
            this.element.setAttribute('type', 'checkbox');
        }
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    /**
     * Initialize the control rendering
     * @private
     */
    CheckBox.prototype.render = function () {
        this.initWrapper();
        this.initialize();
        if (!this.disabled) {
            this.wireEvents();
        }
    };
    CheckBox.prototype.setDisabled = function () {
        var wrapper = this.getWrapper();
        this.element.disabled = true;
        wrapper.classList.add(DISABLED);
        wrapper.setAttribute('aria-disabled', 'true');
    };
    CheckBox.prototype.setText = function (text) {
        var label = this.getWrapper().getElementsByClassName(LABEL)[0];
        if (label) {
            label.textContent = text;
        }
        else {
            label = createElement('span', { className: LABEL, innerHTML: text });
            var labelWrap = this.getWrapper().getElementsByTagName('label')[0];
            if (this.labelPosition === 'Before') {
                labelWrap.insertBefore(label, this.getWrapper().getElementsByClassName(FRAME)[0]);
            }
            else {
                labelWrap.appendChild(label);
            }
        }
    };
    CheckBox.prototype.unWireEvents = function () {
        var wrapper = this.getWrapper();
        EventHandler.remove(this.element, 'click', this.clickHandler);
        EventHandler.remove(document, 'keydown', this.keyDownHandler);
        EventHandler.remove(wrapper, 'mousedown', this.mouseDownHandler);
        EventHandler.remove(this.element, 'focus', this.focusHandler);
        EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
        var label = wrapper.getElementsByTagName('label')[0];
        EventHandler.remove(label, 'mousedown', this.labelMouseHandler);
        EventHandler.remove(label, 'mouseup', this.labelMouseHandler);
    };
    CheckBox.prototype.wireEvents = function () {
        var wrapper = this.getWrapper();
        EventHandler.add(this.element, 'click', this.clickHandler, this);
        EventHandler.add(document, 'keydown', this.keyDownHandler, this);
        EventHandler.add(wrapper, 'mousedown', this.mouseDownHandler, this);
        EventHandler.add(this.element, 'focus', this.focusHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
        var label = wrapper.getElementsByTagName('label')[0];
        EventHandler.add(label, 'mousedown', this.labelMouseHandler, this);
        EventHandler.add(label, 'mouseup', this.labelMouseHandler, this);
    };
    __decorate$1([
        Event()
    ], CheckBox.prototype, "change", void 0);
    __decorate$1([
        Property(false)
    ], CheckBox.prototype, "checked", void 0);
    __decorate$1([
        Property('')
    ], CheckBox.prototype, "cssClass", void 0);
    __decorate$1([
        Property(false)
    ], CheckBox.prototype, "disabled", void 0);
    __decorate$1([
        Property(false)
    ], CheckBox.prototype, "indeterminate", void 0);
    __decorate$1([
        Property('')
    ], CheckBox.prototype, "label", void 0);
    __decorate$1([
        Property('After')
    ], CheckBox.prototype, "labelPosition", void 0);
    __decorate$1([
        Property('')
    ], CheckBox.prototype, "name", void 0);
    __decorate$1([
        Property('')
    ], CheckBox.prototype, "value", void 0);
    CheckBox = __decorate$1([
        NotifyPropertyChanges
    ], CheckBox);
    return CheckBox;
}(Component));

/**
 * CheckBox modules
 */

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LABEL$1 = 'e-label';
var RIPPLE$1 = 'e-ripple-container';
var RTL$1 = 'e-rtl';
var WRAPPER$1 = 'e-radio-wrapper';
/**
 * The RadioButton is a graphical user interface element that allows you to select one option from the choices.
 * It contains checked and unchecked states.
 * ```html
 * <input type="radio" id="radio"/>
 * <script>
 * var radioObj = new RadioButton({ label: "Default" });
 * radioObj.appendTo("#radio");
 * </script>
 * ```
 */
var RadioButton = /** @__PURE__ @class */ (function (_super) {
    __extends$2(RadioButton, _super);
    /**
     * Constructor for creating the widget
     * @private
     */
    function RadioButton(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isKeyPressed = false;
        return _this;
    }
    RadioButton_1 = RadioButton;
    RadioButton.prototype.changeHandler = function (event) {
        this.checked = true;
        this.dataBind();
        var changeEventArgs = { value: this.value, event: event };
        this.trigger('change', changeEventArgs);
    };
    RadioButton.prototype.updateChange = function (state) {
        var input;
        var name = this.element.getAttribute('name');
        var radioGrp = document.querySelectorAll('input.e-radio[name="' + name + '"]');
        for (var i = 0; i < radioGrp.length; i++) {
            input = radioGrp[i];
            if (input !== this.element) {
                getInstance(input, RadioButton_1).checked = false;
            }
        }
    };
    /**
     * Destroys the widget.
     * @returns void
     */
    RadioButton.prototype.destroy = function () {
        var _this = this;
        var radioWrap = this.element.parentElement;
        _super.prototype.destroy.call(this);
        if (!this.disabled) {
            this.unWireEvents();
        }
        if (this.tagName === 'INPUT') {
            radioWrap.parentNode.insertBefore(this.element, radioWrap);
            detach(radioWrap);
            this.element.checked = false;
            ['name', 'value', 'disabled'].forEach(function (key) {
                _this.element.removeAttribute(key);
            });
        }
        else {
            ['role', 'aria-checked', 'class'].forEach(function (key) {
                radioWrap.removeAttribute(key);
            });
            if (this.element.id) {
                radioWrap.setAttribute('id', this.element.id);
            }
            radioWrap.innerHTML = '';
        }
    };
    RadioButton.prototype.focusHandler = function () {
        if (this.isKeyPressed) {
            this.getLabel().classList.add('e-focus');
        }
    };
    RadioButton.prototype.focusOutHandler = function () {
        this.getLabel().classList.remove('e-focus');
    };
    RadioButton.prototype.getModuleName = function () {
        return 'radio';
    };
    /**
     * Gets the properties to be maintained in the persistence state.
     * @private
     */
    RadioButton.prototype.getPersistData = function () {
        return this.addOnPersist(['checked']);
    };
    RadioButton.prototype.getLabel = function () {
        return this.element.nextElementSibling;
    };
    RadioButton.prototype.initialize = function () {
        this.initWrapper();
        if (this.name) {
            this.element.setAttribute('name', this.name);
        }
        if (this.value) {
            this.element.setAttribute('value', this.value);
        }
        if (this.checked) {
            this.element.checked = true;
        }
        if (this.disabled) {
            this.setDisabled();
        }
    };
    RadioButton.prototype.initWrapper = function () {
        var rippleSpan;
        var wrapper = this.element.parentElement;
        if (!wrapper.classList.contains(WRAPPER$1)) {
            wrapper = createElement('div', { className: WRAPPER$1 });
            this.element.parentNode.insertBefore(wrapper, this.element);
        }
        var label = createElement('label', { attrs: { for: this.element.id } });
        wrapper.appendChild(this.element);
        wrapper.appendChild(label);
        if (isRippleEnabled) {
            rippleSpan = createElement('span', { className: (RIPPLE$1) });
            label.appendChild(rippleSpan);
            rippleEffect(rippleSpan, {
                duration: 400,
                isCenterRipple: true
            });
        }
        if (this.enableRtl) {
            label.classList.add(RTL$1);
        }
        if (this.cssClass) {
            addClass([label], this.cssClass.split(' '));
        }
        if (this.label) {
            this.setText(this.label);
        }
    };
    RadioButton.prototype.keyDownHandler = function () {
        this.isKeyPressed = true;
    };
    RadioButton.prototype.labelRippleHandler = function (e) {
        var ripple = this.getLabel().getElementsByClassName(RIPPLE$1)[0];
        rippleMouseHandler(e, ripple);
    };
    RadioButton.prototype.mouseDownHandler = function () {
        this.isKeyPressed = false;
    };
    /**
     * Called internally if any of the property value changes.
     * @private
     */
    RadioButton.prototype.onPropertyChanged = function (newProp, oldProp) {
        var label = this.getLabel();
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'checked':
                    if (newProp.checked) {
                        this.updateChange(newProp.checked);
                    }
                    this.element.checked = newProp.checked;
                    break;
                case 'disabled':
                    if (newProp.disabled) {
                        this.setDisabled();
                        this.unWireEvents();
                    }
                    else {
                        this.element.disabled = false;
                        this.wireEvents();
                    }
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([label], oldProp.cssClass.split(' '));
                    }
                    addClass([label], newProp.cssClass.split(' '));
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        label.classList.add(RTL$1);
                    }
                    else {
                        label.classList.remove(RTL$1);
                    }
                    break;
                case 'label':
                    this.setText(newProp.label);
                    break;
                case 'labelPosition':
                    if (newProp.labelPosition === 'Before') {
                        label.classList.add('e-right');
                    }
                    else {
                        label.classList.remove('e-right');
                    }
                    break;
                case 'name':
                    this.element.setAttribute('name', newProp.name);
                    break;
                case 'value':
                    this.element.setAttribute('value', newProp.value);
                    break;
            }
        }
    };
    /**
     * Initialize checked Property, Angular and React and Unique ID support.
     * @private
     */
    RadioButton.prototype.preRender = function () {
        var element = this.element;
        this.tagName = this.element.tagName;
        element = wrapperInitialize('EJS-RADIOBUTTON', 'radio', element, WRAPPER$1);
        this.element = element;
        if (this.element.getAttribute('type') !== 'radio') {
            this.element.setAttribute('type', 'radio');
        }
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    /**
     * Initialize the control rendering
     * @private
     */
    RadioButton.prototype.render = function () {
        this.initialize();
        if (!this.disabled) {
            this.wireEvents();
        }
    };
    RadioButton.prototype.setDisabled = function () {
        this.element.disabled = true;
    };
    RadioButton.prototype.setText = function (text) {
        var label = this.getLabel();
        var textLabel = label.getElementsByClassName(LABEL$1)[0];
        if (textLabel) {
            textLabel.textContent = text;
        }
        else {
            textLabel = createElement('span', { className: LABEL$1, innerHTML: text });
            label.appendChild(textLabel);
        }
        if (this.labelPosition === 'Before') {
            this.getLabel().classList.add('e-right');
        }
        else {
            this.getLabel().classList.remove('e-right');
        }
    };
    RadioButton.prototype.unWireEvents = function () {
        var label = this.getLabel();
        EventHandler.remove(this.element, 'change', this.changeHandler);
        EventHandler.remove(document, 'keydown', this.keyDownHandler);
        EventHandler.remove(label, 'mousedown', this.mouseDownHandler);
        EventHandler.remove(this.element, 'focus', this.focusHandler);
        EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
        var rippleLabel = label.getElementsByClassName(LABEL$1)[0];
        if (rippleLabel) {
            EventHandler.remove(rippleLabel, 'mousedown', this.labelRippleHandler);
            EventHandler.remove(rippleLabel, 'mouseup', this.labelRippleHandler);
        }
    };
    RadioButton.prototype.wireEvents = function () {
        var label = this.getLabel();
        EventHandler.add(this.element, 'change', this.changeHandler, this);
        EventHandler.add(document, 'keydown', this.keyDownHandler, this);
        EventHandler.add(label, 'mousedown', this.mouseDownHandler, this);
        EventHandler.add(this.element, 'focus', this.focusHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
        var rippleLabel = label.getElementsByClassName(LABEL$1)[0];
        if (rippleLabel) {
            EventHandler.add(rippleLabel, 'mousedown', this.labelRippleHandler, this);
            EventHandler.add(rippleLabel, 'mouseup', this.labelRippleHandler, this);
        }
    };
    __decorate$2([
        Event()
    ], RadioButton.prototype, "change", void 0);
    __decorate$2([
        Property(false)
    ], RadioButton.prototype, "checked", void 0);
    __decorate$2([
        Property('')
    ], RadioButton.prototype, "cssClass", void 0);
    __decorate$2([
        Property(false)
    ], RadioButton.prototype, "disabled", void 0);
    __decorate$2([
        Property('')
    ], RadioButton.prototype, "label", void 0);
    __decorate$2([
        Property('After')
    ], RadioButton.prototype, "labelPosition", void 0);
    __decorate$2([
        Property('')
    ], RadioButton.prototype, "name", void 0);
    __decorate$2([
        Property('')
    ], RadioButton.prototype, "value", void 0);
    RadioButton = RadioButton_1 = __decorate$2([
        NotifyPropertyChanges
    ], RadioButton);
    return RadioButton;
    var RadioButton_1;
}(Component));

/**
 * RadioButton modules
 */

/**
 * Button all modules
 */

export { wrapperInitialize, getTextNode, createCheckBox, rippleMouseHandler, Button, CheckBox, RadioButton };
//# sourceMappingURL=ej2-buttons.es5.js.map
