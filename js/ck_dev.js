$(window).on('scroll', function () {
  if ($(window).scrollTop() > 0) {
      $('header').addClass('scrolled');
  } else {
      $('header').removeClass('scrolled');
  }
});

$(document).on('click', '#btn_view_menu', function(e){
  $('.line').toggleClass('active');
  $('.main-menu-list').toggleClass('view');
  e.stopPropagation();
});
$(document).on('focus', '.sub-menu li', function(){
  $(this).parent('.sub-menu').css({
    'opacity': 1,
    'visibility': 'visible'
  });
});
$(document).on('focusout', '.sub-menu li', function(){
  $(this).parent('.sub-menu').css({
    'opacity': 0,
    'visibility': 'hidden'
  });
});
$(document).on('focus', '.btn-lang', function(){
  $(this).parent('.lang-menu').css({
    'opacity': 1,
    'visibility': 'visible'
  });
});
$(document).on('focusout', '.btn-lang', function(){
  $(this).parent('.lang-menu').css({
    'opacity': 0,
    'visibility': 'hidden'
  });
});


// 페이지 이동
$(document).on('click', '.btn_link_page', function(){
  let page = $(this).data('page');
  let lang = getUrlValue("lang");
  if(isEmpty(lang)){
    lang = "";
  }else{
    lang = `?lang=${lang}`;
  }
  if ($(window).width() <= 860) { // 모바일일때(메뉴가 모바일 형식으로 변경되는 시점)
    if ($(this).children('ul.sub-menu').length > 0) { 
      $(this).children('ul.sub-menu').toggleClass('view');
    } else {
      gotoPage(`${page}.html${lang}`, '', '');
    }
  }else{ // 웹일때
    gotoPage(`${page}.html${lang}`, '', '');
  }
});
$(document).on('click', '.btn_sub_link_page', function(e){
  e.stopPropagation(); // 부모 요소로의 클릭 이벤트 전파 방지
  e.preventDefault(); // 기본 동작 취소
  let page = $(this).data('page');
  let lang = getUrlValue("lang");
  if(isEmpty(lang)){
    lang = "";
  }else{
    lang = `?lang=${lang}`;
  }
  if ($(window).width() <= 860) { // 모바일일때(메뉴가 모바일 형식으로 변경되는 시점)
    if ($(this).children('ul.sub-menu').length > 0) { 
      $(this).children('ul.sub-menu').toggleClass('view');
    } else {
      gotoPage(`${page}.html${lang}`, '', '');
    }
  }else{ // 웹일때
    gotoPage(`${page}.html${lang}`, '', '');
  }
});

// 언어별 보기
$(document).on('click', '.btn_page_lang', function() {
  let lang = $(this).data('lang');
  let currentUrl = window.location.href;
  let newUrl;

  if (currentUrl.includes('?')) {
    if (currentUrl.includes('lang=')) {
      newUrl = currentUrl.replace(/lang=[^&]*/, 'lang=' + lang);
    } else {
      newUrl = currentUrl + '&lang=' + lang;
    }
  } else {
    newUrl = currentUrl + '?lang=' + lang;
  }
  gotoPage(newUrl, '', '');
});

// 모바일일때 사이드메뉴 클릭이 아닌 외부를 클릭했을때 사이드메뉴 닫기
$(document).on('click', function(e) {
  let sideMenu = $('#side_menu');
  
  if (sideMenu.hasClass('view') && !$(e.target).closest('#side_menu').length) {
    sideMenu.removeClass('view');
    $('.line').removeClass('active');
  }
});

$(document).on('change', '.css-xs8c74', function(){
  if($(this).is(':checked')){
    $(this).removeClass('css-xs8c74');
    $(this).addClass('css-r13db4');
  }
});
$(document).on('change', '.css-r13db4', function(){
  if(!$(this).is(':checked')){
    $(this).removeClass('css-r13db4');
    $(this).addClass('css-xs8c74');
  }
});

// 구글지도 탭
$(document).on('click', '.contact-tab', function(){
  $('.contact-tab').removeClass('active');
  $(this).addClass('active');
  let type = $(this).data('type');
  initMap(ADDRESS_OBJ[type].map);
  $('#address').text(ADDRESS_OBJ[type].detail);
});