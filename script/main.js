// main.js

$(document).ready(function () {

    AOS.init({
        duration: 500,
        offset: 100,
        once: false,
        mirror: true,
    });

    // about 텍스트(sticky) 등장: AOS는 resize 시 sticky 위치로 재계산돼 글자가 사라지므로 IntersectionObserver 사용
    var aboutWrap = document.querySelector('.about_wrap');
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
            aboutWrap.classList.toggle('is-visible', entries[0].isIntersecting);
        }, { rootMargin: '0px 0px -250px 0px' }).observe(aboutWrap);
    } else {
        aboutWrap.classList.add('is-visible');
    }

    // menu
    function setMenu(open) {
        $('header').toggleClass('is-open', open);
        $('.m_btn').attr('aria-expanded', open);
    }

    $('.m_btn').on('click', function () {
        setMenu(!$('header').hasClass('is-open'));
    });

    // 메뉴 링크 클릭 시 닫기
    $('.side_links a').on('click', function () {
        setMenu(false);
    });

    // 데스크톱 너비가 되면 모바일 메뉴 닫기 (햄버거 버튼이 사라져 닫을 방법이 없음)
    $(window).on('resize', function () {
        if (window.innerWidth >= 768) setMenu(false);
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
