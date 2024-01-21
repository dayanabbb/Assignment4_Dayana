function initMap(lat, lon) {
    const map = new google.maps.Map(document.getElementById("map-container"), {
        center: { lat: parseFloat(lat), lng: parseFloat(lon) },
        zoom: 10
    });

    
}
