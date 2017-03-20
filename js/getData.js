/**
 * Created by Abiwax on 2016-07-22.
 */
function getAll(){
    dataGet()
}
function dataGet() {
    var listbox = document.getElementById("structure");
    var selIndex = listbox.selectedIndex;
    var structure = listbox.options[selIndex].text;
    var structureVal = listbox.options[selIndex].value;
    var listbox2 = document.getElementById("location");
    var selIndex2 = listbox2.selectedIndex;
    var location = listbox2.options[selIndex2].text
    path = 'https://raw.githubusercontent.com/Abiwax/HousingSearch/master/city/'+structureVal+".csv";
    
    room = localStorage.getItem("room");

    if (room === structure){
        dataProcess(path,location,structure)
    }
    else{
        deleteAll()
        dataProcess(path,location,structure)
    }

    
}
function dataProcess(path,location,structure){
    var parseDate = d3.time.format("%Y-%m").parse
    var formatDate = d3.time.format("%m/%y");
    var year = d3.time.format("%Y");
    var parseDate2 = d3.time.format("%m/%y").parse
    var formatDate2 = d3.time.format("%b %Y");
    var finalData = [];
    var bigData
    loadRoom(structure)
    d3.csv(path, function (data) {
        bigData = data;

        for (var i = 0; i < bigData.length; i++) {
            var city = {};
            city.region = bigData[i].RegionName;
            city.location = bigData[i].RegionName +", "+bigData[i].State;;
            city.data = [];
            for (var j in bigData[i]) {
                if (j != 'RegionName' && j != 'State' && j != 'Metro' && j != 'CountyName' && j != 'SizeRank') {
                    yeardate = year(parseDate(j))
                    if (yeardate >= '2015') {
                    city.data.push({
                        price: bigData[i][j],
                        date: formatDate(parseDate(j))
                    })
                    }
                }
            }
            finalData.push(city);
        }
        var regionData = finalData
        var map = {}
        for (var i = 0; i < regionData.length; i++){
            var regionName = regionData[i].region
            var regionlocation = regionData[i].location
            var city = []
            if (location === regionName){
                cityPrice = finalData[i]

                var datafield = cityPrice.data
                var length = datafield.length
                var date = formatDate2(parseDate2(datafield[length - 1].date))
                var price = datafield[length - 1].price
                map.location = regionlocation
                map.structure = structure
                map.price = price
                map.date = date
                city.push(regionlocation)
                saveData(cityPrice)
                mapData(map)
            }
            else {
                $('.alertRed').show()
                $('.alertRed').html('We currently do not have that data, please check back another day, Continue by adding another data.')
            }
        }


    });



}
function saveData(data) {
    try {
        var currentData = JSON.parse(localStorage.getItem('fulldata')) || [];
        var region = data.region
        currentData.push(data)
        var unique = []
        $.each(currentData, function(i, el){
            if($.inArray(el, unique) === -1 || $.inArray(el, unique) > 1) unique.push(el);
        });

        localStorage.setItem("fulldata", JSON.stringify(
            unique));

        //window.location.reload();
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

}

function mapData(data) {
    try {
        var currentData = JSON.parse(localStorage.getItem('mapdata')) || [];
        currentData.push(data)
        localStorage.setItem("mapdata", JSON.stringify(
            currentData));

        //window.location.reload();
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
    pageReload()
}


function loadRoom(data){

    try {

        localStorage.setItem("room", data);

        //window.location.reload();
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
}
function deleteAll() {
    localStorage.removeItem("fulldata");
    localStorage.removeItem("mapdata");
    localStorage.removeItem("room");
}
function pageReload() {
    var currentData = JSON.parse(localStorage.getItem('mapdata')) || [];
    var currentData2= JSON.parse(localStorage.getItem('fulldata')) || [];
    var currentData3 = JSON.parse(localStorage.getItem('mapdata')) || [];
    if(currentData !== null && currentData2 !== null &&currentData3 !== null){
        window.location.href ='index.html'
    }
    //window.location.href ='index.html'
}