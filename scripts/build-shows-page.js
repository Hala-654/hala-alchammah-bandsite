document.addEventListener("DOMContentLoaded", () => {
    'use strict';

    const showsList = document.getElementById('shows-list');
    shows.forEach((item) => {
        const showsCardLi = document.createElement("li");
        showsCardLi.classList.add("shows__cards");


        const showsDateDiv = document.createElement("div");
        showsDateDiv.classList.add("shows__date");
        showsDateDiv.innerHTML = `<span class="shows__label">Date</span><span class="shows__info--date">${item.date}</span>`;
        
        const showsVenueDiv = document.createElement("div");
        showsVenueDiv.classList.add("shows__venue");
        showsVenueDiv.innerHTML = `<span class="shows__label">Venue</span><span class="shows__info--venue">${item.venue}</span>`;

        const showsLocationDiv = document.createElement("div");
        showsLocationDiv.classList.add("shows__location");
        showsLocationDiv.innerHTML = `<span class="shows__label">Location</span><span class="shows__info--location">${item.location}</span>`;

        const showsButton = document.createElement("button");
        showsButton.classList.add("shows__button");
        showsButton.textContent = item.button;

        showsCardLi.appendChild(showsDateDiv);
        showsCardLi.appendChild(showsVenueDiv);
        showsCardLi.appendChild(showsLocationDiv);
        showsCardLi.appendChild(showsButton);
        
        showsList.appendChild(showsCardLi);

        showsCardLi.addEventListener("click", () => {
            const selected = document.querySelector('.shows__cards--clicked');
            if (selected){
                selected.classList.remove('shows__card--clicked');
            }
            showsCardLi.classList.add('shows__cards--clicked');
        })
    });
});