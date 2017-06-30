//List of car make arrays
var carMake = ["Honda", "Lexus", "Toyota","Kia", "Hyundai", "Fiat", "Tesla", "Ford", "Chevy", "BMW", "Ferrari", "Audi", "Lamborghini"];

console.log(carMake[0]);

 // Creating variables to hold the number of wins, losses, and letter guesses. They start at 0.

 var wins = 0;
 var losses = 0;
 var letterGuesses = [];
 var gameStarted = false;
 var chosenWord = "";
 var remainingGuesses = 0;
 //This function is to store the letters are pressed

 document.onkeyup = function(event){
 	//This will let us know which keys have been pressed 
	var userGuess = event.key;
	console.log(event.keyCode);

	//This statement will make sure only letters will work

	if ((isInArray(letterGuesses,userGuess) || !isValidKey(event.keyCode)) && gameStarted){
		return;
	}

	//This is how you start the game
	if (gameStarted == true){
		console.log("Started");
		
		//This will store all the letter guessed
		letterGuesses.push(userGuess);
		addText("lettersGuessed", userGuess);

		//This is use to check if the letter is in the word
		var wordChecker = chosenWord.toLowerCase().includes(userGuess); 
		console.log(wordChecker);
		if (wordChecker == true) {
			var currentWord = getCurrentWord(chosenWord);
			setText("currentWord",currentWord);
			if (!currentWord.includes("_")) {
				wins++;
				setText("winsCount",wins);
				gameStarted = false;
			}
			
		}
		else {
			remainingGuesses--;
			setText("remainingGuesses",remainingGuesses);
			console.log(remainingGuesses);
		}

		//If there are more than 9 wrong guesses then score for losses goes up and the game starts over. 	
		if (remainingGuesses == 0){
			gameStarted = false;
			remainingGuesses = 9;
			losses++;
			letterGuesses = [];
			alert("GAME OVER!");
			setText("lettersGuessed","");
			console.log(losses);	
		}
		
	} 	
	else {
		// Computer randomly chooses a word from the array carMake
		chosenWord = getWord();
		gameStarted = true;
		remainingGuesses = 9;
		setText("remainingGuesses", remainingGuesses);
		letterGuesses = [];
		setText("currentWord",getCurrentWord(chosenWord));
		setText("lettersGuessed","");
		console.log(chosenWord);
	}

	
	
	


 }

 // Get random word from array by defining the function getWord
function getWord(){
	return carMake[Math.floor(Math.random() * carMake.length)];
}

//Checking letter guesses in the index has been guessed
function isInArray (letterGuesses, letter){
	return letterGuesses.indexOf(letter.toLowerCase()) > -1;
}
function isValidKey(keyCode){
	//this state returns the value of true or false 
	 return keyCode <91 && keyCode > 64;
}	

function setText (id, value){
	var elem = document.getElementById(id);
	elem.innerHTML = value;
}
function addText (id, value){
	var elem = document.getElementById(id);
	if (elem.innerHTML.length == 0){
		elem.innerHTML = value;
	}
	else {
		elem.innerHTML = elem.innerHTML + ", " + value;
	}
}

function getCurrentWord (currentWord){
	
	var letterOutput = "";
	for(var i = 0; i < currentWord.length; i++){
		var letter = currentWord[i];
		
		
		if(isInArray(letterGuesses, letter)){
			letterOutput += letter;
			
		}
		else{
			letterOutput += "_";
			
		}
		letterOutput += " ";
	}
	return letterOutput;
}