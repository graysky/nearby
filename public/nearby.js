
function Location() {
	// Location class
	this.lat = null;
	this.lng = null;
}

// Set the lat/lng
Location.prototype.setLatLng = function(lat, lng) {
	this.lat = lat;
	this.lng = lng;
}

// If the location has values
Location.prototype.valid = function() {
	if (!this.lat || !this.lng) return false;
	
	return true;
}

// Reverse geocode the current location
Location.prototype.reverseGeocode = function() {
	
	// TODO Should test to see if there is already a valid location
	
	// Format of the request and response described here:
	// http://code.google.com/apis/maps/documentation/services.html#ReverseGeocoding
	// http://code.google.com/apis/maps/documentation/geocoding/index.html#JSON
	
	var geocoder = new GClientGeocoder();
	var point = new GLatLng(this.lat, this.lng);
	
	geocoder.getLocations(point, function(response) {
		
		// alert("Response code: " + response.Status.code);
		if (response.Status.code == 200) {
			appendResults("<br />Location: " + response.Placemark[0].address);
		}
	});
}

var currentLocation = new Location();

function processLocation(pos) {
	toggleSpinner();
	
  // Found the location
	currentLocation.setLatLng(pos.coords.latitude, pos.coords.longitude);

  appendResults("<br />Lat: " + currentLocation.lat);
  appendResults("<br />Lng: " + currentLocation.lng);

	currentLocation.reverseGeocode();

  return true; 
}

function showError(err) {
	toggleSpinner();
  appendResults("Could not get location: " + err.message);
}

// Attempt to detect location, if supported
function detectLocation() {
	$('#container').html("");
	
	if (!navigator.geolocation) {
    // Browser doesn't support it
		toggleSpinner();
		appendResults("<b>Browser doesn't support it</b>");
    return true;
  }

  // Try to get the location
  navigator.geolocation.getCurrentPosition(processLocation, showError);
}

function reverseGeocode(lat, lng) {
	
	
	// http://maps.google.com/maps/geo?q=40.714224,-73.961452&output=json&oe=utf8
	// &sensor=false&key=ABQIAAAA3TJyNtyHXFzfpeoWXERYLRT2yXp_ZAY8_ufC3CFXhHIE1NvwkxTtKvzEUj1LJTyhK6Uk1wMXooEwCw
 //	http://maps.google.com/maps/geo?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA&output=json&oe=utf8&sensor=true_or_false&key=your_api_key
}

// Hide the spinner and show the results
function toggleSpinner() { 
	$('#spinner').hide();
	$('#container').show();
}

function appendResults(str) {
	$('#container').append(str);
}