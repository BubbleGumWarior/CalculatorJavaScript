class Calculator {
    constructor(previousCalculationText, currentCalculationText) {
        this.previousCalculationText = previousCalculationText
        this.currentCalculationText = currentCalculationText
        this.clear()
    }

    clear() {
        this.currentCalculation = ''
        this.previousCalculation = ''
        this.calculation = undefined
    }

    delete() {
        this.currentCalculation = this.currentCalculation.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentCalculation.includes('.')) return
        this.currentCalculation = this.currentCalculation.toString() + number.toString()
    }

    chooseCalculation(calculation) {
        if (this.currentCalculation === '') return
        if (this.previousCalculation !== '') {
            this.compute()
        }
        this.calculation = calculation
        this.previousCalculation = this.currentCalculation
        this.currentCalculation = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousCalculation)
        const current = parseFloat(this.currentCalculation)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.calculation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentCalculation = computation
        this.calculation = undefined
        this.previousCalculation = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentCalculationText.innerText =
            this.getDisplayNumber(this.currentCalculation)
        if (this.calculation != null) {
            this.previousCalculationText.innerText =
                `${this.getDisplayNumber(this.previousCalculation)} ${this.calculation}`
        } else {
            this.previousCalculationText.innerText = ''
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const calculationButtons = document.querySelectorAll('[data-calculation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allClear]')
const previousCalculationText = document.querySelector('[data-previousCalculation]')
const currentCalculationText = document.querySelector('[data-currentCalculation]')

const calculator = new Calculator(previousCalculationText, currentCalculationText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

calculationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseCalculation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g
    if (event.key.match(patternForNumbers)) {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if (event.key === '.') {
        event.preventDefault();
        calculator.appendNumber(event.key)
        calculator.updateDisplay()
    }
    if (event.key.match(patternForOperators)) {
        event.preventDefault();
        calculator.chooseCalculation(event.key)
        calculator.updateDisplay()
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.compute()
        calculator.updateDisplay()
    }
    if (event.key === "Backspace") {
        event.preventDefault();
        calculator.delete()
        calculator.updateDisplay()
    }
    if (event.key == 'Delete') {
        event.preventDefault();
        calculator.clear()
        calculator.updateDisplay()
    }

});