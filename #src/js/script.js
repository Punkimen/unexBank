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

});

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
$('.add-card__btn').on('click', function () {
    $('.cabinet-new__item--newCard').show()
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

// adress-switch
const adressSwitch = $('#adress-switch')
const actualAddress = $('#actual-address')

adressSwitch.on('change', function () {
    if (adressSwitch.prop('checked') === false) {
        actualAddress.addClass('show')
    } else {
        actualAddress.removeClass('show')
    }
})

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
                console.log(count);

                $('.step-progress__item').eq(count - 1).addClass('current')
                $('.step-progress__item').eq(count - 2).addClass('done')
                return count
            }
        },
        prevStep() {
            if (count != 2) {
                count--
                stepCount.innerText = count;
                console.log(count);

                $('.step-progress__item').eq(count).removeClass('current')
                $('.step-progress__item').eq(count - 1).removeClass('done')
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


// photo do

const tabs = $('.photo-do__tab')
const tabsBody = $('.photo-do__tab-body')
tabs.on('click', function () {
    $(this).addClass('active').siblings().removeClass("active")
    let index = $(this).index()
    tabsBody.hide(100)
    tabsBody.eq(index).show(110)
})
// photo do end


// webcam
const instructionsForMan = [
    { "img": "./img/photo-instruction/man_1.svg", "text": "Улыбнитесь" },
    { "img": "./img/photo-instruction/man_2.svg", "text": "Поверните голову влево" },
    { "img": "./img/photo-instruction/man_3.svg", "text": "Покажите кулак" },
    { "img": "./img/photo-instruction/man_4.svg", "text": "Покажите ладонь" },
    { "img": "./img/photo-instruction/man_5.svg", "text": "Покажите два пальца" },
    { "img": "./img/photo-instruction/man_6.svg", "text": "Откройте глаза" },
    { "img": "./img/photo-instruction/man_7.svg", "text": "Супер! Идем дальше!" },
    { "img": "./img/photo-instruction/man_8.svg", "text": "Упс! Попробуйте еще раз!" },
];
const instructionsForWoman = [
    { "img": "./img/photo-instruction/woman_1.svg", "text": "Улыбнитесь" },
    { "img": "./img/photo-instruction/woman_2.svg", "text": "Поверните голову влево" },
    { "img": "./img/photo-instruction/woman_3.svg", "text": "Покажите кулак" },
    { "img": "./img/photo-instruction/woman_4.svg", "text": "Покажите ладонь" },
    { "img": "./img/photo-instruction/woman_5.svg", "text": "Покажите два пальца" },
    { "img": "./img/photo-instruction/woman_6.svg", "text": "Откройте глаза" },
    { "img": "./img/photo-instruction/woman_7.svg", "text": "Супер! Идем дальше!" },
    { "img": "./img/photo-instruction/woman_8.svg", "text": "Упс! Попробуйте еще раз!" },
]
const video = document.querySelector('#video');

if (video) {
    const canvas = document.querySelector('#canvas');
    const context = canvas.getContext('2d');
    const photo = document.querySelector('.your-photo')
    const photoBtnSnap = document.querySelector("#snap")
    const openPhotoBtn = document.querySelectorAll('.photo-do__btn')
    const photoPopup = document.querySelector('.photo-popup')
    const savePhotoBtn = document.querySelector('#save-snap')
    const photoOne = document.querySelector('.photo-1')
    const photoTwo = document.querySelector('.photo-2')
    const photoThree = document.querySelector('.photo-3')
    const photoFour = document.querySelector('.photo-4')
    const photoFive = document.querySelector('.photo-5')
    const NewPhotoBtn = document.querySelectorAll('.photo-newDo__btn')
    const startVerification = document.querySelector("#start-verification")
    const verificationInstruction = document.querySelector(".photo-popup__instruction")



    // Получаем доступ к камере
    openPhotoBtn.forEach(el => {
        el.addEventListener('click', function () {
            photoPopup.classList.add('show')
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                });
            } else {
                console.log('Камера не подключена!');
            }
            console.log(el.getAttribute('data-photo'))
            if (el.getAttribute('data-photo') == 1) {
                savePhotoBtn.setAttribute('data-photo', 1)
            } else if (el.getAttribute('data-photo') == 2) {
                savePhotoBtn.setAttribute('data-photo', 2)
                console.log('w');
            } else if (el.getAttribute('data-photo') == 3) {
                savePhotoBtn.setAttribute('data-photo', 3)
                console.log('w');
            } else if (el.getAttribute('data-photo') == 4) {
                savePhotoBtn.setAttribute('data-photo', 4)
                console.log('w');
            } else if (el.getAttribute('data-photo') == 5) {
                savePhotoBtn.setAttribute('data-photo', 5)
                console.log('w');
            }
        })
    })

    // Обработчик события нажатия на кнопку "Сделать снимок"
    photoBtnSnap.addEventListener("click", function () {
        if (photoBtnSnap.getAttribute('data-photo') === 'do') {
            context.drawImage(video, 0, 0, 430, 263);
            photo.setAttribute('src', canvas.toDataURL('image/png'));
            photoBtnSnap.setAttribute('data-photo', "new")
            photo.style.display = 'block'
            savePhotoBtn.classList.add('show')
        } else {
            photoBtnSnap.setAttribute('data-photo', "do")
            photo.style.display = 'none'
            savePhotoBtn.classList.remove('show')
        }
    });

    savePhotoBtn.addEventListener('click', function () {
        if (savePhotoBtn.getAttribute('data-photo') == 1) {
            photoOne.setAttribute('src', canvas.toDataURL('image/png'));
            NewPhotoBtn.forEach(el => {
                if (el.getAttribute('data-photo') == 1) {
                    el.style.display = 'block'
                }
            })
        } else if (savePhotoBtn.getAttribute('data-photo') == 2) {
            photoTwo.setAttribute('src', canvas.toDataURL('image/png'));
            NewPhotoBtn.forEach(el => {
                if (el.getAttribute('data-photo') == 2) {
                    el.style.display = 'block'
                }
            })
        } else if (savePhotoBtn.getAttribute('data-photo') == 3) {
            photoThree.setAttribute('src', canvas.toDataURL('image/png'));
            NewPhotoBtn.forEach(el => {
                if (el.getAttribute('data-photo') == 3) {
                    el.style.display = 'block'
                }
            })
        } else if (savePhotoBtn.getAttribute('data-photo') == 4) {
            photoFour.setAttribute('src', canvas.toDataURL('image/png'));
            NewPhotoBtn.forEach(el => {
                if (el.getAttribute('data-photo') == 4) {
                    el.style.display = 'block'
                }
            })
        } else if (savePhotoBtn.getAttribute('data-photo') == 5) {
            photoFive.setAttribute('src', canvas.toDataURL('image/png'));
            NewPhotoBtn.forEach(el => {
                if (el.getAttribute('data-photo') == 5) {
                    el.style.display = 'block'
                }
            })
        }
        photoPopup.classList.remove('show')
    })
    startVerification.addEventListener('click', function () {
        function changeInstruction(i) {
            console.log(instructionsForMan[i]);
            if (i < instructionsForMan.length) {
                setInterval(function () {
                    // console.log(instructionsForMan[i]);
                    verificationInstruction.innerHTML = `
                    <img src="${instructionsForMan[i].img}" alt="">
                    <p>${instructionsForMan[i].text}</p>
                    `
                    i++;
                }, 1000);
            }
        }

        changeInstruction(0);
    })

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
                })
            })
        }
    }
    temporarily.addValue();
}

// signature paint

const canvas = document.querySelector('#signature-paint');
const clear = document.querySelector('.contract-signature__clear');
const ctx = canvas.getContext('2d');



// ctx.fillRect(x, y, 5, 5)
canvas.addEventListener('mousedown', function () {
    const paint = function (e) {
        let x = e.offsetX;
        let y = e.offsetY;
        ctx.fillRect(x, y, 2, 2)
    }
    canvas.addEventListener('mousemove', paint)
    canvas.addEventListener('mouseup', function () {
        console.log('w');
        canvas.removeEventListener('mousemove', paint)
    })
})
clear.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})