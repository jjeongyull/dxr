$(window).on('scroll', function () {
  if ($(window).scrollTop() > 0) {
    $('header').addClass('scrolled');
    $('.c-logo').css('display', 'block');
    $('.w-logo').css('display', 'none');
  } else {
    $('header').removeClass('scrolled');
    $('.c-logo').css('display', 'none');
    $('.w-logo').css('display', 'block');
  }
});

$(document).on("click", ".custom-select-click-area", function() {
  $(".custom-options").toggleClass("active");
});

$(document).on("click", ".custom-option", function() {
  const text = $(this).text();
  let value = $(this).data('value');
  $(".custom-select").text(text);
  $('#select_value').val(value);
  $(".custom-options").removeClass("active");
  if (value === "all") {
    table.setMaxPage(1); // 전체 보기를 위해 페이지를 1로 설정
    table.setPageSize(table.getDataCount()); // 전체 데이터 크기로 페이지 크기 설정
  } else {
    table.setMaxPage(false); // 페이지 수 제한 해제
    table.setPageSize(parseInt(value)); // 선택된 페이지 크기로 변경
  }
});

$(document).on("click", function(event) {
  if (!$(".custom-select-wrapper").is(event.target) && $(".custom-select-wrapper").has(event.target).length === 0) {
    $(".custom-options").removeClass("active");
  }
  if (!$(".custom-select-check-wrap").is(event.target) && $(".custom-select-check-wrap").has(event.target).length === 0) {
    $(".checkbox-dropdown").hide();
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
$(document).on('focus', '.btn_page_lang', function(){
  $(this).parent('.lang-menu').css({
    'opacity': 1,
    'visibility': 'visible'
  });
});
$(document).on('focusout', '.btn_page_lang', function(){
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

// 포커스별로 이벤트 실행
$(document).on('keydown', '.btn_link_page', function(event){
  if (event.key === 'Enter' || event.keyCode === 13) {
    $(this).trigger('click');
  }
});
$(document).on('keydown', '.btn_sub_link_page', function(event){
  if (event.key === 'Enter' || event.keyCode === 13) {
    event.stopPropagation();
    event.preventDefault();
    $(this).trigger('click');
  }
});
$(document).on('keydown', '.contact-tab', function(event){
  if (event.key === 'Enter' || event.keyCode === 13) {
    $(this).trigger('click');
  }
});
$(document).on('keydown', '.btn_page_lang', function(event){
  if (event.key === 'Enter' || event.keyCode === 13) {
    $(this).trigger('click');
  }
});

// contact 작성시
$(document).on('click', '#btn_contact_insert', function(){
  $('#private_chk').removeClass('not');
  $('.input-text').removeClass('not');
  let boolean = true;
  let focusBoolean = false;
  let company_name = $('#company_name').val();
  let nation_name = $('#nation_name').val();
  let phone = $('#phone').val();
  let email = $('#email').val();
  let contact_info = $('#contact_info').val();
  let private = $('#private').is(':checked');

  if(isEmpty(company_name)){
    $('#company_name').addClass('not');
    $('#company_name').focus();
    focusBoolean = true;
    boolean = false;
  }
  if(isEmpty(nation_name)){
    $('#nation_name').addClass('not');
    if(!focusBoolean){
      $('#nation_name').focus();
      focusBoolean = true;
    }
    boolean = false;
  }
  if(isEmpty(phone)){
    $('#phone').addClass('not');
    if(!focusBoolean){
      $('#phone').focus();
      focusBoolean = true;
    }
    boolean = false;
  }
  if(isEmpty(email)){
    $('#email').addClass('not');
    if(!focusBoolean){
      $('#email').focus();
      focusBoolean = true;
    }
    boolean = false;
  }
  if(!validateEmail(email)){
    $('#email').addClass('not');
    if(!focusBoolean){
      $('#email').focus();
      focusBoolean = true;
    }
    boolean = false;
  }
  if(isEmpty(contact_info)){
    $('#contact_info').addClass('not');
    if(!focusBoolean){
      $('#contact_info').focus();
      focusBoolean = true;
    }
    boolean = false;
  }
  if(!private){
    $('#private_chk').addClass('not');
    boolean = false;
  }
  if(!boolean){return false;}

  alert('준비 중 입니다.');
});

$(document).on('input', '.phone-input', function() {
  // 입력 필드에 숫자만 남기고 나머지는 제거
  let inputVal = $(this).val().replace(/[^0-9]/g, '');

  // 하이픈을 추가하는 로직
  if (inputVal.length < 4) {
    // 010처럼 3자리까지만 입력된 경우
    $(this).val(inputVal);
  } else if (inputVal.length < 8) {
    // 010-1234처럼 7자리까지만 입력된 경우
    $(this).val(inputVal.replace(/(\d{3})(\d{1,4})/, '$1-$2'));
  } else {
    // 010-1234-5678처럼 11자리까지 입력된 경우
    $(this).val(inputVal.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3'));
  }
});