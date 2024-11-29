const allTheQuestions = [
    ["Hop yukarıdaki nedir kral?", "images/BA1CBhu-doom-wallpaper.png", "A.Sanane?", "B.Banane", "C.Saman Ye", "D.Dön de başka bi şey ye", "A"],
    ["Hop yukarıdaki nedir kral? Bu soruyu uzatmaya çalışıyom bakalım neler olacak allah allah", "images/LGpnKBM-dota-2-wallpapers.jpg", "A.Sanane?", "B.Banane", "C.Saman Ye", "D.Dön de başka bi şey ye", "B"],
    ["Hop yukarıdaki nedir kral? Bu soruyu uzatmaya çalışıyom bakalım neler olacak allah allah", "images/LGpnKBM-dota-2-wallpapers.jpg", "A.Sanane?", "B.Banane", "C.Saman Ye", "D.Dön de başka bi şey ye", "C"],
    ["Hop yukarıdaki nedir kral? sanırın az önceki yeterince uzun oldu", "", "A.Sanane?", "B.Banane", "C.Saman Ye", "D.Dön de başka bi şey ye", "D"]

]

const startQuizButton = document.getElementById('startQuizContainer');
const allQuestionsContainer = document.querySelector('.allQuestionsContainer');

var resultsExist=0;


/*CREATES RESULTS BOX HERE*/
const resultsContainer = document.createElement('div');
resultsContainer.classList.add('resultsContainer');

const correctResult = document.createElement('div');
correctResult.classList.add('correctResult');
resultsContainer.appendChild(correctResult);

const wrongResult = document.createElement('div');
wrongResult.classList.add('wrongResult');
resultsContainer.appendChild(wrongResult);

const emptyResult = document.createElement('div');
emptyResult.classList.add('emptyResult');
resultsContainer.appendChild(emptyResult);
/*END OF RESULTS BOX*/


function checkQuestions(){
    const answerClusters = document.querySelectorAll(".answersContainer");
    let singleCluster;
    let correctCounter=0;
    let wrongCounter=0;
    let emptyCounter=0;

    //purge every thing first
    for(let i = 0; i<answerClusters.length;i++){
        singleCluster=answerClusters[i].children;
        let ownerContainer = answerClusters[i].parentElement;
        for(let k = 0;k<singleCluster.length;k++){
            singleCluster[k].classList.remove('wrong');
            singleCluster[k].classList.remove('correct');
            ownerContainer.classList.remove('wrong');
            ownerContainer.classList.remove('correct');
            ownerContainer.classList.remove('empty');
            
        }
    }

    for(let i = 0; i<answerClusters.length;i++){
        let empty=1;
        singleCluster=answerClusters[i].children;
        let ownerContainer = answerClusters[i].parentElement;
        console.log("ney:",ownerContainer);
        console.log(singleCluster);
        for(let k = 0;k<singleCluster.length;k++){
            let checkingAnswer=singleCluster[k].textContent[0];
            if(singleCluster[k].classList.contains('selected') && checkingAnswer==allTheQuestions[i][allTheQuestions[i].length-1]){

                singleCluster[k].classList.add('correct');
                ownerContainer.classList.add('correct');
                correctCounter++;
                empty=0;
            }else if(singleCluster[k].classList.contains('selected') && !(checkingAnswer==allTheQuestions[i][allTheQuestions[i].length-1])){

                singleCluster[k].classList.add('wrong');
                ownerContainer.classList.add('wrong');
                wrongCounter++;
                empty=0;
            }else{
                continue;
            }
        }

        if(empty){
            emptyCounter++;
            ownerContainer.classList.add('empty');
        }
    }

    if(!resultsExist){
        allQuestionsContainer.appendChild(resultsContainer);
        resultsExist=1;
    }
    
    correctResult.textContent=`Doğru sayısı: ${correctCounter}`;
    wrongResult.textContent = `Yanlış sayısı: ${wrongCounter}`;
    emptyResult.textContent=`Boş sayısı: ${emptyCounter}`;

}



