// Connecting to ROS
// -----------------
var index1 = 0;
var i1 = 0;
var newpositionC1 = 0;
var updateRate = 200;
var initOk1 = false;
var headingDegrees1 = 0;
var fixOk1 = false;
var d1 = new Date();
var time1 = d1.getTime();
var timeM1 = time1;

var index2 = 0;
var i2 = 0;
var newpositionC2 = 0;
var updateRate2 = 200;
var initOk2 = false;
var headingDegrees2 = 0;
var fixOk2= false;
var d2 = new Date();
var time2 = d2.getTime();
var timeM2 = time2;



var ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

// Subscribing to a Topic
// ----------------------
var navSatFixListener1 = new ROSLIB.Topic({
    ros: ros,
    name: '/copter1/global_position/global', //topic name
    messageType: 'sensor_msgs/NavSatFix' //message Type
});

var headingListener1 = new ROSLIB.Topic({
    ros: ros,
    name: '/copter1/global_position/compass_hdg', //topic name
    messageType: 'std_msgs/Float64' //message Type
});

var navSatFixListener2 = new ROSLIB.Topic({
    ros: ros,
    name: '/copter2/global_position/global', //topic name
    messageType: 'sensor_msgs/NavSatFix' //message Type
});

var headingListener2 = new ROSLIB.Topic({
    ros: ros,
    name: '/copter3/global_position/compass_hdg', //topic name
    messageType: 'std_msgs/Float64' //message Type
});


navSatFixListener1.subscribe(function(message) {

    if (index1 == 0) { // firts entry

        startVisualization1(message.latitude, message.longitude);
        //putHome(message.latitude, message.longitude);
        oldCurrentPosition1[index1] = new google.maps.LatLng(message.latitude, message.longitude);
        initOk1 = true;

        rotateArrow1();

    } else { // new entries

        newpositionC1 = new google.maps.LatLng(message.latitude, message.longitude);

        d = new Date();
        time1 = d.getTime();

        if ((time - timeM1) >= updateRate) //marker and path update rate in milliseconds
        {
            //markerCurrentPosition.setPosition(newpositionC);
             oldCurrentPosition1[i] = newpositionC1;

            path1 = flightPath1.getPath();
            path1.push(oldCurrentPosition1[i]);

            timeM1 = time1;
            i++;
        }

    }

    index1++; // update index

});

headingListener1.subscribe(function(message) {
    if (initOk1 == true) {
        headingDegrees1 = message.data;
    }
});

navSatFixListener2.subscribe(function(message) {

    if (index2 == 0) { // firts entry

        startVisualization2(message.latitude, message.longitude);
        //putHome(message.latitude, message.longitude);
        oldCurrentPosition2[index] = new google.maps.LatLng(message.latitude, message.longitude);
        initOk2 = true;

        rotateArrow2();

    } else { // new entries

        newpositionC2 = new google.maps.LatLng(message.latitude, message.longitude);

        d2 = new Date();
        time2 = d2.getTime();

        if ((time2 - timeM2) >= updateRate) //marker and path update rate in milliseconds
        {
            //markerCurrentPosition.setPosition(newpositionC);
             oldCurrentPosition2[i] = newpositionC2;

            path2 = flightPath2.getPath();
            path2.push(oldCurrentPosition2[i]);

            timeM2 = time2;
            i++;
        }

    }

    index2++; // update index

});

headingListener2.subscribe(function(message) {
    if (initOk2 == true) {
        headingDegrees2 = message.data;
    }
});