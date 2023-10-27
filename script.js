import {
  format,
  fromUnixTime,
  getUnixTime,
  addMonths,
  subMonths,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth
} from 'date-fns';

const datePickerButton = document.querySelector('.date-picker-button');
const datePicker = document.querySelector('.date-picker');
const datePickerHeaderText = document.querySelector('.current-month');
const previousMonthButton = document.querySelector('.prev-month-button');
const nextMonthButton = document.querySelector('.next-month-button');
const dateGrid = document.querySelector('.date-picker-grid-dates')
let currentDate = new Date();

datePickerButton.addEventListener('click', (e) => {
  e.preventDefault();
  datePicker.classList.toggle('show');
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  setUpDatePicker(selectedDate);
  currentDate = selectedDate;
});

function setDate(date) {
  datePickerButton.innerText = format(date, 'MMMM do, yyyy');
  datePickerButton.dataset.selectedDate = getUnixTime(date);
}

function setUpDatePicker(selectedDate) {
  datePickerHeaderText.innerText = format(currentDate, 'MMMM, yyyy');
  setUpDates(selectedDate);
}

function setUpDates(selectedDate) {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate));
  const lastWeeEnd = endOfWeek(endOfMonth(currentDate));
  const dates = eachDayOfInterval({start: firstWeekStart, end: lastWeeEnd})
  dateGrid.innerHTML=""

  dates.forEach(date => {
    const dateElement = document.createElement("button")
    dateElement.classList.add("date")
    dateElement.innerText = date.getDate()
    if (!isSameMonth(date, currentDate)) {
      dateElement.classList.add("date-picker-other-month-date")
    }
    if (isSameDay(date, selectedDate)) {
      dateElement.classList.add("selected")
    }
    console.log(selectedDate)
    dateElement.addEventListener("click", () => {
      setDate(date)
      datePicker.classList.remove("show")
    })

    dateGrid.appendChild(dateElement)
  })
}


nextMonthButton.addEventListener('click', () => {
  currentDate = addMonths(currentDate, 1);
  setUpDatePicker();
});
previousMonthButton.addEventListener('click', () => {
  currentDate = subMonths(currentDate, 1);
  setUpDatePicker();
});

setDate(new Date());
