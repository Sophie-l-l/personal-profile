
//assign the value of the pahe scroll height to the scrollTop variable
const handleScroll=() =>{
    const scrollTop=document.documentElement.scrollTop;
    document.documentElement.style.setProperty('--scrollTop',`${scrollTop}px`);
    // Set --root variable (scrollTop - 100vh)
    document.documentElement.style.setProperty('--scrollTop-one', `${scrollTop - window.innerHeight}px`);
    document.documentElement.style.setProperty('--scrollTop-two', `${scrollTop - 2*window.innerHeight}px`);

}
document.addEventListener('scroll',()=>{
    requestAnimationFrame(handleScroll);

});


const path = document.querySelector(".path");
const length = path.getTotalLength();
const path_box = document.querySelector(".path_box");
document.documentElement.style.setProperty("--length", length);

let wheel = 0;


function drawSvg(event) {
    let deltaY = event.deltaY;
    let wheelLength = wheel + deltaY*3;
    let drawLength = length - wheelLength;

    if (drawLength >= 0 && drawLength <= length) {
        wheel = wheelLength;
        path.style.strokeDashoffset = drawLength;
        
        event.preventDefault()
        // console.log("stop!");
    } else if (drawLength < 0) {
        wheelLength = 0;
        path.style.strokeDashoffset = 0;
        
    } else if (drawLength > length) {
        wheelLength = length;
        path.style.strokeDashoffset = length;
        
    }
}


function enableDrawing() {
    window.addEventListener('wheel', drawSvg, { passive: false });
}

function disableDrawing() {
    window.removeEventListener('wheel', drawSvg);
}

path_box.addEventListener('mouseenter', enableDrawing);
path_box.addEventListener('mouseleave', disableDrawing);



// document.addEventListener('DOMContentLoaded', function () {
//     // Get the layers container
//     const layersContainer = document.querySelector('#firefly-container');

//     // Get all firefly images
//     const fireflies = document.querySelectorAll('.fireflies');

//     // Function to generate a random position within a specified range
//     function getRandomPosition(min, max) {
//         return Math.random() * (max - min) + min;
//     }

//     // Loop through each firefly and set a random position
//     fireflies.forEach(firefly => {
//         // Specify the range for X and Y positions (adjust as needed)
//         const minX = 0;
//         const maxX = layersContainer.clientWidth - firefly.clientWidth;
//         const minY = 0;
//         const maxY = layersContainer.clientHeight - firefly.clientHeight;

//         // Set the firefly's position
//         firefly.style.left = getRandomPosition(minX, maxX) + 'px';
//         firefly.style.top = getRandomPosition(minY, maxY) + 'px';

//     });
// });


document.addEventListener('DOMContentLoaded', function () {
    const background = document.querySelector('#firefly-container');
    const fireflies = [];
    const firefliessrc=['./img/firefly-1.png','./img/firefly-2.png','./img/firefly-3.png','./img/firefly-4.png','./img/firefly-5.png','./img/firefly-6.png','./img/firefly-7.png'];

    // Add fireflies dynamically
    for (let i = 0; i < 14; i++) {
      createFirefly(i);
    }

    function createFirefly(i) {
      const firefly = document.createElement('img');
      firefly.src = firefliessrc[i%7]; 
      firefly.classList.add('firefly');
      background.appendChild(firefly);
  
      // Randomize position within the background
      const posX = Math.random() * window.innerWidth;
      const posY = Math.random() * window.innerHeight;
      firefly.style.left = posX + 'px';
      firefly.style.top = posY + 'px';
  
      // Randomize size and opacity
      const size = Math.random() * 20 + 10;
      const opacity = Math.random() * 0.5 + 0.5;
      firefly.style.width = size + 'px';
      firefly.style.opacity = opacity;
  
      // Apply noise effect using CSS3 transform
      const noiseOffsettime=Math.random()*1;
      firefly.style.transition=`opacity ${noiseOffsettime}s ease-in-out`;
      // Store the firefly in the array
      fireflies.push(firefly);
    }

    // Function to toggle visibility with a flickering effect
    function toggleVisibilityandposition() {
      fireflies.forEach(firefly => {
        
        if(firefly.style.opacity>=0.5){
            firefly.style.opacity=0;
        }
        else{
            const noiseOffsetX = Math.random() * 100;
            const noiseOffsetY = Math.random() * 100;
            firefly.style.transform = `translate(${noiseOffsetX}px, ${noiseOffsetY}px)`;
            firefly.style.opacity=Math.random() * 0.5 + 0.5;
        }

      });
    }

    // Set interval to toggle visibility every 500 milliseconds (adjust as needed)
    setInterval(toggleVisibilityandposition, 1000);
});

function autoScroll() {
    // Set the speed and the interval between scroll steps
    const scrollSpeed = 2; // Adjust the speed as needed
    const scrollInterval = 20; // Interval in milliseconds
  
    // Calculate the total height of the webpage
    const totalHeight = document.body.scrollHeight - window.innerHeight;
  
    // Variable to keep track of the current scroll position
    let currentScroll = 0;
  
    // Function to perform the scroll step
    function scrollStep() {
      // Increment the current scroll position
      currentScroll += scrollSpeed;
  
      // If we reached the bottom of the page, stop scrolling
      if (currentScroll >= totalHeight) {
        clearInterval(scrollIntervalId);
      }
  
      // Scroll the window to the current position
      window.scroll(0, currentScroll);
    }
  
    // Set up the interval to call the scrollStep function
    const scrollIntervalId = setInterval(scrollStep, scrollInterval);
}
  
// const arrow=querySelector(".scroll-arrow");
// arrow.addEventListener("click",()=>{
//     if(arrow.style.opacity=1)   arrow.style.opacity=0;
//     else arrow.style.opacity=1;
// });
