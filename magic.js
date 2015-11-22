/*
 * Google Maps documentation: http://code.google.com/apis/maps/documentation/javascript/basics.html
 * Geolocation documentation: http://dev.w3.org/geo/api/spec-source.html
 */
$( document ).on( "pageinit", "#main-page", function() {
    var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
    if ( navigator.geolocation ) {
        function success(pos) {
            // Location found, show map with these coordinates
            drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));

            var latLongResponse = 'Lat: ' + pos.coords.latitude + ' Long: ' + pos.coords.longitude;  // build string containing lat/long
            $("#latLongText").text(latLongResponse);
            console.log(latLongResponse);

            var gotTextAddress = getAddress(pos.coords.latitude, pos.coords.longitude);
        }
        function fail(error) {
            drawMap(defaultLatLng);  // Failed to find location, show default map
        }
        // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
        navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
    } else {
        drawMap(defaultLatLng);  // No geolocation support, show default map
    }

    function drawMap(latlng) {
        var myOptions = {
            zoom: 10,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
        // Add an overlay to the map of current lat/lng
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Greetings!"
        });
    }

    function getAddress(myLatitude,myLongitude) {
        var geocoder = new google.maps.Geocoder();  // create a geocoder object
        var location = new google.maps.LatLng(myLatitude, myLongitude);  // turn coordinates into an object

        geocoder.geocode({'latLng': location}, function (results, status) {
            if(status == google.maps.GeocoderStatus.OK) { 
                $("#addressText").text(results[0].formatted_address);
                console.log(results[0].formatted_address);  // if address found, pass to processing function
                return true;  // if address found, return true
            }
            else {
                alert("Geocode failure: " + status);  // alert any other error(s)
                return false;
            }
        });
    }
});
