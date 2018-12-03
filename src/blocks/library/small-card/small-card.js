var smallCardsImages = Array.from(document.querySelectorAll('.small-card__img'));
smallCardsImages.forEach(function(card) {
    card.style.backgroundImage = 'url(' + card.dataset.src + ')';
});