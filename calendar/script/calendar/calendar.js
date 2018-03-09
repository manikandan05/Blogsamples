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
define(["require", "exports", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base", "@syncfusion/ej2-base"], function (require, exports, ej2_base_1, ej2_base_2, ej2_base_3, ej2_base_4, ej2_base_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ROOT = 'e-calendar';
    var DEVICE = 'e-device';
    var HEADER = 'e-header';
    var RTL = 'e-rtl';
    var CONTENT = 'e-content';
    var YEAR = 'e-year';
    var MONTH = 'e-month';
    var DECADE = 'e-decade';
    var ICON = 'e-icons';
    var PREVICON = 'e-prev';
    var NEXTICON = 'e-next';
    var RIPPLESTYLE = 'e-ripple-style';
    var PREVSPAN = 'e-date-icon-prev';
    var NEXTSPAN = 'e-date-icon-next ';
    var ICONCONTAINER = 'e-icon-container';
    var DISABLED = 'e-disabled';
    var OVERLAY = 'e-overlay';
    var WEEKEND = 'e-weekend';
    var WEEKNUMBER = 'e-week-number';
    var OTHERMONTH = 'e-other-month';
    var SELECTED = 'e-selected';
    var FOCUSEDDATE = 'e-focused-date';
    var OTHERMONTHROW = 'e-month-hide';
    var TODAY = 'e-today';
    var TITLE = 'e-title';
    var LINK = 'e-day';
    var CELL = 'e-cell';
    var WEEKHEADER = 'e-week-header';
    var ZOOMIN = 'e-zoomin';
    var FOOTER = 'e-footer-container';
    var BTN = 'e-btn';
    var FLAT = 'e-flat';
    var dayMilliSeconds = 86400000;
    var Calendar = (function (_super) {
        __extends(Calendar, _super);
        function Calendar(options, element) {
            var _this = _super.call(this, options, element) || this;
            _this.effect = '';
            _this.keyConfigs = {
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
            return _this;
        }
        Calendar.prototype.render = function () {
            this.globalize = new ej2_base_1.Internationalization(this.locale);
            this.todayDisabled = false;
            this.todayDate = new Date(new Date().setHours(0, 0, 0, 0));
            if (this.getModuleName() === 'calendar') {
                this.element.classList.add(ROOT);
                if (this.enableRtl) {
                    this.element.classList.add(RTL);
                }
                if (ej2_base_5.Browser.isDevice) {
                    this.element.classList.add(DEVICE);
                }
                ej2_base_4.attributes(this.element, {
                    'data-role': 'calendar'
                });
            }
            else {
                this.calendarElement = ej2_base_4.createElement('div');
                this.calendarElement.classList.add(ROOT);
                if (this.enableRtl) {
                    this.calendarElement.classList.add(RTL);
                }
                if (ej2_base_5.Browser.isDevice) {
                    this.calendarElement.classList.add(DEVICE);
                }
                ej2_base_4.attributes(this.calendarElement, {
                    'role': 'calendar'
                });
            }
            this.processDate();
            this.header();
            this.content();
            this.wireEvents();
        };
        Calendar.prototype.processDate = function () {
            this.validateDate();
            this.minMaxUpdate();
        };
        Calendar.prototype.validateDate = function () {
            this.setProperties({ value: this.checkDateValue(new Date('' + this.value)) }, true);
            this.setProperties({ min: this.checkDateValue(new Date('' + this.min)) }, true);
            this.setProperties({ max: this.checkDateValue(new Date('' + this.max)) }, true);
            this.currentDate = this.currentDate ? this.currentDate : new Date(new Date().setHours(0, 0, 0, 0));
            if (!ej2_base_5.isNullOrUndefined(this.value) && this.min <= this.max && this.value >= this.min && this.value <= this.max) {
                this.currentDate = new Date('' + this.value);
            }
            if (isNaN(+this.value)) {
                this.setProperties({ value: null }, true);
            }
        };
        Calendar.prototype.minMaxUpdate = function () {
            if (!(this.min <= this.max)) {
                this.setProperties({ min: this.min }, true);
                ej2_base_4.addClass([this.element], OVERLAY);
            }
            else {
                ej2_base_4.removeClass([this.element], OVERLAY);
            }
            this.min = ej2_base_5.isNullOrUndefined(this.min) || !(+this.min) ? this.min = new Date(1900, 0, 1) : this.min;
            this.max = ej2_base_5.isNullOrUndefined(this.max) || !(+this.max) ? this.max = new Date(2099, 11, 31) : this.max;
            if (!ej2_base_5.isNullOrUndefined(this.value) && this.value <= this.min && this.min <= this.max) {
                this.setProperties({ value: this.min }, true);
                this.changedArgs = { value: this.value };
            }
            else {
                if (!ej2_base_5.isNullOrUndefined(this.value) && this.value >= this.max && this.min <= this.max) {
                    this.setProperties({ value: this.max }, true);
                    this.changedArgs = { value: this.value };
                }
            }
            if (this.min <= this.max && this.value && this.value <= this.max && this.value >= this.min) {
                this.currentDate = new Date('' + this.value);
            }
            else {
                if (this.min <= this.max && !this.value && this.currentDate > this.max) {
                    this.currentDate = new Date('' + this.max);
                }
                else {
                    if (this.currentDate < this.min) {
                        this.currentDate = new Date('' + this.min);
                    }
                }
            }
        };
        Calendar.prototype.header = function () {
            var ariaPrevAttrs = {
                'aria-disabled': 'false',
                'aria-label': 'previous month'
            };
            var ariaNextAttrs = {
                'aria-disabled': 'false',
                'aria-label': 'next month'
            };
            var ariaTitleAttrs = {
                'aria-atomic': 'true', 'aria-live': 'assertive', 'aria-label': 'title'
            };
            this.headerElement = ej2_base_4.createElement('div', { className: HEADER });
            var iconContainer = ej2_base_4.createElement('div', { className: ICONCONTAINER });
            this.previousIcon = ej2_base_4.createElement('button', { className: '' + PREVICON, attrs: { type: 'button' } });
            ej2_base_3.rippleEffect(this.previousIcon, {
                duration: 400,
                selector: '.e-prev',
                isCenterRipple: true
            });
            ej2_base_4.attributes(this.previousIcon, ariaPrevAttrs);
            this.nextIcon = ej2_base_4.createElement('button', { className: '' + NEXTICON, attrs: { type: 'button' } });
            ej2_base_3.rippleEffect(this.nextIcon, {
                selector: '.e-next',
                duration: 400,
                isCenterRipple: true
            });
            ej2_base_4.attributes(this.nextIcon, ariaNextAttrs);
            this.headerTitleElement = ej2_base_4.createElement('div', { className: '' + LINK + ' ' + TITLE });
            ej2_base_4.attributes(this.headerTitleElement, ariaTitleAttrs);
            this.headerElement.appendChild(this.headerTitleElement);
            this.previousIcon.appendChild(ej2_base_4.createElement('span', { className: '' + PREVSPAN + ' ' + ICON }));
            this.nextIcon.appendChild(ej2_base_4.createElement('span', { className: '' + NEXTSPAN + ' ' + ICON }));
            iconContainer.appendChild(this.previousIcon);
            iconContainer.appendChild(this.nextIcon);
            this.headerElement.appendChild(iconContainer);
            if (this.getModuleName() === 'calendar') {
                this.element.appendChild(this.headerElement);
            }
            else {
                this.calendarElement.appendChild(this.headerElement);
            }
        };
        Calendar.prototype.content = function () {
            this.previousDate = this.value;
            this.contentElement = ej2_base_4.createElement('div', { className: CONTENT });
            this.table = ej2_base_4.createElement('table', { attrs: { tabIndex: '0', 'role': 'grid', 'aria-activedescendant': '' } });
            if (this.getModuleName() === 'calendar') {
                this.element.appendChild(this.contentElement);
            }
            else {
                this.calendarElement.appendChild(this.contentElement);
            }
            this.contentElement.appendChild(this.table);
            this.contentHdr();
            this.contentBody();
            if (this.showTodayButton) {
                this.contentFooter();
            }
        };
        Calendar.prototype.getCultureValues = function () {
            var culShortNames = [];
            var cldrObj;
            if (this.locale === 'en' || this.locale === 'en-US') {
                cldrObj = (ej2_base_5.getValue('days.stand-alone.short', ej2_base_3.getDefaultDateObject()));
            }
            else {
                cldrObj = (this.getCultureObjects(ej2_base_3.cldrData, '' + this.locale));
            }
            for (var _i = 0, _a = Object.keys(cldrObj); _i < _a.length; _i++) {
                var obj = _a[_i];
                culShortNames.push(ej2_base_5.getValue(obj, cldrObj));
            }
            return culShortNames;
        };
        Calendar.prototype.contentHdr = function () {
            if (this.getModuleName() === 'calendar') {
                if (!ej2_base_5.isNullOrUndefined(this.element.querySelectorAll('.e-content .e-week-header')[0])) {
                    ej2_base_4.detach(this.element.querySelectorAll('.e-content .e-week-header')[0]);
                }
            }
            else {
                if (!ej2_base_5.isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content .e-week-header')[0])) {
                    ej2_base_4.detach(this.calendarElement.querySelectorAll('.e-content .e-week-header')[0]);
                }
            }
            var daysCount = 6;
            var html = '';
            var shortNames;
            if (this.firstDayOfWeek > 6 || this.firstDayOfWeek < 0) {
                this.setProperties({ firstDayOfWeek: 0 }, true);
            }
            this.tableHeadElement = ej2_base_4.createElement('thead', { className: WEEKHEADER });
            if (this.weekNumber) {
                html += '<th class="e-week-number"></th>';
                ej2_base_4.addClass([this.element], '' + WEEKNUMBER);
            }
            shortNames = this.shiftArray(((this.getCultureValues().length > 0 && this.getCultureValues())), this.firstDayOfWeek);
            for (var days = 0; days <= daysCount; days++) {
                html += '<th  class="">' + shortNames[days] + '</th>';
            }
            html = '<tr>' + html + '</tr>';
            this.tableHeadElement.innerHTML = html;
            this.table.appendChild(this.tableHeadElement);
        };
        Calendar.prototype.contentBody = function () {
            if (this.getModuleName() === 'calendar') {
                if (!ej2_base_5.isNullOrUndefined(this.element.querySelectorAll('.e-content tbody')[0])) {
                    ej2_base_4.detach(this.element.querySelectorAll('.e-content tbody')[0]);
                }
            }
            else {
                if (!ej2_base_5.isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content tbody')[0])) {
                    ej2_base_4.detach(this.calendarElement.querySelectorAll('.e-content tbody')[0]);
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
        };
        Calendar.prototype.updateFooter = function () {
            this.todayElement.textContent = this.l10.getConstant('today');
        };
        Calendar.prototype.contentFooter = function () {
            if (this.showTodayButton) {
                var minimum = new Date(this.min.toDateString());
                var maximum = new Date(this.max.toDateString());
                var l10nLocale = { today: 'Today' };
                this.globalize = new ej2_base_1.Internationalization(this.locale);
                this.l10 = new ej2_base_2.L10n(this.getModuleName(), l10nLocale, this.locale);
                this.todayElement = ej2_base_4.createElement('button');
                ej2_base_3.rippleEffect(this.todayElement);
                this.updateFooter();
                ej2_base_4.addClass([this.todayElement], [BTN, TODAY, FLAT]);
                if ((!(new Date(minimum.setHours(0, 0, 0, 0)) <= this.todayDate &&
                    this.todayDate <= new Date(maximum.setHours(0, 0, 0, 0)))) || (this.todayDisabled)) {
                    ej2_base_4.addClass([this.todayElement], DISABLED);
                }
                this.footer = ej2_base_4.createElement('div', { className: FOOTER });
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
                    ej2_base_1.EventHandler.add(this.todayElement, 'click', this.todayButtonClick, this);
                }
            }
        };
        Calendar.prototype.wireEvents = function () {
            ej2_base_1.EventHandler.add(this.headerTitleElement, 'click', this.navTitle, this);
            if (this.getModuleName() === 'calendar') {
                this.keyboardModule = new ej2_base_2.KeyboardEvents(this.element, {
                    eventName: 'keydown',
                    keyAction: this.keyActionHandle.bind(this),
                    keyConfigs: this.keyConfigs
                });
            }
            else {
                this.keyboardModule = new ej2_base_2.KeyboardEvents(this.calendarElement, {
                    eventName: 'keydown',
                    keyAction: this.keyActionHandle.bind(this),
                    keyConfigs: this.keyConfigs
                });
            }
        };
        Calendar.prototype.todayButtonClick = function () {
            if (this.showTodayButton) {
                var tempValue = new Date();
                if (this.value) {
                    tempValue.setHours(this.value.getHours());
                    tempValue.setMinutes(this.value.getMinutes());
                    tempValue.setSeconds(this.value.getSeconds());
                }
                else {
                    tempValue = new Date(tempValue.getFullYear(), tempValue.getMonth(), tempValue.getDate(), 0, 0, 0);
                }
                this.setProperties({ value: tempValue }, true);
                if (this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                    this.navigateTo(this.depth, new Date('' + this.value));
                }
                else {
                    this.navigateTo('Month', new Date('' + this.value));
                }
                this.effect = '';
            }
        };
        Calendar.prototype.keyActionHandle = function (e) {
            var view = this.getViewNumber(this.currentView());
            var focusedDate = this.tableBodyElement.querySelector('tr td.e-focused-date');
            var selectedDate = this.tableBodyElement.querySelector('tr td.e-selected');
            var depthValue = this.getViewNumber(this.depth);
            var levelRestrict = (view === depthValue && this.getViewNumber(this.start) >= depthValue);
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
                        this.KeyboardNavigate(-7, view, e, this.max, this.min);
                    }
                    else {
                        this.KeyboardNavigate(-4, view, e, this.max, this.min);
                    }
                    e.preventDefault();
                    break;
                case 'moveDown':
                    if (view === 0) {
                        this.KeyboardNavigate(7, view, e, this.max, this.min);
                    }
                    else {
                        this.KeyboardNavigate(4, view, e, this.max, this.min);
                    }
                    e.preventDefault();
                    break;
                case 'select':
                    if (e.target === this.todayElement) {
                        this.todayButtonClick();
                    }
                    else {
                        var element = !ej2_base_5.isNullOrUndefined(focusedDate) ? focusedDate : selectedDate;
                        if (!ej2_base_5.isNullOrUndefined(element) && !element.classList.contains(DISABLED)) {
                            if (levelRestrict) {
                                var d = new Date(parseInt('' + (element).id, 0));
                                this.selectDate(e, d, (element));
                            }
                            else {
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
                    if (!ej2_base_5.isNullOrUndefined(focusedDate) || !ej2_base_5.isNullOrUndefined(selectedDate) && !levelRestrict) {
                        this.contentClick(null, --view, (focusedDate || selectedDate));
                    }
                    e.preventDefault();
                    break;
                case 'home':
                    this.currentDate = this.firstDay(this.currentDate);
                    ej2_base_4.detach(this.tableBodyElement);
                    this.renderMonths(e);
                    e.preventDefault();
                    break;
                case 'end':
                    this.currentDate = this.lastDay(this.currentDate);
                    ej2_base_4.detach(this.tableBodyElement);
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
            if (this.getModuleName() === 'calendar') {
                this.table.focus();
            }
        };
        Calendar.prototype.KeyboardNavigate = function (number, currentView, e, max, min) {
            var date = new Date('' + this.currentDate);
            switch (currentView) {
                case 2:
                    this.addYears(this.currentDate, number);
                    if (this.isMinMaxRange(this.currentDate)) {
                        ej2_base_4.detach(this.tableBodyElement);
                        this.renderDecades(e);
                    }
                    else {
                        this.currentDate = date;
                    }
                    break;
                case 1:
                    this.addMonths(this.currentDate, number);
                    if (this.isMinMaxRange(this.currentDate)) {
                        ej2_base_4.detach(this.tableBodyElement);
                        this.renderYears(e);
                    }
                    else {
                        this.currentDate = date;
                    }
                    break;
                case 0:
                    this.addDay(this.currentDate, number, e, max, min);
                    if (this.isMinMaxRange(this.currentDate)) {
                        ej2_base_4.detach(this.tableBodyElement);
                        this.renderMonths(e);
                    }
                    else {
                        this.currentDate = date;
                    }
                    break;
            }
        };
        Calendar.prototype.preRender = function () {
            var _this = this;
            this.navigatePreviousHandler = this.navigatePrevious.bind(this);
            this.navigateNextHandler = this.navigateNext.bind(this);
            this.changeHandler = function (e) {
                _this.triggerChange(e);
            };
            this.navigateHandler = function (e) {
                _this.triggerNavigate(e);
            };
        };
        ;
        Calendar.prototype.minMaxDate = function (localDate) {
            var currentDate = new Date(new Date(+localDate).setHours(0, 0, 0, 0));
            var minDate = new Date(new Date(+this.min).setHours(0, 0, 0, 0));
            var maxDate = new Date(new Date(+this.max).setHours(0, 0, 0, 0));
            if (+currentDate === +minDate || +currentDate === +maxDate) {
                if (+localDate < +this.min) {
                    localDate = new Date(+this.min);
                }
                if (+localDate > +this.max) {
                    localDate = new Date(+this.max);
                }
            }
            return localDate;
        };
        Calendar.prototype.renderMonths = function (e) {
            var numCells = this.weekNumber ? 8 : 7;
            var tdEles = this.renderDays(this.currentDate, e);
            this.contentHdr();
            this.renderTemplate(tdEles, numCells, MONTH, e);
        };
        Calendar.prototype.renderDays = function (currentDate, e) {
            var tdEles = [];
            var cellsCount = 42;
            var localDate = new Date('' + currentDate);
            var minMaxDate;
            var numCells = this.weekNumber ? 8 : 7;
            var currentMonth = localDate.getMonth();
            this.titleUpdate(currentDate, 'days');
            var d = localDate;
            localDate = new Date(d.getFullYear(), d.getMonth(), 0, d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
            while (localDate.getDay() !== this.firstDayOfWeek) {
                this.setTime(localDate, -1 * dayMilliSeconds);
            }
            for (var day = 0; day < cellsCount; ++day) {
                var weekEle = ej2_base_4.createElement('td', { className: CELL });
                var weekAnchor = ej2_base_4.createElement('span');
                if (day % 7 === 0 && this.weekNumber) {
                    weekAnchor.textContent = '' + this.getWeek(localDate);
                    weekEle.appendChild(weekAnchor);
                    ej2_base_4.addClass([weekEle], '' + WEEKNUMBER);
                    tdEles.push(weekEle);
                }
                minMaxDate = new Date(+localDate);
                localDate = this.minMaxDate(localDate);
                var dateFormatOptions = { type: 'dateTime', skeleton: 'full' };
                var date = this.globalize.parseDate(this.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
                var tdEle = this.dayCell(localDate);
                var title = this.globalize.formatDate(localDate, { type: 'date', skeleton: 'full' });
                var dayLink = ej2_base_4.createElement('span');
                dayLink.textContent = this.globalize.formatDate(localDate, { type: 'date', skeleton: 'd' });
                var disabled = (this.min > localDate) || (this.max < localDate);
                if (disabled) {
                    ej2_base_4.addClass([tdEle], DISABLED);
                    ej2_base_4.addClass([tdEle], OVERLAY);
                }
                else {
                    dayLink.setAttribute('title', '' + title);
                }
                if (currentMonth !== localDate.getMonth()) {
                    ej2_base_4.addClass([tdEle], OTHERMONTH);
                }
                if (localDate.getDay() === 0 || localDate.getDay() === 6) {
                    ej2_base_4.addClass([tdEle], WEEKEND);
                }
                tdEle.appendChild(dayLink);
                this.renderDaycellArg = {
                    date: localDate,
                    isDisabled: false,
                    element: tdEle,
                    isOutOfRange: disabled
                };
                var args = this.renderDaycellArg;
                this.renderDayCellEvent(args);
                if (args.isDisabled) {
                    if (this.value && +this.value === +args.date) {
                        this.setProperties({ value: null }, true);
                    }
                }
                if (this.renderDaycellArg.isDisabled && !tdEle.classList.contains(SELECTED)) {
                    ej2_base_4.addClass([tdEle], DISABLED);
                    ej2_base_4.addClass([tdEle], OVERLAY);
                    if (+this.renderDaycellArg.date === +this.todayDate) {
                        this.todayDisabled = true;
                    }
                }
                var otherMnthBool = tdEle.classList.contains(OTHERMONTH);
                var disabledCls = tdEle.classList.contains(DISABLED);
                if (!disabledCls) {
                    ej2_base_1.EventHandler.add(tdEle, 'click', this.clickHandler, this);
                }
                if (args.isDisabled && +this.value === +args.date) {
                    this.setProperties({ value: null }, true);
                }
                if (!otherMnthBool && !disabledCls && this.getDateVal(localDate)) {
                    ej2_base_4.addClass([tdEle], SELECTED);
                }
                else {
                    if (currentDate.getDate() === localDate.getDate() && !otherMnthBool && !disabledCls) {
                        ej2_base_4.addClass([tdEle], FOCUSEDDATE);
                    }
                    else {
                        if (currentDate >= this.max && parseInt(tdEle.id, 0) === +this.max && !otherMnthBool && !disabledCls) {
                            ej2_base_4.addClass([tdEle], FOCUSEDDATE);
                        }
                        if (currentDate <= this.min && parseInt(tdEle.id, 0) === +this.min && !otherMnthBool && !disabledCls) {
                            ej2_base_4.addClass([tdEle], FOCUSEDDATE);
                        }
                    }
                }
                if (date.getMonth() === new Date().getMonth() && date.getDate() === new Date().getDate()) {
                    if (date.getFullYear() === new Date().getFullYear()) {
                        ej2_base_4.addClass([tdEle], TODAY);
                    }
                }
                tdEles.push(this.renderDaycellArg.element);
                localDate = new Date(+minMaxDate);
                this.addDay(localDate, 1, null, this.max, this.min);
            }
            return tdEles;
        };
        Calendar.prototype.renderYears = function (e) {
            this.removeTheadEle();
            var numCells = 4;
            var days;
            var tdEles = [];
            var valueUtil = ej2_base_5.isNullOrUndefined(this.value);
            var curDate = new Date('' + this.currentDate);
            var mon = curDate.getMonth();
            var yr = curDate.getFullYear();
            var localDate = curDate;
            var curYrs = localDate.getFullYear();
            var minYr = new Date('' + this.min).getFullYear();
            var minMonth = new Date('' + this.min).getMonth();
            var maxYr = new Date('' + this.max).getFullYear();
            var maxMonth = new Date('' + this.max).getMonth();
            localDate.setMonth(0);
            this.titleUpdate(this.currentDate, 'months');
            var disabled = (this.min > localDate) || (this.max < localDate);
            localDate.setDate(1);
            for (var month = 0; month < 12; ++month) {
                var tdEle = this.dayCell(localDate);
                var dayLink = ej2_base_4.createElement('span');
                var localMonth = (this.value && (this.value).getMonth() === localDate.getMonth());
                var select = (this.value && (this.value).getFullYear() === yr && localMonth);
                dayLink.textContent = this.globalize.formatDate(localDate, { type: 'dateTime', skeleton: 'MMM' });
                if ((this.min && (curYrs < minYr || (month < minMonth && curYrs === minYr))) || (this.max && (curYrs > maxYr || (month > maxMonth && curYrs >= maxYr)))) {
                    ej2_base_4.addClass([tdEle], DISABLED);
                }
                else if (!valueUtil && select) {
                    ej2_base_4.addClass([tdEle], SELECTED);
                }
                else {
                    if (localDate.getMonth() === mon && this.currentDate.getMonth() === mon) {
                        ej2_base_4.addClass([tdEle], FOCUSEDDATE);
                    }
                }
                localDate.setDate(1);
                localDate.setMonth(localDate.getMonth() + 1);
                if (!tdEle.classList.contains(DISABLED)) {
                    ej2_base_1.EventHandler.add(tdEle, 'click', this.clickHandler, this);
                }
                tdEle.appendChild(dayLink);
                tdEles.push(tdEle);
            }
            this.renderTemplate(tdEles, numCells, YEAR, e);
        };
        Calendar.prototype.renderDecades = function (e) {
            this.removeTheadEle();
            var numCells = 4;
            var yearCell = 12;
            var tdEles = [];
            var localDate = new Date('' + this.currentDate);
            localDate.setMonth(0);
            localDate.setDate(1);
            var localYr = localDate.getFullYear();
            var startYr = new Date('' + (localYr - localYr % 10));
            var endYr = new Date('' + (localYr - localYr % 10 + (10 - 1)));
            var startHdrYr = this.globalize.formatDate(startYr, { type: 'dateTime', skeleton: 'y' });
            var endHdrYr = this.globalize.formatDate(endYr, { type: 'dateTime', skeleton: 'y' });
            this.headerTitleElement.textContent = startHdrYr + ' - ' + (endHdrYr);
            var start = new Date(localYr - (localYr % 10) - 1, 0, 1);
            var startYear = start.getFullYear();
            for (var rowIterator = 0; rowIterator < yearCell; ++rowIterator) {
                var year = startYear + rowIterator;
                localDate.setFullYear(year);
                var tdEle = this.dayCell(localDate);
                ej2_base_4.attributes(tdEle, { 'role': 'gridcell' });
                var dayLink = ej2_base_4.createElement('span');
                dayLink.textContent = this.globalize.formatDate(localDate, { type: 'dateTime', skeleton: 'y' });
                if (year < new Date('' + this.min).getFullYear() || year > new Date('' + this.max).getFullYear()) {
                    ej2_base_4.addClass([tdEle], DISABLED);
                }
                else if (!ej2_base_5.isNullOrUndefined(this.value) && localDate.getFullYear() === (this.value).getFullYear()) {
                    ej2_base_4.addClass([tdEle], SELECTED);
                }
                else {
                    if (localDate.getFullYear() === this.currentDate.getFullYear() && !tdEle.classList.contains(DISABLED)) {
                        ej2_base_4.addClass([tdEle], FOCUSEDDATE);
                    }
                }
                if (!tdEle.classList.contains(DISABLED)) {
                    ej2_base_1.EventHandler.add(tdEle, 'click', this.clickHandler, this);
                }
                tdEle.appendChild(dayLink);
                tdEles.push(tdEle);
            }
            this.renderTemplate(tdEles, numCells, 'e-decade', e);
        };
        Calendar.prototype.dayCell = function (localDate) {
            var dateFormatOptions = { skeleton: 'full', type: 'dateTime' };
            var date = this.globalize.parseDate(this.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
            var value = date.valueOf();
            var attrs = {
                className: CELL, attrs: { 'id': '' + ej2_base_5.getUniqueID('' + value), 'aria-selected': 'false', 'role': 'gridcell' }
            };
            return ej2_base_4.createElement('td', attrs);
        };
        Calendar.prototype.firstDay = function (date) {
            var collection = this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERMONTH + '');
            if (collection.length) {
                for (var i = 0; i < collection.length; i++) {
                    if (!collection[i].classList.contains(DISABLED)) {
                        date = new Date(parseInt(collection[i].id, 0));
                        break;
                    }
                }
            }
            return date;
        };
        Calendar.prototype.lastDay = function (date) {
            var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            var timeOffset = Math.abs(lastDate.getTimezoneOffset() - this.firstDay(date).getTimezoneOffset());
            if (timeOffset) {
                lastDate.setHours(this.firstDay(date).getHours() + (timeOffset / 60));
            }
            return this.findlastDay(lastDate);
        };
        ;
        Calendar.prototype.checkDateValue = function (value) {
            return (!ej2_base_5.isNullOrUndefined(value) && value instanceof Date && !isNaN(+value)) ? value : null;
        };
        Calendar.prototype.findlastDay = function (date) {
            var collection = this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERMONTH + '');
            if (collection.length) {
                for (var i = collection.length - 1; i >= 0; i--) {
                    if (!collection[i].classList.contains(DISABLED)) {
                        date = new Date(parseInt(collection[i].id, 0));
                        break;
                    }
                }
            }
            return date;
        };
        Calendar.prototype.removeTheadEle = function () {
            if (this.getModuleName() === 'calendar') {
                if (!ej2_base_5.isNullOrUndefined(this.element.querySelectorAll('.e-content table thead')[0])) {
                    ej2_base_4.detach(this.tableHeadElement);
                }
            }
            else {
                if (!ej2_base_5.isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content table thead')[0])) {
                    ej2_base_4.detach(this.tableHeadElement);
                }
            }
        };
        Calendar.prototype.renderTemplate = function (elements, numCells, classNm, e) {
            var view = this.getViewNumber(this.currentView());
            var trEle;
            this.tableBodyElement = ej2_base_4.createElement('tbody');
            this.table.appendChild(this.tableBodyElement);
            ej2_base_4.removeClass([this.contentElement, this.headerElement], [MONTH, DECADE, YEAR]);
            ej2_base_4.addClass([this.contentElement, this.headerElement], [classNm]);
            var weekNumCell = 41;
            var numberCell = 35;
            var otherMonthCell = 6;
            var row = numCells;
            var rowIterator = 0;
            for (var dayCell = 0; dayCell < elements.length / numCells; ++dayCell) {
                trEle = ej2_base_4.createElement('tr', { attrs: { 'role': 'row' } });
                for (rowIterator = 0 + rowIterator; rowIterator < row; rowIterator++) {
                    if (!elements[rowIterator].classList.contains('e-week-number') && !ej2_base_5.isNullOrUndefined(elements[rowIterator].children[0])) {
                        ej2_base_4.addClass([elements[rowIterator].children[0]], [LINK]);
                        ej2_base_3.rippleEffect(elements[rowIterator].children[0], {
                            duration: 600,
                            isCenterRipple: true
                        });
                    }
                    trEle.appendChild(elements[rowIterator]);
                    if (!this.weekNumber && rowIterator === otherMonthCell && elements[otherMonthCell].classList.contains(OTHERMONTH)) {
                        ej2_base_4.addClass([trEle], OTHERMONTHROW);
                    }
                    if (this.weekNumber) {
                        if (rowIterator === weekNumCell && elements[weekNumCell].classList.contains(OTHERMONTH)) {
                            ej2_base_4.addClass([trEle], OTHERMONTHROW);
                        }
                    }
                    else {
                        if (rowIterator === numberCell && elements[numberCell].classList.contains(OTHERMONTH)) {
                            ej2_base_4.addClass([trEle], OTHERMONTHROW);
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
        };
        Calendar.prototype.clickHandler = function (e) {
            e.preventDefault();
            var eve = e.currentTarget;
            var view = this.getViewNumber(this.currentView());
            if (eve.classList.contains(OTHERMONTH)) {
                this.value = this.getIdValue(e, null);
                this.contentClick(e, 0, null);
            }
            else if (view === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                this.contentClick(e, 1, null);
            }
            else if (2 === view) {
                this.contentClick(e, 1, null);
            }
            else if (!eve.classList.contains(OTHERMONTH) && view === 0) {
                this.selectDate(e, this.getIdValue(e, null), null);
            }
            else {
                this.contentClick(e, 0, eve);
            }
            if (this.getModuleName() === 'calendar') {
                this.table.focus();
            }
        };
        Calendar.prototype.contentClick = function (e, view, ele) {
            var currentView = this.getViewNumber(this.currentView());
            var d = this.getIdValue(e, ele);
            switch (view) {
                case 0:
                    if (currentView === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                        ej2_base_4.detach(this.tableBodyElement);
                        this.currentDate = d;
                        this.effect = ZOOMIN;
                        this.renderMonths(e);
                    }
                    else {
                        this.currentDate.setMonth(d.getMonth());
                        if (d.getMonth() > 0 && this.currentDate.getMonth() !== d.getMonth()) {
                            this.currentDate.setDate(0);
                        }
                        this.currentDate.setFullYear(d.getFullYear());
                        this.effect = ZOOMIN;
                        ej2_base_4.detach(this.tableBodyElement);
                        this.renderMonths(e);
                    }
                    break;
                case 1:
                    if (currentView === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                        this.selectDate(e, d, null);
                    }
                    else {
                        this.currentDate.setFullYear(d.getFullYear());
                        this.effect = ZOOMIN;
                        ej2_base_4.detach(this.tableBodyElement);
                        this.renderYears(e);
                    }
            }
        };
        Calendar.prototype.switchView = function (view, e) {
            switch (view) {
                case 0:
                    ej2_base_4.detach(this.tableBodyElement);
                    this.renderMonths(e);
                    break;
                case 1:
                    ej2_base_4.detach(this.tableBodyElement);
                    this.renderYears(e);
                    break;
                case 2:
                    ej2_base_4.detach(this.tableBodyElement);
                    this.renderDecades(e);
            }
        };
        Calendar.prototype.getModuleName = function () {
            return 'calendar';
        };
        Calendar.prototype.getPersistData = function () {
            var keyEntity = ['value'];
            return this.addOnPersist(keyEntity);
        };
        Calendar.prototype.onPropertyChanged = function (newProp, oldProp) {
            this.effect = '';
            for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
                var prop = _a[_i];
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
                            }
                            else {
                                this.calendarElement.classList.add('e-rtl');
                            }
                        }
                        else {
                            if (this.getModuleName() === 'calendar') {
                                this.element.classList.remove('e-rtl');
                            }
                            else {
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
                        ej2_base_4.detach(this.tableBodyElement);
                        this.minMaxUpdate();
                        this.contentBody();
                        if ((this.todayDate < this.min || this.max < this.todayDate) && (this.footer) && (this.todayElement)) {
                            this.todayElement.remove();
                            this.footer.remove();
                            this.todayElement = this.footer = undefined;
                            this.contentFooter();
                        }
                        else {
                            if (this.todayElement.classList.contains('e-disabled') && (this.footer) && (this.todayElement)) {
                                ej2_base_4.removeClass([this.todayElement], DISABLED);
                            }
                        }
                        break;
                    case 'locale':
                        this.globalize = new ej2_base_1.Internationalization(this.locale);
                        this.contentHdr();
                        this.contentBody();
                        this.l10.setLocale(this.locale);
                        this.updateFooter();
                        break;
                    case 'showTodayButton':
                        if (newProp.showTodayButton) {
                            this.contentFooter();
                        }
                        else {
                            this.todayElement.remove();
                            this.footer.remove();
                            this.todayElement = this.footer = undefined;
                        }
                        this.setProperties({ showTodayButton: newProp.showTodayButton }, true);
                        break;
                }
            }
        };
        Calendar.prototype.setvalue = function () {
            this.tableBodyElement.remove();
            this.setProperties({ start: this.currentView() }, true);
            this.contentBody();
        };
        Calendar.prototype.titleUpdate = function (date, view) {
            var globalize = new ej2_base_1.Internationalization(this.locale);
            switch (view) {
                case 'days':
                    this.headerTitleElement.textContent = globalize.formatDate(date, { type: 'dateTime', skeleton: 'yMMMM' });
                    break;
                case 'months':
                    this.headerTitleElement.textContent = globalize.formatDate(date, { type: 'dateTime', skeleton: 'y' });
            }
        };
        Calendar.prototype.setActiveDescendant = function () {
            var id;
            var focusedEle = this.tableBodyElement.querySelector('tr td.e-focused-date');
            var selectedEle = this.tableBodyElement.querySelector('tr td.e-selected');
            var title = this.globalize.formatDate(this.currentDate, { type: 'date', skeleton: 'full' });
            if (selectedEle || focusedEle) {
                (focusedEle || selectedEle).setAttribute('aria-selected', 'true');
                (focusedEle || selectedEle).setAttribute('aria-label', 'The current focused date is ' + '' + title);
                id = (focusedEle || selectedEle).getAttribute('id');
            }
            return id;
        };
        Calendar.prototype.iconHandler = function () {
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
        };
        Calendar.prototype.destroy = function () {
            if (this.getModuleName() === 'calendar') {
                ej2_base_4.removeClass([this.element], [ROOT]);
            }
            else {
                if (this.calendarElement) {
                    ej2_base_4.removeClass([this.element], [ROOT]);
                }
            }
            if (this.getModuleName() === 'calendar') {
                ej2_base_1.EventHandler.remove(this.headerTitleElement, 'click', this.navTitle);
                if (this.todayElement) {
                    ej2_base_1.EventHandler.remove(this.todayElement, 'click', this.todayButtonClick);
                }
                this.previousIconHandler(true);
                this.nextIconHandler(true);
                this.keyboardModule.destroy();
            }
            this.element.innerHTML = '';
            _super.prototype.destroy.call(this);
        };
        Calendar.prototype.title = function (e) {
            var currentView = this.getViewNumber(this.currentView());
            this.effect = ZOOMIN;
            this.switchView(++currentView, e);
        };
        Calendar.prototype.getViewNumber = function (stringVal) {
            if (stringVal === 'Month') {
                return 0;
            }
            else if (stringVal === 'Year') {
                return 1;
            }
            else {
                return 2;
            }
        };
        Calendar.prototype.navTitle = function (e) {
            e.preventDefault();
            this.title(e);
            if (this.getModuleName() === 'calendar') {
                this.table.focus();
            }
        };
        Calendar.prototype.previous = function () {
            this.effect = '';
            var currentView = this.getViewNumber(this.currentView());
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
        };
        Calendar.prototype.navigatePrevious = function (e) {
            e.preventDefault();
            this.previous();
            this.triggerNavigate(e);
            if (this.getModuleName() === 'calendar') {
                this.table.focus();
            }
        };
        Calendar.prototype.next = function () {
            this.effect = '';
            var currentView = this.getViewNumber(this.currentView());
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
        };
        Calendar.prototype.navigateNext = function (eve) {
            eve.preventDefault();
            this.next();
            this.triggerNavigate(eve);
            if (this.getModuleName() === 'calendar') {
                this.table.focus();
            }
        };
        Calendar.prototype.navigateTo = function (view, date) {
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
        };
        Calendar.prototype.currentView = function () {
            if (this.contentElement.classList.contains(YEAR)) {
                return 'Year';
            }
            else if (this.contentElement.classList.contains(DECADE)) {
                return 'Decade';
            }
            else {
                return 'Month';
            }
        };
        Calendar.prototype.getDateVal = function (date) {
            return (!ej2_base_5.isNullOrUndefined(this.value) && date.getDate() === (this.value).getDate()
                && date.getMonth() === (this.value).getMonth() && date.getFullYear() === (this.value).getFullYear());
        };
        Calendar.prototype.getCultureObjects = function (ld, c) {
            return ej2_base_5.getValue('main.' + '' + this.locale + '.dates.calendars.gregorian.days.format.short', ld);
        };
        ;
        Calendar.prototype.getWeek = function (d) {
            var currentDate = new Date('' + d).valueOf();
            var date = new Date(d.getFullYear(), 0, 1).valueOf();
            var a = (currentDate - date);
            return Math.ceil((((a) / dayMilliSeconds) + new Date(date).getDay() + 1) / 7);
        };
        Calendar.prototype.setTime = function (date, time) {
            var d = new Date(date.getTime() + time);
            if (!ej2_base_5.isNullOrUndefined(this.value) &&
                (this.value.getHours() !== 0 || this.value.getSeconds() !== 0 || this.value.getMinutes() !== 0)) {
                date.setTime(d.getTime());
            }
            else {
                date = new Date(date.setTime(d.getTime()));
            }
        };
        Calendar.prototype.addMonths = function (date, i) {
            var day = date.getDate();
            date.setDate(1);
            date.setMonth(date.getMonth() + i);
            date.setDate(Math.min(day, this.getMaxDays(date)));
        };
        Calendar.prototype.addYears = function (date, i) {
            var day = date.getDate();
            date.setDate(1);
            date.setFullYear(date.getFullYear() + i);
            date.setDate(Math.min(day, this.getMaxDays(date)));
        };
        Calendar.prototype.getIdValue = function (e, element) {
            var eve;
            if (e) {
                eve = e.currentTarget;
            }
            else {
                eve = element;
            }
            var dateFormatOptions = { type: 'dateTime', skeleton: 'full' };
            var dateString = this.globalize.formatDate(new Date(parseInt('' + eve.getAttribute('id'), 0)), dateFormatOptions);
            var date = this.globalize.parseDate(dateString, dateFormatOptions);
            var value = date.valueOf() - date.valueOf() % 1000;
            return new Date(value);
        };
        Calendar.prototype.selectDate = function (e, date, element) {
            var ele = element || e.currentTarget;
            if (this.currentView() === 'Decade') {
                this.setDateDecade(this.currentDate, date.getFullYear());
            }
            else if (this.currentView() === 'Year') {
                this.setDateYear(this.currentDate, date);
            }
            else {
                this.setProperties({ value: new Date('' + date) }, true);
                this.currentDate = new Date('' + date);
            }
            var tableBodyElement = ej2_base_4.closest(ele, '.' + ROOT);
            if (ej2_base_5.isNullOrUndefined(tableBodyElement)) {
                tableBodyElement = this.tableBodyElement;
            }
            if (!ej2_base_5.isNullOrUndefined(tableBodyElement.querySelector('.' + SELECTED))) {
                ej2_base_4.removeClass([tableBodyElement.querySelector('.' + SELECTED)], SELECTED);
            }
            if (!ej2_base_5.isNullOrUndefined(tableBodyElement.querySelector('.' + FOCUSEDDATE))) {
                ej2_base_4.removeClass([tableBodyElement.querySelector('.' + FOCUSEDDATE)], FOCUSEDDATE);
            }
            ej2_base_4.addClass([ele], SELECTED);
            this.changedArgs = { value: this.value };
            this.changeHandler(e);
        };
        Calendar.prototype.setAriaActivedescendant = function () {
            ej2_base_4.attributes(this.table, {
                'aria-activedescendant': '' + this.setActiveDescendant()
            });
        };
        Calendar.prototype.previousIconHandler = function (disabled) {
            if (disabled) {
                ej2_base_1.EventHandler.remove(this.previousIcon, 'click', this.navigatePreviousHandler);
                ej2_base_4.addClass([this.previousIcon], '' + DISABLED);
                ej2_base_4.addClass([this.previousIcon], '' + OVERLAY);
                this.previousIcon.setAttribute('aria-disabled', 'true');
            }
            else {
                ej2_base_1.EventHandler.add(this.previousIcon, 'click', this.navigatePreviousHandler);
                ej2_base_4.removeClass([this.previousIcon], '' + DISABLED);
                ej2_base_4.removeClass([this.previousIcon], '' + OVERLAY);
                this.previousIcon.setAttribute('aria-disabled', 'false');
            }
        };
        Calendar.prototype.renderDayCellEvent = function (args) {
            ej2_base_5.extend(this.renderDaycellArg, { name: 'renderDayCell' });
            this.trigger('renderDayCell', args);
        };
        Calendar.prototype.navigatedEvent = function (eve) {
            ej2_base_5.extend(this.navigatedArgs, { name: 'navigated', event: eve });
            this.trigger('navigated', this.navigatedArgs);
        };
        Calendar.prototype.triggerNavigate = function (event) {
            this.navigatedArgs = { view: this.currentView(), date: this.currentDate };
            this.navigatedEvent(event);
        };
        Calendar.prototype.changeEvent = function (e) {
            this.trigger('change', this.changedArgs);
        };
        Calendar.prototype.triggerChange = function (e) {
            this.changedArgs.event = e;
            if (!ej2_base_5.isNullOrUndefined(this.value)) {
                this.setProperties({ value: this.value }, true);
            }
            if (+this.value !== Number.NaN && +this.value !== +this.previousDate) {
                this.changeEvent(e);
            }
            this.previousDate = this.value;
        };
        Calendar.prototype.nextIconHandler = function (disabled) {
            if (disabled) {
                ej2_base_1.EventHandler.remove(this.nextIcon, 'click', this.navigateNextHandler);
                ej2_base_4.addClass([this.nextIcon], DISABLED);
                ej2_base_4.addClass([this.nextIcon], OVERLAY);
                this.nextIcon.setAttribute('aria-disabled', 'true');
            }
            else {
                ej2_base_1.EventHandler.add(this.nextIcon, 'click', this.navigateNextHandler);
                ej2_base_4.removeClass([this.nextIcon], DISABLED);
                ej2_base_4.removeClass([this.nextIcon], OVERLAY);
                this.nextIcon.setAttribute('aria-disabled', 'false');
            }
        };
        Calendar.prototype.compare = function (startDate, endDate, modifier) {
            var start = endDate.getFullYear();
            var end;
            var result;
            end = start;
            result = 0;
            if (modifier) {
                start = start - start % modifier;
                end = start - start % modifier + modifier - 1;
            }
            if (startDate.getFullYear() > end) {
                result = 1;
            }
            else if (startDate.getFullYear() < start) {
                result = -1;
            }
            return result;
        };
        Calendar.prototype.isMinMaxRange = function (date) {
            return +date >= +this.min && +date <= +this.max;
        };
        Calendar.prototype.compareYear = function (start, end) {
            return this.compare(start, end, 0);
        };
        Calendar.prototype.compareDecade = function (start, end) {
            return this.compare(start, end, 10);
        };
        Calendar.prototype.shiftArray = function (array, i) {
            return array.slice(i).concat(array.slice(0, i));
        };
        Calendar.prototype.addDay = function (date, i, e, max, min) {
            var column = i;
            var value = new Date(+date);
            if (!ej2_base_5.isNullOrUndefined(this.tableBodyElement) && !ej2_base_5.isNullOrUndefined(e)) {
                while (this.findNextTD(new Date(+date), column, max, min)) {
                    column += i;
                }
                var rangeValue = new Date(value.setDate(value.getDate() + column));
                column = (+rangeValue > +max || +rangeValue < +min) ? column === i ? i - i : i : column;
            }
            date.setDate(date.getDate() + column);
        };
        Calendar.prototype.findNextTD = function (date, column, max, min) {
            var value = new Date(date.setDate(date.getDate() + column));
            var collection = [];
            var isDisabled = false;
            if ((!ej2_base_5.isNullOrUndefined(value) && value.getMonth()) !== (!ej2_base_5.isNullOrUndefined(this.currentDate) && this.currentDate.getMonth())) {
                var tdEles = this.renderDays(value, null);
                collection = tdEles.filter(function (ele) {
                    return ele.classList.contains(DISABLED);
                });
            }
            else {
                collection = this.tableBodyElement.querySelectorAll('td.' + DISABLED);
            }
            if (+value <= (+(max)) && +value >= (+(min))) {
                if (collection.length) {
                    for (var i = 0; i < collection.length; i++) {
                        isDisabled = (+value === +new Date(parseInt(collection[i].id, 0))) ? true : false;
                        if (isDisabled) {
                            break;
                        }
                    }
                }
            }
            return isDisabled;
        };
        Calendar.prototype.getMaxDays = function (d) {
            var date;
            var month;
            var tmpDate = new Date('' + d);
            date = 28;
            month = tmpDate.getMonth();
            while (tmpDate.getMonth() === month) {
                ++date;
                tmpDate.setDate(date);
            }
            return date - 1;
        };
        Calendar.prototype.setDateDecade = function (date, year) {
            date.setFullYear(year);
            this.setProperties({ value: new Date('' + date) }, true);
        };
        ;
        Calendar.prototype.setDateYear = function (date, value) {
            date.setFullYear(value.getFullYear(), value.getMonth(), date.getDate());
            if (value.getMonth() !== date.getMonth()) {
                date.setDate(0);
            }
            this.setProperties({ value: new Date('' + date) }, true);
            this.currentDate = new Date('' + this.value);
        };
        Calendar.prototype.compareMonth = function (start, end) {
            var result;
            if (start.getFullYear() > end.getFullYear()) {
                result = 1;
            }
            else if (start.getFullYear() < end.getFullYear()) {
                result = -1;
            }
            else {
                result = start.getMonth() === end.getMonth() ? 0 : start.getMonth() > end.getMonth() ? 1 : -1;
            }
            return result;
        };
        __decorate([
            ej2_base_1.Property(null)
        ], Calendar.prototype, "value", void 0);
        __decorate([
            ej2_base_1.Property(new Date(1900, 0, 1))
        ], Calendar.prototype, "min", void 0);
        __decorate([
            ej2_base_1.Property(new Date(2099, 11, 31))
        ], Calendar.prototype, "max", void 0);
        __decorate([
            ej2_base_1.Property(0)
        ], Calendar.prototype, "firstDayOfWeek", void 0);
        __decorate([
            ej2_base_1.Property('Month')
        ], Calendar.prototype, "start", void 0);
        __decorate([
            ej2_base_1.Property('Month')
        ], Calendar.prototype, "depth", void 0);
        __decorate([
            ej2_base_1.Property(false)
        ], Calendar.prototype, "weekNumber", void 0);
        __decorate([
            ej2_base_1.Property(true)
        ], Calendar.prototype, "showTodayButton", void 0);
        __decorate([
            ej2_base_1.Event()
        ], Calendar.prototype, "created", void 0);
        __decorate([
            ej2_base_1.Event()
        ], Calendar.prototype, "destroyed", void 0);
        __decorate([
            ej2_base_1.Event()
        ], Calendar.prototype, "change", void 0);
        __decorate([
            ej2_base_1.Event()
        ], Calendar.prototype, "navigated", void 0);
        __decorate([
            ej2_base_1.Event()
        ], Calendar.prototype, "renderDayCell", void 0);
        Calendar = __decorate([
            ej2_base_2.NotifyPropertyChanges
        ], Calendar);
        return Calendar;
    }(ej2_base_1.Component));
    exports.Calendar = Calendar;
});
