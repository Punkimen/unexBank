$(document).ready(function () {
    $('.burger__icon').on('click', function () {
        $(this).toggleClass('active');
        $('.header__mobile').slideToggle();
    });
    const addActive = (element, className) => {
        element.on('click', function () {
            $(this).addClass(className).siblings().removeClass(className);
        })
    }
    addActive($('.header__lang'), 'active');
    addActive($('.header__mobile-lang'), 'active');
    addActive($('.tabs__name-item'), 'active');

    $('.questions-item__header').on('click', function () {
        $(this).parents('.questions-item').toggleClass('active')
        $(this).parents('.questions-item').children('.questions-item__body').slideToggle();
    })



    const equalHeightContent = (element) => {
        let imgHeidht = $('.online__images').height();
        element.height(imgHeidht);
    }
    equalHeightContent($('.online__content'))

    // calculation position
    const calcBlockResize = () => {
        let windowWidth = $(window).width();
        const creditCalc = $('.credit-calc__calculation')
        if (windowWidth <= 992) {
            $('.relative-calc-block').append(creditCalc)
        } else {
            $('.credit-calc__wrapper').append(creditCalc)
        }
    }
    calcBlockResize()
    $(window).resize(function () {
        let windowWidth = $(window).width();

        contentHeigh();

        calcBlockResize()
        equalHeightContent($('.online__content'))
    })
    $('.accordion__title').on('click', function () {
        $(this).toggleClass('active').next().slideToggle();
        return false;
    });







    // scrollbar
    $('.online__content').mCustomScrollbar({
        axis: "y",
    });
    $('.instruction-content__text--scroll').mCustomScrollbar({
        axis: "y",
    });
    $('.table-scroll').mCustomScrollbar({
        axis: "y",
    });
    // scrollbar end
    // slick silder
    $('.intresting-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: true,
        prevArrow: '<div class="slider-arrow slider-arrow--prev"></div>',
        nextArrow: '<div class="slider-arrow slider-arrow--next"></div>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                }
            },
        ]
    })

    // slick silder end
    const contentHeigh = () => {
        let mainHeight = $('.instruction__wrapper').height();
        let titleHeight = $('.instruction-content__title').height() + parseInt($('.instruction-content__title').css('marginBottom'));
        let headHeight = $('.instruction-content__head').height() + parseInt($('.instruction-content__head').css('marginBottom'));
        let upperHeight = titleHeight + headHeight;
        let downHeight = $('.instruction-footer').height();
        let contentHeight = mainHeight - upperHeight - downHeight - parseInt($('.instruction-content__text').css('paddingBottom'));
        $('.instruction-content__text').height(contentHeight);
    }
    contentHeigh();
});


$('#about-link').on('click', function () {
    $('.footer__left-about').slideToggle();
    return false;
})
$('#useful-link').on('click', function () {
    $('.footer__left-useful').slideToggle();
    return false;
})
// modalWindow
$('.modal-close').on('click', function () {
    $(this).parent().hide();
})
// modalWindow

// personalCabinet

let cabinetTypesPas = $('.typePassport')
cabinetTypesPas.on('change', function () {
    if ($(this).is('#radio_passport')) {
        $('.cabinet-new__item--passport').show()
        $('.cabinet-new__item--idCard').hide()
    } else {
        $('.cabinet-new__item--passport').hide()
        $('.cabinet-new__item--idCard').show()
    }
})
$('#addCard').on('click', function () {
    $('.choosen-card__new').show()
})

$('.credit-table__col--creditNum').on('click', function () {
    $(this).toggleClass('active')
    $(this).parent().next().slideToggle()
})
// personalCabinet end


// calc
let $range = $("#calculation-range-summ"),
    $input = $("#calculation-summ"),
    instance,
    min = 3000,
    max = 30000,
    plus = $('.calculation-item__arrow--top'),
    minus = $('.calculation-item__arrow--bottom');

$('#calculation-range-summ').ionRangeSlider({
    min: 3000,
    max: 30000,
    step: 500,
    onStart: function (data) {
        $input.prop("value", data.from);
    },
    onChange: function (data) {
        $input.prop("value", data.from);
    }
})
instance = $range.data("ionRangeSlider");
$input.on("input", function () {
    var val = $(this).prop("value");

    // validate
    if (val < min) {
        val = min;
    } else if (val > max) {
        val = max;
    }

    instance.update({
        from: val
    });
});
plus.on('click', function () {
    let value = +$input.val()
    value += 500;
    if (value > 30000) {
        return false
    }
    $input.val(value)
    instance.update({
        from: value
    });
})
minus.on('click', function () {
    let value = +$input.val()
    value -= 500;
    if (value < 3000) {
        return false
    }
    $input.val(value)
    instance.update({
        from: value
    });
})
// calc


