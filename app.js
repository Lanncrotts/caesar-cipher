//Code assistance provided by ChatGPT (OpenAI)
//URL: https://chat.openai.com/
//  used ChatGPT if unable to properly debug my code, and if I was completely confused on specific lines of code. The majority of my code is original. If ChatGPT was used it was used mainly to refine what I already had, but not give any answers. Any lines that ChatGPT helped me with have been noted. 

//starter code:
const alphabet = "abcdefghijklmnopqrstuvwxyz";

//use this one to make an encrypt function!
// function encrypt (message, shiftValue)
// {
//   // Your encryption code here
//   return encryptedMessage;
// }


//use this to make a decrypt function!
// function decrypt (encryptedMessage, shiftValue)
// {
//   // Your decryption code here
//   return decryptedMessage;
// }


//Step 1: Create a function to encrypt a single letter using the Caesar cipher.

// This function will be used later inside an enryptMessage function.
function encryptLetter (letter, shiftValue) { //parameters are a given letter and the desired shiftValue

    // Convert the given letter to lowercase and find its index in the alphabet.
    // Example: 
    //      'a' is 0, 'b' is 1, through to 'z' is 25
    const decryptedIndex = alphabet.indexOf(letter.toLowerCase()); 

    //This function is meant to only be used on alphabetical characters. By adding in the following if statement, the function will stop here if anything other than an alphabetical character is entered. 
    if (decryptedIndex === -1) {
    return 'Invalid Argument';
    }


    // Calculate the new index by adding the shiftValue.Use modulo (%) to ensure it wraps around the alphabet correctly if the index is greater than 25.
    // For example: shifting 'y' (index of 24) by 3: (24 + 3) % 26 = 1; alphabet[1] = b
    const encryptedIndex = (decryptedIndex + shiftValue) % alphabet.length; 

    // Return the encrypted letter from the alphabet variable using the encryptedIndex.
    return alphabet[encryptedIndex]; 
}

//TESTING TO ENSURE FUNCTION WORKS PROPERLY:
console.log(encryptLetter('A', 3)); //expected output is 'd' to confirm uppercase input is handled correctly
    //d; correct
console.log(encryptLetter('y', 3)); //expected output is 'b' to confirm that the modulo operator is being used correctly to account for wrapping
    //b
console.log(encryptLetter('.', 3)); //expected output is 'Inavlid Argument' to confirm that the function will not accept characters that are not alphabetical. 
    //Invalid Argument

//Step 1 was very easy. Simple as using the same logic from Exercise 8.



//Step 2: Create a function that can encrypt a full message. 

//This function will now utilize the decryptLetter function in order to complete the given task:
    //Given a message, shift every letter by a given shiftValue
    //After every 2 letters, insert a random letter from the alphabet.
function encrypt(message, shiftValue) {
    //Use typeof to ensure the message input is a string, as this function cannot accept anything else (i.e. Booleans, numbers).
    if (typeof message !== "string") { 
        return 'Invalid Argument' //The function will stop and return the message 'Invalid Argument,' if the message is detected to be anything other than a string. 
    }
    let encryptedMessage = ""; //Create an empty string to build the encrypted message

    //Now to begin the loop:
    //Loop through each character in the original message one-by-one.
    for (let i = 0; i < message.length; i++) { 

        //Test to see if message[i] is alphabetical using the .includes() method
        if (alphabet.includes(message[i].toLowerCase())) { 
            //If the character is found to be alphabetical, then it will be shifted according to the encryptLetter function and added to the empty string. 
            encryptedMessage += encryptLetter(message[i], shiftValue); 
        }
        //Any other character that is not alphabetical will flow here next:
        else {
            //Any nonalphabetical characters will be added to the encryptedMessage string as is. 
            encryptedMessage += message[i];
        }
    }

    //After creating the above function, and ensuring it worked properly, I took a step back to figure out how to add the random letters in. My first thoughts were on creating a variable to pull a random letter from the alphabet and I remembered using the splice method on arrays to insert elements. This seemed like the best approach.

    //First, convert the now shifted message into an array, with each character being an element in the array. 
    const encryptedArray = encryptedMessage.split(""); 

    //Next, loop through the array. Start at the 3rd element (index of 2) and increase by 3 each time to ensure the random letter is inserted after every two letters. 
    for (let i = 2; i < encryptedArray.length; i += 3) { 

        //Create a variable to house the random letter by using Math.random() to generate a random indices that would exist in the alphabet variable. 
        let randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

        //Use the .splice() method to add in randomLetter at every i. 
        encryptedArray.splice(i, 0, randomLetter);
    }

    //Finally, return the encrypted message by converting the array back to a string using the .join() method. 
    return encryptedArray.join(""); 
}

