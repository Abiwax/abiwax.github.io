function printData(divChart){

 
     var printContents1 = document.getElementById(divChart).innerHTML;
  
     var originalContents1 = document.body.innerHTML;
   
     document.body.innerHTML = printContents1;
 
     window.print();

     document.body.innerHTML = originalContents1;
  
 
}


