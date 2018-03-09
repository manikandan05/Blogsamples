var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-popups", "@syncfusion/ej2-inputs", "../calendar/calendar"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, ej2_base_4, ej2_popups_1, ej2_inputs_1, calendar_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DATEWRAPPER = 'e-date-wrapper';
    var ROOT = 'e-datepicker';
    var POPUPWRAPPER = 'e-popup-wrapper';
    var INPUTWRAPPER = 'e-input-group-icon';
    var POPUP = 'e-popup';
    var INPUTCONTAINER = 'e-input-group';
    var INPUTFOCUS = 'e-input-focus';
    var INPUTROOT = 'e-input';
    var ERROR = 'e-error';
    var RTL = 'e-rtl';
    var LINK = 'e-day';
    var ACTIVE = 'e-active';
    var OVERFLOW = 'e-date-overflow';
    var DATEICON = 'e-date-icon';
    var ICONS = 'e-icons';
    var OPENDURATION = 300;
    var CLOSEDURATION = 200;
    var OFFSETVALUE = 4;
    var DatePicker = (function (_super) {
        __extends(DatePicker, _super);
        function DatePicker(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.previousEleValue = '';
            _this.isDateIconClicked = false;
            _this.keyConfigs = {
                altUpArrow: 'alt+uparrow',
                altDownArrow: 'alt+downarrow',
                escape: 'escape',
                enter: 'enter',
                controlUp: 'ctrl+38',
                controlDown: 'ctrl+40',
                moveDown: 'downarrow',
                moveUp: 'uparrow',
                moveLeft: 'leftarrow',
                moveRight: 'rightarrow',
                select: 'enter',
                home: 'home',
                end: 'end',
                pageUp: 'pageup',
                pageDown: 'pagedown',
                shiftPageUp: 'shift+pageup',
                shiftPageDown: 'shift+pagedown',
                controlHome: 'ctrl+home',
                controlEnd: 'ctrl+end',
                tab: 'tab'
            };
            _this.calendarKeyConfigs = {
                escape: 'escape',
                enter: 'enter',
                tab: 'tab'
            };
            return _this;
        }
        DatePicker.prototype.render = function () {
            this.initialize();
            this.bindEvents();
        };
        DatePicker.prototype.initialize = function () {
            this.createInput();
            this.updateInput();
            this.previousEleValue = this.inputElement.value;
        };
        DatePicker.prototype.createInput = function () {
            var ariaAttrs = {
                'aria-live': 'assertive', 'aria-atomic': 'true',
                'aria-haspopup': 'true', 'aria-activedescendant': 'null',
                'aria-owns': this.inputElement.id + '_options', 'aria-expanded': 'false', 'role': 'combobox', 'autocomplete': 'off'
            };
            if (this.getModuleName() === 'datepicker') {
                var l10nLocale = { placeholder: null };
                this.globalize = new ej2_base_1.Internationalization(this.locale);
                this.l10n = new ej2_base_2.L10n('datepicker', l10nLocale, this.locale);
                this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
            }
            this.inputWrapper = ej2_inputs_1.Input.createInput({
                element: this.inputElement,
                customTag: this.ngTag,
                floatLabelType: this.floatLabelType,
                properties: {
                    readonly: this.readonly,
                    placeholder: this.placeholder,
                    cssClass: this.cssClass,
                    enabled: this.enabled,
                    enableRtl: this.enableRtl,
                    showClearButton: this.showClearButton,
                },
                buttons: [INPUTWRAPPER + ' ' + DATEICON + ' ' + ICONS]
            });
            this.setWidth(this.width);
            if (this.inputElement.name !== '') {
                this.inputElement.setAttribute('name', '' + this.inputElement.getAttribute('name'));
            }
            else {
                this.inputElement.setAttribute('name', '' + this.inputElement.id);
            }
            ej2_base_3.attributes(this.inputElement, ariaAttrs);
            if (!this.enabled) {
                this.inputElement.setAttribute('aria-disabled', 'true');
            }
            ej2_inputs_1.Input.addAttributes({ 'aria-label': 'select' }, this.inputWrapper.buttons[0]);
            ej2_base_3.addClass([this.inputWrapper.container], DATEWRAPPER);
        };
        DatePicker.prototype.updateInput = function () {
            if (this.value && !this.isCalendar()) {
                this.disabledDates();
            }
            if (+new Date('' + this.value)) {
                if (typeof this.value === 'string') {
                    this.value = this.checkDateValue(new Date('' + this.value));
                    var dateOptions = void 0;
                    if (this.getModuleName() === 'datetimepicker') {
                        dateOptions = {
                            format: !ej2_base_4.isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat,
                            type: 'dateTime', skeleton: 'yMd'
                        };
                    }
                    else {
                        dateOptions = { format: this.format, type: 'dateTime', skeleton: 'yMd' };
                    }
                    var dateString = this.globalize.formatDate(this.value, dateOptions);
                    this.setProperties({ value: this.globalize.parseDate(dateString, dateOptions) }, true);
                }
            }
            else {
                this.setProperties({ value: null }, true);
            }
            if (this.strictMode) {
                _super.prototype.processDate.call(this);
            }
            if (!ej2_base_4.isNullOrUndefined(this.value)) {
                var dateValue = this.value;
                var dateString = void 0;
                var tempFormat = !ej2_base_4.isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat;
                if (this.getModuleName() === 'datetimepicker') {
                    dateString = this.globalize.formatDate(this.value, { format: tempFormat, type: 'dateTime', skeleton: 'yMd' });
                }
                else {
                    dateString = this.globalize.formatDate(this.value, { format: this.format, type: 'dateTime', skeleton: 'yMd' });
                }
                if ((+dateValue <= +this.max) && (+dateValue >= +this.min)) {
                    ej2_inputs_1.Input.setValue(dateString, this.inputElement, this.floatLabelType, this.showClearButton);
                }
                else {
                    var value = (+dateValue >= +this.max || !+this.value) || (!+this.value || +dateValue <= +this.min);
                    if (!this.strictMode && value) {
                        ej2_inputs_1.Input.setValue(dateString, this.inputElement, this.floatLabelType, this.showClearButton);
                    }
                }
            }
            if (ej2_base_4.isNullOrUndefined(this.value) && this.strictMode) {
                ej2_inputs_1.Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
            }
            this.changedArgs = { value: this.value };
            this.errorClass();
        };
        ;
        DatePicker.prototype.bindEvents = function () {
            if (this.enabled) {
                ej2_base_1.EventHandler.add(this.inputWrapper.buttons[0], 'mousedown touchstart', this.dateIconHandler, this);
                ej2_base_1.EventHandler.add(this.inputElement, 'focus', this.inputFocusHandler, this);
                ej2_base_1.EventHandler.add(this.inputElement, 'blur', this.inputBlurHandler, this);
                this.bindClearEvent();
            }
            else {
                ej2_base_1.EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown touchstart', this.dateIconHandler);
                ej2_base_1.EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
                ej2_base_1.EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
            }
            this.keyboardModules = new ej2_base_2.KeyboardEvents(this.inputElement, {
                eventName: 'keydown',
                keyAction: this.inputKeyActionHandle.bind(this),
                keyConfigs: this.keyConfigs
            });
        };
        DatePicker.prototype.bindClearEvent = function () {
            if (this.showClearButton) {
                ej2_base_1.EventHandler.add(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler, this);
            }
        };
        DatePicker.prototype.resetHandler = function (e) {
            e.preventDefault();
            this.clear(e);
        };
        DatePicker.prototype.clear = function (event) {
            this.setProperties({ value: null }, true);
            ej2_inputs_1.Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
            this.changeEvent(event);
        };
        DatePicker.prototype.dateIconHandler = function (e) {
            e.preventDefault();
            if (!this.readonly) {
                if (this.isCalendar()) {
                    this.hide();
                }
                else {
                    this.isDateIconClicked = true;
                    this.show();
                    if (!ej2_base_2.Browser.isDevice) {
                        if (this.getModuleName() === 'datetimepicker') {
                            this.inputElement.focus();
                        }
                        this.inputElement.focus();
                        ej2_base_3.addClass([this.inputWrapper.container], [INPUTFOCUS]);
                    }
                    ej2_base_3.addClass(this.inputWrapper.buttons, ACTIVE);
                }
            }
        };
        DatePicker.prototype.CalendarKeyActionHandle = function (e) {
            switch (e.action) {
                case 'escape':
                    if (this.isCalendar()) {
                        this.hide();
                    }
                    else {
                        this.inputWrapper.container.children[this.index].blur();
                    }
                    break;
                case 'enter':
                    if (!this.isCalendar()) {
                        this.show();
                    }
                    else {
                        if (+this.value !== +this.currentDate && !this.isCalendar()) {
                            this.inputWrapper.container.children[this.index].focus();
                        }
                    }
                    if (this.getModuleName() === 'datetimepicker') {
                        this.inputElement.focus();
                    }
                    break;
                case 'tab':
                    this.hide();
            }
        };
        DatePicker.prototype.inputFocusHandler = function () {
            this.isDateIconClicked = false;
            this.trigger('focus');
        };
        DatePicker.prototype.inputBlurHandler = function () {
            this.strictModeUpdate();
            this.updateInput();
            this.changeTrigger();
            this.errorClass();
            if (this.isCalendar() && document.activeElement === this.inputElement) {
                this.hide();
            }
            this.inputElement.blur();
            this.trigger('blur');
            if (this.isCalendar()) {
                this.calendarKeyboardModules = new ej2_base_2.KeyboardEvents(this.calendarElement.children[1].firstElementChild, {
                    eventName: 'keydown',
                    keyAction: this.CalendarKeyActionHandle.bind(this),
                    keyConfigs: this.calendarKeyConfigs
                });
            }
        };
        DatePicker.prototype.documentHandler = function (e) {
            if (!ej2_base_2.Browser.isDevice) {
                e.preventDefault();
            }
            var target = e.target;
            if (!(ej2_base_3.closest(target, '.e-datepicker.e-popup-wrapper'))
                && !(ej2_base_3.closest(target, '.' + INPUTCONTAINER) === this.inputWrapper.container)
                && (!target.classList.contains('e-day'))) {
                this.hide();
            }
        };
        DatePicker.prototype.inputKeyActionHandle = function (e) {
            switch (e.action) {
                case 'altUpArrow':
                    this.hide();
                    this.inputElement.focus();
                    break;
                case 'altDownArrow':
                    this.strictModeUpdate();
                    this.updateInput();
                    if (this.getModuleName() === 'datepicker') {
                        this.show();
                    }
                    break;
                case 'escape':
                    this.hide();
                    break;
                case 'enter':
                    this.strictModeUpdate();
                    this.updateInput();
                    this.changeTrigger();
                    this.errorClass();
                    if (!this.isCalendar() && document.activeElement === this.inputElement) {
                        this.hide();
                    }
                    break;
                case 'tab':
                    this.strictModeUpdate();
                    this.updateInput();
                    this.changeTrigger();
                    this.errorClass();
                    this.hide();
                    break;
                default:
                    this.previousDate = (!ej2_base_4.isNullOrUndefined(this.value) && new Date('' + this.value) || null);
                    if (this.isCalendar()) {
                        _super.prototype.keyActionHandle.call(this, e);
                    }
            }
        };
        DatePicker.prototype.strictModeUpdate = function () {
            var format;
            if (this.getModuleName() === 'datetimepicker') {
                format = !ej2_base_4.isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat;
            }
            else {
                format = ej2_base_4.isNullOrUndefined(this.format) ? this.format : this.format.replace('dd', 'd');
            }
            if (!ej2_base_4.isNullOrUndefined(format)) {
                var len = format.split('M').length - 1;
                if (len < 3) {
                    format = format.replace('MM', 'M');
                }
            }
            var dateOptions;
            if (this.getModuleName() === 'datetimepicker') {
                dateOptions = {
                    format: !ej2_base_4.isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                };
            }
            else {
                dateOptions = { format: format, type: 'dateTime', skeleton: 'yMd' };
            }
            var date = this.globalize.parseDate(this.inputElement.value, dateOptions);
            if (this.strictMode && date) {
                ej2_inputs_1.Input.setValue(this.globalize.formatDate(date, dateOptions), this.inputElement, this.floatLabelType, this.showClearButton);
                if (this.inputElement.value !== this.previousEleValue) {
                    this.setProperties({ value: date }, true);
                }
            }
            else if (!this.strictMode) {
                if (this.inputElement.value !== this.previousEleValue) {
                    this.setProperties({ value: date }, true);
                }
            }
            if (this.strictMode && !date && this.inputElement.value === '') {
                this.setProperties({ value: null }, true);
            }
            if (isNaN(+this.value)) {
                this.setProperties({ value: null }, true);
            }
            if (ej2_base_4.isNullOrUndefined(this.value)) {
                this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            }
        };
        DatePicker.prototype.createCalendar = function () {
            var _this = this;
            this.popupWrapper = ej2_base_3.createElement('div', { className: '' + ROOT + ' ' + POPUPWRAPPER });
            if (!ej2_base_4.isNullOrUndefined(this.cssClass)) {
                this.popupWrapper.classList.add(this.cssClass);
            }
            document.body.appendChild(this.popupWrapper);
            if (ej2_base_2.Browser.isDevice) {
                this.modelHeader();
                this.modal = ej2_base_3.createElement('div');
                this.modal.className = '' + ROOT + ' e-date-modal';
                document.body.className += ' ' + OVERFLOW;
                this.modal.style.display = 'block';
                document.body.appendChild(this.modal);
            }
            this.calendarElement.querySelector('table tbody').className = '';
            this.popupObj = new ej2_popups_1.Popup(this.popupWrapper, {
                content: this.calendarElement,
                relateTo: ej2_base_2.Browser.isDevice ? document.body : this.inputWrapper.container,
                position: ej2_base_2.Browser.isDevice ? { X: 'center', Y: 'center' } : { X: 'left', Y: 'bottom' },
                offsetY: OFFSETVALUE,
                targetType: 'container',
                enableRtl: this.enableRtl,
                zIndex: this.zIndex,
                collision: ej2_base_2.Browser.isDevice ? { X: 'fit', Y: 'fit' } : { X: 'flip', Y: 'flip' },
                open: function () {
                    if (_this.getModuleName() !== 'datetimepicker') {
                        if (document.activeElement !== _this.inputElement && !ej2_base_2.Browser.isDevice) {
                            _this.calendarElement.children[1].firstElementChild.focus();
                            _this.calendarKeyboardModules = new ej2_base_2.KeyboardEvents(_this.calendarElement.children[1].firstElementChild, {
                                eventName: 'keydown',
                                keyAction: _this.CalendarKeyActionHandle.bind(_this),
                                keyConfigs: _this.calendarKeyConfigs
                            });
                            _this.calendarKeyboardModules = new ej2_base_2.KeyboardEvents(_this.inputWrapper.container.children[_this.index], {
                                eventName: 'keydown',
                                keyAction: _this.CalendarKeyActionHandle.bind(_this),
                                keyConfigs: _this.calendarKeyConfigs
                            });
                        }
                    }
                }, close: function () {
                    if (!ej2_base_2.Browser.isDevice) {
                        if (_this.isDateIconClicked) {
                            _this.inputWrapper.container.children[_this.index].focus();
                        }
                    }
                    if (_this.value) {
                        _this.disabledDates();
                    }
                    _this.popupObj.destroy();
                    ej2_base_3.detach(_this.popupWrapper);
                    _this.popupObj = _this.popupWrapper = null;
                    _this.setAriaAttributes();
                }
            });
            this.popupObj.element.classList.add(this.cssClass);
            this.setAriaAttributes();
        };
        DatePicker.prototype.modelHeader = function () {
            var modelHeader = ej2_base_3.createElement('div', { className: 'e-model-header' });
            var yearHeading = ej2_base_3.createElement('h5', { className: 'e-model-year' });
            var h2 = ej2_base_3.createElement('div');
            var daySpan = ej2_base_3.createElement('span', { className: 'e-model-day' });
            var monthSpan = ej2_base_3.createElement('span', { className: 'e-model-month' });
            yearHeading.textContent = '' + this.globalize.formatDate(this.value || new Date(), { format: 'y', skeleton: 'dateTime' });
            daySpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), { format: 'E', skeleton: 'dateTime' }) + ', ';
            monthSpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), { format: 'MMM d', skeleton: 'dateTime' });
            modelHeader.appendChild(yearHeading);
            h2.appendChild(daySpan);
            h2.appendChild(monthSpan);
            modelHeader.appendChild(h2);
            this.calendarElement.insertBefore(modelHeader, this.calendarElement.firstElementChild);
        };
        DatePicker.prototype.changeTrigger = function () {
            if (this.inputElement.value !== this.previousEleValue) {
                if (((this.previousDate && this.previousDate.valueOf()) !== (this.value && this.value.valueOf()))) {
                    this.changedArgs.value = this.value;
                    this.trigger('change', this.changedArgs);
                    this.previousEleValue = this.inputElement.value;
                    this.previousDate = new Date('' + this.value);
                }
            }
        };
        DatePicker.prototype.navigatedEvent = function () {
            this.trigger('navigated', this.navigatedArgs);
        };
        DatePicker.prototype.changeEvent = function (e) {
            this.selectCalendar(e);
            this.changedArgs.event = e;
            this.trigger('change', this.changedArgs);
            this.previousDate = this.value;
        };
        DatePicker.prototype.selectCalendar = function (e) {
            var date;
            var tempFormat;
            if (this.getModuleName() === 'datetimepicker') {
                tempFormat = !ej2_base_4.isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat;
            }
            else {
                tempFormat = this.format;
            }
            if (this.value) {
                if (this.getModuleName() === 'datetimepicker') {
                    date = this.globalize.formatDate(this.changedArgs.value, { format: tempFormat, type: 'dateTime', skeleton: 'yMd' });
                }
                else {
                    date = this.globalize.formatDate(this.changedArgs.value, { format: this.format, type: 'dateTime', skeleton: 'yMd' });
                }
            }
            if (!ej2_base_4.isNullOrUndefined(date)) {
                ej2_inputs_1.Input.setValue(date, this.inputElement, this.floatLabelType, this.showClearButton);
            }
            this.hide();
            this.previousEleValue = this.inputElement.value;
            this.errorClass();
        };
        DatePicker.prototype.isCalendar = function () {
            if (this.popupWrapper && this.popupWrapper.classList.contains('' + POPUPWRAPPER)) {
                return true;
            }
            return false;
        };
        DatePicker.prototype.setWidth = function (width) {
            if (typeof width === 'number' || typeof width === 'string') {
                this.inputWrapper.container.style.width = ej2_base_2.formatUnit(this.width);
            }
            else {
                this.inputWrapper.container.style.width = '100%';
            }
        };
        DatePicker.prototype.show = function () {
            var prevent = true;
            var outOfRange;
            if (!ej2_base_4.isNullOrUndefined(this.value) && !(+this.value >= +this.min && +this.value <= +this.max)) {
                outOfRange = new Date('' + this.value);
                this.setProperties({ 'value': null }, true);
            }
            else {
                outOfRange = this.value || null;
            }
            if (!this.isCalendar()) {
                _super.prototype.render.call(this);
                this.setProperties({ 'value': outOfRange || null }, true);
                this.previousDate = outOfRange;
                this.createCalendar();
            }
            this.preventArgs = {
                preventDefault: function () {
                    prevent = false;
                }
            };
            var args = {
                popup: this.popupObj
            };
            ej2_base_4.merge(args, this.preventArgs);
            this.trigger('open', args);
            if (prevent) {
                ej2_base_3.addClass(this.inputWrapper.buttons, ACTIVE);
                document.body.appendChild(this.popupObj.element);
                this.popupObj.refreshPosition(this.inputElement);
                var openAnimation = {
                    name: 'FadeIn',
                    duration: ej2_base_2.Browser.isDevice ? 0 : OPENDURATION,
                };
                this.popupObj.show(new ej2_base_2.Animation(openAnimation));
                this.setAriaAttributes();
            }
            else {
                ej2_base_3.detach(this.popupWrapper);
                this.popupObj.destroy();
                this.popupWrapper = this.popupObj = null;
            }
            ej2_base_1.EventHandler.add(document, 'mousedown touchstart', this.documentHandler, this);
        };
        DatePicker.prototype.hide = function () {
            var args = {
                popup: this.popupObj
            };
            this.preventArgs = {
                preventDefault: function () {
                    prevent = false;
                }
            };
            var prevent = true;
            ej2_base_3.removeClass(this.inputWrapper.buttons, ACTIVE);
            ej2_base_3.removeClass([document.body], OVERFLOW);
            ej2_base_4.merge(args, this.preventArgs);
            this.trigger('close', args);
            if (this.isCalendar() && prevent) {
                var closeAnimation = {
                    name: 'FadeOut',
                    duration: CLOSEDURATION,
                };
                this.popupObj.hide();
                this.keyboardModule.destroy();
                ej2_base_3.removeClass(this.inputWrapper.buttons, ACTIVE);
                ej2_base_1.EventHandler.remove(document, 'mousedown touchstart', this.documentHandler);
            }
            this.setAriaAttributes();
            this.previousEleValue = this.inputElement.value;
            if (ej2_base_2.Browser.isDevice && this.modal) {
                this.modal.style.display = 'none';
                this.modal.outerHTML = '';
                this.modal = null;
            }
        };
        DatePicker.prototype.focusIn = function (triggerEvent) {
            this.inputElement.focus();
            ej2_base_3.addClass([this.inputWrapper.container], [INPUTFOCUS]);
            this.trigger('focus');
        };
        DatePicker.prototype.focusOut = function () {
            this.inputElement.blur();
            ej2_base_3.removeClass([this.inputWrapper.container], [INPUTFOCUS]);
            this.trigger('blur');
        };
        DatePicker.prototype.currentView = function () {
            var currentView;
            if (this.calendarElement) {
                currentView = _super.prototype.currentView.call(this);
            }
            return currentView;
        };
        DatePicker.prototype.navigateTo = function (view, date) {
            if (this.calendarElement) {
                _super.prototype.navigateTo.call(this, view, date);
            }
        };
        DatePicker.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.keyboardModules.destroy();
            if (this.popupObj && this.popupObj.element.classList.contains(POPUP)) {
                _super.prototype.destroy.call(this);
            }
            var ariaAttrs = {
                'aria-live': 'assertive', 'aria-atomic': 'true',
                'aria-haspopup': 'true', 'aria-activedescendant': 'null',
                'aria-owns': this.inputElement.id + '_options', 'aria-expanded': 'false', 'role': 'combobox', 'autocomplete': 'off'
            };
            ej2_inputs_1.Input.removeAttributes(ariaAttrs, this.inputElement);
            if (this.isCalendar()) {
                ej2_base_3.detach(this.popupWrapper);
                this.popupObj = this.popupWrapper = null;
                this.keyboardModule.destroy();
            }
            ej2_base_1.EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
            ej2_base_1.EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
            this.inputWrapper.container.insertAdjacentElement('afterend', this.inputEleCopy);
            ej2_base_3.removeClass([this.inputElement], [ROOT, RTL, INPUTROOT]);
            ej2_base_3.removeClass([this.inputWrapper.container], DATEWRAPPER);
            ej2_base_3.detach(this.inputWrapper.container);
        };
        DatePicker.prototype.preRender = function () {
            this.inputEleCopy = this.element;
            this.inputElement = this.element;
            this.index = this.showClearButton ? 2 : 1;
            var ej2Instance = ej2_base_4.getValue('ej2_instances', this.element);
            this.ngTag = null;
            if (this.element.tagName === 'EJS-DATEPICKER' || this.element.tagName === 'EJS-DATETIMEPICKER') {
                this.ngTag = this.element.tagName;
                var inputElement = ej2_base_3.createElement('input');
                var index = 0;
                for (index; index < this.element.attributes.length; index++) {
                    inputElement.setAttribute(this.element.attributes[index].nodeName, this.element.attributes[index].nodeValue);
                    inputElement.innerHTML = this.element.innerHTML;
                }
                this.element.parentNode.appendChild(inputElement);
                this.element.parentNode.removeChild(this.element);
                this.inputElement = inputElement;
                ej2_base_4.setValue('ej2_instances', ej2Instance, this.inputElement);
            }
            if (this.element.getAttribute('id')) {
                this.inputElement.id = this.element.getAttribute('id');
            }
            else {
                if (this.getModuleName() === 'datetimepicker') {
                    this.inputElement.id = ej2_base_4.getUniqueID('ej2-datetimepicker');
                    ej2_base_3.attributes(this.element, { 'id': this.inputElement.id });
                }
                else {
                    this.inputElement.id = ej2_base_4.getUniqueID('ej2-datepicker');
                    ej2_base_3.attributes(this.element, { 'id': this.inputElement.id });
                }
            }
            this.checkHtmlAttributes();
            _super.prototype.preRender.call(this);
        };
        ;
        DatePicker.prototype.checkHtmlAttributes = function () {
            this.globalize = new ej2_base_1.Internationalization(this.locale);
            var attributes = ['value', 'min', 'max', 'disabled', 'readonly', 'style', 'name', 'placeholder', 'type'];
            var options;
            if (this.getModuleName() === 'datetimepicker') {
                options = {
                    format: !ej2_base_4.isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                };
            }
            else {
                options = { format: this.format, type: 'dateTime', skeleton: 'yMd' };
            }
            for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
                var prop = attributes_1[_i];
                if (!ej2_base_4.isNullOrUndefined(this.inputElement.getAttribute(prop))) {
                    switch (prop) {
                        case 'disabled':
                            var enabled = this.inputElement.getAttribute(prop) === 'disabled' ||
                                this.inputElement.getAttribute(prop) === '';
                            this.setProperties({ enabled: enabled }, true);
                            if (!enabled) {
                                this.inputElement.setAttribute('aria-disabled', 'true');
                            }
                            break;
                        case 'readonly':
                            var readonly = this.inputElement.getAttribute(prop) === 'readonly' ||
                                this.inputElement.getAttribute(prop) === '';
                            this.setProperties({ readonly: readonly }, true);
                            break;
                        case 'placeholder':
                            if (this.placeholder === null) {
                                var placeholder = this.inputElement.getAttribute(prop);
                                this.setProperties({ placeholder: this.inputElement.getAttribute(prop) }, true);
                            }
                            break;
                        case 'style':
                            this.inputElement.setAttribute('style', '' + this.inputElement.getAttribute(prop));
                            break;
                        case 'name':
                            this.inputElement.setAttribute('name', '' + this.inputElement.getAttribute(prop));
                            break;
                        case 'value':
                            if (!this.value) {
                                var value = this.inputElement.getAttribute(prop);
                                this.setProperties(ej2_base_4.setValue(prop, this.globalize.parseDate(value, options), {}), true);
                            }
                            break;
                        case 'min':
                            if (+this.min === +new Date(1900, 0, 1)) {
                                this.setProperties(ej2_base_4.setValue(prop, this.globalize.parseDate(this.inputElement.getAttribute(prop)), {}), true);
                            }
                            break;
                        case 'max':
                            if (+this.max === +new Date(2099, 11, 31)) {
                                this.setProperties(ej2_base_4.setValue(prop, this.globalize.parseDate(this.inputElement.getAttribute(prop)), {}), true);
                            }
                            break;
                        case 'type':
                            if (this.inputElement.getAttribute(prop) !== 'text') {
                                this.inputElement.setAttribute('type', 'text');
                            }
                            break;
                    }
                }
            }
        };
        DatePicker.prototype.getModuleName = function () {
            return 'datepicker';
        };
        DatePicker.prototype.disabledDates = function () {
            var valueCopy = new Date('' + this.value);
            var previousValCopy = this.previousDate;
            _super.prototype.render.call(this);
            this.previousDate = previousValCopy;
            var date = valueCopy && +(valueCopy);
            var dateIdString = '*[id^="/id"]'.replace('/id', '' + date);
            if (!this.strictMode) {
                this.setProperties({ 'value': valueCopy }, true);
            }
            if (!ej2_base_4.isNullOrUndefined(this.calendarElement.querySelectorAll(dateIdString)[0])) {
                if (this.calendarElement.querySelectorAll(dateIdString)[0].classList.contains('e-disabled')) {
                    if (!this.strictMode) {
                        this.setProperties({ 'value': null }, true);
                        this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
                    }
                }
            }
            var inputVal;
            if (this.getModuleName() === 'datetimepicker') {
                inputVal = this.globalize.formatDate(valueCopy, {
                    format: !ej2_base_4.isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                });
            }
            else {
                inputVal = this.globalize.formatDate(valueCopy, { format: this.format, type: 'dateTime', skeleton: 'yMd' });
            }
            ej2_inputs_1.Input.setValue(inputVal, this.inputElement, this.floatLabelType, this.showClearButton);
        };
        DatePicker.prototype.setAriaAttributes = function () {
            if (this.isCalendar()) {
                ej2_inputs_1.Input.addAttributes({ 'aria-expanded': 'true' }, this.inputElement);
                ej2_base_3.attributes(this.inputElement, {
                    'aria-activedescendant': '' + this.setActiveDescendant()
                });
            }
            else {
                ej2_inputs_1.Input.addAttributes({ 'aria-expanded': 'false' }, this.inputElement);
                ej2_base_3.attributes(this.inputElement, {
                    'aria-activedescendant': 'null'
                });
            }
        };
        DatePicker.prototype.errorClass = function () {
            if ((!ej2_base_4.isNullOrUndefined(this.value) && !(+this.value >= +this.min && +this.value <= +this.max))
                || (!this.strictMode && this.inputElement.value !== '' && ej2_base_4.isNullOrUndefined(this.value))) {
                ej2_base_3.addClass([this.inputWrapper.container], ERROR);
            }
            else {
                ej2_base_3.removeClass([this.inputWrapper.container], ERROR);
            }
        };
        DatePicker.prototype.onPropertyChanged = function (newProp, oldProp) {
            var options = { format: this.format, type: 'dateTime', skeleton: 'yMd' };
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
                switch (prop) {
                    case 'value':
                        if (typeof newProp.value === 'string') {
                            newProp.value = this.globalize.parseDate(newProp.value, options);
                        }
                        this.setProperties({ value: newProp.value }, true);
                        this.previousEleValue = this.inputElement.value;
                        if (ej2_base_4.isNullOrUndefined(this.value)) {
                            ej2_inputs_1.Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
                            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
                        }
                        this.updateInput();
                        this.changeTrigger();
                        break;
                    case 'format':
                        this.updateInput();
                        break;
                    case 'placeholder':
                        ej2_inputs_1.Input.setPlaceholder(this.placeholder, this.inputElement);
                        break;
                    case 'readonly':
                        ej2_inputs_1.Input.setReadonly(this.readonly, this.inputElement);
                        break;
                    case 'enabled':
                        ej2_inputs_1.Input.setEnabled(this.enabled, this.inputElement);
                        this.bindEvents();
                        break;
                    case 'locale':
                        this.globalize = new ej2_base_1.Internationalization(this.locale);
                        this.l10n.setLocale(this.locale);
                        this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                        ej2_inputs_1.Input.setPlaceholder(this.placeholder, this.inputElement);
                        this.updateInput();
                        break;
                    case 'enableRtl':
                        ej2_inputs_1.Input.setEnableRtl(this.enableRtl, [this.inputWrapper.container]);
                        break;
                    case 'zIndex':
                        this.setProperties({ zIndex: newProp.zIndex }, true);
                        break;
                    case 'cssClass':
                        ej2_inputs_1.Input.setCssClass(newProp.cssClass, [this.inputWrapper.container]);
                        if (this.popupWrapper) {
                            ej2_base_3.addClass([this.popupWrapper], [newProp.cssClass]);
                        }
                        break;
                    case 'strictMode':
                        this.updateInput();
                        break;
                    case 'width':
                        this.setWidth(newProp.width);
                        break;
                    default:
                        if (this.calendarElement) {
                            _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
                        }
                        break;
                }
                this.hide();
            }
        };
        __decorate([
            ej2_base_1.Property(null)
        ], DatePicker.prototype, "width", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], DatePicker.prototype, "cssClass", void 0);
        __decorate([
            ej2_base_1.Property(false)
        ], DatePicker.prototype, "strictMode", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], DatePicker.prototype, "format", void 0);
        __decorate([
            ej2_base_1.Property(true)
        ], DatePicker.prototype, "enabled", void 0);
        __decorate([
            ej2_base_1.Property(true)
        ], DatePicker.prototype, "showClearButton", void 0);
        __decorate([
            ej2_base_1.Property(1000)
        ], DatePicker.prototype, "zIndex", void 0);
        __decorate([
            ej2_base_1.Property(false)
        ], DatePicker.prototype, "readonly", void 0);
        __decorate([
            ej2_base_1.Property(null)
        ], DatePicker.prototype, "placeholder", void 0);
        __decorate([
            ej2_base_1.Property('Never')
        ], DatePicker.prototype, "floatLabelType", void 0);
        __decorate([
            ej2_base_2.Event()
        ], DatePicker.prototype, "open", void 0);
        __decorate([
            ej2_base_2.Event()
        ], DatePicker.prototype, "close", void 0);
        __decorate([
            ej2_base_2.Event()
        ], DatePicker.prototype, "blur", void 0);
        __decorate([
            ej2_base_2.Event()
        ], DatePicker.prototype, "focus", void 0);
        __decorate([
            ej2_base_2.Event()
        ], DatePicker.prototype, "created", void 0);
        __decorate([
            ej2_base_2.Event()
        ], DatePicker.prototype, "destroyed", void 0);
        DatePicker = __decorate([
            ej2_base_1.NotifyPropertyChanges
        ], DatePicker);
        return DatePicker;
    }(calendar_1.Calendar));
    exports.DatePicker = DatePicker;
});
