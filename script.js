window.onresize = scaleElement;

function scaleElement() {
    let choose = document.querySelector(".choose");
    let width = screen.width;
    if(width > 500){
        let scaleValue = width / 500;
        scaleValue = Math.min(scaleValue, 1.4);
        choose.style.transform = `scale(${scaleValue})`;
    }
};

document.addEventListener("DOMContentLoaded", scaleElement);