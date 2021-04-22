/////////////////////////////////////////////
//             Crypto Website              //
// Tool for CSCI432: Security In Computing //
//    Jarret Whitehouse & Aiden O'Conner   //
//                  2021                   //
/////////////////////////////////////////////

function main() {
    
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

    

}