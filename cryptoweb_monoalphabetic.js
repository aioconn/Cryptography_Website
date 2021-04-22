/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////

function main() {

    function monoalphabeticEncrypt(message, key){
	
        message = message.toLowerCase();
        message = removeNonLowercase(message);
        
        key = key.toLowerCase();
        
        var output = "";
        
        //for every letter in the message: find the corresponding letter, add it to output
        for(var i = 0; i < message.length; i++){
            
            //get letter
            var oldLetter = message.charAt(i);
            
            //get new letter
            var keyIndex = oldLetter.charCodeAt(0) - 97;
            var keyLetter = key.charAt(keyIndex);
            
            output = output + keyLetter;
            
        }
        
        return output;
        
    }

    function monoalphabeticDecrypt(message, key){
	
        message = message.toLowerCase();
        message = removeNonLowercase(message);
        
        key = key.toLowerCase();
        
        var output = "";
        
        //for every letter in the message: find that letter in the key, use the key index to calculate decrypted letter
        for(var i = 0; i < message.length; i++){
            
            //get letter
            var oldLetter = message.charAt(i);
            
            //find letter in key
            var keyIndex = key.indexOf(oldLetter);
            
            //calculate decrypted letter
            var newLetter = String.fromCharCode(keyIndex + 97);
            
            output = output + newLetter;
            
        }
        
        return output;
        
    }
}