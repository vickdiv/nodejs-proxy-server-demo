var apim = require('apim');
var jose = require("jose");
var crypto = require('crypto');
 var kblCertinfo2 = apim.getvariable('kblcertinfo1');
apim.readInputAsJSON(function (error, payload) {
  if (error) {
    session.reject('Backend Response not a JSON: '+error);
  } else {
var plainText = JSON.stringify(payload);
		var jweHdr = jose.createJWEHeader('A256GCM');
	   jweHdr.setProtected('alg', 'RSA-OAEP-256');
	
	   jweHdr.setKey(kblCertinfo2);
	  
	   jose.createJWEEncrypter(jweHdr).update(plainText).encrypt('compact', function(error, jweCompactObj) {
	      if (error) {
          session.reject('Backend Response Encryption Failed: '+error);
          return;
        } else {
		    var requestconstruction = {"Request": jweCompactObj};
			session.output.write(requestconstruction);
			apim.output('application/json');
			console.info("Request Encryption completed: "+requestconstruction);
		}
});
}});
