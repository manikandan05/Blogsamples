import { Component, EventHandler, Property, Event, Internationalization, EmitType } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges, INotifyPropertyChanged, KeyboardEvents, KeyboardEventArgs, L10n } from '@syncfusion/ej2-base';
import { cldrData, BaseEventArgs, getDefaultDateObject, rippleEffect } from '@syncfusion/ej2-base';
import { createElement, removeClass, detach, closest, addClass, attributes } from '@syncfusion/ej2-base';
import { isNullOrUndefined, getValue, getUniqueID, extend, Browser } from '@syncfusion/ej2-base';
import { CalendarModel } from './calendar-model';
/**
 * Specifies the view of the calendar.
 */
export type CalendarView = 'Month' | 'Year' | 'Decade';

//class constant defination.
const ROOT: string = 'e-calendar';
const DEVICE: string = 'e-device';
const HEADER: string = 'e-header';
const RTL: string = 'e-rtl';
const CONTENT: string = 'e-content';
const YEAR: string = 'e-year';
const MONTH: string = 'e-month';
const DECADE: string = 'e-decade';
const ICON: string = 'e-icons';
const PREVICON: string = 'e-prev';
const NEXTICON: string = 'e-next';
const RIPPLESTYLE: string = 'e-ripple-style';
const PREVSPAN: string = 'e-date-icon-prev';
const NEXTSPAN: string = 'e-date-icon-next ';
const ICONCONTAINER: string = 'e-icon-container';
const DISABLED: string = 'e-disabled';
const OVERLAY: string = 'e-overlay';
const WEEKEND: string = 'e-weekend';
const WEEKNUMBER: string = 'e-week-number';
const OTHERMONTH: string = 'e-other-month';
const SELECTED: string = 'e-selected';
const FOCUSEDDATE: string = 'e-focused-date';
const OTHERMONTHROW: string = 'e-month-hide';
const TODAY: string = 'e-today';
const TITLE: string = 'e-title';
const LINK: string = 'e-day';
const CELL: string = 'e-cell';
const WEEKHEADER: string = 'e-week-header';
const ZOOMIN: string = 'e-zoomin';
const FOOTER: string = 'e-footer-container';
const BTN: string = 'e-btn';
const FLAT: string = 'e-flat';

