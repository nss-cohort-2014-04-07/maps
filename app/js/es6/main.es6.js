/* global google:true */
/* jshint unused:false, camelcase:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    initMap(36, -86, 2);
    $('#add').click(add);
    $('#show').click(show);
    $('#nsa').click(nsa);
  }

  var map;

  function nsa(){
    let options = {enableHighAccuracy: true, timeout: 5000, maximumAge: 0};
    navigator.geolocation.getCurrentPosition(success, e => console.log(e), options);
  }

  function success(pos){
    let lat = pos.coords.latitude;
    let lng = pos.coords.longitude;
    let latLng = new google.maps.LatLng(lat, lng);
    addMarker(lat, lng, name, './media/me.png');
    map.setCenter(latLng);
    map.setZoom(10);
  }

  function initMap(lat, lng, zoom){
    let styles = [{'featureType':'water','elementType':'geometry','stylers':[{'color':'#ffdfa6'}]},{'featureType':'landscape','elementType':'geometry','stylers':[{'color':'#b52127'}]},{'featureType':'poi','elementType':'geometry','stylers':[{'color':'#c5531b'}]},{'featureType':'road.highway','elementType':'geometry.fill','stylers':[{'color':'#74001b'},{'lightness':-10}]},{'featureType':'road.highway','elementType':'geometry.stroke','stylers':[{'color':'#da3c3c'}]},{'featureType':'road.arterial','elementType':'geometry.fill','stylers':[{'color':'#74001b'}]},{'featureType':'road.arterial','elementType':'geometry.stroke','stylers':[{'color':'#da3c3c'}]},{'featureType':'road.local','elementType':'geometry.fill','stylers':[{'color':'#990c19'}]},{'elementType':'labels.text.fill','stylers':[{'color':'#ffffff'}]},{'elementType':'labels.text.stroke','stylers':[{'color':'#74001b'},{'lightness':-8}]},{'featureType':'transit','elementType':'geometry','stylers':[{'color':'#6a0d10'},{'visibility':'on'}]},{'featureType':'administrative','elementType':'geometry','stylers':[{'color':'#ffdfa6'},{'weight':0.4}]},{'featureType':'road.local','elementType':'geometry.stroke','stylers':[{'visibility':'off'}]}];
    let mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: styles};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function add(){
    let place = $('#place').val().trim();
    let vacation = `<option>${place}</option>`;
    $('#vacations').append(vacation);
    $('#place').val('');
    $('#place').focus();
  }

  function addMarker(lat, lng, name, icon){
    let latLng = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({map: map, position: latLng, title: name, icon: icon});
  }

  function show(){
    let vacation = $('#vacations').val();
    let geocoder = new google.maps.Geocoder();

    geocoder.geocode({address: vacation}, (results, status)=>{
      let name = results[0].formatted_address;
      let lat = results[0].geometry.location.lat();
      let lng = results[0].geometry.location.lng();
      addMarker(lat, lng, name, './media/flag.png');
      let latLng = new google.maps.LatLng(lat, lng);
      map.setCenter(latLng);
      map.setZoom(10);
    });
  }
})();
