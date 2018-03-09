﻿import { EventHandler, Property, Internationalization, NotifyPropertyChanges } from '@syncfusion/ej2-base';
import {ChangeEventArgs,PopupEventArgs,ItemEventArgs} from "./timepicker";
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class TimePicker
 */
export interface TimePickerModel extends ComponentModel{

    /**
     * Gets or sets the width of the TimePicker component. The width of the popup is based on the width of the component.
     * @default '100%'
     */
    width?: string | number;

    /**
     * Specifies the root CSS class of the TimePicker that allows to
     * customize the appearance by overriding the styles.
     * @default null
     */
    cssClass?: string;

    /**
     * Specifies the component to act as strict so that, it allows to enter only a valid time value within a specified range or else 
     * resets to previous value. By default, strictMode is in false.
     * @default false
     */
    strictMode?: boolean;

    /**
     * Specifies the format of value that is to be displayed in component. By default, the format is
     * based on the culture. 
     * @default null
     */
    format?: string;

    /**
     * Specifies whether the component to be disabled or not.
     * @default true
     */
    enabled?: boolean;

    /**
     * Specifies the component in readonly state. 
     * @default false
     */
    readonly?: boolean;

    /**
     * Specifies the placeholder text to be floated.
     */
    floatLabelType?: FloatLabelType;

    /**
     * Specifies the placeholder text that is displayed in textbox.
     * @default null
     */
    placeholder?: string;

    /**
     * specifies the z-index value of the timePicker popup element.
     * @default 1000
     */
    zIndex?: number;

    /**
     * Specifies whether to show or hide the clear Icon
     * @default true
     */
    showClearButton?: boolean;

    /**
     * Specifies the time interval between the two adjacent time values in the popup list . 
     * @default 30
     */
    step?: number;

    /**
     * Specifies the scroll bar position if there is no value is selected in the popup list or
     *  the given value is not present in the popup list. 
     * @default null
     */
    scrollTo?: Date;

    /**
     * Gets or sets the value of the component. The value is parsed based on the format. 
     * @default null
     */
    value?: Date;

    /**
     * Gets or sets the minimum time value that can be allowed to select in TimePicker.
     * @default 00:00
     */
    min?: Date;

    /**
     * Gets or sets the maximum time value that can be allowed to select in TimePicker.
     * @default 00:00
     */
    max?: Date;

    /**
     * Specifies the component to be rendered in right-to-left direction.
     * @default false
     */
    enableRtl?: boolean;

    /**
     * Triggers when the value is changed.
     * @event  
     */
    change?: EmitType<ChangeEventArgs>;

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

    /**
     * Triggers when the popup is opened.
     * @event
     */
    open?: EmitType<PopupEventArgs>;

    /**
     * Triggers while rendering the each popup list item.
     * @event
     */
    itemRender?: EmitType<ItemEventArgs>;

    /**
     * Triggers when the popup is closed.
     * @event
     */
    close?: EmitType<PopupEventArgs>;

    /**
     * Triggers when the control loses the focus.
     * @event
     */
    blur?: EmitType<Object>;

    /**
     * Triggers when the control gets focused.
     * @event
     */
    focus?: EmitType<Object>;

}