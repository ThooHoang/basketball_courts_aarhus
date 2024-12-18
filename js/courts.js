document.addEventListener('DOMContentLoaded', function() {
    const filter = document.getElementById('courtFilter');
    const cards = document.querySelectorAll('.court-card');

    filter.addEventListener('change', function() {
        const value = this.value;
        
        cards.forEach(card => {
            const types = card.dataset.types.split(' ');
            
            if (value === 'all' || types.includes(value)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
