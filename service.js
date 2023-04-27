var Service = require('node-windows').Service;
const os = require("os")
const fs = require("fs");

// Create a new service object
var svc = new Service({
  name:'Socket client',
  description: 'Node-js running service.',
  script: '.\\client.js'
});

// Install the script as a service.
svc.install();

// Listen for the "install" event, which indicates the process is available as a service.
svc.on('install', function(){
  svc.start();
});

// Listen for the "start" event and let us know when the process has actually started working.
svc.on('start', async function(){

  let metadata = JSON.stringify( {
    name: os.hostname(),
    type: "standard"
  })

  fs.writeFile("./metadata.json", metadata, function(err){
    if(err)
      console.log(`Error occurred while running service\nError: ${err.message}`)
    else
      console.log(`${svc.name} started!\n`);

  })
});

