/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////

function main(){

    function columnarAnagramEncrypt(message, numColumns, keyArr){
	
        var columnarMessage = columnarEncrypt(message, numColumns);
        
        var columnLength = Math.floor(columnarMessage.length / numColumns);
        
        var columns = [];
        
        //initialize array of column strings
        for(var start = 0; start < columnarMessage.length; start += columnLength){
            
            columns.push(columnarMessage.substr(start, columnLength));
    
        }
        
        
        //rearrange columns
        var rearrangedCols = new Array(columns.length);
        
        for(var i = 0; i < keyArr.length; i++){
            
            var newIndex = keyArr[i];
            
            rearrangedCols[i] = columns[newIndex];
            
        }
        
        var output = "";
        
        for(var i = 0; i < rearrangedCols.length; i++){
            output += rearrangedCols[i];
        }
        
        return output;
        
    }
    
    function columnarAnagramDecrypt(message, numColumns, keyArr){
        
        //segment the message
        var columns = [];
        var columnLength = Math.floor(message.length / numColumns);
        
        for(var start = 0; start < message.length; start += columnLength){
            
            columns.push(message.substr(start, columnLength));
            
        }
        
        //undo the anagram
        var rearrangedCols = new Array(columns.length);
        
        for(var i = 0; i < keyArr.length; i++){
            
            var key = keyArr[i];
            
            rearrangedCols[key] = columns[i];
            
        }
        
        //decrypt the columnar
        var merged = "";
        
        for(var i = 0; i < rearrangedCols.length; i++){
            merged += rearrangedCols[i];
        }
        
        var output = columnarDecrypt(merged, numColumns);
        
        return output;
        
    }
}