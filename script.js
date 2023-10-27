import { format, fromUnixTime, getUnixTime, addMonths, subMonths} from 'date-fns'

const datePickerButton = document.querySelector('.date-picker-button')
const datePicker = document.querySelector('.date-picker')
const datePickerHeaderText = document.querySelector(".current-month")
const previousMonthButton = document.querySelector(".prev-month-button")
const nextMonthButton = document.querySelector(".next-month-button")
let currentDate = new Date()


datePickerButton.addEventListener("click", e => {
    e.preventDefault()
    datePicker.classList.toggle('show')
    const selectedDate = fromUnixTime (datePickerButton.dataset.selectedDate)
    setUpDatePicker(selectedDate)
    currentDate = selectedDate
} )

function setDate(date) {
    datePickerButton.innerText = format(date, "MMMM do, yyyy")
    datePickerButton.dataset.selectedDate = getUnixTime(date)
}

function setUpDatePicker() {
 datePickerHeaderText.innerText =  format(currentDate, "MMMM, yyyy")
}


    nextMonthButton.addEventListener('click', () => {
        currentDate = addMonths(currentDate, 1)
        setUpDatePicker()
    }
    )
    previousMonthButton.addEventListener('click', () => {
        currentDate = subMonths(currentDate, 1)
        setUpDatePicker()
    }
    )


setDate(new Date())

