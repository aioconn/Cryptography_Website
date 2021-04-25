/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////

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
