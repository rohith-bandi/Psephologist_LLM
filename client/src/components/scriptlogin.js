let switchCtn, switchC1, switchC2, switchCircle, switchBtn, aContainer, bContainer, allButtons;

const getButtons = (e) => {
    console.log('Button clicked, default prevented');
};

const changeForm = (e) => {
    console.log('Change form triggered');
    switchCtn.classList.add("custom-is-gx");
    setTimeout(() => {
        switchCtn.classList.remove("custom-is-gx");
    }, 1500);

    switchCtn.classList.toggle("custom-is-txr");
    switchCircle[0].classList.toggle("custom-is-txr");
    switchCircle[1].classList.toggle("custom-is-txr");

    switchC1.classList.toggle("custom-is-hidden");
    switchC2.classList.toggle("custom-is-hidden");
    aContainer.classList.toggle("custom-is-txl");
    bContainer.classList.toggle("custom-is-txl");
    bContainer.classList.toggle("custom-is-z200");
};

export const initializeScript = () => {
    switchCtn = document.querySelector("#custom-switch-cnt");
    switchC1 = document.querySelector("#custom-switch-c1");
    switchC2 = document.querySelector("#custom-switch-c2");
    switchCircle = document.querySelectorAll(".custom-switch__circle");
    switchBtn = document.querySelectorAll(".custom-switch-btn");
    aContainer = document.querySelector("#custom-a-container");
    bContainer = document.querySelector("#custom-b-container");
    allButtons = document.querySelectorAll(".custom-submit");

    console.log('Initializing script');
    console.log('Elements:', { switchCtn, switchC1, switchC2, switchCircle, switchBtn, aContainer, bContainer, allButtons });

    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", getButtons);
    }
    for (let i = 0; i < switchBtn.length; i++) {
        switchBtn[i].addEventListener("click", changeForm);
    }
};
