function createReviewCard(data) {

    const card = document.createElement('article');
    card.className = 'review-card';

    const img = document.createElement('img');
    img.src = 'images/' + data.title.replace(':', '.') + '.jpg';
    img.alt = data.title;

    const content = document.createElement('div');
    content.className = 'review-content';

    const heading = document.createElement('h2');
    heading.textContent = data.title;

    const desc = document.createElement('p');
    desc.textContent = data.description;

    const genre = document.createElement('p');
    genre.innerHTML = `<strong>Genres:</strong> ${data.genre}`;


    card.appendChild(img);
    content.appendChild(heading);
    content.appendChild(desc);
    content.appendChild(genre);
    card.appendChild(content);

    return card;
}

const fetchingData = async () => {

    var data = await fetch("review.json", {
        method: "GET",
    })
    return await data.json();

}

var cards = null
let currentIndex = 0;

function updateCards() {
    const cards = document.querySelectorAll('.review-card');
    // console.log(cards);
    gsap.to(cards, {
        duration: 0.6,
        ease: 'power2.inOut',
        y: (i, card) => {
            const offset = i - currentIndex;
            if (offset === 0) return 0;
            if (offset === 1) return 40;
            if (offset === -1) return -40;
            if (offset === 2 || offset === -2) return offset > 0 ? 80 : -80;
            return offset > 0 ? 100 : -100;
        },
        x: (i, card) => {
            const offset = i - currentIndex;
            if (offset === 0) return 0;
            if (offset === 1 || offset === -1) return 0;
            if (offset === 2 || offset === -2) return 0;
            return 0;
        },
        scale: (i, card) => {
            const offset = i - currentIndex;
            if (offset === 0) return 1;
            if (offset === 1 || offset === -1) return 0.9;
            if (offset === 2 || offset === -2) return 0.8;
            return 0.7;
        },
        zIndex: (i, card) => {
            const offset = i - currentIndex;
            if (offset === 0) return 10;
            if (offset === 1 || offset === -1) return 8;
            if (offset === 2 || offset === -2) return 5;
            return 1;
        },
        opacity: (i, card) => {
            const offset = i - currentIndex;
            if (offset === 0) return 1;
            if (offset === 1 || offset === -1) return 0.9;
            if (offset === 2 || offset === -2) return 0.5;
            return 0;
        },
        stagger: {
            each: 0.05,
        }
    });

    return cards
}

// Initial card positioning

// Event listeners (you can add more for touch events, etc.)
window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0 && currentIndex < cards.length - 1) {
        currentIndex++;
    } else if (event.deltaY < 0 && currentIndex > 0) {
        currentIndex--;
    }
    updateCards();
});


async function main() {
    const reviewSection = document.querySelector('.reviews-section')

    reviewData = await fetchingData()

    for (let i = 0; i < reviewData.length; i++) {
        const card = createReviewCard(reviewData[i])
        reviewSection.appendChild(card)
    }
    console.log('tables created');
    



    cards = updateCards();
    console.log(cards);

    console.log('after');
}
