let exploreMap
let markers = []
let infowindow


function initMap() {
    let params = (new URL(document.location)).searchParams
    let type = params.get('type')
    renderMap()
    getPlaces(type)
}

function getPlaces(type) {
    axios
        .get(`/api/places?type=${type}`)
        .then(response => setMarkers(response.data))
        .catch(err => console.log(err))
}


function setMarkers(places) {

    places.forEach(elm => {

        const lat = elm.location.coordinates[0]
        const lng = elm.location.coordinates[1]

        markers.push(
            new google.maps.Marker({
                map: exploreMap,
                position: { lat, lng },
                title: elm.name,
                description: elm.description,
                type: elm.type,
                image: elm.placeImg,
                icon: {
                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                }
            }))
    })


    markers.forEach(elm => {

        elm.addListener("click", () => {

            infowindow = new google.maps.InfoWindow({
                content:
                    // '<div id="infoBack">' + `<img width='30%' src="${elm.image}" > `
                    `<img width='30%' src="${elm.image}" > ` + `<h1 class='cardTitle'>${elm.title}</h1>` + `<h5 class='cardTitle2'> Perfect to ${elm.type}</h5>` + `<p class='cardDesc'> About: ${elm.description}</p>`
            })

            infowindow.open({
                anchor: elm,
                map: exploreMap,
            })

            initialize()
        })
    })
}

// Search Box ---------------------------------------------------------------------------------------------

// let autocomplete
// function initAutocomplete() {
//     autocomplete = new google.maps.places.Autocomplete(
//         document.getElementById("autocomplete"),
//         {
//             types: ['establishment'],
//             componentRestrictions: { 'country': ['ES'] },
//             fields: ['geometry', 'name']
//         });
// }

//     con\]st map = new google.maps.Map(
//         document.getElementById("map") as HTMLElement,
//         {
//             center: { lat: -33.8688, lng: 151.2195 },
//             zoom: 13,
//             mapTypeId: "roadmap",
//         }
//     );

//     // Create the search box and link it to the UI element.
//     const input = document.getElementById("pac-input") as HTMLInputElement;
//     const searchBox = new google.maps.places.SearchBox(input);

//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

//     // Bias the SearchBox results towards current map's viewport.
//     map.addListener("bounds_changed", () => {
//         searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
//     });

//     let markers: google.maps.Marker[] = [];

//     // Listen for the event fired when the user selects a prediction and retrieve
//     // more details for that place.
//     searchBox.addListener("places_changed", () => {
//         const places = searchBox.getPlaces();

//         if (places.length == 0) {
//             return;
//         }

//         // For each place, get the icon, name and location.
//         const bounds = new google.maps.LatLngBounds();

//         places.forEach((place) => {
//             if (!place.geometry || !place.geometry.location) {
//                 console.log("Returned place contains no geometry");
//                 return;
//             }

//             const icon = {
//                 url: place.icon as string,
//                 size: new google.maps.Size(71, 71),
//                 origin: new google.maps.Point(0, 0),
//                 anchor: new google.maps.Point(17, 34),
//                 scaledSize: new google.maps.Size(25, 25),
//             };

//             // Create a marker for each place.
//             markers.push(
//                 new google.maps.Marker({
//                     map,
//                     icon,
//                     title: place.name,
//                     position: place.geometry.location,
//                 })
//             );

//             if (place.geometry.viewport) {
//                 // Only geocodes have viewport.
//                 bounds.union(place.geometry.viewport);
//             } else {
//                 bounds.extend(place.geometry.location);
//             }
//         });
//         map.fitBounds(bounds);
//     });
// }

// declare global {
//     interface Window {
//         initAutocomplete: () => void;
//     }
// }
// window.initAutocomplete = initAutocomplete;
// export { };


// Render Map -------------------------------

function renderMap() {
    exploreMap = new google.maps.Map(
        document.querySelector('#exploreMap'),
        {
            zoom: 4,
            center: { lat: 0, lng: 0 },
            styles:
                [
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#e9e9e9"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 17
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 29
                            },
                            {
                                "weight": 0.2
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 18
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f5f5f5"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "featureType": "poi.park",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#dedede"
                            },
                            {
                                "lightness": 21
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "visibility": "on"
                            },
                            {
                                "color": "#ffffff"
                            },
                            {
                                "lightness": 16
                            }
                        ]
                    },
                    {
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "saturation": 36
                            },
                            {
                                "color": "#333333"
                            },
                            {
                                "lightness": 40
                            }
                        ]
                    },
                    {
                        "elementType": "labels.icon",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "color": "#f2f2f2"
                            },
                            {
                                "lightness": 19
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 20
                            }
                        ]
                    },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#fefefe"
                            },
                            {
                                "lightness": 17
                            },
                            {
                                "weight": 1.2
                            }
                        ]
                    }
                ]





        }
    )
}