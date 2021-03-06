'use strict'

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const popupCloseIcon = document.querySelectorAll('.close-popup');

let unlock = true;
let checkPopup = false;

const timeout = 600;

$(document).ready(function(){
    $('.sliderBig').slick({
        arrows: false,
        dots: true
    });
});

$(document).ready(function(){
    $('.slider').slick({
        arrows: true
    });
});

$(document).ready(function(){
    $('.header__burger').click(function(e) {
        if (checkPopup == false) {
            const margin__top = document.querySelector('.nav').getBoundingClientRect().bottom + "px";
            $('.header__burger').toggleClass('active');
            document.querySelector('.header__menu').style.top = margin__top; 
            checkPopup = checkPopup == false ? true : false;            
        } else {
            $('.header__burger').toggleClass('active');
            document.querySelector('.header__menu').style.top = '-100%'; 
            checkPopup = checkPopup == false ? true : false;            
        }
        $('body').toggleClass('lock');
    }); 
    $('.navigation-item').click (function(e) {
        $('.header__burger.active').removeClass('active');
        document.querySelector('.header__menu').style.top = '-100%'; 
        $('body').removeClass('lock');
        checkPopup = checkPopup == false ? true : false;    
    });
});


if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            curentPopup.style.display = "block";
            if (popupName == 'popup_2')
            {
                const popupClosest = popupLink.closest('.types-jalousie');
                const popupTitle = popupClosest.querySelector('.types-jalousie-figure-caption').textContent;
                const popupImg = popupClosest.querySelector('.figure-img').getAttribute('src').replace('.jpg', '-slide.jpg');
                popupOpen(curentPopup, popupTitle, popupImg);
            }       
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
} 


if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            const targetClose = e.target.closest('.popup') ? e.target.closest('.popup') : e.target.closest('.popup_dynamic');
            popupClose(targetClose);
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup, popupTitle = '', popupImg = '') {
    if (curentPopup && unlock) {
        if (popupTitle && popupImg){
            curentPopup.querySelector('.popup__title').innerHTML = popupTitle;
            curentPopup.querySelector('.popup__slider').innerHTML = '';
            curentPopup.querySelector('.popup__slider').insertAdjacentHTML('afterbegin', 
            `<div class="slider__item">
                <img src="${popupImg}" alt="">
            </div>
            <div class="slider__item">
                <img src="${popupImg}" alt="">
            </div>
            <div class="slider__item">
                <img src="${popupImg}" alt="">
            </div>
            <div class="slider__item">
                <img src="${popupImg}" alt="">
            </div>
            <div class="slider__item">
                <img src="${popupImg}" alt="">
            </div>`)
            $(document).ready(function(){
                $('.popup__slider').slick({
                    arrows: true,
                    dots: true
                });
            });
        }
        bodyLock();
        curentPopup.classList.add('open');
        curentPopup.addEventListener('click', function(e) {
            if (!e.target.closest('.popup__content')) {
                const targetClose = e.target.closest('.popup') ? e.target.closest('.popup') : e.target.closest('.popup_dynamic');
                popupClose(targetClose);
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    } 
    setTimeout(function () {
        if (popupActive.className == 'popup_dynamic') {
            $('.popup__slider').slick('unslick');
        }
    }, timeout);   
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function () {
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        }
    }
})();
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();
