class Calculator {
    constructor() {
        this.expressionDisplay = document.getElementById('expression');
        this.resultDisplay = document.getElementById('result');
        this.buttons = document.querySelectorAll('.btn');
        this.expression = '';
        this.previousResult = 0;
        this.operator = null;
        this.shouldResetDisplay = false;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => this.handleButtonClick(button));
        });

        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleKeyboard(e) {
        if (e.key >= '0' && e.key <= '9') this.appendNumber(e.key);
        if (e.key === '.') this.appendDecimal();
        if (e.key === '+') this.handleOperator('+');
        if (e.key === '-') this.handleOperator('−');
        if (e.key === '*') this.handleOperator('×');
        if (e.key === '/') { e.preventDefault(); this.handleOperator('÷'); }
        if (e.key === 'Enter') { e.preventDefault(); this.calculate(); }
        if (e.key === 'Backspace') this.deleteLast();
        if (e.key === 'Escape') this.clear();
    }

    handleButtonClick(button) {
        const value = button.textContent;

        if (button.classList.contains('number-btn')) {
            this.appendNumber(value);
        } else if (button.classList.contains('operator-btn')) {
            this.handleOperator(value);
        } else if (button.classList.contains('function-btn')) {
            this.handleFunction(value);
        } else if (button.classList.contains('clear-btn')) {
            this.clear();
        } else if (button.id === 'enter-btn') {
            this.calculate();
        }
    }

    appendNumber(num) {
        if (this.shouldResetDisplay) {
            this.expression = num;
            this.shouldResetDisplay = false;
        } else {
            this.expression += num;
        }
        this.updateDisplay();
    }

    appendDecimal() {
        if (this.shouldResetDisplay) {
            this.expression = '0.';
            this.shouldResetDisplay = false;
        } else if (!this.expression.includes('.')) {
            this.expression += '.';
        }
        this.updateDisplay();
    }

    handleOperator(op) {
        if (this.expression === '') return;

        if (this.operator !== null && !this.shouldResetDisplay) {
            this.calculate();
        }

        this.previousResult = parseFloat(this.expression);
        this.operator = op;
        this.expression = '';
        this.shouldResetDisplay = true;
    }

    handleFunction(func) {
        switch (func) {
            case 'clear':
                this.clear();
                break;
            case 'del':
                this.deleteLast();
                break;
            case 'ans':
                this.expression = this.previousResult.toString();
                this.shouldResetDisplay = true;
                this.updateDisplay();
                break;
            case '(':
                if (this.shouldResetDisplay) this.expression = '(';
                else this.expression += '(';
                this.shouldResetDisplay = false;
                this.updateDisplay();
                break;
            case ')':
                this.expression += ')';
                this.updateDisplay();
                break;
            case '.':
                this.appendDecimal();
                break;
        }
    }

    deleteLast() {
        this.expression = this.expression.slice(0, -1);
        this.updateDisplay();
    }

    clear() {
        this.expression = '';
        this.previousResult = 0;
        this.operator = null;
        this.expressionDisplay.value = '';
        this.resultDisplay.textContent = '0';
        this.shouldResetDisplay = false;
    }

    calculate() {
        if (this.expression === '' && this.operator === null) return;

        try {
            let result;
            
            if (this.operator !== null && this.expression !== '') {
                result = this.performOperation(this.previousResult, parseFloat(this.expression), this.operator);
            } else {
                // Evaluate expression with support for math operations
                let expr = this.expression
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/−/g, '-')
                    .replace(/√/g, 'Math.sqrt');
                
                result = Function('"use strict"; return (' + expr + ')')();
            }

            this.previousResult = result;
            this.expressionDisplay.value = this.expression + ' = ' + this.formatResult(result);
            this.resultDisplay.textContent = this.formatResult(result);
            this.expression = result.toString();
            this.operator = null;
            this.shouldResetDisplay = true;
        } catch (error) {
            this.resultDisplay.textContent = 'Error';
            this.expression = '';
        }
    }

    performOperation(prev, current, op) {
        switch (op) {
            case '+':
                return prev + current;
            case '−':
                return prev - current;
            case '×':
                return prev * current;
            case '÷':
                return current !== 0 ? prev / current : 0;
            case '%':
                return prev % current;
            case '√':
                return Math.sqrt(prev);
            case '±':
                return -prev;
            default:
                return current;
        }
    }

    updateDisplay() {
        this.resultDisplay.textContent = this.expression || '0';
    }

    formatResult(num) {
        // Handle very large or very small numbers
        if (Math.abs(num) > 1e10 || (Math.abs(num) < 1e-6 && num !== 0)) {
            return num.toExponential(6);
        }
        
        // Round to 10 decimal places to avoid floating point errors
        const rounded = Math.round(num * 1e10) / 1e10;
        return rounded;
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});