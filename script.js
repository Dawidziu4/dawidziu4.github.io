function start() {
    setPage();
    changePage();
    mainTopPosition();
    mainTopTilt()
    // backgroundMotionSet();
}

function mainTopPosition() {
    const mainTop = document.querySelector('.main-top');
    mainTop.style.left = 'calc((100vw - ' + mainTop.offsetWidth + 'px) / 2)';
}

function setPage() {
    document.querySelector('.main-container').innerHTML = document.querySelectorAll('.main-block')[0].innerHTML;
}

function changePage() {
    let selectedPage = 0;
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

                setTimeout(() => {
                    document.querySelector('main').style.removeProperty("transition");
                    document.querySelector('main').classList.remove('main-switch-down');
                }, 10);
            }, 300);

            topButtons[index].classList.add('main-top-button-selected');

            if(selectedPage != selectedPageChange) {
                topButtonSelector[0].style.left = (1 + (156 * selectedPage)) + 'px';
                topButtonSelector[0].classList.add('main-top-button-selector-wide');

                setTimeout(() => {
                    topButtonSelector[0].classList.remove('main-top-button-selector-wide');
                    topButtonSelector[0].style.left = (6 + (156 * selectedPage)) + 'px';
                }, 200);
            }
            
            selectedPageChange = selectedPage;
        });
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
        currentX += (targetX - currentX) * lerpFactor;
        currentY += (targetY - currentY) * lerpFactor;

        mainTop.style.transform = `translate(${currentX}px, ${currentY}px)`;

        requestAnimationFrame(animate);
    }

    animate();
}
