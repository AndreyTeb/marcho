$(function() {

  $('.blog-page__slider').slick({
    prevArrow: '<button type="button" class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="10px" height="20px" viewBox="0 0 10 20" version="1.1"><g><path d="M 1.242188 9.335938 L 6.554688 4.023438 C 6.917969 3.65625 7.507812 3.65625 7.875 4.023438 L 8.757812 4.90625 C 9.125 5.273438 9.125 5.867188 8.757812 6.230469 L 4.996094 10 L 8.757812 13.765625 C 9.132812 14.132812 9.132812 14.726562 8.757812 15.085938 L 7.882812 15.976562 C 7.507812 16.34375 6.917969 16.34375 6.554688 15.976562 L 1.242188 10.664062 C 0.867188 10.296875 0.867188 9.703125 1.242188 9.335938 Z M 1.242188 9.335938"/></g></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="10px" height="20px" viewBox="0 0 10 20" version="1.1"><g><path d="M 8.757812 10.664062 L 3.445312 15.976562 C 3.082031 16.34375 2.492188 16.34375 2.125 15.976562 L 1.242188 15.09375 C 0.875 14.726562 0.875 14.132812 1.242188 13.769531 L 5.007812 10.003906 L 1.242188 6.242188 C 0.875 5.867188 0.875 5.277344 1.242188 4.914062 L 2.117188 4.023438 C 2.492188 3.65625 3.082031 3.65625 3.445312 4.023438 L 8.757812 9.335938 C 9.132812 9.703125 9.132812 10.296875 8.757812 10.664062 Z M 8.757812 10.664062"/></g></svg></button>',
    infinite: false,
  });

  $('.product-tabs__top-item').on('click', function(e){

    e.preventDefault();
    $('.product-tabs__top-item').removeClass('product-tabs__top-item--active');
    $(this).addClass('product-tabs__top-item--active');

    $('.product-tabs__content-item').removeClass('product-tabs__content-item--active');
    $($(this).attr('href')).addClass('product-tabs__content-item--active');
  });

  $('.product-slide__thumb').slick({
    asNavFor: '.product-slide__big',
    focusOnSelect: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: true,
    draggable: false
  });
  $('.product-slide__big').slick({
    asNavFor: '.product-slide__thumb',
    draggable: false,
    arrows: false,
    fade: true
    
  });

  $('.shop-content__filter-btn').on('click', function() {
    $('.shop-content__filter-btn').removeClass('shop-content__filter-btn--active');
    $(this).addClass('shop-content__filter-btn--active');
  })

  $('.buttun-list').on('click', function(){
    $('.product-item').addClass('product-item--list');
  })

  $('.buttun-grid').on('click', function(){
    $('.product-item').removeClass('product-item--list');
  })

  $('.select-style, .product-one__item-num').styler();


  $('.filter-price__input').ionRangeSlider({
    type: 'double',
    prefix: "$",
    onStart: function (data){
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    },
    onChange: function (data) {
      $('.filter-price__from').text(data.from);
      $('.filter-price__to').text(data.to);
    }
  })

  $('.top-slider__iner').slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2000
  });

  $(".star").rateYo({
    starWidth: "17px",
    normalFill: "#ccccce",
    ratedFill: "#ffc35b",
    readOnly: true,
    starSvg: '<svg width="18px" height="16px" viewBox="0 0 18 16" version="1.1"><g><path d="M 8.101562 0.554688 L 6.0625 4.695312 L 1.496094 5.359375 C 0.679688 5.476562 0.351562 6.488281 0.945312 7.066406 L 4.246094 10.285156 L 3.464844 14.832031 C 3.324219 15.652344 4.191406 16.269531 4.914062 15.882812 L 9 13.738281 L 13.085938 15.882812 C 13.808594 16.265625 14.675781 15.652344 14.535156 14.832031 L 13.753906 10.285156 L 17.054688 7.066406 C 17.648438 6.488281 17.320312 5.476562 16.503906 5.359375 L 11.9375 4.695312 L 9.898438 0.554688 C 9.53125 -0.179688 8.472656 -0.191406 8.101562 0.554688 Z M 8.101562 0.554688"/></g></svg>'
  });

  function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function initializeClock(id, endtime) {
    const clock = document.querySelector('.promo__clock');
    const daysSpan = clock.querySelector('.promo__days');
    const hoursSpan = clock.querySelector('.promo__hours');
    const minutesSpan = clock.querySelector('.promo__minutes');
    const secondsSpan = clock.querySelector('.promo__seconds');

    function updateClock() {
      const t = getTimeRemaining(endtime);

      daysSpan.innerHTML = t.days;
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
  }

  const deadline = $('.promo__clock').attr('data-time');
  initializeClock('promo__clock', deadline);

});
