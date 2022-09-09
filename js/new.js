//challenge in days
function age_in_days(){
    let birthYear = prompt('Whats is your birthyear:');
    let age_in_years=2022-birthYear;
    let age_in_days_result = age_in_years * 365;
    let h1 = document.createElement('h1');
    let textAnswer= document.createTextNode("You are " + age_in_days_result.toString() + " days old");
    let tag=document.getElementById('flex-box-result');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);
    tag.appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}


//cat generator

function generate_cat(){
    let image =document.createElement('img');
    let flex = document.getElementById('flex-box-container-2');
    image.src="https://imgs.search.brave.com/Z__6q_c7aKGCZuiqcUTsSmLilvp6q_2jlFRoPfGN2HA/rs:fit:680:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC44/SnVwY0xQTl9WN1lT/dUlpUE01OEt3SGFG/SyZwaWQ9QXBp";
    flex.appendChild(image);
}

//challenge rock paper scissors game

function rps(yourChoice){
    let humanchoice, botchoice;
    console.log(yourChoice.id);
    humanchoice = yourChoice.id;
    botchoice=numbertochoice(randRpstoint());
    results = decideWinner(humanchoice, botchoice);
    message=finalMessage(results); // get a dictionary(obj)
    rpsFront(humanchoice, botchoice, message);
}

function randRpstoint(){
    return Math.floor(Math.random() * 3);
}

function numbertochoice(number){
    return ['rock', 'paper', 'scissors'] [number];
}

function decideWinner(yourchoice, compchoice){
    let rpsDatabase={
        'rock':{'scissors':1, 'paper':0 , 'rock':0.5},
        'paper':{'scissors':0, 'paper':0.5 , 'rock':1},
        'scissors':{'scissors':0.5, 'paper':1 , 'rock':0}
    };
    let yourScore=rpsDatabase[yourchoice][compchoice];
    let compScore =rpsDatabase[compchoice][yourchoice];

    return [yourScore, compScore];
};

function finalMessage([yourscore, compscore]){
    if (yourscore === 0){
        return {"message": "you lost!", "color": "red"}
    }else if(yourscore === 1){
        return {"message": "you Won!", "color": "Green"}
    }else{
        return {"message": "Draw!", "color": "yellow"}
    };
}

function rpsFront(yourimgchoice, botimgchoice, message){
    let imagesDatabase = {
        'rock':document.getElementById('rock').src,    
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    };

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    let humandiv=document.createElement('div');
    let botdiv=document.createElement('div');
    let messagediv=document.createElement('div');

    humandiv.innerHTML="<img src='" + imagesDatabase[yourimgchoice] + "' height=150 width=150 >";
    messagediv.innerHTML="<h1 style='color:" + message['color'] + "; font-size:60px;'>" + message['message'] + "</h1>";
    botdiv.innerHTML="<img src='" + imagesDatabase[botimgchoice] + "' height=150 width=150 >";
    let flexDiv=document.getElementById('flex-box-rps-div')
    flexDiv.appendChild(humandiv);
    flexDiv.appendChild(messagediv);
    flexDiv.appendChild(botdiv);
}


//challenge change colors
let all_buttons=document.getElementsByTagName('button');
console.log(all_buttons);

//store original color of these buttons

let copyAllButtons=[];
for (let i=0; i < all_buttons.length; i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons[0]);

function buttonColorChange(buttonthingy){
        console.log(buttonthingy.value);
        if (buttonthingy.value == "red"){
            butonRed();
        }else if(buttonthingy.value == "green"){
            butonGreen();
        }else if (buttonthingy.value == "reset"){
            butonReset();
        }else if (buttonthingy.value == "random"){
            butonRandom();
        }
}

function butonRed(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function butonGreen(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}


function butonReset(){
    for (let i=0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function butonRandom(){
    let choices=['btn-primary', 'btn-success', 'btn-warning', 'btn-danger'];
    
    for (let i=0; i < all_buttons.length; i++){
        let index = getRandom();
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[index]);
    } 

}
function getRandom(){
    let number = Math.floor(Math.random() * 4);
    return number;
}

///challenge 5 balck jack game
//keep track of iportant things

let blackJackGame ={
    'you':{'scorespan': '#your-blackjack-result', 'div':'your-box' ,'score': 0}, 
    'dealer':{'scorespan': '#dealer-blackjack-result', 'div':'dealer-box' ,'score': 0},
    'cards':['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'J', "Q", 'A'],
};

//create a consant

const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

const HITSOUND = new Audio('blackjack_assets/sounds/swish.m4a');

document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackdeal);
function blackJackHit(){
    let card = randomCard();
    showCard(DEALER, card);
}

function showCard(activeplayer, card){
    let cardImage= document.createElement('img');
    cardImage.src=`blackjack_assets/images/${card}.png`;
    document.getElementById(activeplayer['div']).appendChild(cardImage);
    HITSOUND.play();
}

function blackjackdeal(){
    let yourimages= document.querySelector("#your-box").querySelectorAll('img');
    let dealerimages= document.querySelector("#dealer-box").querySelectorAll('img');
    for(let i=0; i < yourimages.length; i++){
        yourimages[i].remove();
    }
    
    for(let i=0; i < dealerimages.length; i++){
        dealerimages[i].remove();
    }
   
}

function randomCard(){
    let randIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randIndex];
}