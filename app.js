const container = document.querySelector(".container");
const eraser = document.querySelector(".eraser");
const rainbow = document.querySelector(".rainbow");
const reset = document.querySelector(".reset");
const darkening = document.querySelector(".darkening");
const colorPicker = document.querySelector(".colorPicker");
let selectedColor = colorPicker.value;

function createGrid(itemsPerSide) {
    container.innerHTML = '';
    const itemSize = 600 / itemsPerSide;
    for (let i = 0; i < itemsPerSide * itemsPerSide; i++) {
        const item = document.createElement("div");
        item.classList.add("item");
        item.style.flexBasis = `${itemSize}px`;
        item.addEventListener("mouseenter", mouseEnter); 
        container.appendChild(item);
    };
}

document.addEventListener("DOMContentLoaded", () => {
    createGrid(16);
});

function changeGridSize() {
    const newSize = prompt("Enter grid size (between 2 and 99)");
    const size = parseInt(newSize, 10);
    if ( size >= 2 && size <= 99) {
        createGrid(size);
    } else {
        alert("Please enter a number between 2 and 99.");
    };
};

colorPicker.addEventListener("input", (event) => {
    selectedColor =  event.target.value;
})

function mouseEnter(event) {
    event.target.style.backgroundColor = selectedColor;
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
    items.forEach(item => {
        item.style.backgroundColor = "white";
        item.style.opacity = 1; // Reset opacity if affected by darkening
        item.removeEventListener("mouseenter", mouseEnter); 
        item.addEventListener("mouseenter", mouseEnter);
    })
});

darkening.addEventListener("click", getDarker);
function getDarker() {
    const items = document.querySelectorAll(".item");
    items.forEach(item => {
    let opacity = 0;
    item.removeEventListener("mouseenter", mouseEnter);
    item.addEventListener("click", () => item.style.backgroundColor = selectedColor);
    item.addEventListener("click", () => {
        opacity = Math.min(opacity + 0.1, 1);
        item.style.opacity = opacity;
        }); 
    });
};
    
         
function getRandomColor() {
    const hexArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    let color = "#";
    for (let i = 0; i < 6; i++) {
        let randomColor = hexArray[(Math.floor(Math.random() * 16))];
        color = color + randomColor;
    }
    return color;
}

