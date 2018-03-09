define(["require", "exports", "../script/calendar/calendar", "../script/timepicker/timepicker"], function (require, exports, calendar_1, timepicker_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var calendar = new calendar_1.Calendar({
        value: new Date(),
        showTodayButton: false,
        created: onCreate
    });
    calendar.appendTo('#calendar');
    var timepicker = new timepicker_1.TimePicker();
    var timeValue;
    function onCreate() {
        this.element.classList.add('e-custom-picker');
        var container = document.createElement('div');
        container.setAttribute('class', 'timeContainer e-align');
        var leftText = document.createElement('span');
        leftText.setAttribute('class', 'e-label-text');
        leftText.innerHTML = 'Add due time';
        leftText.addEventListener('click', function () {
            leftText.remove();
            var time = document.createElement('input');
            time.setAttribute('id', 'timepicker');
            time.setAttribute('type', 'text');
            container.appendChild(time);
            timepicker = new timepicker_1.TimePicker({
                scrollTo: new Date(),
                value: timeValue !== null ? timeValue : null,
                change: onDueTime
            });
            timepicker.appendTo('#timepicker');
        });
        var doneButton = document.createElement('button');
        doneButton.innerHTML = 'Done';
        doneButton.addEventListener('click', function () {            
        });
        doneButton.setAttribute('class', 'e-info e-btn e-align');
        var footerElement = document.querySelector('.e-calendar.e-custom-picker');
        container.appendChild(leftText);
        footerElement.appendChild(container);
        footerElement.appendChild(doneButton);
    }
    function onDueTime(args) {
        timeValue = args.value;
    }
});
