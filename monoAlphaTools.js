/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////

function main(){

    function generateKeywordKey(keyword, index){
	
        //sanitize index
        index = mod(index, 26);
        
        //sanitize keyword
        keyword = keyword.toLowerCase();
        keyword = removeNonLowercase(keyword);
        
        //compress keyword (remove duplicates)
        var newKeyword = "";
        
        for(var i = 0; i < keyword.length; i++){
            if(newKeyword.indexOf(keyword.charAt(i)) == -1){
                newKeyword = newKeyword + keyword.charAt(i);
            }
        }
        
        //place letters in key array
        var keyArray = new Array(26);
        
        var currentSeqLetter = 97;
        
        //(c is an arbitrary counter)
        for(var c = 0; c < keyArray.length; c++){
            
            //this is where (in the final key) we are inserting this letter
            var keyPos = mod(c + index, keyArray.length);
            
            if(c < newKeyword.length){
                
                //place the keyword letter
                keyArray[keyPos] = newKeyword.charAt(c);
                
            }else{
                
                //determine the next letter in sequence to place
                while(keyArray.indexOf(String.fromCharCode(currentSeqLetter)) != -1){
                    currentSeqLetter++;
                }
                
                keyArray[keyPos] = String.fromCharCode(currentSeqLetter);
                currentSeqLetter++;
                
            }
            
        }
    
        
        //convert array to string
        var output = "";
        
        for(var i = 0; i < keyArray.length; i++){
            output += keyArray[i];
        }
        
        return output;
        
    }
}