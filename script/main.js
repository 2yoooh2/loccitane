// main.js

$(document).ready(function () {

    AOS.init();

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
        speed: 700,

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
        mousewheel: true,
        breakpoints: {
            768: {spaceBetween: 70},
        },    //간격

        mousewheel: {
        enabled: true,
    forceToAxis: false,     // ✅ 세로 휠도 가로 슬라이드 넘기게
    releaseOnEdges: true,   // ✅ 마지막/처음에서 휠 → 페이지 스크롤로 넘김
    sensitivity: 1,         // 필요하면 0.5~2 사이로 조절
    thresholdDelta: 10,     // 너무 민감하면 올려   // (선택) 너무 예민하면 조절
        },

        scrollbar: {
            el: ".swiper-scrollbar",
            hide: true,
        }
    });


    

    // footer
    $('.toggle .footer_title').click(function () {
        const $col = $(this).parent();
        const $list = $(this).next('.footer_list');

        if ($col.hasClass('active')) {
            $list.stop().slideUp(400);
            $col.removeClass('active');
        } else {
            $list.stop().slideDown(400);
            $col.addClass('active');
        }
    });



});
