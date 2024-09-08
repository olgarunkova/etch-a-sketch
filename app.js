const container = document.querySelector(".container");
const eraser = document.querySelector(".eraser");
const rainbow = document.querySelector(".rainbow");
const reset = document.querySelector(".reset");
const darkening = document.querySelector(".darkening");

function changeGridSize() {
    container.innerHTML = '';
    const itemsPerSide = prompt("Enter grid size (between 2 and 99)");
    const itemSize = 600 / itemsPerSide;
    for (let i = 0; i < itemsPerSide * itemsPerSide; i++) {
        const item = document.createElement("div");
        item.classList.add("item");
        item.style.flexBasis = `${itemSize}px`;
        item.addEventListener("mouseenter", mouseEnter); 
        container.appendChild(item);
    };
};

function mouseEnter(event) {
    event.target.style.backgroundColor ="black";
};


eraser.addEventListener("click", () => {
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.addEventListener("mouseenter", () => item.style.backgroundColor = "white");
    });
});

rainbow.addEventListener("click", () => {
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        item.addEventListener("mouseenter", () => item.style.backgroundColor = getRandomColor());
    });
});

reset.addEventListener("click", () => {
    const items = document.querySelectorAll(".item");
    items.forEach(item => item.style.backgroundColor = "white");
});

darkening.addEventListener("click", () => {
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
        let opacity = 0;
        item.removeEventListener("mouseenter", mouseEnter);
        item.addEventListener("click", () => item.style.backgroundColor = "black");
        item.addEventListener("click", () => {
            opacity = Math.min(opacity + 0.1, 1);
            item.style.opacity = opacity;
         });
    });
});


function getRandomColor() {
    const hexArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    let color = "#";
    for (let i = 0; i < 6; i++) {
        let randomColor = hexArray[(Math.floor(Math.random() * 16))];
        color = color + randomColor;
    }
    return color;
}

