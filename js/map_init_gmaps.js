var flightPath1 = 0;
var markerCurrentPosition1 = 0;
var oldCurrentPosition1 = Array();
var arrowAngle1 = 0;
var arrowIcon1;

var flightPath2 = 0;
var markerCurrentPosition2 = 0;
var oldCurrentPosition2 = Array();
var arrowAngle2 = 0;
var arrowIcon2;

var Latitude = 0;
var Longitude = 0;

function initialize() {
    var starting = new google.maps.LatLng(47.413157, 8.548645); //Zurich

    var mapOptions = {
        center: starting,
        zoom: 18,
        mapTypeId: 'satellite'
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    map.setTilt(0); //disable 45° view
    
   
    google.maps.event.addListener(map, 'click', function(event) {   
         
        Latitude = event.latLng.lat()
        Longitude = event.latLng.lng()
		
		var position = new google.maps.LatLng(Latitude, Longitude);

		var markerIcon = 'images/simpleMarker.png';
		var marker = new google.maps.Marker({
			position: position,
			map: map,
			title: "Click",
			icon: markerIcon
		});
		
		//alert( 'Latitude: ' + event.latLng.lat() + ' and Longitude is: ' + event.latLng.lng() );

		
    })
    

}

function putHome(lat, lng) {
    var position = new google.maps.LatLng(lat, lng);
    var Home = 'images/homeMarker.png';

    var markerHome = new google.maps.Marker({
        position: position,
        map: map,
        title: "Home",
        icon: Home
    });
}

function startVisualization1(lat, lng) {
    var position = new google.maps.LatLng(lat, lng);

    arrowIcon1 = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 10,
        strokeColor: "#FFFF00",
        rotation: 0,
        strokeOpacity: 1,
        strokeWeight: 2,
        anchor: new google.maps.Point(0, 2.2)
    };

    flightPath1 = new google.maps.Polyline({
        path: oldCurrentPosition1,
        icons: [{
            icon: arrowIcon1,
            offset: '100%',
            fixedRotation: true
        }],
        geodesic: true,
        strokeColor: '#FFFF00',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    flightPath1.setMap(map);
	
		    arrowIcon2 = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 10,
        strokeColor: "#00FF00",
        rotation: 0,
        strokeOpacity: 1,
        strokeWeight: 2,
        anchor: new google.maps.Point(0, 2.2)
    };
	
}

function startVisualization2(lat, lng) {
    var position = new google.maps.LatLng(lat, lng);

    arrowIcon2 = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
        scale: 10,
        strokeColor: "#00FF00",
        rotation: 0,
        strokeOpacity: 1,
        strokeWeight: 2,
        anchor: new google.maps.Point(0, 2.2)
    };
	
	flightPath2 = new google.maps.Polyline({
        path: oldCurrentPosition2,
        icons: [{
            icon: arrowIcon2,
            offset: '100%',
            fixedRotation: true
        }],
        geodesic: true,
        strokeColor: '#00FF00',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    flightPath2.setMap(map);
    //precisionCircle.setMap(map);
}

// Use the DOM setInterval() function to change the rotation of the marker according to the magnetometer
function rotateArrow1() {
    window.setInterval(function() {
        var icons = flightPath1.get('icons');
        arrowIcon1.rotation = headingDegrees1;
        flightPath1.set('icons', icons);
    }, 125); //updating the rotation 8 times per second
}

function rotateArrow2() {
    window.setInterval(function() {
        var icons = flightPath2.get('icons');
        arrowIcon2.rotation = headingDegrees2;
        flightPath2.set('icons', icons);
    }, 125); //updating the rotation 8 times per second
}

google.maps.event.addDomListener(window, 'load', initialize);
