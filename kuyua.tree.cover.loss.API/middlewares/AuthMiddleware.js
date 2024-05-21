var ee = require('@google/earthengine');
var secret =  require("../secrets/ee-aalngar798-720bafddffeb.json");
function authenticate(req, res, next)
{
    ee.data.authenticateViaPrivateKey(
        secret, (success)=> 
        {
            console.log("auth success");
            ee.initialize();
            next();
        }, (error) => 
        {
            console.log("error");
        })
}


module.exports = authenticate;