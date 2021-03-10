const number1Input = document.querySelector('#number1Input');
const number2Input = document.querySelector('#number2Input');
const operandDisplay = document.querySelector('#operandDisplay');

const questionInput = (state) => {
    const { number1, number2, operand } = state;
    number1Input.value = number1;
    operandDisplay.innerText = operand;
    number2Input.value = number2;
}

export default questionInput;