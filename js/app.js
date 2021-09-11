// Global variables
const body = document.body;

// get the section buttons area
const theSectionHolder = document.getElementById("sectionSelection");

// create a ul element to hold the section buttons
const theUL = document.createElement("ul");
// set it's default style
theUL.style = "border:0;margin:0;padding:0;text-align:right;";

// select all existent sections to create navigation buttons
const sectionsArray = document.querySelectorAll("[data-nav]");

// loop through all the sections and create a navigation button for each one
for (let i = 0; i < sectionsArray.length; i++) {
    // create the button
    const sectionButton = document.createElement("li");
    // set it's classes
    sectionButton.className = "sectionHolderBox section" + (i+1).toString();
    // set it's click function
    sectionButton.addEventListener('click', function () {
        const o = i;
        // create a placeholder for the animation interval
        var an;
        // set it to active
        sectionsArray[o].className = "active";
        // clear interval initially
        clearInterval(an);
        // set a new animation interval
        an = setInterval(animate, 0);
        // define the animtion interval function
        function animate () {
            // get the position of the section
            const height = sectionsArray[o].offsetTop;
            // get the screen's scroll
            const scroll = window.scrollY;
            //check if the scroll is right
            if (scroll >= height && scroll <= height + 20) {
                clearInterval(an);
            } else {
                if (scroll <= height)
                    document.body.scrollTop += 20;
                else 
                    document.body.scrollTop -= 20;
            }
        }
        event.preventDefault();
    });
    // create the text span element
    const sectionSpan = document.createElement("span");
    // set it's inner html
    sectionSpan.innerHTML = "Section " + (i+1).toString();
    // append the span element to the button (the li)
    sectionButton.appendChild(sectionSpan);
    // append the button (the li) to the button holder (the ul)
    theUL.appendChild(sectionButton)
}
// append the button holder to the area in which they will be shown
theSectionHolder.appendChild(theUL);


// check if the user is scrolling
window.onscroll = function () {changeActive()};


// define the scrolling function
function changeActive () {
    // get the screen's scroll
    const scroll = window.scrollY;
    for (let i = 0; i < sectionsArray.length; i++) {
        // get the section's height
        const height = sectionsArray[i].offsetTop;
        // const botHeight = sectionsArray[i+1].offsetTop;
        if (scroll >= height - 200 && scroll <= height + sectionsArray[i].getBoundingClientRect().height - 200) {
            sectionsArray[i].className = "active";
        } else {
            sectionsArray[i].className = "";
        }
    }
}