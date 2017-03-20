
 function printPDF() {
 	$('#label').show()
     $('#label').css({'font-size': '67px','padding': '5px',
          'margin-top': '25px','border': '1px solid transparent',
          'border-radius': '4px','background-color': '#2E1301',
          'border-color': '#F0756C','color': '#000','text-align': 'center'})
     $('#label').html('HousingSearch')
     $('#details').show()
     $('#details').css({'font-size': '30px','font-weight': 'bolder',
          'margin-top': '5px','text-align': 'center'})
     $('#details').html('Graphical display of rent data in the following neighbourhoods')
        var pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        source = $('#printSection')[0];

        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.
        specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function (element, renderer) {
                // true = "handled elsewhere, bypass text extraction"
                return true
            }
        };
        margins = {
            top: 0,
            bottom: 0,
            left: 0,
            width: 200
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top, { // y coord
            'width': margins.width, // max width of content on PDF
            'elementHandlers': specialElementHandlers
        },

        function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF 
            //          this allow the insertion of new lines after html
            pdf.save('HousingData.pdf');
        }, margins);
    }