"use sctrict"
window.addEventListener('DOMContentLoaded', () => {
    
    // mobile or pc
    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return(
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows());
        }
    };
    
    if (isMobile.any()) {
        document.body.classList.add('touch');

        mobileScrollFunction();

    } else {
        document.body.classList.add('pc');

        pcScrollFunction();
    }
    // fullScrinSection
    const sections = document.querySelectorAll('section'),
            countSlide = document.querySelector(".slide-count"),
            slideDots = document.querySelector(".slide-dots");

    let slideIndex = 0;

    if ( sections.length > 0) {
        showSlide(slideIndex);
    } 
    for (let i = 0; i < sections.length; i++) setDots(slideDots);

    const dots = document.querySelectorAll('.slide-dot');

    let dotHeight = parseInt(window.getComputedStyle(dots[0]).height);

    if(dots.length > 0) activeDots(slideIndex);

    function pcScrollFunction () {
        document.addEventListener('wheel', (e) => {
            const delta = e.deltaY;

            if (delta > 0) {
                if (slideIndex == (sections.length - 1)) slideIndex = 0;
                else slideIndex++;
                slideDots.style.transform = `translateY(-${dotHeight * slideIndex }px)`
                activeDots(slideIndex);
                showSlide(slideIndex, "next");
            } 
            else if (delta < 0) {
                if (slideIndex <= 0) slideIndex = 0;
                else {
                    slideIndex--;
                    if (slideIndex == 0) slideDots.style.transform = `translateY(-${0}px)`
                    else  slideDots.style.transform = `translateY(-${dotHeight * (slideIndex ) }px)`
                    activeDots(slideIndex);
                } 
                showSlide(slideIndex, "prew");
            }
        });
    }
    function mobileScrollFunction () {
        let toucStartCoord, touchEndCoord;

        window.addEventListener('touchstart', (e) => {
            toucStartCoord = e.changedTouches[0].clientY;
        })
        window.addEventListener('touchend', (e) => {
            touchEndCoord = e.changedTouches[0].clientY;
            if (toucStartCoord > touchEndCoord) {
                if (slideIndex == (sections.length - 1)) slideIndex = 0;
                else slideIndex++;
                slideDots.style.transform = `translateY(-${dotHeight * slideIndex }px)`
                activeDots(slideIndex);
                showSlide(slideIndex, "next");
            }
            else if (toucStartCoord < touchEndCoord ) {
                if (slideIndex <= 0) slideIndex = 0;
                else {
                    slideIndex--;
                    if (slideIndex == 0) slideDots.style.transform = `translateY(-${0}px)`
                    else  slideDots.style.transform = `translateY(-${dotHeight * (slideIndex ) }px)`
                    activeDots(slideIndex);
                } 
                showSlide(slideIndex, "prew");
            }
        })
    }

    function showSlide (i, clas) {
        if (slideIndex > 8) countSlide.textContent = (slideIndex + 1)
        else countSlide.textContent = "0" + (slideIndex + 1)
        sections.forEach(sec => {
            sec.classList.add('_hide');
            sec.classList.remove(clas);
        }); 
        sections[i].classList.remove('_hide');
        sections[i].classList.add('_-show');
        sections[i].classList.add(clas);
    }

    function setDots (parent) {
        const dot = document.createElement('div');
        dot.innerHTML = `
            <div class="slide-dot"></div>
        `
        parent.append(dot);
    }  
    
    function activeDots (i) {
        dots.forEach(dot => dot.classList.remove('active'))
        dots[i].classList.add('active')
    }


});