const number1Input = document.querySelector('#number1Input');
const number2Input = document.querySelector('#number2Input');
const operandDisplay = document.querySelector('#operandDisplay');
const userInput = document.querySelector('#userInput');

const questionInput = (state) => {
    resetInput();
    const { number1, number2, operand } = state;
    number1Input.value = number1;
    operandDisplay.innerText = operand;
    number2Input.value = number2;
}

const resetInput = () => {
    number1Input.value = '';
    number2Input.value = '';
    userInput.value = '';
    userInput.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
}

export default questionInput;