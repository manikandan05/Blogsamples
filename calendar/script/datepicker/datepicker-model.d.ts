import { EventHandler, Property, Internationalization, NotifyPropertyChanges } from '@syncfusion/ej2-base';import { KeyboardEvents, KeyboardEventArgs, Animation, EmitType, Event, L10n, Browser, formatUnit } from '@syncfusion/ej2-base';import { createElement, remove, detach, addClass, removeClass, closest, classList, attributes } from '@syncfusion/ej2-base';import { isNullOrUndefined, getValue, setValue, getUniqueID, merge } from '@syncfusion/ej2-base';import { Popup } from '@syncfusion/ej2-popups';import { Input, InputObject, IInput, FloatLabelType } from '@syncfusion/ej2-inputs';import { Calendar, ChangedEventArgs, CalendarView } from '../calendar/calendar';
import {PopupObjectArgs,PreventableEventArgs} from "./datepicker";
import {CalendarModel} from "../calendar/calendar-model";

/**
 * Interface for a class DatePicker
 */
export interface DatePickerModel extends CalendarModel{

    /**
     * Specifies the width of the DatePicker component.
     * @default null
     */
    width?: number | string;

    /**
     * Specifies the root CSS class of the DatePicker that allows to
     * customize the appearance by overriding the styles.
     * @default null
     */
    cssClass?: string;

    /**
     * Specifies the component to act as strict. So that, it allows to enter only a valid date value within a specified range or else it 
     * will resets to previous value. By default, strictMode is in false.
     * @default false
     */
    strictMode?: boolean;

    /**
     * Specifies the format of the value that to be displayed in component. By default, the format is
     * based on the culture. 
     * @default null
     */
    format?: string;

    /**
     * Specifies the component to be disabled or not.
     * @default true
     */
    enabled?: boolean;

    /**
     * Specifies whether to show or hide the clear Icon
     * @default true
     */
    showClearButton?: boolean;

    /**
     * specifies the z-index value of the datePicker popup element.
     * @default 1000
     */
    zIndex?: number;

    /**
     * Specifies the component in readonly state. 
     * @default false
     */
    readonly?: boolean;

    /**
     * Specifies the placeholder text that displayed in textbox.
     * @default null
     */
    placeholder?: string;

    /**
     * Specifies the placeholder text to be floated.
     * @default Auto
     */
    floatLabelType?: FloatLabelType;

    /**
     * Triggers when the popup gets open.
     * @event 
     */
    open?: EmitType<PreventableEventArgs | PopupObjectArgs>;

    /**
     * Triggers when the popup gets close.
     * @event 
     */
    close?: EmitType<PreventableEventArgs | PopupObjectArgs>;

    /**
     * Triggers when the control loses the focus.
     * @event 
     */
    blur?: EmitType<Object>;

    /**
     *  Triggers when the control gets focus.
     * @event 
     */
    focus?: EmitType<Object>;

    /**
     * Triggers when the component is created.
     * @event 
     */
    created?: EmitType<Object>;

    /**
     * Triggers when the component is destroyed.
     * @event 
     */
    destroyed?: EmitType<Object>;

}