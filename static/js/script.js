
 

ageInDays=()=>{
    let birthYear = parseInt(prompt('What year were you born in?'));
    const todayDate= new Date();
    if (!birthYear){
        birthYear=todayDate.getFullYear();
    }

    const ageInDays=(parseInt(todayDate.getFullYear())-parseInt(birthYear))* 365;

    document.getElementById('flex-box-result').innerText=`Your current age in Days is ${ageInDays} Days`;
}

resetAgeCalc=()=>{
    document.getElementById('flex-box-result').innerText="";
}

generateCat=()=>{
    const img = document.createElement('img');
    const div = document.getElementById('flex-cat-gen');
    img.src="https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(img);
}

removeCat=()=>{
    const div = document.getElementById('flex-cat-gen');
    removeAllChildNodes(div);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function hideAllChildElements(parent){
    console.log(typeof(parent.firstChild));
    while(parent.firstChild.display !="none"){
        parent.firstChild.display="none";
    }
}

rpsGame=(element)=>{
    const parentDiv= element.parentElement;
    
    let humanChoice = element.id;
    let botChoice = chooseBotValue();
    
    let results= decideWinner(humanChoice, botChoice);
   
    rps_frontend(humanChoice, botChoice, finalMessage(results), parentDiv)

}

chooseBotValue=()=>{
    const choices = ['rock', 'paper', 'scissors']
    
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

decideWinner=(yourChoice, botChoice)=>{
    console.log(yourChoice)
     let rps={
        'rock':{'scissors':1, 'rock':0.5, 'paper':0},
        'paper':{'rock':1, 'paper': 0.5, 'scissors': 0},
        'scissors':{'paper':1, 'scissors':0.5, 'rock': 0}
     }
     
     let yourScore= rps[yourChoice][botChoice]
   
     return yourScore
 }

finalMessage=(yourScore)=>{
    if (yourScore===0){
        return  {'message':'You lost', 'color':'red'}
    }
    else if(yourScore === 0.5){
        return {'message': 'Draw', 'color': 'yellow'}
    }

    return {'message':'You won', 'color': 'green'}
}

rps_frontend=(humanImage,botChoice, finalMessage, parentDiv)=> {
    let imagesDatabase = {
        'rock': document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src
    }

    removeAllChildNodes(parentDiv);
    const humanDiv = document.createElement("div");
    const botDiv = document.createElement("div");
    const messageDiv = document.createElement("div");
    const humanImg = document.createElement("img");
    humanImg.src=imagesDatabase[humanImage];
    const botImage = document.createElement("img");
    botImage.src=imagesDatabase[botChoice];
    humanImg.style.boxShadow = "0px 10px 50px rgba(37, 50, 233, 1)";
    botImage.style.boxShadow = "0px 10px 50px rgba(243, 38, 24, 1 ) "
    messageDiv.style.color=finalMessage.color;
    messageDiv.innerText=finalMessage.message;
    messageDiv.style.fontSize="26px"
    messageDiv.style.fontWeight=900
    console.log(messageDiv)
    console.log(parentDiv)
    humanDiv.appendChild(humanImg);
    botDiv.appendChild(botImage); 
    humanImg.style.width="150px"
    botImage.style.width="150px"

    parentDiv.appendChild(humanDiv);
    parentDiv.appendChild(messageDiv);
    parentDiv.appendChild(botDiv);
   
}

let all_buttons= document.getElementsByTagName('button');
console.log(`allButtons:${all_buttons}`)
let copyButtons = []

for (let i=0;i< all_buttons.length; i++){
    copyButtons.push(all_buttons[i].classList[1]);
}

buttonColorChange=(buttonValue)=>{
    console.log(buttonValue.value)
    if (buttonValue.value =='red'){
        buttonsRed();
    }

    if (buttonValue.value =='green'){
        buttonsGreen();
    }

    if (buttonValue.value =='random'){
        buttonsRandom();
    }

    if (buttonValue.value =='reset'){
        buttonAllReset();
    }
}

buttonsRed=()=>{
    for (let item of all_buttons){
        item.classList.remove(item.classList[1]);
        item.classList.add('btn-danger');
    }
}

buttonsGreen=()=>{
    for (let item of all_buttons){
        item.classList.remove(item.classList[1]);
        item.classList.add('btn-success')
    }
}

buttonsRandom=()=>{
    buttonOptions=['btn-primary', 'btn-success', 'btn-danger', 'btn-warning'];
    console.log(buttonOptions)
    for (let item of all_buttons){
        item.classList.remove(item.classList[1]);
        item.classList.add(buttonOptions[Math.floor(Math.random()*4)]);
    }
}

buttonAllReset=()=>{
    for (let i=0; i<all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        console.log(all_buttons[i].classList)
        all_buttons[i].classList.add(copyButtons[i]);
    }
}

document.querySelector('#blackjack-hit-button').addEventListener('click', blackjackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
let backjackGame={
 'you': {'scoreSpan': '#your-blackjack-result', 'div':'.your-box', 'score':0},
 'dealer': {'scoreSpan': '#dealer-blackjack-result', 'div':'.dealer-box', 'score':0},
 'cards': ['2', '3','4','5','6','7','8','9','10','K','J','Q','A'],
 'cardsMap': {'2':2, '3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'Q':10, 'A':[1,11]},
 'wins': 0,
 'loses':0,
 'draws':0,
 'isStand': false,
 'turnsOver': false
}

const YOU=backjackGame['you'];
const DEALER=backjackGame['dealer'];
const CARDS=backjackGame['cards'];

const hitSound= new Audio ('assets/audio/swoosh.mp3')

function blackjackHit(){

    if (backjackGame['isStand']) return;
    let cardNo=randomCard()
    showCard(YOU, cardNo);
    updateScore(cardNo,YOU )
    showScore(YOU)

}

function blackjackDeal(){
   if (!backjackGame['turnsOver']) return;
   backjackGame['isStand']=false;
   removeImages(YOU);
   removeImages(DEALER);
   resetFields(YOU, DEALER);
   backjackGame['turnsOver'] =true;
}

function resetFields(ownPlayer, foreignPlayer){
    ownPlayer['score']=0
    foreignPlayer['score']=0
    document.querySelector(ownPlayer['scoreSpan']).textContent = 0;
    document.querySelector(ownPlayer['scoreSpan']).style.color = '#ffffff';
    document.querySelector(foreignPlayer['scoreSpan']).textContent = 0;
    document.querySelector(foreignPlayer['scoreSpan']).style.color = '#ffffff';
    document.querySelector('#blackjack-result').textContent=`Let's play`;
    document.querySelector('#blackjack-result').style.color = 'black';
}

function removeImages(activePlayer){
    let yourImages=document.querySelector(activePlayer['div']).querySelectorAll('img');
    
    for(let image of yourImages){
        image.remove();
    }
}

function showCard(activePlayer, cardNo){
    console.log(activePlayer);
    if (activePlayer['score'] <= 21){
        hitSound.play();
        let cardImage = document.createElement('img');
        cardImage.src = `assets/images/${cardNo}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage);
    }
}

function randomCard(){
    let randomIndex = Math.floor(Math.random() * 13);
    
    return CARDS[randomIndex];
}

function updateScore(card, activePlayer){
    if (card=='A'){
        if (activePlayer['score'] + backjackGame['cardsMap'][card][1] <= 21){
            activePlayer['score']+=backjackGame['cardsMap'][card][1];
            return
       }
    activePlayer['score'] +=backjackGame['cardsMap'][card][0];
    return
    }
    activePlayer['score']+= backjackGame['cardsMap'][card]
}

function showScore(activePlayer){
    if (activePlayer['score']>21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
        return;
    }

    document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
}

async function dealerLogic(){
    backjackGame['isStand']= true;

    while(DEALER['score']<16 && backjackGame['isStand']){
        let card= randomCard();
        showCard( DEALER, card);
        updateScore(card, DEALER);
        showScore(DEALER);

        await sleep(1000);
    }

    if (DEALER['score'] > 15){
        backjackGame['turnsOver'] = true;
        let winner = computeWinner();
        
        showScoreBJ(winner);
    }
}

function computeWinner(){
    let winner;
    console.log(YOU['score']);
    console.log(DEALER['score']);
    if (YOU['score']<=21){
        if (YOU['score']> DEALER['score'] || DEALER['score']>21){
            backjackGame['wins']++;
            winner=YOU;
        }
        else if(YOU['score']< DEALER['score']){
            winner=DEALER;
            backjackGame['loses']++;
        }
        else if(YOU['score'] === DEALER['score']){
            backjackGame['draws']++;
        }
    }
    else if (YOU['score']>21 && DEALER['score']<=21){
        winner=DEALER;
        backjackGame['loses']++;
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        backjackGame['draws']++;
    }
    return winner;
}

function sleep(ms){
    return new Promise(resolve=> setTimeout(resolve, ms));
}
function showScoreBJ(winner){
    let message, messageColor;
    if (!backjackGame['turnsOver']) return;
    if (winner==YOU){
        document.querySelector('#wins').textContent=backjackGame['wins']
        message = 'You won!';
        messageColor = 'green';
    }
    else if (winner == DEALER){
        document.querySelector('#losses').textContent=backjackGame['loses'];
        message = 'You lost!';
        messageColor = 'red';
    }
    else{
        document.querySelector('#draws').textContent=backjackGame['draws'];
        message = 'Draw';
        messageColor = 'yellow';
    }
    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}