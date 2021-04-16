'use strict'

//Así se llena un JSON y se recorre

/*var mynews = []
var indice

mynews.push({
            "headline"        : docs.response.docs[i].headline.main,
            "abstract"        : docs.response.docs[i].abstract,
            "byline_original" : docs.response.docs[i].byline.original,
            "imagen"          : multimedia + docs.response.docs[i].multimedia[0].url,
            "paragraph"       : docs.response.docs[i].lead_paragraph
})

for(indice in mynews){
    var headline = document.createElement('h1')
    var imagen = document.createElement('img')
    var paragraph = document.createElement('p')
                
    headline.append(mynews[indice].headline)
    imagen.src = mynews[indice].imagen
    paragraph.append(mynews[indice].paragraph)
      
    head.append(headline)
    img.append(imagen)
    head.append(paragraph)
}*/

//Así se obtiene el API en jQuery
/*$.get("https://api.nytimes.com/svc/archive/v1/2020/12.json?api-key=n7YKG0MPOmRl8ESF86N0V6VXLSUubtdo", function(data){
    console.log(data)
})*/

var fecha = new Date()
var consulta = document.getElementById('consulta')
var date = document.getElementById('date')
var head = document.getElementById('head')
var img = document.getElementById('img')

date.innerHTML = "Today is: " + fecha.getDate() + " / " + fecha.getMonth() + " / " + fecha.getFullYear()

consulta.addEventListener('click', function(){

    let month = document.getElementById('month').value
    let year = document.getElementById('year').value
    let key = 'n7YKG0MPOmRl8ESF86N0V6VXLSUubtdo'
    let url = 'https://api.nytimes.com/svc/archive/v1/' + year + '/' + month + '.json?api-key=' + key
    let multimedia = "https://static01.nyt.com/"

    if(month != "Select a Month" && year != "Select a Year"){
        getnews()
         .then(data => data.json())
        .then(docs => {
                
            //console.log(docs.response.docs.length)
            //console.log(docs.response.docs[3].lead_paragraph)
            //console.log(docs.response.docs[3])
            
            for(var i = 0; i <= 5; i ++){

                var headline = document.createElement('h1')
                var imagen = document.createElement('img')
                var paragraph = document.createElement('p')

                headline.append(docs.response.docs[i].headline.main)
                imagen.src = multimedia + docs.response.docs[i].multimedia[0].url
                paragraph.append(docs.response.docs[i].lead_paragraph)

                head.append(headline)
                img.append(imagen)
                head.append(paragraph)

            }
        })
    
        function getnews(){
            return fetch(url)
        }
    }else{
         swal({
            title: "Sorry",
            text: "You have to select a month and a year",
            icon: "error"
         })       
    }
})




