/// <reference path='../calendar/calendar-model.d.ts'/>
import { EventHandler, Property, Internationalization, NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { KeyboardEvents, KeyboardEventArgs, Animation, EmitType, Event, L10n, Browser, formatUnit } from '@syncfusion/ej2-base';
import { createElement, remove, detach, addClass, removeClass, closest, classList, attributes } from '@syncfusion/ej2-base';
import { isNullOrUndefined, getValue, setValue, getUniqueID, merge } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups';
import { Input, InputObject, IInput, FloatLabelType } from '@syncfusion/ej2-inputs';
import { Calendar, ChangedEventArgs, CalendarView } from '../calendar/calendar';
import { DatePickerModel } from './datepicker-model';

//class constant defination
const DATEWRAPPER: string = 'e-date-wrapper';
const ROOT: string = 'e-datepicker';
const POPUPWRAPPER: string = 'e-popup-wrapper';
const INPUTWRAPPER: string = 'e-input-group-icon';
const POPUP: string = 'e-popup';
const INPUTCONTAINER: string = 'e-input-group';
const INPUTFOCUS: string = 'e-input-focus';
const INPUTROOT: string = 'e-input';
const ERROR: string = 'e-error';
const RTL: string = 'e-rtl';
const LINK: string = 'e-day';
const ACTIVE: string = 'e-active';
const OVERFLOW: string = 'e-date-overflow';
const DATEICON: string = 'e-date-icon';
const ICONS: string = 'e-icons';
const OPENDURATION: number = 300;
const CLOSEDURATION: number = 200;
const OFFSETVALUE: number = 4;

/**
 * Represents the DatePicker component that allows user to select
 * or enter a date value.
 * ```html
 * <input id="datepicker"/>
 * ````
 * ````typescript
 * <script>
 *   var datePickerObject = new DatePicker({ value: new Date() });
 *   datePickerObject.appendTo("#datepicker");
 * </script>
 * ```
 */
@NotifyPropertyChanges
export class DatePicker extends Calendar implements IInput {
    private popupObj: Popup;
    protected inputWrapper: InputObject;
    private modal: HTMLElement;
    protected inputElement: HTMLInputElement;
    protected popupWrapper: HTMLElement;
    protected changedArgs: ChangedEventArgs;
    protected previousDate: Date;
    private keyboardModules: KeyboardEvents;
    private calendarKeyboardModules: KeyboardEvents;
    private previousEleValue: string = '';
    private ngTag: string;
    protected dateTimeFormat: string;
    private inputEleCopy: HTMLInputElement;
    protected l10n: L10n;
    private preventArgs: PreventableEventArgs;
    private isDateIconClicked: boolean = false;
    private index: number;
    protected keyConfigs: { [key: string]: string } = {
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
    protected calendarKeyConfigs: { [key: string]: string } = {
        escape: 'escape',
        enter: 'enter',
        tab: 'tab'
    };
    /**
     * Specifies the width of the DatePicker component.
     * @default null
     */
    @Property(null)
    public width: number | string;
    /**
     * Specifies the root CSS class of the DatePicker that allows to
     * customize the appearance by overriding the styles.
     * @default null
     */
    @Property(null)
    public cssClass: string;
    /**
     * Specifies the component to act as strict. So that, it allows to enter only a valid date value within a specified range or else it 
     * will resets to previous value. By default, strictMode is in false.
     * @default false
     */
    @Property(false)
    public strictMode: boolean;
    /**
     * Specifies the format of the value that to be displayed in component. By default, the format is
     * based on the culture. 
     * @default null
     */
    @Property(null)
    public format: string;
    /**
     * Specifies the component to be disabled or not.
     * @default true
     */
    @Property(true)
    public enabled: boolean;
    /**
     * Specifies whether to show or hide the clear Icon
     * @default true
     */
    @Property(true)
    public showClearButton: boolean;
    /**
     * specifies the z-index value of the datePicker popup element.
     * @default 1000
     */
    @Property(1000)
    public zIndex: number;
    /**
     * Specifies the component in readonly state. 
     * @default false
     */
    @Property(false)
    public readonly: boolean;
    /**
     * Specifies the placeholder text that displayed in textbox.
     * @default null
     */
    @Property(null)
    public placeholder: string;
    /**
     * Specifies the placeholder text to be floated.
     * @default Auto
     */
    @Property('Never')
    public floatLabelType: FloatLabelType;

    /** 
     * Triggers when the popup gets open.
     * @event 
     */
    @Event()
    public open: EmitType<PreventableEventArgs | PopupObjectArgs>;
    /** 
     * Triggers when the popup gets close.
     * @event 
     */
    @Event()
    public close: EmitType<PreventableEventArgs | PopupObjectArgs>;
    /** 
     * Triggers when the control loses the focus.
     * @event 
     */
    @Event()
    public blur: EmitType<Object>;
    /** 
     *  Triggers when the control gets focus.
     * @event 
     */
    @Event()
    public focus: EmitType<Object>;
    /** 
     * Triggers when the component is created.
     * @event 
     */
    @Event()
    public created: EmitType<Object>;
    /** 
     * Triggers when the component is destroyed.
     * @event 
     */
    @Event()
    public destroyed: EmitType<Object>;
    /**
     * Constructor for creating the widget.
     */
    constructor(options?: DatePickerModel, element?: string | HTMLInputElement) {
        super(options, element);
    }
    /**
     * To Initialize the control rendering.
     * @return void
     * @private
     */
    public render(): void {
        this.initialize();
        this.bindEvents();
    }
    private initialize(): void {
        this.createInput();
        this.updateInput();
        this.previousEleValue = this.inputElement.value;
    }

    private createInput(): void {
        let ariaAttrs: object = {
            'aria-live': 'assertive', 'aria-atomic': 'true',
            'aria-haspopup': 'true', 'aria-activedescendant': 'null',
            'aria-owns': this.inputElement.id + '_options', 'aria-expanded': 'false', 'role': 'combobox', 'autocomplete': 'off'

        };
        if (this.getModuleName() === 'datepicker') {
            let l10nLocale: object = { placeholder: null };
            this.globalize = new Internationalization(this.locale);
            this.l10n = new L10n('datepicker', l10nLocale, this.locale);
            this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        }
        this.inputWrapper = Input.createInput({
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
        } else {
            this.inputElement.setAttribute('name', '' + this.inputElement.id);
        }
        attributes(this.inputElement, <{ [key: string]: string }>ariaAttrs);
        if (!this.enabled) {
            this.inputElement.setAttribute('aria-disabled', 'true');
        }
        Input.addAttributes({ 'aria-label': 'select' }, this.inputWrapper.buttons[0]);
        addClass([this.inputWrapper.container], DATEWRAPPER);
    }
    protected updateInput(): void {
        if (this.value && !this.isCalendar()) {
            this.disabledDates();
        }
        if (+new Date('' + this.value)) {  // persis the value property. 
            if (typeof this.value === 'string') {
                this.value = this.checkDateValue(new Date('' + this.value));
                let dateOptions: object;
                if (this.getModuleName() === 'datetimepicker') {
                    dateOptions = {
                        format: !isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat,
                        type: 'dateTime', skeleton: 'yMd'
                    };
                } else {
                    dateOptions = { format: this.format, type: 'dateTime', skeleton: 'yMd' };
                }
                let dateString: string = this.globalize.formatDate(this.value, dateOptions);
                this.setProperties({ value: this.globalize.parseDate(dateString, dateOptions) }, true);
            }
        } else {
            this.setProperties({ value: null }, true);
        }
        if (this.strictMode) {
            //calls the Calendar processDate protected method to update the date value according to the strictMode true behaviour.
            super.processDate();
        }
        if (!isNullOrUndefined(this.value)) {
            let dateValue: Date = this.value;
            let dateString: string;
            let tempFormat: string = !isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat;
            if (this.getModuleName() === 'datetimepicker') {
                dateString = this.globalize.formatDate(this.value, { format: tempFormat, type: 'dateTime', skeleton: 'yMd' });
            } else {
                dateString = this.globalize.formatDate(this.value, { format: this.format, type: 'dateTime', skeleton: 'yMd' });
            }
            if ((+dateValue <= +this.max) && (+dateValue >= +this.min)) {
                Input.setValue(dateString, this.inputElement, this.floatLabelType, this.showClearButton);
            } else {
                let value: boolean = (+dateValue >= +this.max || !+this.value) || (!+this.value || +dateValue <= +this.min);
                if (!this.strictMode && value) {
                    Input.setValue(dateString, this.inputElement, this.floatLabelType, this.showClearButton);
                }
            }
        }
        if (isNullOrUndefined(this.value) && this.strictMode) {
            Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
        }
        this.changedArgs = { value: this.value };
        this.errorClass();
    };
    protected bindEvents(): void {
        if (this.enabled) {
            EventHandler.add(this.inputWrapper.buttons[0], 'mousedown touchstart', this.dateIconHandler, this);
            EventHandler.add(this.inputElement, 'focus', this.inputFocusHandler, this);
            EventHandler.add(this.inputElement, 'blur', this.inputBlurHandler, this);
            this.bindClearEvent();
        } else {
            EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown touchstart', this.dateIconHandler);
            EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
            EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
        }
        this.keyboardModules = new KeyboardEvents(
            <HTMLElement>this.inputElement,
            {
                eventName: 'keydown',
                keyAction: this.inputKeyActionHandle.bind(this),
                keyConfigs: this.keyConfigs
            });
    }
    private bindClearEvent(): void {
        if (this.showClearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler, this);
        }
    }
    protected resetHandler(e?: MouseEvent): void {
        e.preventDefault();
        this.clear(e);
    }
    private clear(event: MouseEvent): void {
        this.setProperties({ value: null }, true);
        Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
        this.changeEvent(event);
    }

    private dateIconHandler(e?: MouseEvent): void {
        e.preventDefault();
        if (!this.readonly) {
            if (this.isCalendar()) {
                this.hide();
            } else {
                this.isDateIconClicked = true;
                this.show();
                if (!Browser.isDevice) {
                    if (this.getModuleName() === 'datetimepicker') {
                        (this.inputElement as HTMLElement).focus();
                    }
                    (<HTMLElement>this.inputElement).focus();
                    addClass([this.inputWrapper.container], [INPUTFOCUS]);
                }
                addClass(this.inputWrapper.buttons, ACTIVE);
            }
        }
    }
    private CalendarKeyActionHandle(e: KeyboardEventArgs): void {
        switch (e.action) {
            case 'escape':
                if (this.isCalendar()) {
                    this.hide();
                } else {
                    (this.inputWrapper.container.children[this.index] as HTMLElement).blur();
                }
                break;
            case 'enter':
                if (!this.isCalendar()) {
                    this.show();
                } else {
                    if (+this.value !== +this.currentDate && !this.isCalendar()) {
                        (this.inputWrapper.container.children[this.index] as HTMLElement).focus();
                    }
                }
                if (this.getModuleName() === 'datetimepicker') {
                    this.inputElement.focus();
                }
                break;
            case 'tab':
                this.hide();
        }
    }
    private inputFocusHandler(): void {
        this.isDateIconClicked = false;
        this.trigger('focus');
    }
    private inputBlurHandler(): void {
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
            this.calendarKeyboardModules = new KeyboardEvents(<HTMLElement>this.calendarElement.children[1].firstElementChild, {
                eventName: 'keydown',
                keyAction: this.CalendarKeyActionHandle.bind(this),
                keyConfigs: this.calendarKeyConfigs
            });
        }
    }
    private documentHandler(e: MouseEvent): void {
        if (!Browser.isDevice) {
            e.preventDefault();
        }
        let target: HTMLElement = <HTMLElement>e.target;
        if (!(closest(target, '.e-datepicker.e-popup-wrapper'))
            && !(closest(target, '.' + INPUTCONTAINER) === this.inputWrapper.container)
            && (!target.classList.contains('e-day'))) {
            this.hide();
        }
    }
    protected inputKeyActionHandle(e: KeyboardEventArgs): void {
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
                this.previousDate = (!isNullOrUndefined(this.value) && new Date('' + this.value) || null);
                if (this.isCalendar()) {
                    super.keyActionHandle(e);
                }
        }
    }
    protected strictModeUpdate(): void {
        let format: string;
        if (this.getModuleName() === 'datetimepicker') {
            format = !isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat;
        } else {
            format = isNullOrUndefined(this.format) ? this.format : this.format.replace('dd', 'd');
        }
        if (!isNullOrUndefined(format)) {
            let len: number = format.split('M').length - 1;
            if (len < 3) {
                format = format.replace('MM', 'M');
            }
        }
        let dateOptions: object;
        if (this.getModuleName() === 'datetimepicker') {
            dateOptions = {
                format: !isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat,
                type: 'dateTime', skeleton: 'yMd'
            };
        } else {
            dateOptions = { format: format, type: 'dateTime', skeleton: 'yMd' };
        }
        let date: Date = this.globalize.parseDate(this.inputElement.value, dateOptions);
        if (this.strictMode && date) {
            Input.setValue(this.globalize.formatDate(date, dateOptions), this.inputElement, this.floatLabelType, this.showClearButton);
            if (this.inputElement.value !== this.previousEleValue) {
                this.setProperties({ value: date }, true);
            }
        } else if (!this.strictMode) {
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
        if (isNullOrUndefined(this.value)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
        }
    }
    private createCalendar(): void {
        this.popupWrapper = createElement('div', { className: '' + ROOT + ' ' + POPUPWRAPPER });
        if (!isNullOrUndefined(this.cssClass)) { this.popupWrapper.classList.add(this.cssClass); }
        document.body.appendChild(this.popupWrapper);
        if (Browser.isDevice) {
            this.modelHeader();
            this.modal = createElement('div');
            this.modal.className = '' + ROOT + ' e-date-modal';
            document.body.className += ' ' + OVERFLOW;
            this.modal.style.display = 'block';
            document.body.appendChild(this.modal);
        }
        //this.calendarElement represent the Calendar object from the Calendar class.
        this.calendarElement.querySelector('table tbody').className = '';
        this.popupObj = new Popup(this.popupWrapper as HTMLElement, {
            content: this.calendarElement,
            relateTo: Browser.isDevice ? document.body : this.inputWrapper.container,
            position: Browser.isDevice ? { X: 'center', Y: 'center' } : { X: 'left', Y: 'bottom' },
            offsetY: OFFSETVALUE,
            targetType: 'container',
            enableRtl: this.enableRtl,
            zIndex: this.zIndex,
            collision: Browser.isDevice ? { X: 'fit', Y: 'fit' } : { X: 'flip', Y: 'flip' },
            open: () => {
                if (this.getModuleName() !== 'datetimepicker') {
                    if (document.activeElement !== this.inputElement && !Browser.isDevice) {
                        (<HTMLElement>this.calendarElement.children[1].firstElementChild).focus();
                        this.calendarKeyboardModules = new KeyboardEvents(
                            <HTMLElement>this.calendarElement.children[1].firstElementChild,
                            {
                                eventName: 'keydown',
                                keyAction: this.CalendarKeyActionHandle.bind(this),
                                keyConfigs: this.calendarKeyConfigs
                            });
                        this.calendarKeyboardModules = new KeyboardEvents(
                            <HTMLElement>this.inputWrapper.container.children[this.index],
                            {
                                eventName: 'keydown',
                                keyAction: this.CalendarKeyActionHandle.bind(this),
                                keyConfigs: this.calendarKeyConfigs
                            });
                    }
                }
            }, close: () => {
                if (!Browser.isDevice) {
                    if (this.isDateIconClicked) {
                        (this.inputWrapper.container.children[this.index] as HTMLElement).focus();
                    }
                }
                if (this.value) {
                    this.disabledDates();
                }
                this.popupObj.destroy();
                detach(this.popupWrapper);
                this.popupObj = this.popupWrapper = null;
                this.setAriaAttributes();
            }
        });
        this.popupObj.element.classList.add(this.cssClass);
        this.setAriaAttributes();
    }

    private modelHeader(): void {
        let modelHeader: HTMLElement = createElement('div', { className: 'e-model-header' });
        let yearHeading: HTMLElement = createElement('h5', { className: 'e-model-year' });
        let h2: HTMLElement = createElement('div');
        let daySpan: HTMLElement = createElement('span', { className: 'e-model-day' });
        let monthSpan: HTMLElement = createElement('span', { className: 'e-model-month' });
        yearHeading.textContent = '' + this.globalize.formatDate(this.value || new Date(), { format: 'y', skeleton: 'dateTime' });
        daySpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), { format: 'E', skeleton: 'dateTime' }) + ', ';
        monthSpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), { format: 'MMM d', skeleton: 'dateTime' });
        modelHeader.appendChild(yearHeading);
        h2.appendChild(daySpan);
        h2.appendChild(monthSpan);
        modelHeader.appendChild(h2);
        this.calendarElement.insertBefore(modelHeader, this.calendarElement.firstElementChild);
    }

    protected changeTrigger(): void {
        if (this.inputElement.value !== this.previousEleValue) {
            if (((this.previousDate && this.previousDate.valueOf()) !== (this.value && this.value.valueOf()))) {
                this.changedArgs.value = this.value;
                this.trigger('change', this.changedArgs);
                this.previousEleValue = this.inputElement.value;
                this.previousDate = new Date('' + this.value);
            }
        }
    }

    protected navigatedEvent(): void {
        this.trigger('navigated', this.navigatedArgs);
    }
    protected changeEvent(e?: Event): void {
        this.selectCalendar(e);
        this.changedArgs.event = e;
        this.trigger('change', this.changedArgs);
        this.previousDate = this.value;
    }
    protected selectCalendar(e?: Event): void {
        let date: string;
        let tempFormat: string;
        if (this.getModuleName() === 'datetimepicker') {
            tempFormat = !isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat;
        } else {
            tempFormat = this.format;
        }
        if (this.value) {
            if (this.getModuleName() === 'datetimepicker') {
                date = this.globalize.formatDate(this.changedArgs.value, { format: tempFormat, type: 'dateTime', skeleton: 'yMd' });
            } else {
                date = this.globalize.formatDate(this.changedArgs.value, { format: this.format, type: 'dateTime', skeleton: 'yMd' });
            }
        }
        if (!isNullOrUndefined(date)) { Input.setValue(date, this.inputElement, this.floatLabelType, this.showClearButton); }
        this.hide();
        this.previousEleValue = this.inputElement.value;
        this.errorClass();
    }
    protected isCalendar(): boolean {
        if (this.popupWrapper && this.popupWrapper.classList.contains('' + POPUPWRAPPER)) {
            return true;
        }
        return false;
    }
    protected setWidth(width: number | string): void {
        if (typeof width === 'number' || typeof width === 'string') {
            this.inputWrapper.container.style.width = formatUnit(this.width);
        } else {
            this.inputWrapper.container.style.width = '100%';
        }
    }
    /** 
     * Shows the Calendar.
     * @returns void
     */
    public show(): void {
        let prevent: boolean = true;
        let outOfRange: Date;
        if (!isNullOrUndefined(this.value) && !(+this.value >= +this.min && +this.value <= +this.max)) {
            outOfRange = new Date('' + this.value);
            this.setProperties({ 'value': null }, true);
        } else {
            outOfRange = this.value || null;
        }
        if (!this.isCalendar()) {
            super.render();
            this.setProperties({ 'value': outOfRange || null }, true);
            this.previousDate = outOfRange;
            this.createCalendar();
        }
        this.preventArgs = {
            preventDefault: (): void => {
                prevent = false;
            }
        };
        let args: PopupObjectArgs = {
            popup: this.popupObj
        };
        merge(args, this.preventArgs);
        this.trigger('open', args);
        if (prevent) {
            addClass(this.inputWrapper.buttons, ACTIVE);
            document.body.appendChild(this.popupObj.element);
            this.popupObj.refreshPosition(this.inputElement);
            let openAnimation: object = {
                name: 'FadeIn',
                duration: Browser.isDevice ? 0 : OPENDURATION,
            };
            this.popupObj.show(new Animation(openAnimation));
            this.setAriaAttributes();
        } else {
            detach(this.popupWrapper);
            this.popupObj.destroy();
            this.popupWrapper = this.popupObj = null;
        }
        EventHandler.add(document, 'mousedown touchstart', this.documentHandler, this);
    }
    /** 
     * Hide the Calendar.
     * @returns void 
     */
    public hide(): void {
        let args: PopupObjectArgs = {
            popup: this.popupObj
        };
        this.preventArgs = {
            preventDefault: (): void => {
                prevent = false;
            }
        };
        let prevent: boolean = true;
        removeClass(this.inputWrapper.buttons, ACTIVE);
        removeClass([document.body], OVERFLOW);
        merge(args, this.preventArgs);
        this.trigger('close', args);
        if (this.isCalendar() && prevent) {
            let closeAnimation: object = {
                name: 'FadeOut',
                duration: CLOSEDURATION,
            };
            this.popupObj.hide();
            this.keyboardModule.destroy();
            removeClass(this.inputWrapper.buttons, ACTIVE);
            EventHandler.remove(document, 'mousedown touchstart', this.documentHandler);
        }
        this.setAriaAttributes();
        this.previousEleValue = this.inputElement.value;
        if (Browser.isDevice && this.modal) {
            this.modal.style.display = 'none';
            this.modal.outerHTML = '';
            this.modal = null;
        }
    }
    /**
     * Sets the focus to widget for interaction.
     * @returns void
     */
    public focusIn(triggerEvent?: boolean): void {
        (<HTMLElement>this.inputElement).focus();
        addClass([this.inputWrapper.container], [INPUTFOCUS]);
        this.trigger('focus');
    }
    /**
     * Remove the focus from widget, if the widget is in focus state. 
     * @returns void
     */
    public focusOut(): void {
        this.inputElement.blur();
        removeClass([this.inputWrapper.container], [INPUTFOCUS]);
        this.trigger('blur');
    }
    /** 
     * Gets the current view of the DatePicker.
     * @returns string 
     */
    public currentView(): string {
        let currentView: string;
        if (this.calendarElement) {
            // calls the Calendar currentView public method
            currentView = super.currentView();
        }
        return currentView;
    }
    /**
     * This method used to navigate to the month/year/decade view of the DatePicker.
     * @param  {string} view - Specifies the view of the calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns void
     */
    public navigateTo(view: CalendarView, date: Date): void {
        if (this.calendarElement) {
            // calls the Calendar navigateTo public method
            super.navigateTo(view, date);
        }
    }
    /**
     * To destroy the widget.    
     * @returns void
     */
    public destroy(): void {
        super.destroy();
        this.keyboardModules.destroy();
        if (this.popupObj && this.popupObj.element.classList.contains(POPUP)) {
            super.destroy();
        }
        let ariaAttrs: object = {
            'aria-live': 'assertive', 'aria-atomic': 'true',
            'aria-haspopup': 'true', 'aria-activedescendant': 'null',
            'aria-owns': this.inputElement.id + '_options', 'aria-expanded': 'false', 'role': 'combobox', 'autocomplete': 'off'

        };
        Input.removeAttributes(<{ [key: string]: string }>ariaAttrs, this.inputElement);
        if (this.isCalendar()) {
            detach(this.popupWrapper);
            this.popupObj = this.popupWrapper = null;
            this.keyboardModule.destroy();
        }
        EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
        EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
        this.inputWrapper.container.insertAdjacentElement('afterend', this.inputEleCopy);
        removeClass([this.inputElement], [ROOT, RTL, INPUTROOT]);
        removeClass([this.inputWrapper.container], DATEWRAPPER);
        detach(this.inputWrapper.container);
    }
    /**
     * Initialize the event handler
     * @private
     */
    protected preRender(): void {
        this.inputEleCopy = <HTMLInputElement>this.element;
        this.inputElement = <HTMLInputElement>this.element;
        this.index = this.showClearButton ? 2 : 1;
        let ej2Instance: Object = getValue('ej2_instances', this.element);
        this.ngTag = null;
        if (this.element.tagName === 'EJS-DATEPICKER' || this.element.tagName === 'EJS-DATETIMEPICKER') {
            this.ngTag = this.element.tagName;
            let inputElement: HTMLElement = <HTMLElement>createElement('input');
            let index: number = 0;
            for (index; index < this.element.attributes.length; index++) {
                inputElement.setAttribute(this.element.attributes[index].nodeName, this.element.attributes[index].nodeValue);
                inputElement.innerHTML = this.element.innerHTML;
            }
            this.element.parentNode.appendChild(inputElement);
            this.element.parentNode.removeChild(this.element);
            this.inputElement = <HTMLInputElement>inputElement;
            setValue('ej2_instances', ej2Instance, this.inputElement);
        }
        if (this.element.getAttribute('id')) {
            this.inputElement.id = this.element.getAttribute('id');
        } else {
            if (this.getModuleName() === 'datetimepicker') {
                this.inputElement.id = getUniqueID('ej2-datetimepicker');
                attributes(this.element, { 'id': this.inputElement.id });
            } else {
                this.inputElement.id = getUniqueID('ej2-datepicker');
                attributes(this.element, { 'id': this.inputElement.id });
            }
        }
        this.checkHtmlAttributes();
        super.preRender();
    };
    private checkHtmlAttributes(): void {
        this.globalize = new Internationalization(this.locale);
        let attributes: string[] = ['value', 'min', 'max', 'disabled', 'readonly', 'style', 'name', 'placeholder', 'type'];
        let options: object;
        if (this.getModuleName() === 'datetimepicker') {
            options = {
                format: !isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat,
                type: 'dateTime', skeleton: 'yMd'
            };
        } else {
            options = { format: this.format, type: 'dateTime', skeleton: 'yMd' };
        }
        for (let prop of attributes) {
            if (!isNullOrUndefined(this.inputElement.getAttribute(prop))) {
                switch (prop) {
                    case 'disabled':
                        let enabled: boolean = this.inputElement.getAttribute(prop) === 'disabled' ||
                            this.inputElement.getAttribute(prop) === '';
                        this.setProperties({ enabled: enabled }, true);
                        if (!enabled) {
                            this.inputElement.setAttribute('aria-disabled', 'true');
                        }
                        break;
                    case 'readonly':
                        let readonly: boolean = this.inputElement.getAttribute(prop) === 'readonly' ||
                            this.inputElement.getAttribute(prop) === '';
                        this.setProperties({ readonly: readonly }, true);
                        break;
                    case 'placeholder':
                        if (this.placeholder === null) {
                            let placeholder: string = this.inputElement.getAttribute(prop);
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
                            let value: string = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, this.globalize.parseDate(value, options), {}), true);
                        }
                        break;
                    case 'min':
                        if (+this.min === +new Date(1900, 0, 1)) {
                            this.setProperties(setValue(prop, this.globalize.parseDate(this.inputElement.getAttribute(prop)), {}), true);
                        }
                        break;
                    case 'max':
                        if (+this.max === +new Date(2099, 11, 31)) {
                            this.setProperties(setValue(prop, this.globalize.parseDate(this.inputElement.getAttribute(prop)), {}), true);
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
    }
    /**
     * To get component name.
     * @private
     */
    protected getModuleName(): string {
        return 'datepicker';
    }
    private disabledDates(): void {
        let valueCopy: Date = new Date('' + this.value);
        let previousValCopy: Date = this.previousDate;
        //calls the Calendar render method to check the disabled dates through renderDayCell event and update the input value accordingly.
        super.render();
        this.previousDate = previousValCopy;
        let date: number = valueCopy && +(valueCopy);
        let dateIdString: string = '*[id^="/id"]'.replace('/id', '' + date);
        if (!this.strictMode) {
            this.setProperties({ 'value': valueCopy }, true);
        }
        if (!isNullOrUndefined(this.calendarElement.querySelectorAll(dateIdString)[0])) {
            if (this.calendarElement.querySelectorAll(dateIdString)[0].classList.contains('e-disabled')) {
                if (!this.strictMode) {
                    this.setProperties({ 'value': null }, true);
                    this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
                }
            }
        }
        let inputVal: string;
        if (this.getModuleName() === 'datetimepicker') {
            inputVal = this.globalize.formatDate(valueCopy, {
                format: !isNullOrUndefined(this.format) ? this.format : this.dateTimeFormat,
                type: 'dateTime', skeleton: 'yMd'
            });
        } else {
            inputVal = this.globalize.formatDate(valueCopy, { format: this.format, type: 'dateTime', skeleton: 'yMd' });
        }
        Input.setValue(inputVal, this.inputElement, this.floatLabelType, this.showClearButton);
    }
    private setAriaAttributes(): void {
        if (this.isCalendar()) {
            Input.addAttributes({ 'aria-expanded': 'true' }, this.inputElement);
            attributes(this.inputElement, {
                'aria-activedescendant': '' + this.setActiveDescendant()
            });
        } else {
            Input.addAttributes({ 'aria-expanded': 'false' }, this.inputElement);
            attributes(this.inputElement, {
                'aria-activedescendant': 'null'
            });
        }
    }
    protected errorClass(): void {
        if ((!isNullOrUndefined(this.value) && !(+this.value >= +this.min && +this.value <= +this.max))
            || (!this.strictMode && this.inputElement.value !== '' && isNullOrUndefined(this.value))) {
            addClass([this.inputWrapper.container], ERROR);
        } else {
            removeClass([this.inputWrapper.container], ERROR);
        }
    }
    /**
     * Called internally if any of the property value changed.
     * returns void
     * @private
     */
    public onPropertyChanged(newProp: DatePickerModel, oldProp: DatePickerModel): void {
        let options: object = { format: this.format, type: 'dateTime', skeleton: 'yMd' };
        for (let prop of Object.keys(newProp)) {
            switch (prop) {
                case 'value':
                    if (typeof newProp.value === 'string') {
                        newProp.value = this.globalize.parseDate(<string>newProp.value, options);
                    }
                    this.setProperties({ value: newProp.value }, true);
                    this.previousEleValue = this.inputElement.value;
                    if (isNullOrUndefined(this.value)) {
                        Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
                        this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
                    }
                    this.updateInput();
                    this.changeTrigger();
                    break;
                case 'format':
                    this.updateInput();
                    break;
                case 'placeholder':
                    Input.setPlaceholder(this.placeholder, this.inputElement);
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.inputElement);
                    break;
                case 'enabled':
                    Input.setEnabled(this.enabled, this.inputElement);
                    this.bindEvents();
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                    Input.setPlaceholder(this.placeholder, this.inputElement);
                    this.updateInput();
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(this.enableRtl, [this.inputWrapper.container]);
                    break;
                case 'zIndex':
                    this.setProperties({ zIndex: newProp.zIndex }, true);
                    break;
                case 'cssClass':
                    Input.setCssClass(newProp.cssClass, [this.inputWrapper.container]);
                    if (this.popupWrapper) {
                        addClass([this.popupWrapper], [newProp.cssClass]);
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
                        super.onPropertyChanged(newProp, oldProp);
                    }
                    break;
            }
            this.hide();
        }
    }
}

export interface PopupObjectArgs {
    /** Defines the DatePicker popup element. */
    popup: Popup;
}

export interface PreventableEventArgs {
    /** Prevents the default action */
    preventDefault?: Function;
}
