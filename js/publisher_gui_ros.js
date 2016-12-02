     // Connecting to ROS
     // -----------------
   
     var ros = new ROSLIB.Ros({
       url : 'ws://localhost:9090'
     });
   
     ros.on('connection', function() {
       console.log('Connected to websocket server.');
     });
   
     ros.on('error', function(error) {
       console.log('Error connecting to websocket server: ', error);
     });
   
     ros.on('close', function() {
       console.log('Connection to websocket server closed.');
     });
   
   
  
   // Publishing a Topic
   // ------------------
   function obstaclesnapshot() {
     var obstaclePub = new ROSLIB.Topic({
    ros : ros,
    name : '/gui/obstacle',
    messageType : 'geometry_msgs/Point'
  });

  var pt = new ROSLIB.Message({
      x : Latitude,
      y : Longitude,
      z : 0

  });
  obstaclePub.publish(pt);
}
   
   function goal1snapshot() {
   
     var goal1Pub = new ROSLIB.Topic({
    ros : ros,
    name : '/gui/goal1',
    messageType : 'geometry_msgs/Point'
  });

  var pt = new ROSLIB.Message({
      x : Latitude,
      y : Longitude,
      z : 0

  });
  goal1Pub.publish(pt);
   }
   
      function goal2snapshot() {
   
     var goal2Pub = new ROSLIB.Topic({
    ros : ros,
    name : '/gui/goal2',
    messageType : 'geometry_msgs/Point'
  });

  var pt = new ROSLIB.Message({
      x : Latitude,
      y : Longitude,
      z : 0

  });
  goal2Pub.publish(pt);
   }