//TESTING TO ENSURE FUNCTION WORKS PROPERLY:
console.log(encrypt('Meet me at noon.', 3));
    //phghwo phh ydwr qlrrsq.
    //without adding the random letters, it would be: 'phhw ph dw qrrq', in this example, here are the random letters added in shown by them being in upper case 'phGhwO pHh YdwR qLrrSq'
console.log(encrypt(true, 3));
    //'Invalid Argument'
    //I did this to show that the function will only accept strings. Since true is a Boolean, 'Invalid Argument' was returned and the function halted. 


//Step 3: Create a functions that decrypts a letter with a given shiftValue.
function decryptLetter(letter,shiftValue) { 

    //Ensure that the given letter is a lower case letter, then find the index of that letter.
    const encryptIndex = alphabet.indexOf(letter.toLowerCase()); 

    //Initially, when I reached the end of the project, I attempted to decrypt the secret message, but everywhere there was supposed to be a space, the letter j was there instead. This was due to a missing 'edge case' in this function.

    //Account for any non-alphabetical inputs.
    if (encryptIndex === -1) { 
        return letter;
    }
    //I was confused on how to account for large shift values that led to high negative numbers, so ChatGPT guided me on lines 129 and 130. After reading through the explanation, I understood the logic and reasoning behind it, as explained in the comments. 

    //Account for high shift numbers that can lead to high negative numbers by using the modulo operator to achieve a more 'workable' shift value. 
    //Example: 42 would become 16. 
    const workableShift = shiftValue % alphabet.length;

    //Find the decrypted letter's index by subtracting the workableIndex and then add the alphabet's length (accounts for negative numebrs). The modulo operator must be used at the end to ensure proper wrapping. 
    const decryptIndex = (encryptIndex - workableShift + alphabet.length) % alphabet.length; 

    //Return the decrypted letter by using the decryptIndex in the alphabet variable.
    return alphabet[decryptIndex];
}

//TESTING TO ENSURE FUNCTION WORKS PROPERLY:
console.log(decryptLetter('p',42)); //Expected output: 'z' to confirm that the function is properly wrapping around the alphabet and accounting for high shfit values.
    //z
console.log(decryptLetter('.', 42)); //Expected output is 'Invalid Argument' to confirm that only alphabetical characters will be accepted. 


//Step 4: Create a function that will decrypt a full message utilizing the decryptLetter function above. 
function decryptMessage(encryptedMessage, shiftValue) {
    //Test to ensure encryptedMessage input is a string
    if (typeof encryptedMessage !== "string") { 

        //The function will stop and return 'Invalid Argument' if the input is not a string. 
        return 'Invalid Argument' 
    }

    //In order to decrypt the message, first the random letters need to be removed, sicne there's no point in 'decrypting' them using the decryptLetter function. 

    //Convert the given encryptedMessage into an array using the .split() method.
    const encryptedArray = encryptedMessage.split("");

    //Create a loop, starting at the 3rd element (encryptedArray[2]) and increase i by 3 to skip the needed two letters following. 
    for (let i = 2; i < encryptedArray.length; i += 3) { 

        //Use the splice method on the array to remove the random letter at that element. 
        encryptedArray.splice(i, 1); 

        //Once an element is deleted, then then all of the following indicies shift. Subtract one from i to account for the change.
        i--;
    }

    //Create an empty decryptedMesage string to build in
    let decryptedMessage = "";

    //Create a loop to go through each element of the array and utilize the decryptLetter function.
    for(let i = 0; i < encryptedArray.length; i++) { 
        //If the letter is not alphabetical... 
        if (!alphabet.includes(encryptedArray[i].toLowerCase())) {

            //...enter it into the decrypted message string as it. 
            decryptedMessage += encryptedArray[i];
        }
        else {
            
            //Else, perform the decryptLetter function.
            decryptedMessage += decryptLetter(encryptedArray[i],shiftValue);
        }
    }
    //Finally, return the decrypted function
    return decryptedMessage; 
}

//FINAL ANSWER:
console.log(decryptMessage(`Iueuan jrxuq cjythdykwxaj mixkqtaeml ebv wHenckvbkei rqdmt fHukckvi.r Jbxuihus, tmxayiwfuxh sjxau amenhtv 'zQkhhuubyjkit' yjew jhxux mxydatij. zJxmu hvymhihj ajel kldlsuyjb dyju yid uekdh qIbkqsxa xsxqqdvduzb wuqzhdoi qjxwu waueo xjem jfxuy dpuntj dgkvuiwj.`, 42));
    //seek the midnight shadow of romulus and remus. there, whisper the word 'aurelius' to the winds. the first to unveil it in our slack channel earns the key to the next quest.