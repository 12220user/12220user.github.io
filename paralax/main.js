function move(event){
    let xChange = event.layerX;
    let array = document.getElementsByClassName('paralax-img');

    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        let speed = element.getAttribute('paralax-speed')
        array[i].style = "transform: translateX("+(-xChange * speed)/1000+"px);";
    }
}

document.addEventListener("mousemove" , move)