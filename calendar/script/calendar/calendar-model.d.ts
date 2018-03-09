import { Component, EventHandler, Property, Event, Internationalization, EmitType } from '@syncfusion/ej2-base';import { NotifyPropertyChanges, INotifyPropertyChanged, KeyboardEvents, KeyboardEventArgs, L10n } from '@syncfusion/ej2-base';import { cldrData, BaseEventArgs, getDefaultDateObject, rippleEffect } from '@syncfusion/ej2-base';import { createElement, removeClass, detach, closest, addClass, attributes } from '@syncfusion/ej2-base';import { isNullOrUndefined, getValue, getUniqueID, extend, Browser } from '@syncfusion/ej2-base';
import {CalendarView,ChangedEventArgs,NavigatedEventArgs,RenderDayCellEventArgs} from "./calendar";
import {ComponentModel} from '@syncfusion/ej2-base';

/**
 * Interface for a class Calendar
 */
export interface CalendarModel extends ComponentModel{

    /**
     * Gets or sets the selected date of the Calendar.
     * @default null
     */
    value?: Date;

    /**
     * Gets or sets the minimum date that can be selected in the Calendar.
     * @default new Date(1900, 00, 01)
     */
    min?: Date;

    /**
     * Gets or sets the maximum date that can be selected in the Calendar.
     * @default new Date(2099, 11, 31)
     */
    max?: Date;

    /**
     * Gets or sets the Calendar's first day of the week. By default, the first day of the week will be based on the current culture.
     * @default 0
     */
    firstDayOfWeek?: number;

    /**
     * Specifies the initial view of the Calendar when it is opened.
     * With the help of this property, initial view can be changed to year or decade view.
     * @default month
     */
    start?: CalendarView;

    /**
     * Sets the maximum level of view (month, year, decade) in the Calendar.
     * Depth view should be smaller than the start view to restrict its view navigation.
     * @default month
     */
    depth?: CalendarView;

    /**
     * Determines whether the week number of the Calendar is to be displayed or not.
     * The week number is displayed in every week row.
     * @default false
     */
    weekNumber?: boolean;

    /**
     * Specifies whether the today button is displayed or not.
     * @default true
     */
    showTodayButton?: boolean;

    /**
     * Triggers when Calendar is created.
     * @event 
     */
    created?: EmitType<Object>;

    /**
     * Triggers when Calendar is destroyed.
     * @event 
     */
    destroyed?: EmitType<Object>;

    /**
     * Triggers when the Calendar value is changed.
     * @event  
     */
    change?: EmitType<ChangedEventArgs>;

    /**
     * Triggers when the Calendar is navigated to another level or within the same level of view.
     * @event
     */
    navigated?: EmitType<NavigatedEventArgs>;

    /**
     * Triggers when each day cell of the Calendar is rendered.
     * @event
     */
    renderDayCell?: EmitType<RenderDayCellEventArgs>;

}