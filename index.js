let deckId = ""
let scorePlayer = document.getElementById("score-player")
let socreComp = document.getElementById("score-comp")
const mainText = document.getElementById("main-text")
let totalCards = 52
let scoreOfComputer = 0
let scoreOfPlayer = 0
const remainingCards = document.getElementById("remaining-cards")
function getNewDeck(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(resp => resp.json())
    .then(data =>{
        deckId = data.deck_id
        console.log(deckId)
        totalCards = 52
        remainingCards.textContent = totalCards
        scoreOfComputer = 0
        scoreOfPlayer = 0
        scorePlayer.textContent = scoreOfPlayer
        socreComp.textContent = scoreOfComputer 
        const getCardsBtn = document.getElementById("get-cards")
        getCardsBtn.disabled = false        
    })
}
function compareCards(card1, card2){
    const valueIndex = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const value1 = valueIndex.indexOf(card1)
    console.log(value1)
    const value2 = valueIndex.indexOf(card2)
    if(value1 > value2){
        scoreOfPlayer ++ 
        scorePlayer.textContent = scoreOfPlayer
        mainText.textContent = "You won"
    } else if(value2 > value1){
        scoreOfComputer ++ 
        socreComp.textContent = scoreOfComputer
        mainText.textContent = "Computer won"
    }else{
        scorePlayer.textContent = scoreOfPlayer
        socreComp.textContent = scoreOfComputer    
        mainText.textContent = "It's a draw"    
    }

}

function getCards(){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(resp => resp.json())
    .then(data => {
        console.log(data.cards)
        remainingCards.textContent = totalCards
        // document.getElementById("cards").innerHTML = ` <img src=${data.cards[0].image} /> <img src=${data.cards[1].image} />`
        const img1 = document.getElementById("img-p-one")
        const img2 = document.getElementById("img-p-two")
        img1.src = `${data.cards[0].image}`
        img2.src = `${data.cards[1].image}`
        document.getElementById("cards").appendChild(img1)
        document.getElementById("cards").appendChild(img2)
        console.log(data.cards[0].value)
        compareCards(data.cards[0].value, data.cards[1].value)
    })
}
function render(){
    if(totalCards > 0){
        getCards()
        totalCards -=2 ;
    } else{
        const getCardsBtn = document.getElementById("get-cards")
        getCardsBtn.disabled = true
        let winnerText = ""
        if(scoreOfComputer>scoreOfPlayer){
            winnerText = "Computer Wins"
        }else if(scoreOfComputer<scoreOfPlayer){
            winnerText = "You win"
        } else{
            winnerText = "It's a tie"
        }
        document.getElementById("winner-declare").textContent=winnerText
        
    }

}

document.getElementById("get-cards").addEventListener("click" , render)

document.getElementById("get-new-deck").addEventListener("click" , getNewDeck)
