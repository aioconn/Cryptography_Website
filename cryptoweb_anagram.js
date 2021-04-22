/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////

function main(){

    function anagramEncrypt(message, keyArr){
	
        var output = "";
        
        //for every block of the message
        for(var blockIndex = 0; blockIndex < message.length; blockIndex += keyArr.length){
            
            for(var k = 0; k < keyArr.length; k++){
                //(key uses indexing starting at 0)
                
                //look at the value in the key
                var keyVal = keyArr[k];
                
                //find that letter in the message
                var letter = message.substr(blockIndex + keyVal, 1);
                
                //paste that letter to the output
                output += letter;
            }
            
        }
        
        return output;
        
    }

    function anagramDecrypt(message, keyArr){
	
        var output = "";
        
        //for every block of the message
        for(var blockIndex = 0; blockIndex < message.length; blockIndex += keyArr.length){
            
            for(var n = 0; n < keyArr.length; n++){
                //(key uses indexing starting at 0)
                //n is the number inn the key that we are currently looking for
                
                var keyIndex = keyArr.indexOf(n);
                
                output += message.substr(blockIndex + keyIndex, 1);
                
            }
            
        }
        
        return output;
        
    }

    function generateAnagramKey(strKey){
	
        //get ASCII codes for strKey
        var charCodes = new Array(strKey.length);
        
        for(var i = 0; i < strKey.length; i++){
            
            charCodes[i] = strKey.charCodeAt(i);
            
        }
        
        //sort through the ASCII codes and get keyArr
        var output = new Array(strKey.length);
        
        //pass through the charCodes list n times
        var upperBound = 0;
        for(var i = 0; i < charCodes.length; i++){
            
            var smallestInd = 0;
            
            while(charCodes[smallestInd] <= upperBound){
                smallestInd++;
            }
            
            //for every element in the charCodes list, find the smallest
            for(var j = 0; j < charCodes.length; j++){
                
                if(charCodes[j] > upperBound && charCodes[j] < charCodes[smallestInd]){
                    
                    smallestInd = j;
                    
                }
                
            }
            
            output[smallestInd] = i;
            
            upperBound = charCodes[smallestInd];
            
        }
        
        return output;
        
    }
    
}