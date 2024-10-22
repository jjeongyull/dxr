$(function(){
  $('#header').load('component/header.html');
  $('#footer').load('component/footer.html');
});

function initMap(address="") {
  // 주소를 좌표로 변환하는 Geocoder 객체 생성
  var geocoder = new google.maps.Geocoder();

  // 주소
  var new_address = address?address:'경기도 성남시 수정구 창업로40번길 20';

  // 주소를 좌표로 변환
  geocoder.geocode({ address: new_address }, function(results, status) {
    if (status === 'OK') {
      var mapOptions = {
        center: results[0].geometry.location,
        zoom: 15
      };

      // 지도 초기화
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      // 마커 추가
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        title: new_address
      });
    } else {
      console.error('Geocode was not successful for the following reason: ' + status);
    }
  });
}