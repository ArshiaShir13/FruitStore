function renderProducts() {
    const container = document.querySelector('.ProductContainer');
    products.forEach(product => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('productItem');

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;

        const title = document.createElement('div');
        title.textContent = product.title;
        title.classList.add('title');

        const price = document.createElement('div');
        price.classList.add('price');
        price.textContent = product.price.toLocaleString('fa-IR').replace(/,/g, '/') + " تومن";

        const button = document.createElement('button');
        button.textContent = 'خرید';
        button.classList.add('kharid');
        button.onclick = () => addToCart({ image: img, product: product });

        itemDiv.appendChild(img);
        itemDiv.appendChild(title);
        itemDiv.appendChild(price);
        itemDiv.appendChild(button);

        container.appendChild(itemDiv);
    });
}

function sumCartPrice() {
    return Cart.reduce((total, product) => total + product.price, 0);
}


function animateCounter(start, end, element) {
    let duration = 500; // Duration in milliseconds
    let steps = 100; // Number of steps
    let stepSize = (end - start) / steps;

    let currentStep = 0;
    let currentNumber = start;



    function update() {
        if (currentStep <= steps) {
            let value = Math.round(start + stepSize * currentStep);
            let persianFormat = value.toLocaleString('fa-IR').replace(/,/g, '/');
            element.innerText = persianFormat;

            // Trigger the animation
            //element.style.animation = 'none'; // Reset animation
            void element.offsetWidth; // Trigger reflow
            element.style.animation = 'counter 1s ease-out forwards';

            currentStep++;
            setTimeout(update, duration / steps);
        }
    }

    update();
}

function Shake(node) {

    new Konva.Tween({
        node: node,
        duration: 0.1, // Animation duration (seconds)
        y: node.y() + 10,
        easing: Konva.Easings.EaseInOut,
        onFinish: () => {
            new Konva.Tween({
                node: node,
                duration: 0.1, // Animation duration (seconds)
                y: node.y() - 10,
                easing: Konva.Easings.EaseInOut,
                onFinish: () => {

                }
            }).play();
        }
    }).play();

    const amplitude = Math.random() * 20 + 5; // Random amplitude between 5 and 25
    const duration = 0.05; // Duration of each shake segment

    // Generate random direction
    const randomDirectionX = Math.random() > 0.5 ? 1 : -1;
    const randomDirectionY = Math.random() > 0.5 ? 1 : -1;

    // Initial tween to move in a random direction
    const tweenMove = new Konva.Tween({
        node: node,
        x: node.x() + randomDirectionX * amplitude,
        y: node.y() + randomDirectionY * amplitude,
        duration: duration,
        onFinish: () => {
            // Move back to the original position
            const tweenReturn = new Konva.Tween({
                node: node,
                x: node.x() - randomDirectionX * amplitude,
                y: node.y() - randomDirectionY * amplitude,
                duration: duration,
            });
            tweenReturn.play();
        },
    });

    tweenMove.play();
}

function playSound(f) {
    var audio = new Audio(f); // Replace with your MP3 file path
    audio.play();
}

function RandomNum(min, max) {
    return Math.random() * (max - min) + min;
}