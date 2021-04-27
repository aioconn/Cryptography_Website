/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////

function freqAnalysis(message, segmentLength) { 

    let output = [];

    //get the segments for count
    for(let i = 0; i <= message.length - segmentLength; i++){

        var segment = message.substr(i, segmentLength);

        //see if it is in the list
        let index = -1;

        for(let j = 0; j < output.length && index == -1; j++){
            
            if(output[j].segment == segment){
                index = j;
            }
        }

        //if its in list, increment
        if(index != -1){
            output[index].count++;
        }
        else{
            output.push({
                segment: segment,
                count: 1,
                proportion: 0
            });
        }
    }

    let totalSegments = message.length - segmentLength + 1;

    for(let i = 0; i < output.length; i++){

        output[i].proportion = 0.0 + output[i].count / totalSegments;
    }
    return output;
}


function sortFrequencies(frequencyList){

    let i = 1;
    while(i < frequencyList.length){
        let j = i;
        while(j > 0 && frequencyList[j - 1].segment.charCodeAt(0) > frequencyList[j].segment.charCodeAt(0)){
            let temp = frequencyList[j];
            frequencyList[j] = frequencyList[j - 1];
            frequencyList[j - 1] = temp;
            
            j = j - 1;
        }
        i = i + 1;
    }

    return frequencyList;
}



function sortFrequenciesProportion(frequencyList){

    let i = 1;
    while(i < frequencyList.length){
        let j = i;
        while(j > 0 && frequencyList[j - 1].proportion < frequencyList[j].proportion){
            let temp = frequencyList[j];
            frequencyList[j] = frequencyList[j - 1];
            frequencyList[j - 1] = temp;
            
            j = j - 1;
        }
        i = i + 1;
    }
    
    return frequencyList;
    
}


//quick mod function
function mod(a, b){
    return (((a % b) + b) % b);
}



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

function VigenereSegment() {

    //get input values
    var numSegs = document.getElementById("segment_input").value;
    numSegs = parseInt(numSegs, 10);
    if (numSegs <= 0) {
        numSegs = 1;
    }

    //get ciphertext
    var inputText = document.getElementById("vigenere_input_box").value;
    inputText = inputText.toLowerCase();
    inputText = removeNonLowercase(inputText);

    //calculate segments
    var segments = segmentMessage(inputText, numSegs);

    //print segments
    var box = document.getElementById("segment_output");
    var output = "";

    for (var i = 0; i < segments.length; i++) {

        var line = "Segment [" + (i + 1) + "]   ";
        line += segments[i];
        line += "\n\n";

        output += line;

    }
    box.value = output;
}

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

let factorArea = document.getElementById("factorArea");
let textLength = document.getElementById("textLength");
let anagram_input_factor_box = document.getElementById("anagram_input_box");

function anagramFactor(){
    let input = anagram_input_factor_box.value;
    input = input.split(" ").join("");
    length = input.length;
    textLength.innerText = length;
    calculate(length, factorArea)
}

let columnarFactorArea = document.getElementById("columnarFactorArea");
let columnarTextLength = document.getElementById("columnarTextLength");
let columnar_input_factor_box = document.getElementById("columnar_input_box");

function columnarFactor(){
    let input = columnar_input_factor_box.value;
    input = input.split(" ").join("");
    length = input.length;
    columnarTextLength.innerText = length;
    calculate(length, columnarFactorArea)
}


function calculate(num, name) {
    var str = "0";
    for (var i = 1; i <= num; i++) {
        if (num % i == 0) {
            str += ',' + i;
        }
    }
    name.innerHTML = str;
}

//Low Frequency Analysis
let lowFreqReport = document.getElementById("LF_left_output");
let possKeywords = document.getElementById("LF_right_output");