function createQuestions() {
    for (let i = 0; i < allTheQuestions.length; i++) {

        //mainContainer
        let questionContainer = document.createElement('div');
        questionContainer.classList.add('questionContainer');

        //questionContents
        let questionContents = document.createElement('div');
        questionContents.classList.add('questionContents');

        let questionImg = document.createElement('img');
        questionImg.src = allTheQuestions[i][1];

        let question = document.createElement('div');
        question.classList.add('question');
        question.textContent = allTheQuestions[i][0];

        questionContents.appendChild(questionImg);
        questionContents.appendChild(question)

        //answers
        let answersContainer = document.createElement('div');
        answersContainer.classList.add('answersContainer');

        for (let i = 0; i < 4; i++) {
            let answer = document.createElement('div');
            answer.classList.add('answer');
            answer.textContent = allTheQuestions[i][2 + i];
            answersContainer.appendChild(answer);
        }

        questionContainer.appendChild(questionContents);
        questionContainer.appendChild(answersContainer);

        allQuestionsContainer.appendChild(questionContainer);

        
    }

    let endQuizButton = document.createElement('a');
    endQuizButton.setAttribute("id","endQuizContainer");
    endQuizButton.textContent= "Testi Bitir!";
    endQuizButton.href="#";

    allQuestionsContainer.appendChild(endQuizButton);

    endQuizButton.addEventListener("click",()=>checkQuestions());
   
}
//HORRIBLE SOLUTION THAT OVERRIDES HOVER CLASSES
/*function chooseAnswer(answer) {

    if(window.getComputedStyle(answer).borderColor !='rgb(58, 109, 140)'){//unchoose option
        console.log("renk aynı değil" ,window.getComputedStyle(answer).borderColor )

        answer.style.borderColor='rgb(58, 109, 140)'
        answer.style.backgroundColor = '#001F3F';
        answer.style.color = '#EAD8B1';
        
    }else{

        for(let i=0;i<answer.parentElement.children.length;i++){ //Make other answers normal
            if(window.getComputedStyle(answer.parentElement.children[i]).borderColor == 'rgb(58, 109, 140)')
            {
                continue;
            }else{
                answer.parentElement.children[i].style.borderColor='rgb(58, 109, 140)'
                answer.parentElement.children[i].style.backgroundColor = '#001F3F';
                answer.parentElement.children[i].style.color= '#EAD8B1';
            }
        }   //choose own answer
            answer.style.borderColor = '#EAD8B1';
            answer.style.backgroundColor = '#EAD8B1';
            answer.style.color = '#3A6D8C';
    }

}*/
function chooseAnswer(answer) {
    
    if (!answer.classList.contains('selected')) {//if any other sibling is selected
        // remove the 'selected' class from all siblings 
        const siblings = answer.parentElement.children;

        for (let i = 0; i < siblings.length; i++) {
            siblings[i].classList.remove('selected');
        }
        answer.classList.add('selected');// add the 'selected' class to the clicked answer
    } else {
  
        answer.classList.remove('selected');// if already selected, deselect it
    }
}
function makeAnswersInteractive() {
    var allOptions = document.querySelectorAll('.answersContainer');

    for (let i = 0; i < allOptions.length; i++) {

        for (let k = 0; k < allOptions.length; k++) {
            let answerButton = allOptions[i].children[k];
            answerButton.addEventListener('click', ()=>chooseAnswer(answerButton)
            )
        }
    }
}

startQuizButton.addEventListener('click', function () {

    startQuizButton.style.animation = 'fadeOutToLeft 0.2s forwards';

    startQuizButton.addEventListener('animationend', () => {
        startQuizButton.classList.add('hidden'); // Add the hidden class

        createQuestions();

        makeAnswersInteractive();
    });

});


