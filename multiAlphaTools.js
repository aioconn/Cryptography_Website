/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////



function factor(num){

    var factorList = [];

    for(var i = 2; i < num / 2.0; i++){
        if(mod(num, i) == 0){
            factorList.push(i);
        }
    }

    return factorList;

}

function getDistances(text, maxLength){

    //-------------------------------------------------------------------//
    //utility function for checking if a substring exists in output
    function substrExists(outputArr, substring, substringIndex){

        var result = false;

        //for every element in the output array
        for(var i = 0; i < outputArr.length && !(result); i++){

            var obj = outputArr[i];

            //if the string is larger than the substring, check if the substring exists in it
            if(obj.str.length > substring.length){
                if(obj.str.indexOf(substring) != -1){

                    //check if the substring is actually part of the word, or if it was independent of the larger word
                    if((obj.startInd <= substringIndex) && obj.startInd + obj.str.length >= substringIndex + substring.length){
                        result = true;
                    }

                }
            }

        }//end for

        return result;

    }//end substrExists
    //-------------------------------------------------------------------//


    var output = [];

    //start at maxLength, and go up to trigrams
    for(var gramLength = maxLength; gramLength >= 3; gramLength--){

        //for every possible position in the text
        for(var textPos = 0; textPos <= text.length - gramLength; textPos++){

            //get the gram
            var gram = text.substr(textPos, gramLength);

            //look for match until one is found or until the string runs out
            var testPos = textPos + gramLength;
            while((testPos <= text.length - gramLength) && (text.substr(testPos, gramLength) != gram)){
                testPos++;
            }

            //if the counter didn't surpass its max value (a match was found)
            if(testPos <= text.length - gramLength){

                //make sure that it is not a substring of an already found word
                if(!substrExists(output, gram, textPos)){

                    //calculate distance and add gram to output
                    var dist = testPos - textPos;
                    var data = {
                        str: gram,
                        distance: dist,
                        startInd: textPos
                    };

                    output.push(data);
                }

            }//end outer if

        }

    }//end for

    return output;

}//end getDistances()

function addFactors(distances){

    //--------------------------------------------------//


    function isInFactors(factorList, fact){

        var result = -1;

        var keepGoing = true;
        //for every factor object in factorList, look for the factor.
        for(var i = 0; i < factorList.length && keepGoing; i++){
            //if you find it, return the index
            if(fact == factorList[i].factor){
                result = i;
                keepGoing = false;
            }
        }


        return result;

    }

    //--------------------------------------------------//





    var output = [];

    //for every entry in distances
    for(var i = 0; i < distances.length; i++){

        //get the factorization
        var factors = factor(distances[i].distance);


        //add the factors to output
        for(var j = 0; j < factors.length; j++){

            //if it's already in the list, add
            var index = isInFactors(output, factors[j]);

            if(index != -1){
                output[index].instances++;
            }else{
                var obj = {
                    factor: factors[j],
                    instances: 1
                };
                output.push(obj);
            }

        }
    }

    return output;

}

function sortFactorList(factors){

    var i = 1;
    while(i < factors.length){
        var j = i;
        while(j > 0 && factors[j - 1].factor > factors[j].factor){

            //swap
            var temp = factors[j];
            factors[j] = factors[j - 1];
            factors[j - 1] = temp;

            j = j - 1;

        }
        i = i + 1;
    }


}//end sortFactors

function segmentMessage(msg, keyLength){

    var output = [];

    for(var i = 0; i < keyLength; i++){

        output[i] = "";
        var letter = i;

        while(letter < msg.length){
            output[i] += msg.substr(letter, 1);
            letter += keyLength;
        }

    }

    return output;

}//end segmentMessage

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

//Caesar IC Function space

let caesar_ic_output = document.getElementById("caesar_ic_output")
let caesar_ic_input = document.getElementById("caesar_ic_input");
let caesar_IC_input_box = document.getElementById("caesar_input_box");

function getCaesarIC(){
    let segments = caesar_ic_input.value
    segments = parseInt(segments, 10);

    //get ciphertext
    var ciphertext = caesar_IC_input_box.value;
    ciphertext = ciphertext.toLowerCase();
    ciphertext = removeNonLowercase(ciphertext);

    //get segments
    var seg = segmentMessage(ciphertext, segments);

    //for each segment, get IC
    var ICText = "";
    for(var i = 0; i < seg.length; i++) {

        var IC = indexOfCoincidence(seg[i]);
        ICText += "[" + (i + 1) + "]  ";
        ICText += IC;
        ICText += '\r\n';
    }
    caesar_ic_output.innerHTML = ICText;
}

