var form = document.getElementById('feedback-form');
var inputs = Array.from(document.querySelectorAll('input'));
var inputErrorClass = 'feedback-form__input_error';
var formInvalidClass = 'feedback-form_invalid';

inputs = inputs.filter(function(input) {
    return input.parentElement === form;
});

form.addEventListener('focus', function(event) {
    var currentElement = event.target;
    if (currentElement.classList.contains(inputErrorClass)) {
        currentElement.classList.remove(inputErrorClass);
    }
}, true);

form.addEventListener('blur', function(event) {
    var currentElement = event.target;
    if (!isValidElement(currentElement)) {
        currentElement.classList.add(inputErrorClass);
    }
}, true);

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var isValidForm = true;

    inputs.forEach(function(input) {
        var isValid = isValidElement(input);
        var isRequired = isRequiredElement(input);

        if (!isValid) {
            input.classList.add(inputErrorClass);
            isValidForm = false;
        }
        if (isRequired && input.value == '') {
            input.classList.add(inputErrorClass);
            isValidForm = false;
        }
    });

    if (isValidForm) {
        alert('Good');
    } else {
        form.classList.add(formInvalidClass);
    }

});

function isRequiredElement(element) {
    return element.dataset.hasOwnProperty('required') ? true : false;
}

function isValidElement(element) {
    var isValid = true;
    if (element.dataset.hasOwnProperty('pattern')) {
        isValid = isValidRegexp(element);
    }
    return isValid;
}

function isValidRegexp(element) {
    var reg = new RegExp(element.dataset.pattern);
    return (element.value == '' || reg.test(element.value));
}