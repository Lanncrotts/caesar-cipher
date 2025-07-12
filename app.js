//Code assistance provided by ChatGPT (OpenAI)
//URL: https://chat.openai.com/
//  ChatGPT was utilized by aiding in debugging and to provide hints for parts I considered tricky. However, most code is my own and original. 

//Optional Challenge//
    //Each time, before adding a random letter, shift the first letter forward and the second letter backward. This not only adds an element of unpredictability but also tests the robustness of your functions. Dive deep, brave coder, and let's see if you can conquer this enhanced enigma!
    

//======Starter Code======//
const alphabet = "abcdefghijklmnopqrstuvwxyz";

//======SUBFUNCTION======//

function shiftLetter (letter, shiftValue,direction) { 
    const charIndex = alphabet.indexOf(letter.toLowerCase());
    if (charIndex === -1) 
        { return letter;} //Not a letter.

    const shiftedIndex = (charIndex + (direction * shiftValue) + alphabet.length) % alphabet.length;
    const shiftedChar = alphabet[shiftedIndex];

    return letter === 
        letter.toUpperCase() 
            ? shiftedChar.toUpperCase() 
            : shiftedChar;
}

//======ENCRYPT======//

function encrypt(message, shiftValue) {
    if (typeof message !== "string") { 
        return 'Invalid Input - Strings Only!';
    }

    let encryptedMessage = "";
    let actualIndex = 0; 

    for (let i = 0; i < message.length; i++) { 
        const char = message[i];
        const direction = actualIndex % 2 === 0 ? +1 : -1
        
        encryptedMessage += shiftLetter(char, shiftValue, direction);
        actualIndex++;
     
        if (i % 2 === 1) {
            const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
            encryptedMessage += randomLetter;
        }
    }
    return encryptedMessage;
}        

  
//======DECRYPT======//

function decrypt(encryptedMessage, shiftValue) {
    if (typeof encryptedMessage !== "string") { 
        return 'Invalid Input - Strings Only!'; 
    }

    let decryptedMessage = "";
    let actualIndex = 0;

    for(let i = 0; i < encryptedMessage.length; i++) { 
        //Remove the random letters
        if (i % 3 === 2) 
            { continue; }

        const char = encryptedMessage[i];
        const direction = actualIndex % 2 === 0 ? -1 : +1

        decryptedMessage += shiftLetter(char, shiftValue, direction);
        actualIndex++
    }
    return decryptedMessage; 
}
