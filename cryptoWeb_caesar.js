/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////


function main(){

    //decrypt button  --- will get removed when integrated with the HTML but needed to do for planning
    caesarDecryptbtn.addEventListener("click", function (event) {

        //take the input value and shift value
        let inputText = caesar_input_box.value;
        let shift = shiftKeyInput.value;

        //it's decrypt so make the shift negative
        shift = shift*-1;

        //call the function
        caesar_output_input.innerHTML = caesarShift(inputText, shift);

    });

    //encrypt button  --- will get removed when integrated with the HTML but needed to do for planning
    caesarEncryptbtn.addEventListener("click", function (event) {

        //take the input value and shift value
        let inputText = caesar_input_box.value;
        let shift = shiftKeyInput.value;

        //call the function
        caesar_output_input.innerHTML = caesarShift(inputText, shift);

    });   
    
    //Function for the Caeser Cipher decryption
    function caesarShift(str, amount) {
        // Wrap the amount
        if (amount < 0) {
            return caesarShift(str, amount + 26);
        }
        
        // Make an output variable
        var output = "";
        
        // Go through each character
        for (var i = 0; i < str.length; i++) {
            // Get the character we'll be appending
            var c = str[i];
        
            // If it's a letter...
            if (c.match(/[a-z]/i)) {
            // Get its code
            var code = str.charCodeAt(i);
        
            // Uppercase letters
            if (code >= 65 && code <= 90) {
                c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
            }
        
            // Lowercase letters
            else if (code >= 97 && code <= 122) {
                c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
            }
            }
        
            // Append
            output += c;
        }
        
        // All done!
        return output;
    };    


}