function LFA(){
    //get key length
    var keyLength = document.getElementById("LFA_input").value;
    keyLength = parseInt(keyLength, 10);

    //get ciphertext
    var inputText = document.getElementById("vigenere_input_box").value;
    inputText = inputText.toLowerCase();
    inputText = removeNonLowercase(inputText);

    //get segments
    var segments = segmentMessage(inputText, keyLength);

    //get table element and initialize header
    var table = lowFreqReport;
    table.innerHTML = "";
    var tableHeader = document.createElement("tr");

    var colShift = document.createElement("td");
    var colShiftText = document.createTextNode("Key Letter");
    colShift.appendChild(colShiftText);
    tableHeader.appendChild(colShift);

    for(var i = 1; i <= segments.length; i++){
        var col = document.createElement("td");
        var colText = document.createTextNode("Segment [" + i + "]");
        col.appendChild(colText);
        tableHeader.appendChild(col);
    }

    table.appendChild(tableHeader);

    //initialize list to hold all sums
    var segmentSums = new Array(segments.length);
    for(var i = 0; i < segmentSums.length; i++){
        segmentSums[i] = [];
    }

    //for each shift value,
    for(var i = 0; i < 26; i++){

        //print the stats to the table
        var row = document.createElement("tr");

        //shift amount
        var col1 = document.createElement("td");
        var col1Text = document.createTextNode(String.fromCharCode(i + 97));
        col1.appendChild(col1Text);

        row.appendChild(col1);


        //decrypt all segments with value
        //for each result:
        for(var j = 0; j < segments.length; j++){

            //shift letters
            var shifted = caesarShiftDecrypt(segments[j], i);

            //get frequency analysis
            var freq = frequencyAnalysis(shifted, 1);

            //calculate proprotion of low frequency letters
            var sum = 0.0;
            for(var k = 0; k < freq.length; k++){

                if(freq[k].segment == "j" ||
                    freq[k].segment == "k" ||
                    freq[k].segment == "q" ||
                    freq[k].segment == "x" ||
                    freq[k].segment == "z"){

                    sum += freq[j].proportion;

                }

            }//end for

            //add sum to list
            segmentSums[j].push({proportion:sum, letter:String.fromCharCode(i + 97)});

            //print segments
            var freqElement = document.createElement("td");
            var freqText = document.createTextNode(sum.toFixed(3));
            freqElement.appendChild(freqText);
            row.appendChild(freqElement);

        }

        table.appendChild(row);

    }

    //get values for possible keywords
    sortSegSums(segmentSums);

    //get first 3 values from each
    var charsets = [];
    for(var i = 0; i < segmentSums.length; i++){

        var arr = [];
        for(var j = 0; j < 3; j++){
            arr.push(segmentSums[i][j].letter);
        }
        charsets.push(arr);

    }

    //construct the first word
    var testWord = "";
    for(var i = 0; i < charsets.length; i++){
        testWord += charsets[i][0];
    }


    //construct list of all possible words
    var allWords = [testWord];

    if(charsets.length < 10){

        var keepGoing = true;
        while(keepGoing){
            testWord = getPermutation(charsets, testWord);

            if(testWord == null || testWord == undefined){
                keepGoing = false;
            }else{
                allWords.push(testWord);
            }
        }

    }


    //construct output
    var keywords = "";

    for(var i = 0; i < allWords.length; i++){
        keywords += allWords[i] + "\n";
    }

    possKeywords.value = keywords;

}

function frequencyAnalysis(message, segmentLength){

    var output = [];

    //get segments
    for(var i = 0; i <= message.length - segmentLength; i++){

        //extract segment
        var seg = message.substr(i, segmentLength);

        //find segment in list (if possible)
        var index = -1
        for(var j = 0; j < output.length && index == -1; j++){
            if(output[j].segment == seg){
                index = j;
            }
        }

        //if segment is in the list, increment its count
        if(index != -1){
            output[index].count++;
        }else{
            output.push({
                segment: seg,
                count: 1,
                proportion: 0
            });
        }

    }//end main for loop

    //calculate proportions
    var totalSeg = message.length - segmentLength + 1;

    for(var i = 0; i < output.length; i++){

        output[i].proportion = 0.0 + output[i].count / totalSeg;

    }

    return output;
}


function sortSegSums(segmentSums){


    //sort
    for(var s = 0; s < segmentSums.length; s++){

        var segment = segmentSums[s];
        var i = 1;
        while(i < segment.length){
            var j = i;
            while(j > 0 && segment[j - 1].proportion > segment[j].proportion){
                //swap
                var temp = segment[j];
                segment[j] = segment[j - 1];
                segment[j - 1] = temp;
                j = j - 1;
            }
            i = i + 1;
        }

    }

}



function getPermutation(charsets, curWord){

    var keepGoing = true;
    var index = 0;
    while(keepGoing){

        if(index >= charsets.length){
            keepGoing = false;
            return null;
        }

        //determine if we need to shift over a letter
        if(charsets[index].indexOf(curWord.charAt(index)) == (charsets[index].length - 1)){

            //increment the letter, then push onto next letter
            var newInd = 0;
            var newString = "";

            newString += curWord.substr(0, index);
            newString += charsets[index][newInd];
            newString += curWord.substr(index + 1, (curWord.length - newString.length));

            curWord = newString;

            index++;
            //console.log("SHIFT TO NEXT LETTER " + index);
        }else{

            //replace the character and return it
            var newInd = charsets[index].indexOf(curWord.substr(index, 1)) + 1;
            var newString = "";

            newString += curWord.substr(0, index);
            newString += charsets[index][newInd];
            newString += curWord.substr(index + 1, (curWord.length - newString.length));

            keepGoing = false;
            return (newString);

        }

    }

}

