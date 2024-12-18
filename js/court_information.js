document.addEventListener('DOMContentLoaded', function() {
    // Set back button href based on referrer
    const backButton = document.getElementById('backButton');
    if (document.referrer.includes('courts.html')) {
        backButton.href = 'courts.html';
    } else {
        backButton.href = 'index.html';
    }

    const urlParams = new URLSearchParams(window.location.search);
    const courtId = urlParams.get('court');

    fetch('courts.json')
        .then(response => response.json())
        .then(data => {
            const court = data.courts.find(c => c.id === courtId);
            if (court) {
                document.getElementById('courtTitle').textContent = court.title;
                document.getElementById('courtTitle').style.color = court.heroColor;
                const heroSpan = document.querySelector('.hero span');
                heroSpan.textContent = court.type;
                heroSpan.style.color = court.heroSpanColor;
                heroSpan.style.borderColor = court.heroSpanBorderColor;
                document.querySelector('.hero h3').textContent = court.topic;
                document.querySelector('.hero-image img').src = court.heroImage;

                document.querySelector('.carousel').style.background = court.carouselBackgroundColor;
                document.querySelector('.feedback-container').style.background = court.feedbackBackgroundColor;
                document.querySelector('.amenities h1').style.color = court.amenitiesTitleColor;
                const feedbackSpan = document.querySelector('.feedback-container .content span');
                feedbackSpan.style.background = court.feedbackSpanColor;
                feedbackSpan.style.webkitBackgroundClip = 'text';
                feedbackSpan.style.webkitTextFillColor = 'transparent';

                const carouselInner = document.querySelector('.carousel-inner');
                carouselInner.innerHTML = '';
                court.carouselImages.forEach(image => {
                    const item = document.createElement('div');
                    item.classList.add('item');
                    const img = document.createElement('img');
                    img.src = image;
                    item.appendChild(img);
                    carouselInner.appendChild(item);
                });

                const hoopCard = document.querySelector('.card.hoop .rectangle');
                hoopCard.querySelector('h4').textContent = court.amenities.hoop.title;
                hoopCard.querySelector('p').textContent = court.amenities.hoop.description;
                hoopCard.style.background = court.amenities.hoop.color;
                hoopCard.parentElement.style.backgroundImage = `url(${court.amenities.hoop.image})`;

                const ballCard = document.querySelector('.card.ball .rectangle');
                ballCard.querySelector('h4').textContent = court.amenities.ball.title;
                ballCard.querySelector('p').textContent = court.amenities.ball.description;
                ballCard.style.background = court.amenities.ball.color;
                ballCard.parentElement.style.backgroundImage = `url(${court.amenities.ball.image})`;

                const workoutCard = document.querySelector('.card.workout .rectangle');
                workoutCard.querySelector('h4').textContent = court.amenities.workout.title;
                workoutCard.querySelector('p').innerHTML = `<a href="${court.amenities.workout.link}">${court.amenities.workout.description}</a>`;
                workoutCard.style.background = court.amenities.workout.color;
                workoutCard.parentElement.style.backgroundImage = `url(${court.amenities.workout.image})`;

                document.querySelector('.additionals .container iframe').src = court.iframeSrc;

                const feedbackContainer = document.querySelector('.feedback-cards');
                feedbackContainer.innerHTML = '';
                court.feedback.forEach(feedback => {
                    const feedbackCard = document.createElement('article');
                    feedbackCard.classList.add('feedback-card');
                    feedbackCard.innerHTML = `
                        <div class="person">
                            <div class="icon">
                                <img src="${feedback.image}" alt="${feedback.name}">
                            </div>
                            <div class="card-info">
                                <div class="name">${feedback.name}</div>
                                <div class="date">${feedback.date}</div>
                            </div>
                        </div>
                        <p>${feedback.text}</p>
                    `;
                    feedbackContainer.appendChild(feedbackCard);
                });
            }
        });

    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        const add = card.querySelector('.add');
        const less = card.querySelector('.less');
        const description = card.querySelector('.description');
        
        function toggleDescription(e) {
            e.preventDefault();
            add.classList.toggle('active');
            less.classList.toggle('active');
            description.classList.toggle('active');
        }

        add.addEventListener('click', toggleDescription);
        less.addEventListener('click', toggleDescription);
    });
});
