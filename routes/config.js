var fs = require('fs');

if(!fs.existsSync('./data')){
    fs.mkdirSync('./data');
}
var fileName = './data/mquery.cfg';
var config;
if(!fs.existsSync(fileName)){
    config = {};
    fs.writeFileSync(fileName, JSON.stringify(config));
}else{
    config = JSON.parse(fs.readFileSync(fileName));
}

var remotePath = function(){
    return config.remotePath;
};
var saveRemotePath = function(path){
    config.remotePath = path;
    fs.writeFileSync(fileName, JSON.stringify(config));
};

module.exports = {
    getRemote : remotePath,
    setRemote : saveRemotePath
};