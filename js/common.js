function getUrlValue(key){
  let queryString = window.location.search;
  let searchParams = new URLSearchParams(queryString);
  let result = searchParams.get(key);

  return result;
}

// 페이지 언어 변경
function changeLang(page){
  // 헤더와 푸터 먼저 변경
  $.each(LANG_EN.component, (key, items) => {
    let target = $(`#${key}`);
    target.text(items);
  });
  
  let dataJson = LANG_EN[page];

  $.each(dataJson, (key, items) => {
    let target = $(`#${key}`);
    target.text(items);
  });
}

// 컴포넌트 로드
function loadComponent(selector, url) {
  return new Promise((resolve, reject) => {
    $(selector).load(url, function(response, status, xhr) {
      if (status === "success") {
        resolve(response);
      } else {
        reject(xhr.statusText);
      }
    });
  });
}