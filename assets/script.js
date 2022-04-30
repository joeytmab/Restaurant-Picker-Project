var searchForm = $('#search-form');
var searchBtn = $('.searchBtn');
// var searchQuery = ('#search-place');
var searchQueryTwo = $('#search-place');
var apiKey = "gJVmTi7vwWY--jKnwBsPJdLiPDsil3tcQzGmNEpsaoBkFKdkMwmTdiB_RCkLqnrExNMK-VW2twwvYqNssc1H8r25mJE0L-ZTnpq2xSa88h65tb8IzboCX_C1UHFrYnYx"

function getLocationResults(e) {
    e.preventDefault();

    var searchRequest = searchQueryTwo.val()
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + apiKey);
    console.log(searchRequest);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&limit=10&categories=parks,beaches&location=" + searchRequest, requestOptions)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            data.businesses.forEach(function (item) {
                    const searchResult = {
                        name: item.name,
                        address: item.location.address1,
                        picture: item.image_url,
                    }
                    localStorage.setItem(item.name, JSON.stringify(searchResult));
                })
                .catch(error => console.log('error', error));
        })
}


// function getLocationResults(e) {
//     e.preventDefault();
//     var searchRequest = searchQueryTwo.val();
//     var apiURL = 'https://www.mapquestapi.com/search/v4/place?sort=relevance&feedback=false&key=kjB9lPrpbc0GrGOIyTCQIBKimoouOGE1&q=' + searchRequest;
//     fetch(apiURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//         })
// }
// }
// fetch(apiURL)
//     .then(function (response) {
//             response.json().then(function (data))


//     if (searchRequest) {
//         getLocation(searchRequest);

//     }
//     console.log(searchRequest);
// }



searchForm.on('submit', getLocationResults);