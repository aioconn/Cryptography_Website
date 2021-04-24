/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////

let caesar_input_box = document.getElementById("caesar_input_box");
let shiftKeyInput = document.getElementById("shiftKeyInput");
let caesar_output_box = document.getElementById("caesar_output_box");

//Function for the Caeser Cipher decryption
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
        code += shiftAmount;
        code = ((code % 26) + 26) % 26;
        code += 97;
      }
      
      
      //convert to char and paste onto output
      output += String.fromCharCode(code);
      
    }
    
    return output;
  
}//end caesarShiftEncrypt

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
        code -= shiftAmount;
        code = ((code % 26) + 26) % 26;
        code += 97;
        }
        
        //convert to char and paste onto output
        output += String.fromCharCode(code);
        
    }

    return output;

}//end caesarShiftDecrypt