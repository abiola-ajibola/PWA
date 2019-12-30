window.onload = () => {
    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('/serviceWorker.js');
    }

    /* *****************************Image slider**************************************** */

    /* *************************Declare/Initialise variables**************************** */
    const image = document.querySelectorAll('.img-container');
    const nxt = document.querySelector('.next-btn'),
        prv = document.querySelector('.previous-btn'),
        dots = document.querySelectorAll('.dots'),
        dotsArray = [...dots];
    let i = 0, inter;

    /* ****************Toggles the background of each dot accordingly****************** */
    const dotsFunction = (index) => {
        dots.forEach((dot) => {
            dot.classList.remove('active');
        })
        dots[index].classList.add('active');
    }

    /* ************************Makes an image to be visible************************ */
    const show = (index) => {
        image[index].classList.add('show');
    }

    /* Brings up the next image */
    const next = () => {
        image.forEach((img) => {
            img.classList.remove('show');
        })
        i++;
        if (i >= image.length) i = 0;
        show(i);
        dotsFunction(i);
    }

    /* Brings up the previous image */
    const previous = () => {
        image.forEach((img) => {
            img.classList.remove('show');
        })
        i--;
        if (i < 0) (i = image.length - 1);
        show(i);
        dotsFunction(i);
    }

    /* Brings up the next image after 4 seconds */
    const interval = setInterval(next, 4000);

    /* Resets the timer on each call */
    const timing = () => {
        clearInterval(interval);
        clearInterval(inter);
        inter = setInterval(next, 4000);
    }

    image[i].classList.add('show'); // Displays the first image since i = 0
    dots[i].classList.add('active');

    /* Fires the onclick event on clicking the next(nxt) or previous(prv) divs div */
    nxt.onclick = () => {
        next();// calls the next function
        timing(); // calls the timing function to reset the timer
    }

    prv.onclick = () => {
        previous(); // calls the previous function
        timing();
    }

    /* on clicking any of the dots, run the dotsFunction for the clicked dot
     and show the corresponding image for the dot */
    dots.forEach((dot) => {
        dot.onclick = function () {
            i = (dotsArray.indexOf(dot));
            dotsFunction(i);
            image.forEach((img) => img.classList.remove('show'));
            timing();
            show(i);
        }
    })
}