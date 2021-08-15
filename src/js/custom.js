/* =================================
===  VIDEO BACKGROUND           ====
=================================== */
// if (matchMedia('(min-width: 640px)').matches) {

//     $(document).ready(function () {
//         if ($.backgroundVideo) {
//             var videobackground = new $.backgroundVideo($('body'), {
//                 "align": "centerXY",
//                 "width": 1280,
//                 "height": 720,
//                 "path": "video/",
//                 "filename": "video",
//                 "types": ["mp4", "ogg", "webm"]
//             });
//         }
//     });

// }


/* =================================
===  FULL SCREEN HEADER         ====
=================================== */
// function alturaMaxima() {
//     var altura = $(window).height();
//     $(".full-screen").css('min-height', altura);

// }

// $(document).ready(function () {
//     alturaMaxima();
//     $(window).bind('resize', alturaMaxima);
// });


/* =================================
===  SMOOTH SCROLL             ====
=================================== */
// var scrollAnimationTime = 1200,
//     scrollAnimation = 'easeInOutExpo';
// $('a.scrollto').bind('click.smoothscroll', function (event) {
//     event.preventDefault();
//     var target = this.hash;
//     $('html, body').stop().animate({
//         'scrollTop': $(target).offset().top
//     }, scrollAnimationTime, scrollAnimation, function () {
//         window.location.hash = target;
//     });
// });


/* =================================
===  WOW ANIMATION             ====
=================================== */
wow = new WOW(
    {
        mobile: false
    });
wow.init();

/* =================================
===  Bootstrap Internet Explorer 10 in Windows 8 and Windows Phone 8 FIX
=================================== */
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement('style')
    msViewportStyle.appendChild(
        document.createTextNode(
            '@-ms-viewport{width:auto!important}'
        )
    )
    document.querySelector('head').appendChild(msViewportStyle)
}

function imposeMinMax(el){
    if(el.value != ""){
      if(parseInt(el.value) < parseInt(el.min)){
        el.value = el.min;
      }
      if(parseInt(el.value) > parseInt(el.max)){
        el.value = el.max;
      }
    }
  }