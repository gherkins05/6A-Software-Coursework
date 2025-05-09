function toggleMenu() {
    const menu = document.getElementById("nav-menu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

const rows = 8;
const columns = 8;

const gridContainer = document.getElementById('myGrid');

for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
        const gridItem = document.createElement('div');
        gridItem.className = 'grid-item';
        
        if (( i + j) % 2 === 0) {
            gridItem.style.backgroundColor = 'white';
        }
        else {
            gridItem.style.backgroundColor = 'black';
        }

        gridContainer.appendChild(gridItem);
    }
}