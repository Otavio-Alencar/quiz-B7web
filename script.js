let currentQuestion = 0
let correctAnswers = 0
showQuestion()




function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion]
        let pct = Math.floor((currentQuestion / questions.length) * 100)
        document.querySelector('.progress--bar').style.width = `${pct}%`
        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question
        document.querySelector('.options').innerHTML = ''

        let optionsHtml = ''
        for(let i in q.options){
            optionsHtml += `<div data-op=${i} class= "option"> <span>${parseInt(i) + 1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml

        document.querySelectorAll('.options .option').forEach(item=>{
            item.addEventListener('click',optionClickEvente)
        })
    }else{
        finishQuiz()
    }
}

function optionClickEvente(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'))
    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++
    }
    currentQuestion++
    showQuestion()
}

function finishQuiz(){
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.scoreArea').style.display = 'block'
    pctCorrect = Math.floor((correctAnswers / questions.length) * 100)
    document.querySelector('.progress--bar').style.width = `100%`
    document.querySelector('.scorePct').innerHTML = `${pctCorrect}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}.`
    if(pctCorrect < 30){
        document.querySelector('.scoreText1').innerHTML = 'Mandou mal!'
        document.querySelector('.scoreText1').style.color ='red'
    }else if(pctCorrect >= 30 && pctCorrect < 70){
        document.querySelector('.scoreText1').innerHTML = 'Mandou bem!'
        document.querySelector('.scoreText1').style.color ='blue'
    }else{
        document.querySelector('.scoreText1').style.color ='green'
    }
    document.querySelector('.scoreArea button').addEventListener('click',()=>{
        correctAnswers = 0
        currentQuestion = 0
        showQuestion()
    })
}

