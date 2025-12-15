function start() {
    setPage();
    changePage();
    mainTopPosition();
    mainTopPositionSet();
    mainTopTilt();
    topSelectorWidth();
    // backgroundMotionSet();
}

function mainTopPosition() {
    const mainTop = document.querySelector('.main-top');
    mainTop.style.left = 'calc((100vw - ' + mainTop.offsetWidth + 'px) / 2)';
}

function mainTopPositionSet() {
    window.addEventListener('resize', () => {
        mainTopPosition();
    });
}

function setPage() {
    document.querySelector('.main-container').innerHTML = document.querySelectorAll('.main-block')[0].innerHTML;
}

let selectedPage = 0;

function changePage() {
    let selectedPageChange = 0;
    const topButtons = document.querySelectorAll('.main-top-button');
    const topButtonSelector = document.querySelectorAll('.main-top-button-selector');
    topButtons.forEach((topButton, index) => {
        topButton.addEventListener('click', () => {
            topButtons[selectedPage].classList.remove('main-top-button-selected');
            selectedPage = index;
            
            document.querySelector('main').classList.add('main-switch-up');
            
            setTimeout(() => {
                document.querySelector('main').style.transition = 'none';
                document.querySelector('main').classList.remove('main-switch-up');
                document.querySelector('main').classList.add('main-switch-down');

                document.querySelector('.main-container').innerHTML = document.querySelectorAll('.main-block')[index].innerHTML;

                if (selectedPage == 1) changeSubPage();

                setTimeout(() => {
                    document.querySelector('main').style.removeProperty("transition");
                    document.querySelector('main').classList.remove('main-switch-down');
                }, 10);
            }, 300);

            topButtons[index].classList.add('main-top-button-selected');

            if(selectedPage != selectedPageChange) {
                const topButtonSelectorWidth = topButtonSelector[0].offsetWidth;
                
                topButtonSelector[0].style.left = (1 + ((topButtonSelectorWidth + 6) * selectedPage)) + 'px';
                topButtonSelector[0].classList.add('main-top-button-selector-wide');

                setTimeout(() => {
                    topButtonSelector[0].classList.remove('main-top-button-selector-wide');
                    topButtonSelector[0].style.left = (6 + ((topButtonSelectorWidth + 6) * selectedPage)) + 'px';
                }, 200);
            }
            
            selectedPageChange = selectedPage;
        });
    });
}

function topSelectorWidth() {
    let topSelectorWidthState;
    if (window.innerWidth < 700) {
        topSelectorWidthState = 0;
    } else {
        topSelectorWidthState = 1;
    }

    window.addEventListener('resize', () => {
        const topButtonSelector = document.querySelector('.main-top-button-selector');
        if (window.innerWidth < 700) {
            if (topSelectorWidthState == 1) {
                topSelectorWidthState = 0;
                topButtonSelector.style.left = (6 + ((116) * selectedPage)) + 'px';
            }
        } else {
            if (topSelectorWidthState == 0) {
                topSelectorWidthState = 1;
                topButtonSelector.style.left = (6 + ((156) * selectedPage)) + 'px';
            }
        }

    });
}

function backgroundMotionSet() {
    for (let i = 1; i <= 3; i++) {
        const gradientBox = document.getElementById("background-gradient-" + i);
        backgroundMotion(gradientBox, i); 
    }
}

function backgroundMotion(gradientBox, index) {
    const id = setInterval(() => {
        gradientBox.classList.remove(`background-gradient-position-${index}`);
        index = (index) % 3 + 1;
        gradientBox.classList.add(`background-gradient-position-${index}`);
    }, 8000);
}

function mainTopTilt() {
    const mainTop = document.querySelector('.main-top');

    let isHovering = false;
    let rect = null;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    const maxOffset = 10;
    const lerpFactor = 0.15;

    mainTop.addEventListener("mouseenter", () => {
        isHovering = true;
        rect = mainTop.getBoundingClientRect();
    });

    mainTop.addEventListener("mouseleave", () => {
        isHovering = false;
        targetX = 0;
        targetY = 0;
    });

    document.addEventListener("mousemove", e => {
        if (!isHovering) return;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const normX = (mouseX - centerX) / centerX;
        const normY = (mouseY - centerY) / centerY;

        targetX = normX * maxOffset;
        targetY = normY * maxOffset;
    });

    function animate() {
        if (window.innerWidth < 700) {
            currentX = 0;
            currentY = 0;
        } else {
            currentX += (targetX - currentX) * lerpFactor;
            currentY += (targetY - currentY) * lerpFactor;
        }
        
        mainTop.style.transform = `translate(${currentX}px, ${currentY}px)`;

        requestAnimationFrame(animate);
    }

    animate();
}

function changeSubPage() {
    let selectedSubPage = 0;
    const buttons = document.querySelectorAll('.sub-page-button');
    const subPageContent = document.querySelector('.sub-page-content-section');

    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            changeSubPageSwitch(button, index);
        });
    });

    function changeSubPageSwitch(button, index) {
        buttons[selectedSubPage].classList.remove('sub-page-button-selected');
        selectedSubPage = index;
        
        subPageContent.classList.add('main-switch-up');
        
        setTimeout(() => {
            subPageContent.style.transition = 'none';
            subPageContent.classList.remove('main-switch-up');
            subPageContent.classList.add('main-switch-down');

            subPageContent.innerHTML = document.querySelectorAll('.sub-page-switch-block')[index].innerHTML;
            subPageContent.scrollTop = 0;

            setTimeout(() => {
                subPageContent.style.removeProperty("transition");
                subPageContent.classList.remove('main-switch-down');
            }, 10);
        }, 300);

        buttons[index].classList.add('sub-page-button-selected');
    }

    changeSubPageSwitch(buttons[0], 0);
}