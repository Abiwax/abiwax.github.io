/**
 * Created by Abiwax on 2016-07-23.
 */
function getInfo() {
    try {
        var fulldata = JSON.parse(localStorage.getItem(
            "fulldata"));
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

    if (fulldata != null) {


    var date = ['x']
    var mer = []
        var com = []
    for (var i = 0; i < fulldata.length; i++) {

        var regionPrices = fulldata[i].data
        var full = fulldata
        var datec = regionPrices.map(function(rec){
            return rec.date;

        })
        for (i in datec){
            date.push(datec[i])
        }

        var regionName = full.map(function(rec){
            return rec.region;

        })

        var price =  _.map(full, function(obj,iter) {
            var valueArray = _.pluck(obj.data, "price");
            return valueArray
        });
        mer.push(date)
        for (i in price){
            var l = [regionName[i]]
            l.push.apply(l, price[i])
            mer.push(l)

        }


        }

        chart = c3.generate({
            bindto: $('#chartSection')[0],
            data: {
                x: 'x',
                xFormat: '%m/%y', // 'xFormat' can be used as custom format of 'x'
                columns: [],
                type: 'spline'
            },
            transition: {
                duration: 9
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%b %y'
                    }
                }
            },
            point: {
                r: 1.5,
            },
            regions: [
                {start: 0, end: 12},
                {start: 24, end: 36},
            ],
            legend: { position: 'right' }
        });
        setTimeout(function () {
            chart.load ({columns: mer});
        }, 300)
    }
    else{
        $('.alertRed').show()
        $('.alertRed').html('You currently have no data, begin adding to visualize')
    }
    }



function deleteData() {
    localStorage.removeItem("fulldata");
    localStorage.removeItem("mapdata");
    localStorage.removeItem("room");
    window.location.href ='index.html'
}