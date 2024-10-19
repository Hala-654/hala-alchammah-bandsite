document.addEventListener("DOMContentLoaded", async () => {
    'use strict';

    const myBandApi = new BandSiteApi(api_key);
    const api_key = "40ef9834-e448-42ed-95da-2dd7bb0f2b9f";
    const showsList = document.getElementById('shows-list');

    async function fetchAndDisplayShows() {
        try {
            const shows = await myBandApi.getShows();
            console.log("shows fetched:", shows);
            shows.forEach((item) => {
                const showsCardLi = document.createElement("li");
                showsCardLi.classList.add("shows__card");
                
                const date = new Date(item.date);
                const formattedDate = `${date.toLocaleDateString('en-US', {month: 'short'})} ${date.getDate()} ${date.getFullYear()}`;

                const showsDateDiv = document.createElement("div");
                showsDateDiv.classList.add("shows__date");
                showsDateDiv.innerHTML = `<span class="shows__label">Date</span><span class="shows__info--date">${formattedDate}</span>`;
                
                const showsVenueDiv = document.createElement("div");
                showsVenueDiv.classList.add("shows__venue");
                showsVenueDiv.innerHTML = `<span class="shows__label">Venue</span><span class="shows__info--venue">${item.place}</span>`;
        
                const showsLocationDiv = document.createElement("div");
                showsLocationDiv.classList.add("shows__location");
                showsLocationDiv.innerHTML = `<span class="shows__label">Location</span><span class="shows__info--location">${item.location}</span>`;
        
                const showsButton = document.createElement("button");
                showsButton.classList.add("shows__button");
                showsButton.textContent = "Buy Tickets";
        
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
                });
            });
        } catch (error) {
            console.log("Error fetching shows details:", error);
        }
        
    }

    await fetchAndDisplayShows();


});