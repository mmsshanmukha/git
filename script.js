document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                currentInput += value;
                display.textContent = currentInput;
            } else if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.textContent = '0';
            } else if (value === 'DEL') {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || '0';
            } else if (value === '=') {
                if (previousInput && currentInput && operator) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else {
                if (currentInput) {
                    if (previousInput) {
                        previousInput = calculate(previousInput, currentInput, operator);
                    } else {
                        previousInput = currentInput;
                    }
                    operator = value;
                    currentInput = '';
                }
            }
        });
    });

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            default:
                return '';
        }
    }
});
