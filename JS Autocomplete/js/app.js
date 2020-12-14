 const search = document.getElementById('search');
 const matchList = document.getElementById('match-list');

// read data from json file and filter it

const searchCountries = async input => {
    const resp = await fetch('../data/countries.json');
    const countries = await resp.json();

    // get filter lists on input
    let matches = countries.filter(country => {
        const regex = new RegExp(`${input}`, 'gi');
        return country.name.match(regex) || country.country_code.match(regex);
    });

    console.log(matches);

   if(input.length === 0) {
       matches = [];
       matchList.innerHTML = '';
   } else {
        outputHtml(matches);
   }
}


// Show results in a Html
const outputHtml = matches => {
    if (matches.length) {
        const htmlElem = matches.map(match => `
         <div class="card card-body mb-1">
            <h4>${match.name} (${match.country_code})
                <span class="text-primary">${match.capital}</span>
            </h4>
            <small>Lat: ${match.latlng[0]} / Long: ${match.latlng[1]}</small>
         </div>
        `).join('');

        matchList.innerHTML = htmlElem;
    } else {
        matchList.innerHTML = `
        <div class="card card-body mb-1">
            <h4>No results found</h4>
         </div>
        `;
    }
}

search.addEventListener('input', ()=> searchCountries(search.value));

