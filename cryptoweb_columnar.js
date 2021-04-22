/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////

function main(){

    function columnarEncrypt(message, numColumns){

        var output = "";
        
        var baseOffset = 0;
        while(baseOffset < numColumns){
    
            for(var i = baseOffset; i < message.length; i += numColumns){
                output += message.charAt(i);
            }
            
            baseOffset++;
            
        }
    
        return output;
        
    }
    
    
    function columnarDecrypt(message, numColumns){
        
        var columnLength = Math.floor(message.length / numColumns);
        
        var output = "";
        
        var baseOffset = 0;
        while(baseOffset < columnLength){
            
            for(var i = baseOffset; i < message.length; i += columnLength){
                output += message.charAt(i);
            }
            
            baseOffset++;
            
        }
        
        return output;
        
    }
}