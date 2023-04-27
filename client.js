const ioClient = require('socket.io-client')
let MetaData = require("./metadata.json");
const fs = require("fs")
const pkgFolderPath = './packages'

//Helper save Package function
function savePackages(pkgMetaData){
    return new Promise((resolve, reject) => {
        let pkgFilePath = `${pkgFolderPath}/${pkgMetaData.package_name}`;
        //No two packages will have the same name
        fs.writeFile(pkgFilePath, `${JSON.stringify(pkgMetaData)}`, function(err) {
            if(err) {
                reject(err);
            }
            resolve(pkgFilePath);
        });
    })
}

//Connect to socket server
const socket = ioClient("http://localhost:4000/");

socket.on('connect',function(){                                
    sendPackage();
});

socket.on('error', function (err) {
    socket.socket.reconnect();
});

//Wrapping package sending in a function for re-use
const sendPackage = () => {
    //Send machine meta-data to socket server
    socket.emit('client machine metaData', JSON.stringify(MetaData))
}

socket.on('decline metadata reception', () => {
    sendPackage()
})

//Receive packages from socket server
socket.on('notification', async function(obj){
    let {msg, pkgMetaData} = obj;
    console.log(`Data received at machine\nMessage: ${msg}`);
    await savePackages(pkgMetaData)
    .then((pkgFilePath) => {
        console.log(`Package received and saved successfully!`)
    })
    .catch((err) => {
        console.log(`Error while saving package at client\nError: ${err.message}`)
        socket.emit('decline pkg reception', pkgMetaData.package_name)
    })
});

