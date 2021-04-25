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