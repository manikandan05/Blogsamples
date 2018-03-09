import{DatePicker} from "./datepicker";
import { Input, InputObject, IInput, FloatLabelType } from '@syncfusion/ej2-inputs';
import{ CalendarView} from "../calendar/calendar";

export interface DatePickerHelper {
	new(id: string | HTMLElement): BuilderProperties
 }


export interface  BuilderProperties {
	create(): DatePicker
	/**
	* Triggers when the control loses the focus.
	*/
	blur(value:Function): BuilderProperties;
	/**
	* Triggers when the Calendar value is changed.
	*/
	change(value:Function): BuilderProperties;
	/**
	* Triggers when the popup gets close.
	*/
	close(value:Function): BuilderProperties;
	/**
	* Triggers when the component is created.
	*/
	created(value:Function): BuilderProperties;
	/**
	* Triggers when the component is destroyed.
	*/
	destroyed(value:Function): BuilderProperties;
	/**
	*  Triggers when the control gets focus.
	*/
	focus(value:Function): BuilderProperties;
	/**
	* Triggers when the Calendar is navigated to another level or within the same level of view.
	*/
	navigated(value:Function): BuilderProperties;
	/**
	* Triggers when the popup gets open.
	*/
	open(value:Function): BuilderProperties;
	/**
	* Triggers when each day cell of the Calendar is rendered
	*/
	renderDayCell(value:Function): BuilderProperties;
	/**
	* Specifies the root CSS class of the DatePicker that allows to
customize the appearance by overriding the styles.
	*/
	cssClass(value:string): BuilderProperties;
	/**
	* Sets the maximum level of view (month, year, decade) in the Calendar.
Depth view should be smaller than the start view to restrict its view navigation.
	*/
	depth(value:CalendarView): BuilderProperties;
	/**
	* Enable or disable persisting component's state between page reloads.
	*/
	enablePersistence(value:boolean): BuilderProperties;
	/**
	* Enable or disable rendering component in right to left direction.
	*/
	enableRtl(value:boolean): BuilderProperties;
	/**
	* Specifies the component to be disabled or not.
	*/
	enabled(value:boolean): BuilderProperties;
	/**
	* Gets or sets the Calendar's first day of the week. By default, the first day of the week will be based on the current culture.
	*/
	firstDayOfWeek(value:number): BuilderProperties;
	/**
	* Specifies the placeholder text to be floated.
	*/
	floatLabelType(value:FloatLabelType): BuilderProperties;
	/**
	* Specifies the format of the value that to be displayed in component. By default, the format is
based on the culture.
	*/
	format(value:string): BuilderProperties;
	isDestroyed(value:boolean): BuilderProperties;
	/**
	* Overrides the global culture and localization value for this component. Default global culture is 'en-US'.
	*/
	locale(value:string): BuilderProperties;
	/**
	* Gets or sets the maximum date that can be selected in the Calendar.
	*/
	max(value:Date): BuilderProperties;
	/**
	* Gets or sets the minimum date that can be selected in the Calendar.
	*/
	min(value:Date): BuilderProperties;
	/**
	* Specifies the placeholder text that displayed in textbox.
	*/
	placeholder(value:string): BuilderProperties;
	/**
	* Specifies the component in readonly state.
	*/
	readonly(value:boolean): BuilderProperties;
	/**
	* Specifies whether to show or hide the clear Icon
	*/
	showClearButton(value:boolean): BuilderProperties;
	/**
	* Specifies the initial view of the Calendar when it is opened.
With the help of this property, initial view can be changed to year or decade view.
	*/
	start(value:CalendarView): BuilderProperties;
	/**
	* Specifies the component to act as strict. So that, it allows to enter only a valid date value within a specified range or else it
will resets to previous value. By default, strictMode is in false.
	*/
	strictMode(value:boolean): BuilderProperties;
	/**
	* Gets or sets the selected date of the Calendar.
	*/
	value(value:Date): BuilderProperties;
	/**
	* Determines whether the week number of the Calendar is to be displayed or not.
The week number is displayed in every week row.
	*/
	weekNumber(value:boolean): BuilderProperties;
	/**
	* Specifies the width of the DatePicker component.
	*/
	width(value:number|string): BuilderProperties;
	/**
	* specifies the z-index value of the datePicker popup element.
	*/
	zIndex(value:number): BuilderProperties;
}