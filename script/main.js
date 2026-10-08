// main.js

$(document).ready(function () {

    AOS.init({
        duration: 500,
        offset: 100,
        once: false,
        mirror: true,
    });

    // Key Ingredient 카드 등장: AOS는 스크롤 위치만 봐서 사진/텍스트 순서가 섞이므로 직접 순차 처리
    // 사진 → 텍스트 → 다음 카드 사진 … 순서로, 앞 요소가 나온 뒤에만 다음 요소가 나옴
    var revealEls = $('.ingredient_list .ingredient_img, .ingredient_list .ingredient_text').toArray();
    var revealOffset = 100; // AOS offset과 동일
    var revealBusyUntil = 0;
    var revealTimer = null;
    var revealTicking = false;

    $('.ingredient_list').addClass('js-reveal');

    // 다음 요소가 나오기까지 기다릴 시간: 사진 뒤엔 짧게, 텍스트 뒤엔 데스크탑만 등장(0.5s)이 끝날 때까지
    function revealGap(el) {
        if ($(el).hasClass('ingredient_img')) return 200;
        return window.matchMedia('(min-width: 1750px)').matches ? 500 : 200;
    }

    function revealStep() {
        var trigger = window.innerHeight - revealOffset;

        // 위로 스크롤해 다시 트리거 아래로 내려간 요소는 숨김 (AOS mirror와 같은 동작)
        revealEls.forEach(function (el) {
            if (el.classList.contains('is-revealed') && el.getBoundingClientRect().top > trigger) {
                el.classList.remove('is-revealed');
            }
        });

        // 아직 안 나온 첫 요소부터 순서대로 하나씩 등장
        for (var i = 0; i < revealEls.length; i++) {
            var el = revealEls[i];
            if (el.classList.contains('is-revealed')) continue;

            var rect = el.getBoundingClientRect();
            if (rect.top > trigger) return;

            // 이미 화면 위로 지나간 요소는 기다리지 않고 바로 표시
            if (rect.bottom < 0) {
                el.classList.add('is-revealed');
                continue;
            }

            var now = Date.now();
            if (now < revealBusyUntil) {
                clearTimeout(revealTimer);
                revealTimer = setTimeout(revealStep, revealBusyUntil - now);
                return;
            }

            el.classList.add('is-revealed');
            revealBusyUntil = now + revealGap(el);
        }
    }

    $(window).on('scroll resize', function () {
        if (revealTicking) return;
        revealTicking = true;
        requestAnimationFrame(function () {
            revealTicking = false;
            revealStep();
        });
    });
    revealStep();

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
