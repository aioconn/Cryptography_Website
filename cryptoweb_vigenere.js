/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////


function main(){

    function vigenereEncrypt(plaintext, key){

        plaintext = plaintext.toLowerCase();
        key = key.toLowerCase();

        //remove all non-lowercase letters
	    plaintext = removeNonLowercase(plaintext);
	    key = removeNonLowercase(key);
	
	
	    var ciphertext = "";
	
	    for(var i = 0; i < plaintext.length; i++){
		
		    var keyIndex = mod(i, key.length);
		    var plainChar = plaintext.charCodeAt(i) - 97;
		    var keyChar = key.charCodeAt(keyIndex) - 97;
		
		    ciphertext += String.fromCharCode(mod(plainChar + keyChar, 26) + 97);
		
	    }
	
	    return ciphertext;
    }

    function vigenereDecrypt(ciphertext, key){
	
        //convert to lowercase
        ciphertext = ciphertext.toLowerCase();
        key = key.toLowerCase();
        
        //remove all non-lowercase letters
        ciphertext = removeNonLowercase(ciphertext);
        key = removeNonLowercase(key);
        
        
        var plaintext = "";
        
        for(var i = 0; i < ciphertext.length; i++){
            
            var keyIndex = mod(i, key.length);
            var cipherChar = ciphertext.charCodeAt(i) - 97;
            var keyChar = key.charCodeAt(keyIndex) - 97;
            
            plaintext += String.fromCharCode(mod(cipherChar - keyChar, 26) + 97);
            
        }
        
        return plaintext;
        
    }

}