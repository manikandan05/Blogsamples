import{Calendar} from "./calendar";

import{ CalendarView} from "./calendar";

export interface CalendarHelper {
	new(id: string | HTMLElement): BuilderProperties
 }


export interface  BuilderProperties {
	create(): Calendar
	/**
	* Triggers when the Calendar value is changed.
	*/
	change(value:Function): BuilderProperties;
	/**
	* Triggers when Calendar is created.
	*/
	created(value:Function): BuilderProperties;
	/**
	* Triggers when Calendar is destroyed.
	*/
	destroyed(value:Function): BuilderProperties;
	/**
	* Triggers when the Calendar is navigated to another level or within the same level of view.
	*/
	navigated(value:Function): BuilderProperties;
	/**
	* Triggers when each day cell of the Calendar is rendered
	*/
	renderDayCell(value:Function): BuilderProperties;
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
	* Gets or sets the Calendar's first day of the week. By default, the first day of the week will be based on the current culture.
	*/
	firstDayOfWeek(value:number): BuilderProperties;
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
	* Specifies the initial view of the Calendar when it is opened.
With the help of this property, initial view can be changed to year or decade view.
	*/
	start(value:CalendarView): BuilderProperties;
	/**
	* Gets or sets the selected date of the Calendar.
	*/
	value(value:Date): BuilderProperties;
	/**
	* Determines whether the week number of the Calendar is to be displayed or not.
The week number is displayed in every week row.
	*/
	weekNumber(value:boolean): BuilderProperties;
}