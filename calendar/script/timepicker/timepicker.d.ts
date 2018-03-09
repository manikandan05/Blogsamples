import { Internationalization } from '@syncfusion/ej2-base';
import { KeyboardEvents, KeyboardEventArgs, BaseEventArgs } from '@syncfusion/ej2-base';
import { EmitType, Component } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups';
import { IInput, FloatLabelType } from '@syncfusion/ej2-inputs';
import { TimePickerModel } from './timepicker-model';
export interface ChangeEventArgs {
    /** Defines the boolean that returns true when the value is changed by user interaction, otherwise returns false. */
    isInteracted: boolean;
    /** Defines the selected time value of the TimePicker. */
    value: Date;
    /** Defines the selected time value as string. */
    text: string;
    /** Defines the type of the event. */
    e: KeyboardEventArgs | FocusEvent | MouseEvent;
}
/**
 * Interface for before list item render .
 * @private
 */
export interface ItemEventArgs extends BaseEventArgs {
    /** Defines the created LI element. */
    element: HTMLElement;
    /** Defines the displayed text value in a popup list. */
    text: string;
    /** Defines the Date object of displayed text in a popup list. */
    value: Date;
    /** Specifies whether to disable the current time value or not. */
    isDisabled: Boolean;
}
export interface CursorPositionDetails {
    /** Defines the text selection starting position. */
    start: number;
    /** Defines the text selection end position. */
    end: number;
}
export interface MeridianText {
    /** Defines the culture specific meridian text for AM. */
    am: string;
    /** Defines the culture specific meridian text for PM. */
    pm: string;
}
export interface PopupEventArgs {
    /** Defines the TimePicker popup element. */
    popup: Popup;
}
export declare namespace TimePickerBase {
    function createListItems(min: Date, max: Date, globalize: Internationalization, timeFormat: string, step: number): {
        collection: number[];
        list: HTMLElement;
    };
}
/**
 * TimePicker is an intuitive interface component which provides an options to select a time value
 * from popup list or to set a desired time value.
 * ```
 * <input id='timepicker' type='text'/>
 * <script>
 *   var timePickerObj = new TimePicker({ value: new Date() });
 *   timePickerObj.appendTo('#timepicker');
 * </script>
 * ```
 */
