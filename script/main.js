// main.js

$(document).ready(function () {

    AOS.init({
        duration: 500,
        offset: 100,
        once: false,
        mirror: true,
    });

    // menu
    $('.m_btn').on('click', function () {
        $('header').toggleClass('is-open');
    });


    
    $("a").click(function(){
        return false
    })


    // best
    var bestSwiper = new Swiper(".bestSwiper", {
        slidesPerView: 1,
        loop: true,
        speed: 500,

        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });

    // commit
    var commitSwiper = new Swiper(".commitSwiper", {
        slidesPerView: 'auto',
        centeredSlides: true,       //가운데
        spaceBetween: 30,
        breakpoints: {
            768: {spaceBetween: 70},
        },    //간격

        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
        }
    });


    

    // footer
    $('.toggle .footer_title').click(function () {
        if (window.innerWidth >= 768) return;   // 데스크톱은 항상 펼침

        const $col = $(this).parent();
        const $list = $(this).next('.footer_list');

        if ($col.hasClass('active')) {
            $list.stop().slideUp(300);
            $col.removeClass('active');
        } else {
            $list.stop().slideDown(300);
            $col.addClass('active');
        }
    });

    // 화면 크기 변경 시 slideUp/Down이 남긴 인라인 스타일 제거
    var footerIsDesktop = window.innerWidth >= 768;
    $(window).on('resize', function () {
        var isDesktop = window.innerWidth >= 768;
        if (isDesktop !== footerIsDesktop) {
            footerIsDesktop = isDesktop;
            $('.footer_list').stop(true, true).removeAttr('style');
            $('.footer_col').removeClass('active');
        }
    });

});
