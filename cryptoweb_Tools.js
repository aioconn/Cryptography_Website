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

        let segment = message.substr(i, segmentLength);

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

//calculate single frequencies and build graph

function updateGraph(){
	
	//sanitize input
	let ciphertext = document.getElementById("ciphertext").value;
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
	let ciphertext = document.getElementById("ciphertext").value;
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
doubleFreqBtn = document.getElementById("btn-freq-double");
tripleFreqBtn = document.getElementById("btn-freq-triple");

singleFreqBtn.addEventListener("click", function(){
	
	//sanitize input
	let ciphertext = document.getElementById("ciphertext").value;
	ciphertext = ciphertext.toLowerCase();
	ciphertext = removeNonLowercase(ciphertext);
	
	//get frequencies
	let frequencies = frequencyAnalysis(ciphertext, 1);
	frequencies = sortFrequenciesProportion(frequencies);
	
	//display frequencies
	let boxText = "";
	for(let i = 0; i < frequencies.length; i++){
		
		let line = "";
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
	
	let box = document.getElementById("freq-box");
	box.value = boxText;
	
	updateGraphSVG();
	
});

doubleFreqBtn.addEventListener("click", function(){
	
	//sanitize input
	let ciphertext = document.getElementById("ciphertext").value;
	ciphertext = ciphertext.toLowerCase();
	ciphertext = removeNonLowercase(ciphertext);
	
	//get frequencies
	let frequencies = frequencyAnalysis(ciphertext, 2);
	frequencies = sortFrequenciesProportion(frequencies);
	
	//display frequencies
	let boxText = "";
	for(let i = 0; i < frequencies.length; i++){
		
		let line = "";
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
	
	let box = document.getElementById("freq-box");
	box.value = boxText;
	
	updateGraphSVG();
	
});

tripleFreqBtn.addEventListener("click", function(){
	
	//sanitize input
	let ciphertext = document.getElementById("ciphertext").value;
	ciphertext = ciphertext.toLowerCase();
	ciphertext = removeNonLowercase(ciphertext);
	
	//get frequencies
	let frequencies = frequencyAnalysis(ciphertext, 3);
	frequencies = sortFrequenciesProportion(frequencies);
	
	//display frequencies
	let boxText = "";
	for(let i = 0; i < frequencies.length; i++){
		
		let line = "";
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
	
	let box = document.getElementById("freq-box");
	box.value = boxText;
	
	updateGraphSVG();
	
});



//quick mod function
function mod(a, b){
    return (((a % b) + b) % b);
}



//bringing from old project as reference but probably just going to use .toLowerCase() when possible
function removeNonLowercase(str){

    let output = "";
    
    for(let i = 0; i < str.length; i++){
        if(str.charCodeAt(i) >= 97 && str.charCodeAt(i) <= 122){
            output += str.charAt(i);
        }
    }
    
    return output;
    
}

function factor(num){

    let factorList = [];

    for(let i = 2; i < num / 2.0; i++){
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

        let result = false;

        //for every element in the output array
        for(let i = 0; i < outputArr.length && !(result); i++){

            let obj = outputArr[i];

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


    let output = [];

    //start at maxLength, and go up to trigrams
    for(let gramLength = maxLength; gramLength >= 3; gramLength--){

        //for every possible position in the text
        for(let textPos = 0; textPos <= text.length - gramLength; textPos++){

            //get the gram
            let gram = text.substr(textPos, gramLength);

            //look for match until one is found or until the string runs out
            let testPos = textPos + gramLength;
            while((testPos <= text.length - gramLength) && (text.substr(testPos, gramLength) != gram)){
                testPos++;
            }

            //if the counter didn't surpass its max value (a match was found)
            if(testPos <= text.length - gramLength){

                //make sure that it is not a substring of an already found word
                if(!substrExists(output, gram, textPos)){

                    //calculate distance and add gram to output
                    let dist = testPos - textPos;
                    let data = {
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

        let result = -1;

        let keepGoing = true;
        //for every factor object in factorList, look for the factor.
        for(let i = 0; i < factorList.length && keepGoing; i++){
            //if you find it, return the index
            if(fact == factorList[i].factor){
                result = i;
                keepGoing = false;
            }
        }


        return result;

    }

    //--------------------------------------------------//





    let output = [];

    //for every entry in distances
    for(let i = 0; i < distances.length; i++){

        //get the factorization
        let factors = factor(distances[i].distance);


        //add the factors to output
        for(let j = 0; j < factors.length; j++){

            //if it's already in the list, add
            let index = isInFactors(output, factors[j]);

            if(index != -1){
                output[index].instances++;
            }else{
                let obj = {
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

    let i = 1;
    while(i < factors.length){
        let j = i;
        while(j > 0 && factors[j - 1].factor > factors[j].factor){

            //swap
            let temp = factors[j];
            factors[j] = factors[j - 1];
            factors[j - 1] = temp;

            j = j - 1;

        }
        i = i + 1;
    }


}//end sortFactors

function segmentMessage(msg, keyLength){

    let output = [];

    for(let i = 0; i < keyLength; i++){

        output[i] = "";
        let letter = i;

        while(letter < msg.length){
            output[i] += msg.substr(letter, 1);
            letter += keyLength;
        }

    }

    return output;

}//end segmentMessage

//bringing from old project as reference but probably just going to use .toLowerCase() when possible
function removeNonLowercase(str){

    let output = "";

    for(let i = 0; i < str.length; i++){
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
    let ciphertext = caesar_IC_input_box.value;
    ciphertext = ciphertext.toLowerCase();
    ciphertext = removeNonLowercase(ciphertext);

    //get segments
    let seg = segmentMessage(ciphertext, segments);

    //for each segment, get IC
    let ICText = "";
    for(let i = 0; i < seg.length; i++) {

        let IC = indexOfCoincidence(seg[i]);
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
    let ciphertext = keyword_IC_input_box.value;
    ciphertext = ciphertext.toLowerCase();
    ciphertext = removeNonLowercase(ciphertext);

    //get segments
    let seg = segmentMessage(ciphertext, segments);

    //for each segment, get IC
    let ICText = "";
    for(let i = 0; i < seg.length; i++) {

        let IC = indexOfCoincidence(seg[i]);
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
    let ciphertext = vigenere_IC_input_box.value;
    ciphertext = ciphertext.toLowerCase();
    ciphertext = removeNonLowercase(ciphertext);

    //get segments
    let seg = segmentMessage(ciphertext, segments);

    //for each segment, get IC
    let ICText = "";
    for(let i = 0; i < seg.length; i++) {

        let IC = indexOfCoincidence(seg[i]);
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
    let ciphertext = anagram_IC_input_box.value;
    ciphertext = ciphertext.toLowerCase();
    ciphertext = removeNonLowercase(ciphertext);

    //get segments
    let seg = segmentMessage(ciphertext, segments);

    //for each segment, get IC
    let ICText = "";
    for(let i = 0; i < seg.length; i++) {

        let IC = indexOfCoincidence(seg[i]);
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
    let ciphertext = columnar_IC_input_box.value;
    ciphertext = ciphertext.toLowerCase();
    ciphertext = removeNonLowercase(ciphertext);

    //get segments
    let seg = segmentMessage(ciphertext, segments);

    //for each segment, get IC
    let ICText = "";
    for(let i = 0; i < seg.length; i++) {

        let IC = indexOfCoincidence(seg[i]);
        ICText += "[" + (i + 1) + "]  ";
        ICText += IC;
        ICText += '\r\n';
    }
    columnar_ic_output.innerHTML = ICText;
}

function indexOfCoincidence(message){

    message = message.toLowerCase();
    message = removeNonLowercase(message);

    let N = message.length;

    let sum = 0;

    //for every letter in the alphabet, get the amount of each letter,
    //then get n(n-1) and add to sum
    for(let i = 0; i < 26; i++){

        //get letter
        let letter = String.fromCharCode(i + 97);

        //count occurences
        let occurences = 0;
        for(let j = 0; j < N; j++){
            if(message.charAt(j) == letter){
                occurences++;
            }
        }

        sum += occurences * (occurences - 1);

    }



    let output = sum / (N * (N - 1));

    return output;

}
