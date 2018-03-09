import{TimePicker} from "./timepicker";
import { Input, InputObject, IInput, FloatLabelType } from '@syncfusion/ej2-inputs';

export interface TimePickerHelper {
	new(id: string | HTMLElement): BuilderProperties
 }


export interface  BuilderProperties {
	create(): TimePicker
	/**
	* Triggers when the control loses the focus.
	*/
	blur(value:Function): BuilderProperties;
	/**
	* Triggers when the value is changed.
	*/
	change(value:Function): BuilderProperties;
	/**
	* Triggers when the popup is closed.
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
	* Triggers when the control gets focused.
	*/
	focus(value:Function): BuilderProperties;
	/**
	* Triggers when the popup is opened.
	*/
	open(value:Function): BuilderProperties;
	/**
	* Specifies the root CSS class of the TimePicker that allows to
customize the appearance by overriding the styles.
	*/
	cssClass(value:string): BuilderProperties;
	/**
	* Enable or disable persisting component's state between page reloads.
	*/
	enablePersistence(value:boolean): BuilderProperties;
	/**
	* Specifies the component to be rendered in right-to-left direction.
	*/
	enableRtl(value:boolean): BuilderProperties;
	/**
	* Specifies whether the component to be disabled or not.
	*/
	enabled(value:boolean): BuilderProperties;
	/**
	* Specifies the placeholder text to be floated.
	*/
	floatLabelType(value:FloatLabelType): BuilderProperties;
	/**
	* Specifies the format of value that is to be displayed in component. By default, the format is
based on the culture.
	*/
	format(value:string): BuilderProperties;
	isDestroyed(value:boolean): BuilderProperties;
	/**
	* Overrides the global culture and localization value for this component. Default global culture is 'en-US'.
	*/
	locale(value:string): BuilderProperties;
	/**
	* Gets or sets the maximum time value that can be allowed to select in TimePicker.
	*/
	max(value:Date): BuilderProperties;
	/**
	* Gets or sets the minimum time value that can be allowed to select in TimePicker.
	*/
	min(value:Date): BuilderProperties;
	/**
	* Specifies the placeholder text that is displayed in textbox.
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
	* Specifies the time interval between the two adjacent time values in the popup list .
	*/
	step(value:number): BuilderProperties;
	/**
	* Specifies the component to act as strict so that, it allows to enter only a valid time value within a specified range or else
resets to previous value. By default, strictMode is in false.
	*/
	strictMode(value:boolean): BuilderProperties;
	/**
	* Gets or sets the value of the component. The value is parsed based on the format.
	*/
	value(value:Date): BuilderProperties;
	/**
	* Gets or sets the width of the TimePicker component. The width of the popup is based on the width of the component.
	*/
	width(value:string|number): BuilderProperties;
	/**
	* specifies the z-index value of the timePicker popup element.
	*/
	zIndex(value:number): BuilderProperties;
}