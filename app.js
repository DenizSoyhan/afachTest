const allTheQuestions = [
    ["Bilkent Time'ının kurucusu kimdir?", "images/1.png", "A.Borsa Kaplanı(@borsakaplani888)", "B.yunus (@yunusutkuu)", "C.topaç(@chakma_maker)", "D.sadece tunus (@luthienll)", "B"],
    ["Aşağıdakilerden hangisi Twitter Bilkent Time'ının modlarından biri değildir?", "images/2.png", "A.kayra (@sivilkayra)", "B.sadece tunus (@luthienll)", "C.marul (@marulaton)", "D.özerhisar ayranı (@gurosome)", "D"],
    ["Bilkent Time sayfasını hangi usta yazılımcı hazırlamıştır?", "images/3.png", "A.Bill Gates?", "B.Steve Wozniak", "C.Oğul Deniz Soyhan", "D.Larry Page", "C"],
    ["Abdullah Atalar'ın attığı tweet'e göre Uluslararası İlişkiler 2007 mezunu Melike İpek Yalova, Muhteşem Yüzyıl dizisinde hangi karakteri oynamaktadır?.", "images/4.jpg", "A.Kastilya Prensesi İsabella", "B.Manuliye Prensi Çar 2. Safavoiç", "C.Safsatunya Krallığı Canavarı", "D.Sultan Süleyman", "A"],
    ["C amfiye gitmek isteyen biri hangi binaya gitmelidir?", "images/5.jpg", "A.B binası", "B.C binası", "C.D binası", "D.T binası", "D"],
    ["Behzat Ç.'nin bir bölümünde Bilkent öğrencileri neyi protesto etmektedir?", "images/6.jpg", "A.Yemekhane zamlarını", "B.MATH 102 sınavlarını", "C.Ring seferlerini", "D.Depremden- tatil olmayan okulu", "A"],
    ["Bilkent Time'a atılan bir tweet'e göre büyük şirketler aşağıdaki sırlardan hangisini bilmenizi istemiyordur?", "images/7.png", "A.Belirsiz aralıklarla yemekhanede çıkan dönerin hangi hayvan etinden olduğunu", "B.Belirli aralıklarla yemekhanede 2 kez yemek yenilebildiğini", "C.Final tarihlerinin hangi belirli aralıkta olduğunu", "D.Belirsiz aralıkların belirliliği teorisini", "B"],
    ["Kampüsten Bilmarket'e giden yolda, biraz ilerleyince sağ köşede kalan mekanın ismi nedir? ", "images/8.jpg", "A.Piel Roja", "B.Maydonoz DÖner", "C.Federal", "D.Central", "D"],
    ["eduroam wifi ağına bağlanırken kullanıcı adınız default olarak nedir?", "images/9.png", "A.isim.soyisim@ug.bilkent.edu.tr", "B.isim.soyisim@bilkent.edu.tr", "C.idnumarası@bilkent.edu.tr", "D.Yalnız ID numaranız", "C"],
    ["Aşağıdaki EGO otobüslerinden hangisi son zamanlarda rotasını Bilkent Üniversitesinin birçoğunu dolaşacak şekilde ayarlamıştır?", "images/10.jpg", "A.176", "B.175", "C.111", "D.171", "A"],
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

   
        for(let k =0;k < 4;k++){
        let answer = document.createElement('div');
        answer.classList.add('answer');
        answer.textContent = allTheQuestions[i][2 + k];
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
    console.log(allOptions);
    for (let i = 0; i < allOptions.length; i++) {

        for (let k = 0; k < allOptions[i].children.length; k++) {
            
            let answerButton = allOptions[i].children[k];
            console.log(answerButton);
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