//calculate single frequencies and build graph

function updateGraph(){
	
	//sanitize input
	let ciphertext = document.getElementById("caesar_input_box").value;
	ciphertext = ciphertext.toLowerCase();
	ciphertext = removeNonLowercase(ciphertext);
	
	//get frequencies
	let frequencies = frequencyAnalysis(ciphertext, 1);
	//frequencies = sortFrequenciesAlpha(frequencies);

	let proportions = [];
	let labels = [];

	//(initialize lists)
	for(let i = 0; i < 26; i++){
		proportions.push(0);
		labels.push(String.fromCharCode(i + 97));
	}
	
	//(fill proportions)
	for(let i = 0; i < frequencies.length; i++){
		let index = frequencies[i].segment.charCodeAt(0) - 97;
		proportions[index] = frequencies[i].proportion * 100;
	}
	
	//clear canvas
	let cnv = document.getElementById("chart-container");
	let ctx = cnv.getContext("2d");
	ctx.fillStyle = "#FFFFFF";
	ctx.fillRect(0,0, cnv.height, cnv.width);
	
	let bar = new RGraph.Bar({
        id: 'chart-container',
        data: proportions,
        options: {
            labels: labels,
			//textAccessible: false,
            unitsPost: '%',
            shadow: false,
			tooltips: proportions,
			highlightFill: "rgba(0,0,0,0.5)",
            colors: ['red', 'pink'],
            strokestyle: 'rgba(0,0,0,0)',
            textSize: 10,
            title: 'Single Letter Frequency Analysis',
            numyticks: 8,
            gutterLeft: 30,
			gutterTop: 40,
			crosshairs: true,
			hmargin: 0,
			zoomFactor: 0.001
        }                
    }).draw();
	
}


function updateGraphSVG(){
	
	//sanitize input
	let ciphertext = document.getElementById("caesar_input_box").value;
	ciphertext = ciphertext.toLowerCase();
	ciphertext = removeNonLowercase(ciphertext);
	
	//get frequencies
	let frequencies = frequencyAnalysis(ciphertext, 1);
	//frequencies = sortFrequenciesAlpha(frequencies);

	let proportions = [];
	let labels = [];

	//(initialize lists)
	for(let i = 0; i < 26; i++){
		proportions.push(0);
		labels.push(String.fromCharCode(i + 97));
	}
	
	//(fill proportions)
	for(let i = 0; i < frequencies.length; i++){
		let index = frequencies[i].segment.charCodeAt(0) - 97;
		proportions[index] = frequencies[i].proportion * 100;
	}
	
	//clear svg
	$("svg").empty();
	
	
	let bar = new RGraph.SVG.Bar({
		id: 'chart-container',
		data: proportions,
		options: {
			hmargin: 1,
			xaxisLabels: labels,
			tooltips: proportions,
			title: 'Single Character Frequency Analysis',
			colors: ['red'],
			shadow: true,
			shadowOpacity: 0.5,
			
			xaxisLabelsOffsetx: 0,
			xaxisLabelsOffsety: 0,
			yaxisLabelsOffsetx: 0,
			yaxisLabelsOffsety: 0
		}
	}).draw();
	
}

//calculate frequencies
singleFreqBtn = document.getElementById("btn-freq-single");

singleFreqBtn.addEventListener("click", function(){
	
	//sanitize input
	var ciphertext = document.getElementById("caesar_input_box").value;
	ciphertext = ciphertext.toLowerCase();
	ciphertext = removeNonLowercase(ciphertext);
	
	//get frequencies
	var frequencies = frequencyAnalysis(ciphertext, 1);
	frequencies = sortFrequenciesProportion(frequencies);
	
	//display frequencies
	var boxText = "";
	for(var i = 0; i < frequencies.length; i++){
		
		var line = "";
		line += frequencies[i].segment;
		line += ":\t";
		line += frequencies[i].count;
		line += "\t";
		line += frequencies[i].proportion;
		
		boxText += line;
		
		if(i < frequencies.length - 1){
			boxText += "\n";
		}
		
	}
	
	var box = document.getElementById("caesar_FA_output");
	box.value = boxText;
	
	updateGraphSVG();
	
});
