const allTheQuestions = [
    ["Hop yukarıdaki nedir kral?", "images/BA1CBhu-doom-wallpaper.png", "A.Sanane?", "B.Banane", "C.Saman Ye", "D.Dön de başka bi şey ye", "C"],
    ["Hop yukarıdaki nedir kral? Bu soruyu uzatmaya çalışıyom bakalım neler olacak allah allah", "images/LGpnKBM-dota-2-wallpapers.jpg", "A.Sanane?", "B.Banane", "C.Saman Ye", "D.Dön de başka bi şey ye", "C"],
    ["Hop yukarıdaki nedir kral? Bu soruyu uzatmaya çalışıyom bakalım neler olacak allah allah", "images/LGpnKBM-dota-2-wallpapers.jpg", "A.Sanane?", "B.Banane", "C.Saman Ye", "D.Dön de başka bi şey ye", "C"],
    ["Hop yukarıdaki nedir kral? sanırın az önceki yeterince uzun oldu", "", "A.Sanane?", "B.Banane", "C.Saman Ye", "D.Dön de başka bi şey ye", "C"]

]

const startQuizButton = document.getElementById('startQuizContainer');
const allQuestionsContainer = document.querySelector('.allQuestionsContainer');

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


