# RPA-robot-Microservice-socketClient:
  A node-js background service which acts as a socket Client and connects to the built socket server upon installation.
  The background service will be added as a startup background service once installed
  The service sends the server the machine metadata and receives scheduled packages and stores it locally
  
  - install all dependencies:
      npm install
  - install backgroung service:
      node service.js
  - uninstall service:
      node service_uninstall.js
