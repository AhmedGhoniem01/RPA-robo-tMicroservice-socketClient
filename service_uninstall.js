var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Socket client',
  description: 'Node-js running service.',
  script: ".\\client.js"
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('uninstall',function(){
    console.log("Service uninstalled successfully")
});

// Install the script as a service.
svc.uninstall();