"use strict";
let btn = document.getElementById("btn");

function findLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    btn.innerText = "Your browser not support geoLocation!";
  }
}
function successCallback(position) {
  //   console.log(position.coords.latitude);
  //   console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude);
  console.log(longitude);
  console.log(position);
  btn.style.background = "green";

  const key = "77037cdab61d4b8cb50e0012b0088318";
  let url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${key}`;
  fetch(url)
    .then((response) => response.json())
    .then(
      function data(response) {
        console.log(response);
        const locationDataJson = response.results[0].components;
        console.log(response.results[0].components.country);
        let address = `${locationDataJson.suburb},${locationDataJson.city},${locationDataJson.postcode},${locationDataJson.country}`;
        console.log(address);
        btn.innerText = address;
      }
      //   (btn.innerText = response.results[0].components.country)
    );
}
function errorCallback(error) {
  if (error.code == 1) {
    btn.innerText = "User denied Geolocation";
    btn.style.background = "red";
  } else if ((error.code = 2)) {
    btn.innerText = "Loaction not available";
    btn.style.background = "red";
  } else {
    btn.innerText = "SomeThing went wrong";
    btn.style.background = "red";
  }
}
btn.addEventListener("click", findLocation);
