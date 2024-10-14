document.addEventListener("DOMContentLoaded", () => {
    'use strict';

    const showsList = document.getElementById('shows-list');
    shows.forEach((item) => {
        const showsCardLi = document.createElement("li");
        showsCardLi.classList.add("shows__cards");


        const showsDateUl = document.createElement("ul");
        const showsVenueUl = document.createElement("ul");
        const showsLocationUl = document.createElement("ul");
        const showsButtonUl = document.createElement("ul");

        showsButtonUl.classList.add("shows__button");
        showsButtonUl.textContent = item.button;
        
        showsDateUl.innerHTML = `<li class="shows__label">Date</li><li class="shows__info--date">${item.date}</li>`;
        showsVenueUl.innerHTML = `<li class="shows__label">Venue</li><li class="shows__info--venue">${item.venue}</li>`;
        showsLocationUl.innerHTML = `<li class="shows__label">Location</li><li class="shows__info--location">${item.location}</li>`;

        showsCardLi.appendChild(showsDateUl);
        showsCardLi.appendChild(showsVenueUl);
        showsCardLi.appendChild(showsLocationUl);
        showsCardLi.appendChild(showsButtonUl);
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