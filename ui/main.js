// counter code
var button=document.getElementById('counter');
var counter=0;

button.onclick=function(){
    
    //create a request to counter end point
    var request=new XMLHttpRequest();
    
    
    //capture the response and store it in a variable
    request.onreadystatechange=function() {
        if(request.readyState===XMLHttpRequest.DONE){
            //take some action
            if(request.status===200){
        var counter= request.responseText;
          var span=document.getElementById('count');
    span.innerHTML= counter.toString();
            }
            }
            //not doneyet
        };
        //make the request
        request.open('GET','http://chandan-tiwari.imad.hasura-app.io/counter,true');
        request.send(null);
};
    
  
