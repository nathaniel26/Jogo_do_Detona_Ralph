const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
        panel: document.querySelector(".panel")
    },

    values:{

        hitposition:0,
        result: 0,
        currentTime: 60,
        lifeId: 5
    },

    actions:{
        timerId: setInterval(randomSquare, 800),
        countDownTimerId: setInterval(currentTimeDown, 1000)
    }
}

function currentTimeDown(){
    state.values.currentTime --;
    state.view.time.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){

        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Fim de Jogo! O resultado foi: " + state.values.result);
        location.reload();
    }
}

function playSound(audioname){
    let audio = new Audio(`/src/audios/${audioname}.m4a`);
    audio.volume = 0.4;
    audio.play();
    
}

function randomSquare(){
    state.view.squares.forEach((squere) =>{
        squere.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9 );
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitposition = randomSquare.id;

}


function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitposition){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitposition = null;
                playSound('hit');
            } else{

                playSound('error');
                state.values.lifeId--;
                state.view.life.textContent = state.values.lifeId;

                if(state.values.lifeId <=0){
                    alert("Game Over! O resultado foi: " + state.values.result);
                    location.reload();
                }
            }
        })
    });
}


function initialize(){
    addListenerHitBox();
}

initialize();

document.addEventListener('DOMContentLoaded', () => {
    const startSound = () => {
        playSound('music');
        document.removeEventListener('click', startSound); // Remove o evento após tocar o som
    };
    
    document.addEventListener('click', startSound);
});