$('select').on('change', function () {
    $(this).css('color', '#333');
})

$('.file').on('change', function () {
    $(this).children('.select-file').css('display', 'none');
    $(this).children('.downloaded-file').css('display', 'inline-block');
})



// timer
const timerBlock = document.querySelector('.timer')
if (timerBlock) {
    let formatDate = 'December 31, 2021 00:00:00'

    let toDate = new Date(formatDate).getTime();
    let timer = setInterval(function () {
        let nowDate = new Date().getTime();
        let distance = toDate - nowDate;
        let day = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        $('.timer').text(day + ' д ' + hours + ' ч ' + minutes + ' м ' + seconds + ' с');
        console.log(distance)
        if (distance <= 86400000 && distance >= 3600000) {
            $('.timer').text(hours + ' ч ' + minutes + ' м ' + seconds + ' с');
        } else if (distance <= 3600000 && distance >= 0) {
            $('.timer').text(minutes + ' м ' + seconds + ' с');
        } else if (distance < 0) {
            clearInterval(timer);
            $('.timer').text("Время истекло")
        }
    }, 1000)
}
// timer end

// registration

let rules = {
    filterInp(textbox, inputFilter, val) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
            textbox.addEventListener(event, function () {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                }
            });
        });
    },
}
if (document.querySelector('input[name="phone"]')) {
    rules.filterInp(document.querySelector('input[name="phone"]'), function (value) {
        return /^\d*\.?\d*$/.test(value);
    });
}
if (document.querySelector('input[name="series"]')) {
    rules.filterInp(document.querySelector('input[name="series"]'), function (value) {
        return /^\d*\.?\d*$/.test(value);
    });
}
if (document.querySelector('input[name="passportNum"]')) {
    rules.filterInp(document.querySelector('input[name="passportNum"]'), function (value) {
        return /^\d*\.?\d*$/.test(value);
    });
}
if (document.querySelector('input[name="inn"]')) {
    rules.filterInp(document.querySelector('input[name="inn"]'), function (value) {
        return /^\d*\.?\d*$/.test(value);
    });
}
if (document.querySelector('input[name="child"]')) {
    rules.filterInp(document.querySelector('input[name="child"]'), function (value) {
        return /^\d*\.?\d*$/.test(value);
    });
}
if (document.querySelector('input[name="workPhone"]')) {
    rules.filterInp(document.querySelector('input[name="workPhone"]'), function (value) {
        return /^\d*\.?\d*$/.test(value);
    });
}
let typePas = $('.typePassport')
typePas.on('change', function () {
    if ($(this).is('#radio_passport')) {
        $('.passport__inner').show()
        $('.idCard__inner').hide()
    } else {
        $('.passport__inner').hide()
        $('.idCard__inner').show()
    }
})

$('#step_1').validate({
    rules: {
        fullName: {
            required: true,
            minlength: 2,
        },
        phone: {
            required: true,
        },
        status: {
            required: true,
        },
        dateBornDay: {
            required: true,
        },
        dateBornMounth: {
            required: true,
        },
        dateBornYear: {
            required: true,
        },
        series: {
            required: true,
        },
        passportNum: {
            required: true,
        },
        issued: {
            required: true,
        },
        inn: {
            required: true,
        },
        inn: {
            required: true,
        },
        "date-day": {
            required: true,
        },
        "date-month": {
            required: true,
        },
        "date-year": {
            required: true,
        },
        IDCard: {
            required: true,
        },
        checkbox: {
            required: true,
        }
    },
});

// steps2-5

