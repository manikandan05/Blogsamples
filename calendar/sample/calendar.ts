import { Calendar } from '../script/calendar/calendar';
import { TimePicker, ChangeEventArgs } from '../script/timepicker/timepicker';

let calendar = new Calendar({
    value: new Date(),
    showTodayButton: false,
    created: onCreate
});
calendar.appendTo('#calendar');

// declare necessary variables
let timepicker: TimePicker = new TimePicker();
let timeValue: Date;


//datepicker popup open event handler
function onCreate() {
    this.element.classList.add('e-custom-picker');
    //create the container for text and timepicker component
    let container: HTMLElement = document.createElement('div');
    container.setAttribute('class', 'timeContainer e-align');
    let leftText: HTMLElement = document.createElement('span');
    leftText.setAttribute('class', 'e-label-text');
    leftText.innerHTML = 'Add due time';
    //event handler the for lable text
    leftText.addEventListener('click', function () {
        leftText.remove();
        let time: HTMLElement = document.createElement('input');
        time.setAttribute('id', 'timepicker');
        time.setAttribute('type', 'text');
        container.appendChild(time);
        //initialize the timepicker component
        timepicker = new TimePicker({
            scrollTo: new Date(),
            //set the value to the component as previously selected value is exists or set the null.
            value: timeValue !== null ? timeValue : null,
            change: onDueTime
        })
        timepicker.appendTo('#timepicker');
    });
    let doneButton: HTMLElement = document.createElement('button');
    doneButton.innerHTML = 'Done'
    //done button event handler
    doneButton.addEventListener('click', function () {
        if (timepicker.value !== null) {
            //when select the time value from the timepicker, set the format as date with time.
            // calendar.format = 'M/d/yyyy hh:mm a';
            // calendar.value.setTime(timeValue.getTime());
            // calendar.value.setMinutes(timeValue.getMinutes());
            // calendar.value.setMilliseconds(timeValue.getMilliseconds());
        } else {
            //set the format when time value as empty.
            // datepickerObject.format = 'M/d/yyyy';
        }
        //hide the datepicker when click the done button
        // datepickerObject.hide();
    });
    doneButton.setAttribute('class', 'e-info e-btn e-align');
    let footerElement: HTMLElement = document.querySelector('.e-calendar.e-custom-picker');
    //append the label text to the container element
    container.appendChild(leftText);
    //append the container and button element into the calendar footer area.
    footerElement.appendChild(container);
    footerElement.appendChild(doneButton);
}

function onDueTime(args: ChangeEventArgs) {
    timeValue = args.value;
}