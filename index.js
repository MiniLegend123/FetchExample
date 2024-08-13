// make variables for the html elements
const fetchButton = document.getElementById("fetchButton");
//const urlTextBox = document.getElementById("urlTextBox");
const dataResultArea = document.getElementById("mainResults");

function showPosition(position){
    let myURL = `https://api.open-meteo.com/v1/forecast?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
    getRequest(myURL);
    
}

function getGeo(){
    navigator.geolocation.getCurrentPosition(showPosition);
    //"Latitude: " +  + 
  //"<br>Longitude: " + position.coords.longitude;
        
}

// Make a GET api request
async function getRequest(someURL) {
    // clear out the data printout area of the html page
    dataResultArea.innerHTML = "";
    
    // Fetch a response from the REST API
    const response = await fetch(someURL);
    
    // extract the JSON payload from the response
    const result = await response.json();
    
    // Sometimes the payload is actually a string instead of an object. If so convert
    // it to an object
    let objResult = (typeof result == "object") ? result  : JSON.parse(result);
    
    // and either way, convert the object to a string to print out. 
    let strResult = JSON.stringify(objResult, undefined, 2);
    dataResultArea.innerHTML = `<pre><code>${strResult}</code></pre>`;
    
    // return the JSON object
    return objResult;
}


// Make the GET request when the fetch button is clicked
fetchButton.addEventListener('click', async (event) => {
    // fetch whatever URL has been typed into textbox
    getGeo();
    // Do something else with 'data' if you want
});