let formSteps = document.querySelector('#step_1-5')
if (formSteps) {
    let count = 2;
    const stepCount = document.querySelector('.step-count');
    const nextBtn = $('#step__btn-next');
    const prevBtn = $('#step__btn-prev');
    const stepItem = document.querySelectorAll('.reg__step-item');
    stepCount.innerText = count;

    steps = {
        nextStep() {
            if (count != 5) {
                count++
                stepCount.innerText = count;
                return count
            }
        },
        prevStep() {
            if (count != 2) {
                count--
                stepCount.innerText = count;
                return count
            }
        },
        renderStep() {
            stepItem.forEach(function (el) {
                let stepCount = +el.dataset.step
                if (stepCount == count) {
                    el.classList.add('active')
                } else {
                    el.classList.remove('active')
                }
            })
        },
        showBtn() {
            if (count === 5) {
                $('#step__btn-next').hide()
                $('#submitBtn').show()
            } else {
                $('#step__btn-next').show()
                $('#submitBtn').hide()
            }
        },
    }
    $("#step_1-5").validate({
        rules: {
            status: {
                required: true,
            },
            education: {
                required: true,
            },
            child: {
                required: true,
            },
            name: {
                required: true,
            },
            surname: {
                required: true,
            },
            middleName: {
                required: true,
            },
            phone: {
                required: true,
            },
            statusRelationship: {
                required: true,
            },
            country: {
                required: true,
            },
            region: {
                required: true,
            },
            district: {
                required: true,
            },
            TypeOfRegion: {
                required: true,
            },
            nameregion: {
                required: true,
            },
            typeOfStreet: {
                required: true,
            },
            street: {
                required: true,
            },
            home: {
                required: true,
            },
            appart: {
                required: true,
            },
            term: {
                required: true,
            },
            index: {
                required: true,
            },
            nameWork: {
                required: true,
            },
            industry: {
                required: true,
            },
            numberEmployees: {
                required: true,
            },
            workPhone: {
                required: true,
            },
            employment: {
                required: true,
            },
            positionCat: {
                required: true,
            },
            specialty: {
                required: true,
            },
            workTerm: {
                required: true,
            },
            totalExperience: {
                required: true,
            },
            workRegion: {
                required: true,
            },
            workDistrict: {
                required: true,
            },
            workTypesRegion: {
                required: true,
            },
            workIndex: {
                required: true,
            },
            workNameRegion: {
                required: true,
            },
            workTypesOfStreet: {
                required: true,
            },
            workStreet: {
                required: true,
            },
            workHome: {
                required: true,
            },
            workCorps: {
                required: true,
            },
            workOffice: {
                required: true,
            },
            last: {
                required: true,
            },
            pay: {
                required: true,
            },
            summ: {
                required: true,
            },
            summIncome: {
                required: true,
            },
            'date-day': {
                required: true,
            },
            'date-month': {
                required: true,
            },
            'date-year': {
                required: true,
            },
        },
    })

    nextBtn.on('click', e => {
        e.preventDefault();
        if (!$("#step_1-5").valid()) {
            return
        }
        steps.nextStep()
        steps.renderStep()
        steps.showBtn()
    });
    prevBtn.on('click', e => {
        e.preventDefault();
        steps.prevStep()
        steps.renderStep()
        steps.showBtn()
    });


}

// steps2-5 end

// registration end
// webcam
let camera = document.querySelector('#my_camera')
if (camera) {
    Webcam.set({
        width: 320,
        height: 240,
        dest_width: 320,
        dest_height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90,
        force_flash: false,
        flip_horiz: true,
        fps: 45
    });
    Webcam.attach('#my_camera');
    function take_snapshot() {
        Webcam.snap(function (data_uri) {
            document.getElementById('my_camera').innerHTML = '<img src="' + data_uri + '"/>';
        });
    }
}
// webcam

// popup
$(function () {
    $('.popup-modal').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#username',
        closeOnBgClick: true,
        enableEscapeKey: true,
        closeBtnInside: false
    });
    $(document).on('click', '.popup__exit', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
});


// get date

const form = document.querySelector('#step_1');
const form2 = document.querySelector('#step_1-5');
const formInput = document.querySelectorAll('input')
const formSelect = document.querySelectorAll('select')
if (form || form2) {
    const temporarily = {
        objInputs: [],

        addValue(name) {
            formInput.forEach((el) => {
                el.addEventListener('change', (e) => {
                    let inputName = e.target.name
                    let inputValue = e.target.value
                    let date = new Date();
                    const thisInput = this.objInputs.find(item => item.name == inputName);
                    if (thisInput) {
                        thisInput.value = inputValue;
                        thisInput.date = date;
                    } else {
                        this.objInputs.push({
                            name: inputName,
                            value: inputValue,
                            date: date,
                        })
                    }
                    console.log(this.objInputs);
                })
            })
            formSelect.forEach((el) => {
                el.addEventListener('change', (e) => {
                    let inputName = e.target.name
                    let inputValue = e.target.value
                    let date = new Date();
                    const thisInput = this.objInputs.find(item => item.name == inputName);
                    if (thisInput) {
                        thisInput.value = inputValue;
                        thisInput.date = date;
                    } else {
                        this.objInputs.push({
                            name: inputName,
                            value: inputValue,
                            date: date,
                        })
                    }
                    console.log(this.objInputs);
                })
            })
        }
    }

    temporarily.addValue();

}

