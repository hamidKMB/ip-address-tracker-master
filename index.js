//jshint esversion:6

var newMarker = L.icon({
  iconUrl: "images/icon-location.svg",
  iconSize:     [48, 75], // size of the icon
  iconAnchor:   [22, 74], // point of the icon which will correspond to marker's location
});

if( $(".form-control").val().length == 1){
  ipGeometric($('.form-control').val());
}

$(".btn").click(function(){
  let value = $(".form-control").val();
  ipGeometric(value);

});

// $(".form-control").click(function(){
//   $(".form-control").val(null);
// });

function ipGeometric (value){
  const apiKey = "at_NMQw4gbQrcdcZxxqsTrvyLldUL3Fh";
  const ipOrDomain = value;
  let searchBy;
  if(value.toLowerCase().includes("www.")){
    searchBy = "domain=";
  }else{
    searchBy = "ipAddress=";
  }
  console.log(searchBy);
  let url = "https://geo.ipify.org/api/v1?apiKey="+apiKey+"&"+ searchBy +ipOrDomain;
  console.log(url);
  $.get(url,function(data,status){
    $(".form-control").attr("value" , data.ip );
    $(".ip-address").html(data.ip);
    $(".location").html(data.location.country);
    $(".location-city").html(data.location.region);
    $(".isp").html(data.isp);
    $(".timezone").html(data.location.timezone);
    // let lat = data.location.lat;
    // let lng = data.location.lng;
    let coordinates = [data.location.lat, data.location.lng];
    $(".map").html('<div id="mapid"></div>');
    mapPoint(coordinates);
  });
}

function mapPoint(coordinates){
  let mymap = new L.map('mapid').setView(coordinates, 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFtaWRrYW15YWIiLCJhIjoiY2tucmhpMXB3MHQ0ZTJwbnp6OXZ5M3Q0NCJ9.mYF0ME7Mf4diaGae59h7uQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
  }).addTo(mymap);
  L.marker(coordinates , {icon: newMarker}).addTo(mymap);
}