export declare class TimePicker extends Component<HTMLElement> implements IInput {
    private inputWrapper;
    private popupWrapper;
    private cloneElement;
    private listWrapper;
    private listTag;
    private selectedElement;
    private liCollections;
    protected inputElement: HTMLInputElement;
    private popupObj;
    protected inputEvent: KeyboardEvents;
    protected globalize: Internationalization;
    private defaultCulture;
    private containerStyle;
    private rippleFn;
    private l10n;
    private cursorDetails;
    private activeIndex;
    private timeCollections;
    private isNavigate;
    private disableItemCollection;
    protected isPreventBlur: boolean;
    private isTextSelected;
    private prevValue;
    private inputStyle;
    private angularTag;
    private valueWithMinutes;
    private prevDate;
    private initValue;
    private initMin;
    private initMax;
    protected keyConfigure: {
        [key: string]: string;
    };
    /**
     * Gets or sets the width of the TimePicker component. The width of the popup is based on the width of the component.
     * @default '100%'
     */
    width: string | number;
    /**
     * Specifies the root CSS class of the TimePicker that allows to
     * customize the appearance by overriding the styles.
     * @default null
     */
    cssClass: string;
    /**
     * Specifies the component to act as strict so that, it allows to enter only a valid time value within a specified range or else
     * resets to previous value. By default, strictMode is in false.
     * @default false
     */
    strictMode: boolean;
    /**
     * Specifies the format of value that is to be displayed in component. By default, the format is
     * based on the culture.
     * @default null
     */
    format: string;
    /**
     * Specifies whether the component to be disabled or not.
     * @default true
     */
    enabled: boolean;
    /**
     * Specifies the component in readonly state.
     * @default false
     */
    readonly: boolean;
    /**
     * Specifies the placeholder text to be floated.
     */
    floatLabelType: FloatLabelType;
    /**
     * Specifies the placeholder text that is displayed in textbox.
     * @default null
     */
    placeholder: string;
    /**
     * specifies the z-index value of the timePicker popup element.
     * @default 1000
     */
    zIndex: number;
    /**
     * Specifies whether to show or hide the clear Icon
     * @default true
     */
    showClearButton: boolean;
    /**
     * Specifies the time interval between the two adjacent time values in the popup list .
     * @default 30
     */
    step: number;
    /**
     * Specifies the scroll bar position if there is no value is selected in the popup list or
     *  the given value is not present in the popup list.
     * @default null
     */
    scrollTo: Date;
    /**
     * Gets or sets the value of the component. The value is parsed based on the format.
     * @default null
     */
    value: Date;
    /**
     * Gets or sets the minimum time value that can be allowed to select in TimePicker.
     * @default 00:00
     */
    min: Date;
    /**
     * Gets or sets the maximum time value that can be allowed to select in TimePicker.
     * @default 00:00
     */
    max: Date;
    /**
     * Specifies the component to be rendered in right-to-left direction.
     * @default false
     */
    enableRtl: boolean;
    /**
     * Triggers when the value is changed.
     * @event
     */
    change: EmitType<ChangeEventArgs>;
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
     * Triggers when the popup is opened.
     * @event
     */
    open: EmitType<PopupEventArgs>;
    /**
     * Triggers while rendering the each popup list item.
     * @event
     */
    itemRender: EmitType<ItemEventArgs>;
    /**
     * Triggers when the popup is closed.
     * @event
     */
    close: EmitType<PopupEventArgs>;
    /**
     * Triggers when the control loses the focus.
     * @event
     */
    blur: EmitType<Object>;
    /**
     * Triggers when the control gets focused.
     * @event
     */
    focus: EmitType<Object>;
    /**
     * Constructor for creating the widget
     */
    constructor(options?: TimePickerModel, element?: string | HTMLInputElement);
    /**
     * Initialize the event handler
     * @private
     */
    protected preRender(): void;
    protected render(): void;
    private validateDisable();
    private initialize();
    private checkDateValue(value);
    private createInputElement();
    destroy(): void;
    private popupCreation();
    protected getPopupHeight(): number;
    private generateList();
    private popupCalculation();
    private isEmptyList();
    private renderPopup();
    private getFormattedValue(value);
    private getDateObject(text);
    private checkErrorState(val);
    private validateInterval();
    private disableTimeIcon();
    private disableElement(element);
    private enableElement(element);
    private selectInputText();
    private getMeridianText();
    private getCursorSelection();
    private getActiveElement();
    private isNullOrEmpty(value);
    private setWidth();
    private setScrollPosition();
    private findScrollTop(element);
    private setScrollTo();
    private getText();
    private getValue(value);
    private cldrDateFormat();
    private cldrTimeFormat();
    private dateToNumeric();
    private getExactDateTime(value);
    private setValue(value);
    private updatePlaceHolder();
    private popupHandler();
    private mouseDownHandler();
    private mouseUpHandler(event);
    private focusSelection();
    private inputHandler(event);
    private onMouseClick(event);
    private closePopup(delay?);
    private checkValueChange(event, isNavigation);
    private onMouseOver(event);
    private setHover(li, className);
    private setSelection(li, event);
    private onMouseLeave();
    private scrollHandler();
    private setMinMax(minVal, maxVal);
    protected validateMinMax(dateVal: Date | string, minVal: Date, maxVal: Date): Date | string;
    private valueIsDisable(value);
    protected validateState(val: string | Date): boolean;
    protected strictOperation(minimum: Date, maximum: Date, dateVal: Date | string, val: Date): Date | string;
    protected bindEvents(): void;
    protected unBindEvents(): void;
    private bindClearEvent();
    protected clearHandler(e: MouseEvent): void;
    private clear(event);
    protected setZIndex(): void;
    protected checkAttributes(): void;
    protected setCurrentDate(value: Date): Date;
    protected getSeparator(): string;
    protected getTextFormat(): number;
    protected updateValue(value: string | Date, event: KeyboardEventArgs | FocusEvent): void;
    protected previousState(date: Date): string;
    protected resetState(): void;
    protected objToString(val: Date): string;
    protected checkValue(value: string | Date): string;
    protected validateValue(date: Date, value: string | Date): string;
    protected findNextElement(event: KeyboardEventArgs): void;
    protected elementValue(value: Date): void;
    private validLiElement(index, backward?);
    protected keyHandler(event: KeyboardEventArgs): void;
    protected setPopupPosition(): number;
    protected getCultureTimeObject(ld: Object, c: string): Object;
    protected getCultureDateObject(ld: Object, c: string): Object;
    protected wireListEvents(): void;
    protected unWireListEvents(): void;
    protected valueProcess(event: KeyboardEventArgs | FocusEvent | MouseEvent, value: Date): void;
    protected changeEvent(event: KeyboardEventArgs | FocusEvent | MouseEvent): void;
    protected updateInput(isUpdate: boolean, date: Date): void;
    protected setActiveDescendant(): void;
    protected removeSelection(): void;
    protected removeHover(className: string): void;
    protected getHoverItem(className: string): Element[];
    private setActiveClass();
    protected addSelection(): void;
    protected isValidLI(li: Element | HTMLElement): boolean;
    protected createDateObj(val: Date | string): Date;
    protected TimeParse(today: string, val: Date | string): Date;
    protected createListItems(): void;
    private documentClickHandler(event);
    protected setEnableRtl(): void;
    protected setEnable(): void;
    protected getProperty(date: TimePickerModel, val: string): void;
    /**
     * Focuses out the TimePicker textbox element.
     * @returns void
     */
    focusOut(): void;
    private isPopupOpen();
    /**
     * Focused the TimePicker textbox element.
     * @returns void
     */
    focusIn(): void;
    /**
     * Hides the TimePicker popup.
     * @returns void
     */
    hide(): void;
    /**
     * Opens the popup to show the list items.
     * @returns void
     */
    show(): void;
    /**
     * Gets the properties to be maintained upon browser refresh.
     * @returns string
     */
    getPersistData(): string;
    /**
     * To get component name
     * @private
     */
    protected getModuleName(): string;
    /**
     * Called internally if any of the property value changed.
     * returns void
     * @private
     */
    onPropertyChanged(newProp: TimePickerModel, oldProp: TimePickerModel): void;
}
