import { Component, Internationalization, EmitType } from '@syncfusion/ej2-base';
import { INotifyPropertyChanged, KeyboardEvents, KeyboardEventArgs } from '@syncfusion/ej2-base';
import { BaseEventArgs } from '@syncfusion/ej2-base';
import { CalendarModel } from './calendar-model';
/**
 * Specifies the view of the calendar.
 */
export declare type CalendarView = 'Month' | 'Year' | 'Decade';
/**
 * Represents the Calendar component that allows the user to select a date.
 * ```html
 * <div id="calendar"/>
 * ```
 * ```typescript
 * <script>
 *   var calendarObj = new Calendar({ value: new Date() });
 *   calendarObj.appendTo("#calendar");
 * </script>
 * ```
 */
export declare class Calendar extends Component<HTMLElement> implements INotifyPropertyChanged {
    protected headerElement: HTMLElement;
    protected contentElement: HTMLElement;
    protected table: HTMLElement;
    protected tableHeadElement: HTMLElement;
    protected tableBodyElement: Element;
    protected nextIcon: HTMLElement;
    protected previousIcon: HTMLElement;
    protected headerTitleElement: HTMLElement;
    protected todayElement: HTMLElement;
    protected footer: HTMLElement;
    protected keyboardModule: KeyboardEvents;
    protected globalize: Internationalization;
    protected currentDate: Date;
    protected changedArgs: ChangedEventArgs;
    protected navigatedArgs: NavigatedEventArgs;
    private renderDaycellArg;
    private effect;
    protected previousDate: Date;
    protected changeHandler: Function;
    protected navigateHandler: Function;
    protected navigatePreviousHandler: Function;
    protected navigateNextHandler: Function;
    private l10;
    protected todayDisabled: boolean;
    protected todayDate: Date;
    protected calendarElement: HTMLElement;
    protected keyConfigs: {
        [key: string]: string;
    };
    /**
     * Gets or sets the selected date of the Calendar.
     * @default null
     */
    value: Date;
    /**
     * Gets or sets the minimum date that can be selected in the Calendar.
     * @default new Date(1900, 00, 01)
     */
    min: Date;
    /**
     * Gets or sets the maximum date that can be selected in the Calendar.
     * @default new Date(2099, 11, 31)
     */
    max: Date;
    /**
     * Gets or sets the Calendar's first day of the week. By default, the first day of the week will be based on the current culture.
     * @default 0
     */
    firstDayOfWeek: number;
    /**
     * Specifies the initial view of the Calendar when it is opened.
     * With the help of this property, initial view can be changed to year or decade view.
     * @default month
     */
    start: CalendarView;
    /**
     * Sets the maximum level of view (month, year, decade) in the Calendar.
     * Depth view should be smaller than the start view to restrict its view navigation.
     * @default month
     */
    depth: CalendarView;
    /**
     * Determines whether the week number of the Calendar is to be displayed or not.
     * The week number is displayed in every week row.
     * @default false
     */
    weekNumber: boolean;
    /**
     * Specifies whether the today button is displayed or not.
     * @default true
     */
    showTodayButton: boolean;
    /**
     * Triggers when Calendar is created.
     * @event
     */
    created: EmitType<Object>;
    /**
     * Triggers when Calendar is destroyed.
     * @event
     */
    destroyed: EmitType<Object>;
    /**
     * Triggers when the Calendar value is changed.
     * @event
     */
    change: EmitType<ChangedEventArgs>;
    /**
     * Triggers when the Calendar is navigated to another level or within the same level of view.
     * @event
     */
    navigated: EmitType<NavigatedEventArgs>;
    /**
     * Triggers when each day cell of the Calendar is rendered.
     * @event
     */
    renderDayCell: EmitType<RenderDayCellEventArgs>;
    /**
     * Initialized new instance of Calendar Class.
     * Constructor for creating the widget
     * @param  {CalendarModel} options?
     * @param  {string|HTMLElement} element?
     */
    constructor(options?: CalendarModel, element?: string | HTMLElement);
    /**
     * To Initialize the control rendering.
     * @returns void
     * @private
     */
    protected render(): void;
    protected processDate(): void;
    private validateDate();
    private minMaxUpdate();
    protected header(): void;
    protected content(): void;
    private getCultureValues();
    private contentHdr();
    private contentBody();
    private updateFooter();
    private contentFooter();
    protected wireEvents(): void;
    protected todayButtonClick(): void;
    protected keyActionHandle(e: KeyboardEventArgs): void;
    protected KeyboardNavigate(number: number, currentView: number, e: KeyboardEvent, max: Date, min: Date): void;
    /**
     * Initialize the event handler
     * @private
     */
    protected preRender(): void;
    private minMaxDate(localDate);
    protected renderMonths(e?: Event): void;
    private renderDays(currentDate, e?);
    private renderYears(e?);
    private renderDecades(e?);
    private dayCell(localDate);
    protected firstDay(date: Date): Date;
    protected lastDay(date: Date): Date;
    protected checkDateValue(value: Date): Date;
    private findlastDay(date);
    private removeTheadEle();
    private renderTemplate(elements, numCells, classNm, e?);
    private clickHandler(e);
    private contentClick(e, view, ele);
    private switchView(view, e?);
    /**
     * To get component name
     * @private
     */
    protected getModuleName(): string;
    /**
     * Gets the properties to be maintained upon browser refresh.
     * @returns string
     */
    getPersistData(): string;
    /**
     * Called internally if any of the property value changed.
     * returns void
     * @private
     */
    onPropertyChanged(newProp: CalendarModel, oldProp: CalendarModel): void;
    private setvalue();
    private titleUpdate(date, view);
    protected setActiveDescendant(): string;
    private iconHandler();
    /**
     * Destroys the widget.
     * @returns void
     */
    destroy(): void;
    private title(e?);
    private getViewNumber(stringVal);
    private navTitle(e?);
    private previous();
    protected navigatePrevious(e: MouseEvent | KeyboardEvent): void;
    private next();
    protected navigateNext(eve: MouseEvent | KeyboardEvent): void;
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     * @param  {string} view - Specifies the view of the Calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns void
     */
    navigateTo(view: CalendarView, date: Date): void;
    /**
     * Gets the current view of the Calendar.
     * @returns string
     */
    currentView(): string;
    private getDateVal(date);
    private getCultureObjects(ld, c);
    private getWeek(d);
    private setTime(date, time);
    protected addMonths(date: Date, i: number): void;
    protected addYears(date: Date, i: number): void;
    protected getIdValue(e: MouseEvent, element: Element): Date;
    private selectDate(e, date, element);
    private setAriaActivedescendant();
    protected previousIconHandler(disabled: boolean): void;
    protected renderDayCellEvent(args: RenderDayCellEventArgs): void;
    protected navigatedEvent(eve: MouseEvent | KeyboardEvent): void;
    private triggerNavigate(event);
    protected changeEvent(e: Event): void;
    private triggerChange(e);
    protected nextIconHandler(disabled: boolean): void;
    private compare(startDate, endDate, modifier);
    protected isMinMaxRange(date: Date): boolean;
    private compareYear(start, end);
    private compareDecade(start, end);
    private shiftArray(array, i);
    protected addDay(date: Date, i: number, e: KeyboardEvent, max: Date, min: Date): void;
    private findNextTD(date, column, max, min);
    private getMaxDays(d);
    private setDateDecade(date, year);
    private setDateYear(date, value);
    private compareMonth(start, end);
}
export interface RenderDayCellEventArgs extends BaseEventArgs {
    /** Specifies whether to disable the current date or not. */
    isDisabled?: boolean;
    /** Specifies the day cell element. */
    element?: HTMLElement;
    /** Defines the current date of the Calendar. */
    date?: Date;
    /** Defines whether the current date is out of range (less than min or greater than max) or not. */
    isOutOfRange?: boolean;
}
export interface ChangedEventArgs extends BaseEventArgs {
    /** Defines the selected date of the Calendar. */
    value?: Date;
    /** Defines the event of the Calendar. */
    event?: KeyboardEvent | MouseEvent | Event;
}
export interface NavigatedEventArgs extends BaseEventArgs {
    /** Defines the current view of the Calendar. */
    view?: string;
    /** Defines the focused date in a view. */
    date?: Date;
    /** Defines the event of the Calendar. */
    event?: KeyboardEvent | MouseEvent;
}
