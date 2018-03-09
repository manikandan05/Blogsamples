/// <reference path="../calendar/calendar-model.d.ts" />
import { KeyboardEventArgs, EmitType, L10n } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups';
import { InputObject, IInput, FloatLabelType } from '@syncfusion/ej2-inputs';
import { Calendar, ChangedEventArgs, CalendarView } from '../calendar/calendar';
import { DatePickerModel } from './datepicker-model';
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
export declare class DatePicker extends Calendar implements IInput {
    private popupObj;
    protected inputWrapper: InputObject;
    private modal;
    protected inputElement: HTMLInputElement;
    protected popupWrapper: HTMLElement;
    protected changedArgs: ChangedEventArgs;
    protected previousDate: Date;
    private keyboardModules;
    private calendarKeyboardModules;
    private previousEleValue;
    private ngTag;
    protected dateTimeFormat: string;
    private inputEleCopy;
    protected l10n: L10n;
    private preventArgs;
    private isDateIconClicked;
    private index;
    protected keyConfigs: {
        [key: string]: string;
    };
    protected calendarKeyConfigs: {
        [key: string]: string;
    };
    /**
     * Specifies the width of the DatePicker component.
     * @default null
     */
    width: number | string;
    /**
     * Specifies the root CSS class of the DatePicker that allows to
     * customize the appearance by overriding the styles.
     * @default null
     */
    cssClass: string;
    /**
     * Specifies the component to act as strict. So that, it allows to enter only a valid date value within a specified range or else it
     * will resets to previous value. By default, strictMode is in false.
     * @default false
     */
    strictMode: boolean;
    /**
     * Specifies the format of the value that to be displayed in component. By default, the format is
     * based on the culture.
     * @default null
     */
    format: string;
    /**
     * Specifies the component to be disabled or not.
     * @default true
     */
    enabled: boolean;
    /**
     * Specifies whether to show or hide the clear Icon
     * @default true
     */
    showClearButton: boolean;
    /**
     * specifies the z-index value of the datePicker popup element.
     * @default 1000
     */
    zIndex: number;
    /**
     * Specifies the component in readonly state.
     * @default false
     */
    readonly: boolean;
    /**
     * Specifies the placeholder text that displayed in textbox.
     * @default null
     */
    placeholder: string;
    /**
     * Specifies the placeholder text to be floated.
     * @default Auto
     */
    floatLabelType: FloatLabelType;
    /**
     * Triggers when the popup gets open.
     * @event
     */
    open: EmitType<PreventableEventArgs | PopupObjectArgs>;
    /**
     * Triggers when the popup gets close.
     * @event
     */
    close: EmitType<PreventableEventArgs | PopupObjectArgs>;
    /**
     * Triggers when the control loses the focus.
     * @event
     */
    blur: EmitType<Object>;
    /**
     *  Triggers when the control gets focus.
     * @event
     */
    focus: EmitType<Object>;
    /**
     * Triggers when the component is created.
     * @event
     */
    created: EmitType<Object>;
    /**
     * Triggers when the component is destroyed.
     * @event
     */
    destroyed: EmitType<Object>;
    /**
     * Constructor for creating the widget.
     */
    constructor(options?: DatePickerModel, element?: string | HTMLInputElement);
    /**
     * To Initialize the control rendering.
     * @return void
     * @private
     */
    render(): void;
    private initialize();
    private createInput();
    protected updateInput(): void;
    protected bindEvents(): void;
    private bindClearEvent();
    protected resetHandler(e?: MouseEvent): void;
    private clear(event);
    private dateIconHandler(e?);
    private CalendarKeyActionHandle(e);
    private inputFocusHandler();
    private inputBlurHandler();
    private documentHandler(e);
    protected inputKeyActionHandle(e: KeyboardEventArgs): void;
    protected strictModeUpdate(): void;
    private createCalendar();
    private modelHeader();
    protected changeTrigger(): void;
    protected navigatedEvent(): void;
    protected changeEvent(e?: Event): void;
    protected selectCalendar(e?: Event): void;
    protected isCalendar(): boolean;
    protected setWidth(width: number | string): void;
    /**
     * Shows the Calendar.
     * @returns void
     */
    show(): void;
    /**
     * Hide the Calendar.
     * @returns void
     */
    hide(): void;
    /**
     * Sets the focus to widget for interaction.
     * @returns void
     */
    focusIn(triggerEvent?: boolean): void;
    /**
     * Remove the focus from widget, if the widget is in focus state.
     * @returns void
     */
    focusOut(): void;
    /**
     * Gets the current view of the DatePicker.
     * @returns string
     */
    currentView(): string;
    /**
     * This method used to navigate to the month/year/decade view of the DatePicker.
     * @param  {string} view - Specifies the view of the calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns void
     */
    navigateTo(view: CalendarView, date: Date): void;
    /**
     * To destroy the widget.
     * @returns void
     */
    destroy(): void;
    /**
     * Initialize the event handler
     * @private
     */
    protected preRender(): void;
    private checkHtmlAttributes();
    /**
     * To get component name.
     * @private
     */
    protected getModuleName(): string;
    private disabledDates();
    private setAriaAttributes();
    protected errorClass(): void;
    /**
     * Called internally if any of the property value changed.
     * returns void
     * @private
     */
    onPropertyChanged(newProp: DatePickerModel, oldProp: DatePickerModel): void;
}
export interface PopupObjectArgs {
    /** Defines the DatePicker popup element. */
    popup: Popup;
}
export interface PreventableEventArgs {
    /** Prevents the default action */
    preventDefault?: Function;
}