//Keyword IC function

let keyword_ic_output = document.getElementById("keyword_ic_output")
let keyword_ic_input = document.getElementById("keyword_ic_input");
let keyword_IC_input_box = document.getElementById("keyword_input_box");

function getKeywordIC(){
    let segments = keyword_ic_input.value
    segments = parseInt(segments, 10);
    //get ciphertext
    var ciphertext = keyword_IC_input_box.value;
    ciphertext = ciphertext.toLowerCase();
    ciphertext = removeNonLowercase(ciphertext);

    //get segments
    var seg = segmentMessage(ciphertext, segments);

    //for each segment, get IC
    var ICText = "";
    for(var i = 0; i < seg.length; i++) {

        var IC = indexOfCoincidence(seg[i]);
        ICText += "[" + (i + 1) + "]  ";
        ICText += IC;
        ICText += '\r\n';
    }
    keyword_ic_output.innerHTML = ICText;
}

//Vigenere IC function

let vigenere_ic_output = document.getElementById("vigenere_ic_output")
let vigenere_ic_input = document.getElementById("vigenere_ic_input");
let vigenere_IC_input_box = document.getElementById("vigenere_input_box");

function getVigenereIC(){
    let segments = vigenere_ic_input.value
    segments = parseInt(segments, 10);
    //get ciphertext
    var ciphertext = vigenere_IC_input_box.value;
    ciphertext = ciphertext.toLowerCase();
    ciphertext = removeNonLowercase(ciphertext);

    //get segments
    var seg = segmentMessage(ciphertext, segments);

    //for each segment, get IC
    var ICText = "";
    for(var i = 0; i < seg.length; i++) {

        var IC = indexOfCoincidence(seg[i]);
        ICText += "[" + (i + 1) + "]  ";
        ICText += IC;
        ICText += '\r\n';
    }
    vigenere_ic_output.innerHTML = ICText;
}

//Anagram IC function

let anagram_ic_output = document.getElementById("anagram_ic_output")
let anagram_ic_input = document.getElementById("anagram_ic_input");
let anagram_IC_input_box = document.getElementById("anagram_input_box");

function getAnagramIC(){
    let segments = anagram_ic_input.value
    segments = parseInt(segments, 10);
    //get ciphertext
    var ciphertext = anagram_IC_input_box.value;
    ciphertext = ciphertext.toLowerCase();
    ciphertext = removeNonLowercase(ciphertext);

    //get segments
    var seg = segmentMessage(ciphertext, segments);

    //for each segment, get IC
    var ICText = "";
    for(var i = 0; i < seg.length; i++) {

        var IC = indexOfCoincidence(seg[i]);
        ICText += "[" + (i + 1) + "]  ";
        ICText += IC;
        ICText += '\r\n';
    }
    anagram_ic_output.innerHTML = ICText;
}

//Columnar IC function

let columnar_ic_output = document.getElementById("columnar_ic_output")
let columnar_ic_input = document.getElementById("columnar_ic_input");
let columnar_IC_input_box = document.getElementById("columnar_input_box");

function getColumnarIC(){
    let segments = columnar_ic_input.value
    segments = parseInt(segments, 10);
    //get ciphertext
    var ciphertext = columnar_IC_input_box.value;
    ciphertext = ciphertext.toLowerCase();
    ciphertext = removeNonLowercase(ciphertext);

    //get segments
    var seg = segmentMessage(ciphertext, segments);

    //for each segment, get IC
    var ICText = "";
    for(var i = 0; i < seg.length; i++) {

        var IC = indexOfCoincidence(seg[i]);
        ICText += "[" + (i + 1) + "]  ";
        ICText += IC;
        ICText += '\r\n';
    }
    columnar_ic_output.innerHTML = ICText;
}

function indexOfCoincidence(message){

    message = message.toLowerCase();
    message = removeNonLowercase(message);

    var N = message.length;

    var sum = 0;

    //for every letter in the alphabet, get the amount of each letter,
    //then get n(n-1) and add to sum
    for(var i = 0; i < 26; i++){

        //get letter
        var letter = String.fromCharCode(i + 97);

        //count occurences
        var occurences = 0;
        for(var j = 0; j < N; j++){
            if(message.charAt(j) == letter){
                occurences++;
            }
        }

        sum += occurences * (occurences - 1);

    }



    var output = sum / (N * (N - 1));

    return output;

}