const dayMilliSeconds: number = 86400000;
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
@NotifyPropertyChanges
export class Calendar extends Component<HTMLElement> implements INotifyPropertyChanged {
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
    private renderDaycellArg: RenderDayCellEventArgs;
    private effect: string = '';
    protected previousDate: Date;
    protected changeHandler: Function;
    protected navigateHandler: Function;
    protected navigatePreviousHandler: Function;
    protected navigateNextHandler: Function;
    private l10: L10n;
    protected todayDisabled: boolean;
    protected todayDate: Date;
    //this.element clone
    protected calendarElement: HTMLElement;
    protected keyConfigs: { [key: string]: string } = {
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
        controlEnd: 'ctrl+end'
    };
    /**
     * Gets or sets the selected date of the Calendar.
     * @default null
     */
    @Property(null)
    public value: Date;
    /**
     * Gets or sets the minimum date that can be selected in the Calendar.
     * @default new Date(1900, 00, 01)
     */
    @Property(new Date(1900, 0, 1))
    public min: Date;
    /**
     * Gets or sets the maximum date that can be selected in the Calendar.
     * @default new Date(2099, 11, 31)
     */
    @Property(new Date(2099, 11, 31))
    public max: Date;
    /**
     * Gets or sets the Calendar's first day of the week. By default, the first day of the week will be based on the current culture.
     * @default 0
     */
    @Property(0)
    public firstDayOfWeek: number;
    /**
     * Specifies the initial view of the Calendar when it is opened.
     * With the help of this property, initial view can be changed to year or decade view.
     * @default month
     */
    @Property('Month')
    public start: CalendarView;
    /**
     * Sets the maximum level of view (month, year, decade) in the Calendar.
     * Depth view should be smaller than the start view to restrict its view navigation.
     * @default month
     */
    @Property('Month')
    public depth: CalendarView;
    /**
     * Determines whether the week number of the Calendar is to be displayed or not.
     * The week number is displayed in every week row.
     * @default false
     */
    @Property(false)
    public weekNumber: boolean;
    /** 
     * Specifies whether the today button is displayed or not.
     * @default true
     */
    @Property(true)
    public showTodayButton: boolean;
    /** 
     * Triggers when Calendar is created.
     * @event 
     */
    @Event()
    public created: EmitType<Object>;
    /** 
     * Triggers when Calendar is destroyed.
     * @event 
     */
    @Event()
    public destroyed: EmitType<Object>;
    /**
     * Triggers when the Calendar value is changed.
     * @event  
     */
    @Event()
    public change: EmitType<ChangedEventArgs>;
    /**
     * Triggers when the Calendar is navigated to another level or within the same level of view.
     * @event
     */
    @Event()
    public navigated: EmitType<NavigatedEventArgs>;
    /**     
     * Triggers when each day cell of the Calendar is rendered.
     * @event
     */
    @Event()
    public renderDayCell: EmitType<RenderDayCellEventArgs>;
    /**
     * Initialized new instance of Calendar Class.
     * Constructor for creating the widget
     * @param  {CalendarModel} options?
     * @param  {string|HTMLElement} element?
     */
    constructor(options?: CalendarModel, element?: string | HTMLElement) {
        super(options, element);
    }
    /**
     * To Initialize the control rendering.
     * @returns void
     * @private
     */
    protected render(): void {
        this.globalize = new Internationalization(this.locale);
        this.todayDisabled = false;
        this.todayDate = new Date(new Date().setHours(0, 0, 0, 0));
        if (this.getModuleName() === 'calendar') {
            this.element.classList.add(ROOT);
            if (this.enableRtl) {
                this.element.classList.add(RTL);
            }
            if (Browser.isDevice) {
                this.element.classList.add(DEVICE);
            }
            attributes(this.element, <{ [key: string]: string }>{
                'data-role': 'calendar'
            });
        } else {
            this.calendarElement = createElement('div');
            this.calendarElement.classList.add(ROOT);
            if (this.enableRtl) {
                this.calendarElement.classList.add(RTL);
            }
            if (Browser.isDevice) {
                this.calendarElement.classList.add(DEVICE);
            }
            attributes(this.calendarElement, <{ [key: string]: string }>{
                'role': 'calendar'
            });
        }
        this.processDate();
        this.header();
        this.content();
        this.wireEvents();
    }
    protected processDate(): void {
        this.validateDate();
        this.minMaxUpdate();
    }
    private validateDate(): void {
        this.setProperties({ value: this.checkDateValue(new Date('' + this.value)) }, true); // persist the value propeerty.
        this.setProperties({ min: this.checkDateValue(new Date('' + this.min)) }, true);
        this.setProperties({ max: this.checkDateValue(new Date('' + this.max)) }, true);
        this.currentDate = this.currentDate ? this.currentDate : new Date(new Date().setHours(0, 0, 0, 0));
        if (!isNullOrUndefined(this.value) && this.min <= this.max && this.value >= this.min && this.value <= this.max) {
            this.currentDate = new Date('' + this.value);
        }
        if (isNaN(+this.value)) {
            this.setProperties({ value: null }, true);
        }
    }
    private minMaxUpdate(): void {
        if (!(this.min <= this.max)) {
            this.setProperties({ min: this.min }, true);
            addClass([this.element], OVERLAY);
        } else {
            removeClass([this.element], OVERLAY);
        }
        this.min = isNullOrUndefined(this.min) || !(+this.min) ? this.min = new Date(1900, 0, 1) : this.min;
        this.max = isNullOrUndefined(this.max) || !(+this.max) ? this.max = new Date(2099, 11, 31) : this.max;
        if (!isNullOrUndefined(this.value) && this.value <= this.min && this.min <= this.max) {
            this.setProperties({ value: this.min }, true);
            this.changedArgs = { value: this.value };
        } else {
            if (!isNullOrUndefined(this.value) && this.value >= this.max && this.min <= this.max) {
                this.setProperties({ value: this.max }, true);
                this.changedArgs = { value: this.value };
            }
        }
        if (this.min <= this.max && this.value && this.value <= this.max && this.value >= this.min) {
            this.currentDate = new Date('' + this.value);
        } else {
            if (this.min <= this.max && !this.value && this.currentDate > this.max) {
                this.currentDate = new Date('' + this.max);
            } else {
                if (this.currentDate < this.min) {
                    this.currentDate = new Date('' + this.min);
                }
            }
        }
    }
    protected header(): void {
        let ariaPrevAttrs: Object = {
            'aria-disabled': 'false',
            'aria-label': 'previous month'
        };
        let ariaNextAttrs: Object = {
            'aria-disabled': 'false',
            'aria-label': 'next month'

        };
        let ariaTitleAttrs: Object = {
            'aria-atomic': 'true', 'aria-live': 'assertive', 'aria-label': 'title'
        };
        this.headerElement = createElement('div', { className: HEADER });
        let iconContainer: HTMLElement = createElement('div', { className: ICONCONTAINER });
        this.previousIcon = createElement('button', { className: '' + PREVICON, attrs: { type: 'button' } });
        rippleEffect(this.previousIcon, {
            duration: 400,
            selector: '.e-prev',
            isCenterRipple: true
        });
        attributes(this.previousIcon, <{ [key: string]: string }>ariaPrevAttrs);
        this.nextIcon = createElement('button', { className: '' + NEXTICON, attrs: { type: 'button' } });
        rippleEffect(this.nextIcon, {
            selector: '.e-next',
            duration: 400,
            isCenterRipple: true
        });
        attributes(this.nextIcon, <{ [key: string]: string }>ariaNextAttrs);
        this.headerTitleElement = createElement('div', { className: '' + LINK + ' ' + TITLE });
        attributes(this.headerTitleElement, <{ [key: string]: string }>ariaTitleAttrs);
        this.headerElement.appendChild(this.headerTitleElement);
        this.previousIcon.appendChild(createElement('span', { className: '' + PREVSPAN + ' ' + ICON }));
        this.nextIcon.appendChild(createElement('span', { className: '' + NEXTSPAN + ' ' + ICON }));
        iconContainer.appendChild(this.previousIcon);
        iconContainer.appendChild(this.nextIcon);
        this.headerElement.appendChild(iconContainer);
        if (this.getModuleName() === 'calendar') {
            this.element.appendChild(this.headerElement);
        } else {
            this.calendarElement.appendChild(this.headerElement);
        }
    }
    protected content(): void {
        this.previousDate = this.value;
        this.contentElement = createElement('div', { className: CONTENT });
        this.table = createElement('table', { attrs: { tabIndex: '0', 'role': 'grid', 'aria-activedescendant': '' } });
        if (this.getModuleName() === 'calendar') {
            this.element.appendChild(this.contentElement);
        } else {
            this.calendarElement.appendChild(this.contentElement);
        }

        this.contentElement.appendChild(this.table);
        this.contentHdr();
        this.contentBody();
        if (this.showTodayButton) {
            this.contentFooter();
        }
    }
    private getCultureValues(): string[] {
        let culShortNames: string[] = [];
        let cldrObj: string[];
        if (this.locale === 'en' || this.locale === 'en-US') {
            cldrObj = <string[]>(getValue('days.stand-alone.short', getDefaultDateObject()));
        } else {
            cldrObj = <string[]>(this.getCultureObjects(cldrData, '' + this.locale));
        }
        for (let obj of Object.keys(cldrObj)) {
            culShortNames.push(getValue(obj, cldrObj));
        }
        return culShortNames;
    }
    private contentHdr(): void {
        if (this.getModuleName() === 'calendar') {
            if (!isNullOrUndefined(this.element.querySelectorAll('.e-content .e-week-header')[0])) {
                detach(this.element.querySelectorAll('.e-content .e-week-header')[0]);
            }
        } else {
            if (!isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content .e-week-header')[0])) {
                detach(this.calendarElement.querySelectorAll('.e-content .e-week-header')[0]);
            }
        }
        let daysCount: number = 6;
        let html: string = '';
        let shortNames: string[];
        if (this.firstDayOfWeek > 6 || this.firstDayOfWeek < 0) {
            this.setProperties({ firstDayOfWeek: 0 }, true);
        }
        this.tableHeadElement = createElement('thead', { className: WEEKHEADER });
        if (this.weekNumber) {
            html += '<th class="e-week-number"></th>';
            addClass([this.element], '' + WEEKNUMBER);
        }
        shortNames = this.shiftArray(((this.getCultureValues().length > 0 && this.getCultureValues())), this.firstDayOfWeek);
        for (let days: number = 0; days <= daysCount; days++) {
            html += '<th  class="">' + shortNames[days] + '</th>';
        }
        html = '<tr>' + html + '</tr>';
        this.tableHeadElement.innerHTML = html;
        this.table.appendChild(this.tableHeadElement);
    }
    private contentBody(): void {
        if (this.getModuleName() === 'calendar') {
            if (!isNullOrUndefined(this.element.querySelectorAll('.e-content tbody')[0])) {
                detach(this.element.querySelectorAll('.e-content tbody')[0]);
            }
        } else {
            if (!isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content tbody')[0])) {
                detach(this.calendarElement.querySelectorAll('.e-content tbody')[0]);
            }
        }
        switch (this.start) {
            case 'Year':
                this.renderYears();
                break;
            case 'Decade':
                this.renderDecades();
                break;
            default:
                this.renderMonths();
        }
    }
    private updateFooter(): void {
        this.todayElement.textContent = this.l10.getConstant('today');
    }
    private contentFooter(): void {
        if (this.showTodayButton) {
            let minimum: Date = new Date(this.min.toDateString());
            let maximum: Date = new Date(this.max.toDateString());
            let l10nLocale: object = { today: 'Today' };
            this.globalize = new Internationalization(this.locale);
            this.l10 = new L10n(this.getModuleName(), l10nLocale, this.locale);
            this.todayElement = createElement('button');
            rippleEffect(this.todayElement);
            this.updateFooter();
            addClass([this.todayElement], [BTN, TODAY, FLAT]);
            if ((!(new Date(minimum.setHours(0, 0, 0, 0)) <= this.todayDate &&
                this.todayDate <= new Date(maximum.setHours(0, 0, 0, 0)))) || (this.todayDisabled)) {
                addClass([this.todayElement], DISABLED);
            }
            this.footer = createElement('div', { className: FOOTER });
            this.footer.appendChild(this.todayElement);
            if (this.getModuleName() === 'calendar') {
                this.element.appendChild(this.footer);
            }
            if (this.getModuleName() === 'datepicker') {
                this.calendarElement.appendChild(this.footer);
            }
            if (this.getModuleName() === 'datetimepicker') {
                this.calendarElement.appendChild(this.footer);
            }
            if (!this.todayElement.classList.contains(DISABLED)) {
                EventHandler.add(this.todayElement, 'click', this.todayButtonClick, this);
            }
        }
    }
    protected wireEvents(): void {
        EventHandler.add(this.headerTitleElement, 'click', this.navTitle, this);
        if (this.getModuleName() === 'calendar') {
            this.keyboardModule = new KeyboardEvents(
                <HTMLElement>this.element,
                {
                    eventName: 'keydown',
                    keyAction: this.keyActionHandle.bind(this),
                    keyConfigs: this.keyConfigs
                });
        } else {
            this.keyboardModule = new KeyboardEvents(
                <HTMLElement>this.calendarElement,
                {
                    eventName: 'keydown',
                    keyAction: this.keyActionHandle.bind(this),
                    keyConfigs: this.keyConfigs
                });
        }
    }
    protected todayButtonClick(): void {
        if (this.showTodayButton) {
            let tempValue: Date = new Date();
            if (this.value) {
                tempValue.setHours(this.value.getHours());
                tempValue.setMinutes(this.value.getMinutes());
                tempValue.setSeconds(this.value.getSeconds());
            } else {
                tempValue = new Date(tempValue.getFullYear(), tempValue.getMonth(), tempValue.getDate(), 0, 0, 0);
            }
            this.setProperties({ value: tempValue }, true);
            if (this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                this.navigateTo(this.depth, new Date('' + this.value));
            } else {
                this.navigateTo('Month', new Date('' + this.value));
            }
            this.effect = '';
        }
    }
    protected keyActionHandle(e: KeyboardEventArgs): void {
        let view: number = this.getViewNumber(this.currentView());
        let focusedDate: Element = this.tableBodyElement.querySelector('tr td.e-focused-date');
        let selectedDate: Element = this.tableBodyElement.querySelector('tr td.e-selected');
        let depthValue: number = this.getViewNumber(this.depth);
        let levelRestrict: boolean = (view === depthValue && this.getViewNumber(this.start) >= depthValue);
        this.effect = '';
        switch (e.action) {
            case 'moveLeft':
                this.KeyboardNavigate(-1, view, e, this.max, this.min);
                e.preventDefault();
                break;
            case 'moveRight':
                this.KeyboardNavigate(1, view, e, this.max, this.min);
                e.preventDefault();
                break;
            case 'moveUp':
                if (view === 0) {
                    this.KeyboardNavigate(-7, view, e, this.max, this.min); // move the current date to the previous seven days.
                } else {
                    this.KeyboardNavigate(-4, view, e, this.max, this.min); // move the current year to the previous four days.
                }
                e.preventDefault();
                break;
            case 'moveDown':
                if (view === 0) {
                    this.KeyboardNavigate(7, view, e, this.max, this.min);
                } else {
                    this.KeyboardNavigate(4, view, e, this.max, this.min);
                }
                e.preventDefault();
                break;
            case 'select':
                if (e.target === this.todayElement) {
                    this.todayButtonClick();
                } else {
                    let element: Element = !isNullOrUndefined(focusedDate) ? focusedDate : selectedDate;
                    if (!isNullOrUndefined(element) && !element.classList.contains(DISABLED)) {
                        if (levelRestrict) {
                            let d: Date = new Date(parseInt('' + (element).id, 0));
                            this.selectDate(e, d, (element));
                        } else {
                            this.contentClick(null, --view, (element));
                        }
                    }
                }
                break;
            case 'controlUp':
                this.title();
                e.preventDefault();
                break;
            case 'controlDown':
                if (!isNullOrUndefined(focusedDate) || !isNullOrUndefined(selectedDate) && !levelRestrict) {
                    this.contentClick(null, --view, (focusedDate || selectedDate));
                }
                e.preventDefault();
                break;
            case 'home':
                this.currentDate = this.firstDay(this.currentDate);
                detach(this.tableBodyElement);
                this.renderMonths(e);
                e.preventDefault();
                break;
            case 'end':
                this.currentDate = this.lastDay(this.currentDate);
                detach(this.tableBodyElement);
                this.renderMonths(e);
                e.preventDefault();
                break;
            case 'pageUp':
                this.addMonths(this.currentDate, -1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'pageDown':
                this.addMonths(this.currentDate, 1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'shiftPageUp':
                this.addYears(this.currentDate, -1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'shiftPageDown':
                this.addYears(this.currentDate, 1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'controlHome':
                this.navigateTo('Month', new Date(this.currentDate.getFullYear(), 0, 1));
                e.preventDefault();
                break;
            case 'controlEnd':
                this.navigateTo('Month', new Date(this.currentDate.getFullYear(), 11, 31));
                e.preventDefault();
                break;
        }
        if (this.getModuleName() === 'calendar') { this.table.focus(); }
    }

    protected KeyboardNavigate(number: number, currentView: number, e: KeyboardEvent, max: Date, min: Date): void {
        let date: Date = new Date('' + this.currentDate);
        switch (currentView) {
            case 2:
                this.addYears(this.currentDate, number);
                if (this.isMinMaxRange(this.currentDate)) {
                    detach(this.tableBodyElement);
                    this.renderDecades(e);
                } else {
                    this.currentDate = date;
                }
                break;
            case 1:
                this.addMonths(this.currentDate, number);
                if (this.isMinMaxRange(this.currentDate)) {
                    detach(this.tableBodyElement);
                    this.renderYears(e);
                } else {
                    this.currentDate = date;
                }
                break;
            case 0:
                this.addDay(this.currentDate, number, e, max, min);
                if (this.isMinMaxRange(this.currentDate)) {
                    detach(this.tableBodyElement);
                    this.renderMonths(e);
                } else {
                    this.currentDate = date;
                }
                break;
        }
    }

    /**
     * Initialize the event handler
     * @private
     */
    protected preRender(): void {
        this.navigatePreviousHandler = this.navigatePrevious.bind(this);
        this.navigateNextHandler = this.navigateNext.bind(this);
        this.changeHandler = (e: MouseEvent): void => {
            this.triggerChange(e);
        };
        this.navigateHandler = (e: MouseEvent): void => {
            this.triggerNavigate(e);
        };
    };
    private minMaxDate(localDate: Date): Date {
        let currentDate: Date = new Date(new Date(+localDate).setHours(0, 0, 0, 0));
        let minDate: Date = new Date(new Date(+this.min).setHours(0, 0, 0, 0));
        let maxDate: Date = new Date(new Date(+this.max).setHours(0, 0, 0, 0));
        if (+currentDate === +minDate || +currentDate === +maxDate) {
            if (+localDate < +this.min) {
                localDate = new Date(+this.min);
            }
            if (+localDate > +this.max) {
                localDate = new Date(+this.max);
            }
        }
        return localDate;
    }
    protected renderMonths(e?: Event): void {
        let numCells: number = this.weekNumber ? 8 : 7;
        let tdEles: HTMLElement[] = this.renderDays(this.currentDate, e);
        this.contentHdr();
        this.renderTemplate(tdEles, numCells, MONTH, e);
    }
    private renderDays(currentDate: Date, e?: Event): HTMLElement[] {
        let tdEles: HTMLElement[] = [];
        let cellsCount: number = 42;
        let localDate: Date = new Date('' + currentDate);
        let minMaxDate: Date;
        let numCells: number = this.weekNumber ? 8 : 7;
        // 8 and 7 denotes the number of columns to be specified.
        let currentMonth: number = localDate.getMonth();
        this.titleUpdate(currentDate, 'days');
        let d: Date = localDate;
        localDate = new Date(d.getFullYear(), d.getMonth(), 0, d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        while (localDate.getDay() !== this.firstDayOfWeek) {
            this.setTime(localDate, -1 * dayMilliSeconds);
        }
        for (let day: number = 0; day < cellsCount; ++day) {
            let weekEle: HTMLElement = createElement('td', { className: CELL });
            let weekAnchor: HTMLElement = createElement('span');
            if (day % 7 === 0 && this.weekNumber) {
                weekAnchor.textContent = '' + this.getWeek(localDate);
                weekEle.appendChild(weekAnchor);
                addClass([weekEle], '' + WEEKNUMBER);
                tdEles.push(weekEle);
            }
            minMaxDate = new Date(+localDate);
            localDate = this.minMaxDate(localDate);
            let dateFormatOptions: object = { type: 'dateTime', skeleton: 'full' };
            let date: Date = this.globalize.parseDate(this.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
            let tdEle: HTMLElement = this.dayCell(localDate);
            let title: string = this.globalize.formatDate(localDate, { type: 'date', skeleton: 'full' });
            let dayLink: HTMLElement = createElement('span');
            dayLink.textContent = this.globalize.formatDate(localDate, { type: 'date', skeleton: 'd' });
            let disabled: boolean = (this.min > localDate) || (this.max < localDate);
            if (disabled) {
                addClass([tdEle], DISABLED);
                addClass([tdEle], OVERLAY);
            } else {
                dayLink.setAttribute('title', '' + title);
            }
            if (currentMonth !== localDate.getMonth()) {
                addClass([tdEle], OTHERMONTH);
            }
            if (localDate.getDay() === 0 || localDate.getDay() === 6) {
                addClass([tdEle], WEEKEND);
            }
            tdEle.appendChild(dayLink);
            this.renderDaycellArg = {
                date: localDate,
                isDisabled: false,
                element: tdEle,
                isOutOfRange: disabled
            };
            let args: RenderDayCellEventArgs = this.renderDaycellArg;
            this.renderDayCellEvent(args);
            if (args.isDisabled) {
                if (this.value && +this.value === +args.date) {
                    this.setProperties({ value: null }, true);
                }
            }
            if (this.renderDaycellArg.isDisabled && !tdEle.classList.contains(SELECTED)) {
                addClass([tdEle], DISABLED);
                addClass([tdEle], OVERLAY);
                if (+this.renderDaycellArg.date === +this.todayDate) {
                    this.todayDisabled = true;
                }
            }
            let otherMnthBool: boolean = tdEle.classList.contains(OTHERMONTH);
            let disabledCls: boolean = tdEle.classList.contains(DISABLED);
            if (!disabledCls) {
                EventHandler.add(tdEle, 'click', this.clickHandler, this);
            }
            // to set the value as null while setting the disabled date onProperty change.
            if (args.isDisabled && +this.value === +args.date) {
                this.setProperties({ value: null }, true);
            }
            if (!otherMnthBool && !disabledCls && this.getDateVal(localDate)) {
                addClass([tdEle], SELECTED);
            } else {
                if (currentDate.getDate() === localDate.getDate() && !otherMnthBool && !disabledCls) {
                    addClass([tdEle], FOCUSEDDATE);
                } else {
                    if (currentDate >= this.max && parseInt(tdEle.id, 0) === +this.max && !otherMnthBool && !disabledCls) {
                        addClass([tdEle], FOCUSEDDATE);
                    }
                    if (currentDate <= this.min && parseInt(tdEle.id, 0) === +this.min && !otherMnthBool && !disabledCls) {
                        addClass([tdEle], FOCUSEDDATE);
                    }
                }
            }
            if (date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) {
                if (date.getFullYear() === new Date().getFullYear()) {
                    addClass([tdEle], TODAY);
                }
            }
            tdEles.push(this.renderDaycellArg.element);
            localDate = new Date(+minMaxDate);
            this.addDay(localDate, 1, null, this.max, this.min);
        }
        return tdEles;
    }
    private renderYears(e?: Event): void {
        this.removeTheadEle();
        let numCells: number = 4;
        let days: number[];
        let tdEles: HTMLElement[] = [];
        let valueUtil: boolean = isNullOrUndefined(this.value);
        let curDate: Date = new Date('' + this.currentDate);
        let mon: number = curDate.getMonth();
        let yr: number = curDate.getFullYear();
        let localDate: Date = curDate;
        let curYrs: number = localDate.getFullYear();
        let minYr: number = new Date('' + this.min).getFullYear();
        let minMonth: number = new Date('' + this.min).getMonth();
        let maxYr: number = new Date('' + this.max).getFullYear();
        let maxMonth: number = new Date('' + this.max).getMonth();
        localDate.setMonth(0);
        this.titleUpdate(this.currentDate, 'months');
        let disabled: boolean = (this.min > localDate) || (this.max < localDate);
        localDate.setDate(1);
        for (let month: number = 0; month < 12; ++month) {
            let tdEle: HTMLElement = this.dayCell(localDate);
            let dayLink: HTMLElement = createElement('span');
            let localMonth: boolean = (this.value && (this.value).getMonth() === localDate.getMonth());
            let select: boolean = (this.value && (this.value).getFullYear() === yr && localMonth);
            dayLink.textContent = this.globalize.formatDate(localDate, { type: 'dateTime', skeleton: 'MMM' });
            if ((this.min && (curYrs < minYr || (month < minMonth && curYrs === minYr))) || (
                this.max && (curYrs > maxYr || (month > maxMonth && curYrs >= maxYr)))) {
                addClass([tdEle], DISABLED);
            } else if (!valueUtil && select) {
                addClass([tdEle], SELECTED);
            } else {
                if (localDate.getMonth() === mon && this.currentDate.getMonth() === mon) {
                    addClass([tdEle], FOCUSEDDATE);
                }
            }
            localDate.setDate(1);
            localDate.setMonth(localDate.getMonth() + 1);
            if (!tdEle.classList.contains(DISABLED)) {
                EventHandler.add(tdEle, 'click', this.clickHandler, this);
            }
            tdEle.appendChild(dayLink);
            tdEles.push(tdEle);
        }
        this.renderTemplate(tdEles, numCells, YEAR, e);
    }
    private renderDecades(e?: Event): void {
        this.removeTheadEle();
        let numCells: number = 4;
        let yearCell: number = 12;
        let tdEles: HTMLElement[] = [];
        let localDate: Date = new Date('' + this.currentDate);
        localDate.setMonth(0);
        localDate.setDate(1);
        let localYr: number = localDate.getFullYear();
        let startYr: Date = new Date('' + (localYr - localYr % 10));
        let endYr: Date = new Date('' + (localYr - localYr % 10 + (10 - 1)));
        let startHdrYr: string = this.globalize.formatDate(startYr, { type: 'dateTime', skeleton: 'y' });
        let endHdrYr: string = this.globalize.formatDate(endYr, { type: 'dateTime', skeleton: 'y' });
        this.headerTitleElement.textContent = startHdrYr + ' - ' + (endHdrYr);
        let start: Date = new Date(localYr - (localYr % 10) - 1, 0, 1);
        let startYear: number = start.getFullYear();
        for (let rowIterator: number = 0; rowIterator < yearCell; ++rowIterator) {
            let year: number = startYear + rowIterator;
            localDate.setFullYear(year);
            let tdEle: HTMLElement = this.dayCell(localDate);
            attributes(tdEle, { 'role': 'gridcell' });
            let dayLink: HTMLElement = createElement('span');
            dayLink.textContent = this.globalize.formatDate(localDate, { type: 'dateTime', skeleton: 'y' });
            if (year < new Date('' + this.min).getFullYear() || year > new Date('' + this.max).getFullYear()) {
                addClass([tdEle], DISABLED);
            } else if (!isNullOrUndefined(this.value) && localDate.getFullYear() === (this.value).getFullYear()) {
                addClass([tdEle], SELECTED);
            } else {
                if (localDate.getFullYear() === this.currentDate.getFullYear() && !tdEle.classList.contains(DISABLED)) {
                    addClass([tdEle], FOCUSEDDATE);
                }
            }
            if (!tdEle.classList.contains(DISABLED)) {
                EventHandler.add(tdEle, 'click', this.clickHandler, this);
            }
            tdEle.appendChild(dayLink);
            tdEles.push(tdEle);
        }
        this.renderTemplate(tdEles, numCells, 'e-decade', e);
    }
    private dayCell(localDate: Date): HTMLElement {
        let dateFormatOptions: object = { skeleton: 'full', type: 'dateTime' };
        let date: Date = this.globalize.parseDate(this.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
        let value: number = date.valueOf();
        let attrs: Object = {
            className: CELL, attrs: { 'id': '' + getUniqueID('' + value), 'aria-selected': 'false', 'role': 'gridcell' }
        };
        return createElement('td', attrs);
    }
    protected firstDay(date: Date): Date {
        let collection: Element[] = <NodeListOf<HTMLTableDataCellElement> & Element[]>
            this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERMONTH + '');
        if (collection.length) {
            for (let i: number = 0; i < collection.length; i++) {
                if (!collection[i].classList.contains(DISABLED)) {
                    date = new Date(parseInt(collection[i].id, 0));
                    break;
                }
            }
        }
        return date;
    }
    protected lastDay(date: Date): Date {
        let lastDate: Date = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        let timeOffset: number = Math.abs(lastDate.getTimezoneOffset() - this.firstDay(date).getTimezoneOffset());
        if (timeOffset) {
            lastDate.setHours(this.firstDay(date).getHours() + (timeOffset / 60));
        }
        return this.findlastDay(lastDate);
    };
    protected checkDateValue(value: Date): Date {
        return (!isNullOrUndefined(value) && value instanceof Date && !isNaN(+value)) ? value : null;
    }
    private findlastDay(date: Date): Date {
        let collection: Element[] = <NodeListOf<HTMLTableDataCellElement> & Element[]>
            this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERMONTH + '');
        if (collection.length) {
            for (let i: number = collection.length - 1; i >= 0; i--) {
                if (!collection[i].classList.contains(DISABLED)) {
                    date = new Date(parseInt(collection[i].id, 0));
                    break;
                }
            }
        }
        return date;
    }
    private removeTheadEle(): void {
        if (this.getModuleName() === 'calendar') {
            if (!isNullOrUndefined(this.element.querySelectorAll('.e-content table thead')[0])) {
                detach(this.tableHeadElement);
            }
        } else {
            if (!isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content table thead')[0])) {
                detach(this.tableHeadElement);
            }
        }

    }
    private renderTemplate(elements: HTMLElement[], numCells: number, classNm: string, e?: Event): void {
        let view: number = this.getViewNumber(this.currentView());
        let trEle: HTMLElement;
        this.tableBodyElement = createElement('tbody');
        this.table.appendChild(this.tableBodyElement);
        removeClass([this.contentElement, this.headerElement], [MONTH, DECADE, YEAR]);
        addClass([this.contentElement, this.headerElement], [classNm]);
        let weekNumCell: number = 41;
        let numberCell: number = 35;
        let otherMonthCell: number = 6;
        let row: number = numCells;
        let rowIterator: number = 0;
        for (let dayCell: number = 0; dayCell < elements.length / numCells; ++dayCell) {
            trEle = createElement('tr', { attrs: { 'role': 'row' } });
            for (rowIterator = 0 + rowIterator; rowIterator < row; rowIterator++) {
                if (!elements[rowIterator].classList.contains('e-week-number') && !isNullOrUndefined(elements[rowIterator].children[0])) {
                    addClass([elements[rowIterator].children[0]], [LINK]);
                    rippleEffect(<HTMLElement>elements[rowIterator].children[0], {
                        duration: 600,
                        isCenterRipple: true
                    });
                }
                trEle.appendChild(elements[rowIterator]);
                if (!this.weekNumber && rowIterator === otherMonthCell && elements[otherMonthCell].classList.contains(OTHERMONTH)) {
                    addClass([trEle], OTHERMONTHROW);
                }
                if (this.weekNumber) {
                    if (rowIterator === weekNumCell && elements[weekNumCell].classList.contains(OTHERMONTH)) {
                        addClass([trEle], OTHERMONTHROW);
                    }
                } else {
                    if (rowIterator === numberCell && elements[numberCell].classList.contains(OTHERMONTH)) {
                        addClass([trEle], OTHERMONTHROW);
                    }
                }
            }
            row = row + numCells;
            rowIterator = rowIterator + 0;
            this.tableBodyElement.appendChild(trEle);
        }
        this.table.querySelector('tbody').className = this.effect;
        this.iconHandler();
        this.changedArgs = { value: this.value };
        if (view !== this.getViewNumber(this.currentView()) || (view === 0 && view !== this.getViewNumber(this.currentView()))) {
            this.navigateHandler(e);
        }
        this.setAriaActivedescendant();
        this.changeHandler();
    }
    private clickHandler(e: MouseEvent): void {
        e.preventDefault();
        let eve: Element = <HTMLElement>e.currentTarget;
        let view: number = this.getViewNumber(this.currentView());
        if (eve.classList.contains(OTHERMONTH)) {
            this.value = this.getIdValue(e, null);
            this.contentClick(e, 0, null);
        } else if (view === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
            this.contentClick(e, 1, null);
        } else if (2 === view) {
            this.contentClick(e, 1, null);
        } else if (!eve.classList.contains(OTHERMONTH) && view === 0) {
            this.selectDate(e, this.getIdValue(e, null), null);
        } else {
            this.contentClick(e, 0, eve);
        }
        if (this.getModuleName() === 'calendar') {
            this.table.focus();
        }
    }
    private contentClick(e: MouseEvent, view: number, ele: Element): void {
        let currentView: number = this.getViewNumber(this.currentView());
        let d: Date = this.getIdValue(e, ele);
        switch (view) {
            case 0:
                if (currentView === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                    detach(this.tableBodyElement);
                    this.currentDate = d;
                    this.effect = ZOOMIN;
                    this.renderMonths(e);
                } else {
                    this.currentDate.setMonth(d.getMonth());
                    if (d.getMonth() > 0 && this.currentDate.getMonth() !== d.getMonth()) {
                        this.currentDate.setDate(0);
                    }
                    this.currentDate.setFullYear(d.getFullYear());
                    this.effect = ZOOMIN;
                    detach(this.tableBodyElement);
                    this.renderMonths(e);
                }
                break;
            case 1:
                if (currentView === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                    this.selectDate(e, d, null);
                } else {
                    this.currentDate.setFullYear(d.getFullYear());
                    this.effect = ZOOMIN;
                    detach(this.tableBodyElement);
                    this.renderYears(e);
                }
        }
    }
    private switchView(view: number, e?: Event): void {
        switch (view) {
            case 0:
                detach(this.tableBodyElement);
                this.renderMonths(e);
                break;
            case 1:
                detach(this.tableBodyElement);
                this.renderYears(e);
                break;
            case 2:
                detach(this.tableBodyElement);
                this.renderDecades(e);
        }
    }
    /**
     * To get component name  
     * @private
     */
    protected getModuleName(): string {
        return 'calendar';
    }
    /**
     * Gets the properties to be maintained upon browser refresh.
     * @returns string
     */
    public getPersistData(): string {
        let keyEntity: string[] = ['value'];
        return this.addOnPersist(keyEntity);
    }
    /**
     * Called internally if any of the property value changed.
     * returns void
     * @private
     */
    public onPropertyChanged(newProp: CalendarModel, oldProp: CalendarModel): void {
        this.effect = '';
        for (let prop of Object.keys(newProp)) {
            switch (prop) {
                case 'value':
                    this.setProperties({ value: new Date('' + newProp.value) }, true);
                    if (isNaN(+this.value)) {
                        this.setProperties({ value: oldProp.value }, true);
                    }
                    this.validateDate();
                    this.minMaxUpdate();
                    this.setvalue();
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        if (this.getModuleName() === 'calendar') {
                            this.element.classList.add('e-rtl');
                        } else {
                            this.calendarElement.classList.add('e-rtl');
                        }
                    } else {
                        if (this.getModuleName() === 'calendar') {
                            this.element.classList.remove('e-rtl');
                        } else {
                            this.calendarElement.classList.remove('e-rtl');
                        }
                    }
                    break;
                case 'start':
                case 'weekNumber':
                case 'firstDayOfWeek':
                    this.contentHdr();
                    this.contentBody();
                    break;
                case 'min':
                case 'max':
                    prop === 'min' ? this.setProperties({ min: this.checkDateValue(new Date('' + newProp.min)) }, true) :
                        this.setProperties({ max: this.checkDateValue(new Date('' + newProp.max)) }, true);
                    this.setProperties({ start: this.currentView() }, true);
                    detach(this.tableBodyElement);
                    this.minMaxUpdate();
                    this.contentBody();
                    if ((this.todayDate < this.min || this.max < this.todayDate) && (this.footer) && (this.todayElement)) {
                        this.todayElement.remove();
                        this.footer.remove();
                        this.todayElement = this.footer = undefined;
                        this.contentFooter();
                    } else {
                        if (this.todayElement.classList.contains('e-disabled') && (this.footer) && (this.todayElement)) {
                            removeClass([this.todayElement], DISABLED);
                        }
                    }
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.contentHdr();
                    this.contentBody();
                    this.l10.setLocale(this.locale);
                    this.updateFooter();
                    break;
                case 'showTodayButton':
                    if (newProp.showTodayButton) {
                        this.contentFooter();
                    } else {
                        this.todayElement.remove();
                        this.footer.remove();
                        this.todayElement = this.footer = undefined;
                    }
                    this.setProperties({ showTodayButton: newProp.showTodayButton }, true);
                    break;
            }
        }
    }
    private setvalue(): void {
        this.tableBodyElement.remove();
        this.setProperties({ start: this.currentView() }, true);
        this.contentBody();
    }
    private titleUpdate(date: Date, view: string): void {
        let globalize: Internationalization = new Internationalization(this.locale);
        switch (view) {
            case 'days':
                this.headerTitleElement.textContent = globalize.formatDate(date, { type: 'dateTime', skeleton: 'yMMMM' });
                break;
            case 'months':
                this.headerTitleElement.textContent = globalize.formatDate(date, { type: 'dateTime', skeleton: 'y' });
        }
    }
    protected setActiveDescendant(): string {
        let id: string;
        let focusedEle: Element = this.tableBodyElement.querySelector('tr td.e-focused-date');
        let selectedEle: Element = this.tableBodyElement.querySelector('tr td.e-selected');
        let title: string = this.globalize.formatDate(this.currentDate, { type: 'date', skeleton: 'full' });
        if (selectedEle || focusedEle) {
            (focusedEle || selectedEle).setAttribute('aria-selected', 'true');
            (focusedEle || selectedEle).setAttribute('aria-label', 'The current focused date is ' + '' + title);
            id = (focusedEle || selectedEle).getAttribute('id');

        }
        return id;
    }
    private iconHandler(): void {
        new Date('' + this.currentDate).setDate(1);
        switch (this.currentView()) {
            case 'Month':
                this.previousIconHandler(this.compareMonth(new Date('' + this.currentDate), this.min) < 1);
                this.nextIconHandler(this.compareMonth(new Date('' + this.currentDate), this.max) > -1);
                break;
            case 'Year':
                this.previousIconHandler(this.compareYear(new Date('' + this.currentDate), this.min) < 1);
                this.nextIconHandler(this.compareYear(new Date('' + this.currentDate), this.max) > -1);
                break;
            case 'Decade':
                this.previousIconHandler(this.compareDecade(new Date('' + this.currentDate), this.min) < 1);
                this.nextIconHandler(this.compareDecade(new Date('' + this.currentDate), this.max) > -1);
        }
    }
    /**
     * Destroys the widget.
     * @returns void
     */
    public destroy(): void {
        if (this.getModuleName() === 'calendar') {
            removeClass([this.element], [ROOT]);
        } else {
            if (this.calendarElement) {
                removeClass([this.element], [ROOT]);
            }
        }
        if (this.getModuleName() === 'calendar') {
            EventHandler.remove(this.headerTitleElement, 'click', this.navTitle);
            if (this.todayElement) {
                EventHandler.remove(this.todayElement, 'click', this.todayButtonClick);
            }
            this.previousIconHandler(true);
            this.nextIconHandler(true);
            this.keyboardModule.destroy();
        }
        this.element.innerHTML = '';
        super.destroy();

    }
    private title(e?: Event): void {
        let currentView: number = this.getViewNumber(this.currentView());
        this.effect = ZOOMIN;
        this.switchView(++currentView, e);
    }
    private getViewNumber(stringVal: string): number {
        if (stringVal === 'Month') {
            return 0;
        } else if (stringVal === 'Year') {
            return 1;
        } else {
            return 2;
        }
    }
    private navTitle(e?: Event): void {
        e.preventDefault();
        this.title(e);
        if (this.getModuleName() === 'calendar') {
            this.table.focus();
        }
    }
    private previous(): void {
        this.effect = '';
        let currentView: number = this.getViewNumber(this.currentView());
        switch (this.currentView()) {
            case 'Month':
                this.addMonths(this.currentDate, -1);
                this.switchView(currentView);
                break;
            case 'Year':
                this.addYears(this.currentDate, -1);
                this.switchView(currentView);
                break;
            case 'Decade':
                this.addYears(this.currentDate, -10);
                this.switchView(currentView);
                break;
        }
    }
    protected navigatePrevious(e: MouseEvent | KeyboardEvent): void {
        e.preventDefault();
        this.previous();
        this.triggerNavigate(e);
        if (this.getModuleName() === 'calendar') {
            this.table.focus();
        }
    }
    private next(): void {
        this.effect = '';
        let currentView: number = this.getViewNumber(this.currentView());
        switch (this.currentView()) {
            case 'Month':
                this.addMonths(this.currentDate, 1);
                this.switchView(currentView);
                break;
            case 'Year':
                this.addYears(this.currentDate, 1);
                this.switchView(currentView);
                break;
            case 'Decade':
                this.addYears(this.currentDate, 10);
                this.switchView(currentView);
                break;
        }
    }
    protected navigateNext(eve: MouseEvent | KeyboardEvent): void {
        eve.preventDefault();
        this.next();
        this.triggerNavigate(eve);
        if (this.getModuleName() === 'calendar') {
            this.table.focus();
        }
    }
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     * @param  {string} view - Specifies the view of the Calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns void
     */
    public navigateTo(view: CalendarView, date: Date): void {
        this.minMaxUpdate();
        if (+date >= +this.min && +date <= +this.max) {
            this.currentDate = date;
        }
        if (+date <= +this.min) {
            this.currentDate = new Date('' + this.min);
        }
        if (+date >= +this.max) {
            this.currentDate = new Date('' + this.max);
        }
        this.switchView(this.getViewNumber(view));
    }
    /** 
     * Gets the current view of the Calendar.
     * @returns string 
     */
    public currentView(): string {
        if (this.contentElement.classList.contains(YEAR)) {
            return 'Year';
        } else if (this.contentElement.classList.contains(DECADE)) {
            return 'Decade';
        } else {
            return 'Month';
        }
    }
    private getDateVal(date: Date): boolean {
        return (!isNullOrUndefined(this.value) && date.getDate() === (this.value).getDate()
            && date.getMonth() === (this.value).getMonth() && date.getFullYear() === (this.value).getFullYear());
    }
    private getCultureObjects(ld: Object, c: string): Object {
        return getValue('main.' + '' + this.locale + '.dates.calendars.gregorian.days.format.short', ld);
    };
    private getWeek(d: Date): number {
        let currentDate: number = new Date('' + d).valueOf();
        let date: number = new Date(d.getFullYear(), 0, 1).valueOf();
        let a: number = (currentDate - date);
        return Math.ceil((((a) / dayMilliSeconds) + new Date(date).getDay() + 1) / 7);
    }
    private setTime(date: Date, time: number): void {
        let d: Date = new Date(date.getTime() + time);
        if (!isNullOrUndefined(this.value) &&
            (this.value.getHours() !== 0 || this.value.getSeconds() !== 0 || this.value.getMinutes() !== 0)) {
            date.setTime(d.getTime());
        } else {
            date = new Date(date.setTime(d.getTime()));
        }
    }
    protected addMonths(date: Date, i: number): void {
        let day: number = date.getDate();
        date.setDate(1);
        date.setMonth(date.getMonth() + i);
        date.setDate(Math.min(day, this.getMaxDays(date)));
    }
    protected addYears(date: Date, i: number): void {
        let day: number = date.getDate();
        date.setDate(1);
        date.setFullYear(date.getFullYear() + i);
        date.setDate(Math.min(day, this.getMaxDays(date)));
    }
    protected getIdValue(e: MouseEvent, element: Element): Date {
        let eve: Element;
        if (e) {
            eve = <Element>e.currentTarget;
        } else {
            eve = element;
        }
        let dateFormatOptions: object = { type: 'dateTime', skeleton: 'full' };
        let dateString: string = this.globalize.formatDate(new Date(parseInt('' + eve.getAttribute('id'), 0)), dateFormatOptions);
        let date: Date = this.globalize.parseDate(dateString, dateFormatOptions);
        let value: number = date.valueOf() - date.valueOf() % 1000;
        return new Date(value);
        //return this.globalize.parseDate(dateString, dateFormatOptions);
    }
    private selectDate(e: MouseEvent | KeyboardEventArgs, date: Date, element: Element): void {
        let ele: Element = element || <Element>e.currentTarget;
        if (this.currentView() === 'Decade') {
            this.setDateDecade(this.currentDate, date.getFullYear());
        } else if (this.currentView() === 'Year') {
            this.setDateYear(this.currentDate, date);
        } else {
            this.setProperties({ value: new Date('' + date) }, true);
            this.currentDate = new Date('' + date);
        }
        let tableBodyElement: Element = closest(ele, '.' + ROOT);
        if (isNullOrUndefined(tableBodyElement)) {
            tableBodyElement = this.tableBodyElement;
        }
        if (!isNullOrUndefined(tableBodyElement.querySelector('.' + SELECTED))) {
            removeClass([tableBodyElement.querySelector('.' + SELECTED)], SELECTED);
        }
        if (!isNullOrUndefined(tableBodyElement.querySelector('.' + FOCUSEDDATE))) {
            removeClass([tableBodyElement.querySelector('.' + FOCUSEDDATE)], FOCUSEDDATE);
        }
        addClass([ele], SELECTED);
        this.changedArgs = { value: this.value };
        this.changeHandler(e);
    }
    private setAriaActivedescendant(): void {
        attributes(this.table, {
            'aria-activedescendant': '' + this.setActiveDescendant()
        });
    }
    protected previousIconHandler(disabled: boolean): void {
        if (disabled) {
            EventHandler.remove(this.previousIcon, 'click', this.navigatePreviousHandler);
            addClass([this.previousIcon], '' + DISABLED);
            addClass([this.previousIcon], '' + OVERLAY);
            this.previousIcon.setAttribute('aria-disabled', 'true');
        } else {
            EventHandler.add(this.previousIcon, 'click', this.navigatePreviousHandler);
            removeClass([this.previousIcon], '' + DISABLED);
            removeClass([this.previousIcon], '' + OVERLAY);
            this.previousIcon.setAttribute('aria-disabled', 'false');
        }
    }
    protected renderDayCellEvent(args: RenderDayCellEventArgs): void {
        extend(this.renderDaycellArg, { name: 'renderDayCell' });
        this.trigger('renderDayCell', args);
    }
    protected navigatedEvent(eve: MouseEvent | KeyboardEvent): void {
        extend(this.navigatedArgs, { name: 'navigated', event: eve });
        this.trigger('navigated', this.navigatedArgs);
    }
    private triggerNavigate(event: MouseEvent | KeyboardEvent): void {
        this.navigatedArgs = { view: this.currentView(), date: this.currentDate };
        this.navigatedEvent(event);
    }
    protected changeEvent(e: Event): void {
        this.trigger('change', this.changedArgs);
    }
    private triggerChange(e: MouseEvent | KeyboardEvent): void {
        this.changedArgs.event = e;
        if (!isNullOrUndefined(this.value)) {
            this.setProperties({ value: this.value }, true);
        }
        if (+this.value !== Number.NaN && +this.value !== +this.previousDate) {
            this.changeEvent(e);
        }
        this.previousDate = this.value;
    }
    protected nextIconHandler(disabled: boolean): void {
        if (disabled) {
            EventHandler.remove(this.nextIcon, 'click', this.navigateNextHandler);
            addClass([this.nextIcon], DISABLED);
            addClass([this.nextIcon], OVERLAY);
            this.nextIcon.setAttribute('aria-disabled', 'true');
        } else {
            EventHandler.add(this.nextIcon, 'click', this.navigateNextHandler);
            removeClass([this.nextIcon], DISABLED);
            removeClass([this.nextIcon], OVERLAY);
            this.nextIcon.setAttribute('aria-disabled', 'false');
        }
    }
    private compare(startDate: Date, endDate: Date, modifier: number): number {
        let start: number = endDate.getFullYear();
        let end: number;
        let result: number;
        end = start;
        result = 0;
        if (modifier) {
            start = start - start % modifier;
            end = start - start % modifier + modifier - 1;
        }
        if (startDate.getFullYear() > end) {
            result = 1;
        } else if (startDate.getFullYear() < start) {
            result = -1;
        }
        return result;
    }
    protected isMinMaxRange(date: Date): boolean {
        return +date >= +this.min && +date <= +this.max;

    }
    private compareYear(start: Date, end: Date): number {
        return this.compare(start, end, 0);
    }
    private compareDecade(start: Date, end: Date): number {
        return this.compare(start, end, 10);
    }
    private shiftArray(array: string[], i: number): string[] {
        return array.slice(i).concat(array.slice(0, i));
    }
    protected addDay(date: Date, i: number, e: KeyboardEvent, max: Date, min: Date): void {
        let column: number = i;
        let value: Date = new Date(+date);
        if (!isNullOrUndefined(this.tableBodyElement) && !isNullOrUndefined(e)) {
            while (this.findNextTD(new Date(+date), column, max, min)) {
                column += i;
            }
            let rangeValue: Date = new Date(value.setDate(value.getDate() + column));
            column = (+rangeValue > +max || +rangeValue < +min) ? column === i ? i - i : i : column;
        }
        date.setDate(date.getDate() + column);
    }
    private findNextTD(date: Date, column: number, max: Date, min: Date): boolean {
        let value: Date = new Date(date.setDate(date.getDate() + column));
        let collection: Element[] = [];
        let isDisabled: boolean = false;
        if ((!isNullOrUndefined(value) && value.getMonth()) !== (!isNullOrUndefined(this.currentDate) && this.currentDate.getMonth())) {
            let tdEles: Element[] = this.renderDays(value, null);
            collection = tdEles.filter((ele: Element) => {
                return ele.classList.contains(DISABLED);
            });
        } else {
            collection = <NodeListOf<HTMLTableDataCellElement> & Element[]>this.tableBodyElement.querySelectorAll('td.' + DISABLED);
        }
        if (+value <= (+(max)) && +value >= (+(min))) {
            if (collection.length) {
                for (let i: number = 0; i < collection.length; i++) {
                    isDisabled = (+value === +new Date(parseInt(collection[i].id, 0))) ? true : false;
                    if (isDisabled) { break; }
                }
            }
        }
        return isDisabled;
    }
    private getMaxDays(d: Date): number {
        let date: number;
        let month: number;
        let tmpDate: Date = new Date('' + d);
        date = 28;
        month = tmpDate.getMonth();
        while (tmpDate.getMonth() === month) {
            ++date;
            tmpDate.setDate(date);
        }
        return date - 1;
    }
    private setDateDecade(date: Date, year: number): void {
        date.setFullYear(year);
        this.setProperties({ value: new Date('' + date) }, true);
    };
    private setDateYear(date: Date, value: Date): void {
        date.setFullYear(value.getFullYear(), value.getMonth(), date.getDate());
        if (value.getMonth() !== date.getMonth()) {
            date.setDate(0);
        }
        this.setProperties({ value: new Date('' + date) }, true);
        this.currentDate = new Date('' + this.value);
    }
    private compareMonth(start: Date, end: Date): number {
        let result: number;
        if (start.getFullYear() > end.getFullYear()) {
            result = 1;
        } else if (start.getFullYear() < end.getFullYear()) {
            result = -1;
        } else {
            result = start.getMonth() === end.getMonth() ? 0 : start.getMonth() > end.getMonth() ? 1 : -1;
        }
        return result;
    }
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


