function setMap(map,data) {
    for (var i = 0; i < data.length; i++) {
        setMapInfo(map, data[i])
    }

}

function setMapInfo(map, data) {
    var info = data;
    var infowindow = new google.maps.InfoWindow();
    var geocoder;
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({'address': info["location"]}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
                    map.setCenter(results[0].geometry.location);
                    var content = '<div class="info_content">' +
                        '<h3>' + info['location'] + '</h3>' +
                        '<p> ' + info['structure'] + '</p>' +
                        '<p> Latest Price: ' + info['price'] + '</p>' +
                        '<p> Latest Date: ' + info['date'] + '</p>' +
                        '</div>'
                    var marker = new google.maps.Marker({
                        position: results[0].geometry.location,
                        map: map
                    });

                    google.maps.event.addListener(marker, "mouseover", function () {
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    });
                    google.maps.event.addListener(marker, "mouseout", function () {
                        infowindow.close();
                    });
                } else {
                    console.log("No results found");
                }
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    }
}
function mapLoad(){
    var map;
    try {
        var mapdata = JSON.parse(localStorage.getItem(
            "mapdata"));
    } catch (e) {
        /* Google browsers use different error
         * constant
         */
        if (window.navigator.vendor ===
            "Google Inc.") {
            if (e == DOMException.QUOTA_EXCEEDED_ERR) {
                alert(
                    "Error: Local Storage limit exceeds."
                );
            }
        } else if (e == QUOTA_EXCEEDED_ERR) {
            alert("Error: Saving to local storage.");
        }

        console.log(e);
    }
    if (mapdata != null) {
        var myOptions = {
            zoom:3,
            mapTypeId: 'roadmap',
            scrollwheel: false
        };
        map = new google.maps.Map(document.getElementById("mapSection"), myOptions);
        
        for (i = 0; i < mapdata.length; i++) {
            setMap(map,mapdata)
        }
    }
}