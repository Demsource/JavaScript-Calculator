const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operator = undefined
    }

    delete() {
        if (this.currentOperand) {
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
            this.updateDisplay()
        }
    }

    appendNumber(number) {
        if (this.currentOperand.includes('.') && number == '.') return
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay()
    }

    chooseOperation(operator) {
        if (!this.currentOperand) return
        if (this.previousOperand) {
            this.calculate()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    calculate() {
        let computation
        let previous = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand)
        if (isNaN(current) || isNaN(previous)) return
        switch (this.operator) {
            case '-':
                computation = previous - current
                break
            case '+':
                computation = previous + current
                break
            case '÷':
                computation = previous / current
                break
            case '*':
                computation = previous * current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.previousOperand = ''
        this.operator = undefined
    }

    formatDisplayNumber(number) {
        let intOutput
        let integerDigits = parseFloat(number.toString().split('.')[0])
        let decimalDigits = number.toString().split('.')[1]
        if (!integerDigits) {
            intOutput = ''
        } else {
            intOutput = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${intOutput}.${decimalDigits}`
        } else {
            return intOutput
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand)
        if (this.operator) {
            this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operator}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => calculator.delete())

numberButtons.forEach(button => {
    button.addEventListener('click', () => calculator.appendNumber(button.innerText))
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
    calculator.clear()
})