var newdata = localStorage.getItem("results-eva");
newdata = jQuery.parseJSON(newdata);
  if(newdata==null){
        window.location.href = 'index.php';
  }
var x = newdata.qJson.map(item => item[Object.keys(item)]);
var allqq = x.map(item => item.qq);
var response = allqq.map(item => item.response);
var alloptionc1 = x.map(item => item.c1);
var alloptionc2 = x.map(item => item.c2);
var alloptionc3 = x.map(item => item.c3);
var alloptionc4 = x.map(item => item.c4);