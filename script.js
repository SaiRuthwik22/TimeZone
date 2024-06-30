let userLocation;
let lat;
let long;

function getLocation() {
    let userDisplay = document.getElementById("firstdetails-container")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async(position)=>{
        lat = position.coords.latitude
        long = position.coords.longitude
        await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json&apiKey=fcf3379860da43c78b1cc2de50d687d7`)
            .then((res)=>res.json())
            .then((res)=>{
                if(res.results.length){
                    userDisplay.innerHTML =`<p>Name of Time Zone: <span>${res.results[0].timezone.name}</span></p>
            <div class="latlong-container">
                <p class="lat">Lat: <span>${res.results[0].lat}</span></p>
                <p class="long">Long: <span>${res.results[0].lon}</span></p>
            </div>
            <p>Offset Std: <span>${res.results[0].timezone.offset_STD}</span></p>
            <p>Offset STD in Seconds: <span>${res.results[0].timezone.offset_STD_seconds}</span></p>
            <p>Offset DST: <span>${res.results[0].timezone.offset_DST}</span></p>
            <p>Offset DST in Seconds: <span>${res.results[0].timezone.offset_DST_seconds}</span></p>
            <p>Country: <span>${res.results[0].country}</span></p>
            <p>Postcode: <span>${res.results[0].postcode}</span></p>
            <p>City: <span>${res.results[0].city}</span></p>`
                }
            })
      });

    } 
}

getLocation()

function getLocationAddress(){
    let addr = encodeURIComponent(document.getElementById("input").value)
    let locationAddress = document.getElementById("result-container")
    fetch(`https://api.geoapify.com/v1/geocode/search?text=${addr}&apiKey=fcf3379860da43c78b1cc2de50d687d7`)
        .then((res)=>res.json())
        .then((res)=>{
            if(res.features.length){
                locationAddress.innerHTML = `<div class="section1" id="seconddetails-container">
                <p>Name of Time Zone: <span>${res.features[0].properties.timezone.name}</p>
                <div class="latlong-container">
                    <p class="lat">Lat: <span>${res.features[0].properties.lat}</span></p>
                    <p class="long">Long: <span>${res.features[0].properties.lon}</span></p>
                </div>
                <p>Offset Std: <span>${res.features[0].properties.timezone.offset_STD}</span></p>
                <p>Offset STD in Seconds: <span>${res.features[0].properties.timezone.offset_STD_seconds}</span></p>
                <p>Offset DST: <span>${res.features[0].properties.timezone.offset_DST}</span></p>
                <p>Offset DST in Seconds: <span>${res.features[0].properties.timezone.offset_DST_seconds}</span></p>
                <p>Country: <span>${res.features[0].properties.country}</span></p>
                <p>Postcode: <span>${res.features[0].properties.postcode}</span></p>
                <p>City: <span>${res.features[0].properties.city}</span></p>
            </div>`
            }
            else{
                locationAddress.innerHTML =` <p class="error">Please enter a valid address!</p>`
            }
        })
  }