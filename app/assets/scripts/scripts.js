$(document).ready(function(){
            $("#main-navbar").on("click","a", function (event) {
                event.preventDefault();
                var id  = $(this).attr('href'),
                top = $(id).offset().top;
                $('body,html').animate({scrollTop: top}, 1000);
            });

            $("#btn-arrow_down").on("click","a", function (event) {
                event.preventDefault();
                var id  = $(this).attr('href'),
                top = $(id).offset().top;
                top = top;
                $('body,html').animate({scrollTop: top}, 1000);
            });

            $(window).scroll(function(){
                if ($(this).scrollTop() > window.innerHeight/2 && $(this).scrollTop() + window.innerHeight < $('.footer').offset().top ) {
                    $('.scrollup').css({
                        position: 'fixed',
                        top: window.innerHeight - 60
                    });
                    $('.scrollup').fadeIn('fast');
                } else if ($(this).scrollTop() + window.innerHeight > $('.footer').offset().top) {
                    $('.scrollup').css({
                        position: 'absolute',
                        top: $('.footer').offset().top - 60
                    });
                    $('.scrollup').fadeIn('fast');
                } else {
                    $('.scrollup').fadeOut('fast');
                }
            });

            $('.scrollup').click(function(){
            $("html, body").animate({ scrollTop: 0 }, 1000);
                return false;
            });


            function validateForm(settings) {
                var formId = settings.formId;
                var inputErrorClass = settings.inputErrorClass;

                var form = document.getElementById(formId);

                var inputs = Array.from(form.elements).filter(function(input) {
                    return /input/.test(input.className);
                });

                form.addEventListener('focus', function(event) {
                    $('.feedback-form__error-msg').fadeOut();
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
                        var formData = inputs.reduce(function(acc, item) {
                            if (!acc.hasOwnProperty(item.name)) {
                                acc[item.name] = item.value;
                            }
                            return acc;
                        }, {});
                        sendForm(formId, formData);
                    } else {
                        $('.feedback-form__error-msg').fadeIn();
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
                    return reg.test(element.value);
                }

            }

            validateForm({
                formId: 'feedback-form',
                inputErrorClass: 'feedback-form__input_invalid'
            });


            function sendForm(formId, formData) {
                formId = '#' + formId;
                $.ajax({
                    url: '',
                    type: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(formData),
                    success: function(data) {
                        $('.popup__message').text('Your message has been sent successfully.');
                        $('.popup').fadeIn();
                        $(formId).find('input').val('');
                        $(formId).trigger('reset');
                    },
                    error: function() {
                        $('.popup__message').text('Unexpected errors occurred while submitting the message.');
                        $('.popup').fadeIn();
                        $(formId).find('input').val('');
                        $(formId).trigger('reset');
                    }
                });
            }
    $('.popup__btn-close').click(function() {
        $('.popup').fadeOut('fast');
    });
});