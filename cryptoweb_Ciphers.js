/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////
//////////////////  CAESAR SHIFT FUNCTIONS  /////////////////////////
/////////////////////////////////////////////////////////////////////

let caesar_input_box = document.getElementById("caesar_input_box");
let shiftKeyInput = document.getElementById("shiftKeyInput");
let caesar_output_box = document.getElementById("caesar_output_box");

//Function for the Caeser Cipher decryption
function caesarEncrypt(){
    //take the input value and shift value
    let inputText = caesar_input_box.value;
    let shift = shiftKeyInput.value;
    shift = shift*-1;
    //call the function
    caesar_output_box.innerHTML = caesarShiftEncrypt(inputText, shift);

}

function caesarDecrypt(){
    //take the input value and shift value
    let inputText = caesar_input_box.value;
    let shift = shiftKeyInput.value;

    //it's decrypt so make the shift negative
    shift = shift*-1;

    //call the function
    caesar_output_box.innerHTML = caesarShiftDecrypt(inputText, shift);
}

function caesarShiftEncrypt(message, shiftAmount){

    var output = "";
    message = message.toLowerCase();
  
    for(i = 0; i < message.length; i++){
      
      //get character's code
      var code = message.charCodeAt(i);
      
      //ignore spaces and special characters
      if(code >= 97 && code <= 122){
        //shift and wrap code
        code -= 97;
        code -= shiftAmount;
        code = ((code % 26) + 26) % 26;
        code += 97;
      }
      
      
      //convert to char and paste onto output
      output += String.fromCharCode(code);
      
    }
    
    return output;
  
}//end caesarShiftEncrypt

let shift_output_box = document.getElementById("shift_output_box")
let shift_input_box = document.getElementById("shift_input_box");

function allShift(){
    //take the input value and shift value
    let inputText = shift_input_box.value;
    shift_output_box.innerHTML = '';
    //call the function
    for(let i = 1; i < 26; i++){
        shift_output_box.innerHTML += [i]+". ";
        shift_output_box.innerHTML += caesarShiftDecrypt(inputText, i*-1);
        shift_output_box.innerHTML += '\r\n';
    }
}

function caesarShiftDecrypt(message, shiftAmount){

    var output = "";
    message = message.toLowerCase();

    for(i = 0; i < message.length; i++){
        
        //get character's code
        var code = message.charCodeAt(i);
        
        //ignore spaces and special characters
        if(code >= 97 && code <= 122){
        //shift and wrap code
        code -= 97;
        code += shiftAmount;
        code = ((code % 26) + 26) % 26;
        code += 97;
        }
        
        //convert to char and paste onto output
        output += String.fromCharCode(code);
        
    }

    return output;

}//end caesarShiftDecrypt

/////////////////////////////////////////////////////////////////////
//////////////////  KeyWord FUNCTIONS  //////////////////////////////
/////////////////////////////////////////////////////////////////////

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


/////////////////////////////////////////////////////////////////////
//////////////////  monoAlphabetic FUNCTIONS  //////////////////////////////
/////////////////////////////////////////////////////////////////////



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

/////////////////////////////////////////////////////////////////////
//////////////////  Columnar FUNCTIONS  //////////////////////////////
/////////////////////////////////////////////////////////////////////

let columnar_input_box = document.getElementById("columnar_input_box");
let columnar_output_box = document.getElementById("columnar_output_box");
let columnKey = document.getElementById("columnKey");

//bringing from old project as reference but probably just going to use .toLowerCase() when possible
function removeNonLowercase(str){

    var output = "";

    for(var i = 0; i < str.length; i++){
        if(str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122){
            output += str.charAt(i);
        }
    }

    return output;

}

function columnEncrypt(){
    let inputText = columnar_input_box.value;
    inputText = inputText.toLowerCase();
    inputText = removeNonLowercase(inputText);
    let column = columnKey.value;
    column = parseInt(column, 10);
    columnar_output_box.innerHTML = columnarEncrypt(inputText, column);
}

function columnDecrypt(){
    let inputText = columnar_input_box.value;
    inputText = inputText.toLowerCase();
    inputText = removeNonLowercase(inputText);
    let column = columnKey.value;
    column = parseInt(column, 10);
    columnar_output_box.innerHTML = columnarDecrypt(inputText, column);
}


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



/////////////////////////////////////////////////////////////////////
//////////////////  Anagram FUNCTIONS  //////////////////////////////
/////////////////////////////////////////////////////////////////////


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

/////////////////////////////////////////////////////////////////////
//////////////////  Columnar - Anagram FUNCTIONS  ///////////////////
/////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////
//////////////////  Vigenere FUNCTIONS  ///////////////////
/////////////////////////////////////////////////////////////////////

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