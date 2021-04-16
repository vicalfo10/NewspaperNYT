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
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var search = document.getElementById('search')
var date = document.getElementById('date')
var container = document.getElementById('container')
var spinner = document.getElementById('spinner')

//var head = document.getElementById('head')
//var img = document.getElementById('img')

date.innerHTML = "Today is: " + fecha.getDate() + " / " + months[fecha.getMonth()] + " / " + fecha.getFullYear()

search.addEventListener('click', function(){

    let month = document.getElementById('month').value
    let year = document.getElementById('year').value
    let key = 'n7YKG0MPOmRl8ESF86N0V6VXLSUubtdo'
    let url_news = 'https://api.nytimes.com/svc/archive/v1/' + year + '/' + month + '.json?api-key=' + key
    let multimedia = "https://static01.nyt.com/"

    if(month != "Select a Month" && year != "Select a Year"){
        getnews()
         .then(data => data.json())
        .then(docs => {
                
            //console.log(docs.response.docs.length)
            //console.log(docs.response.docs[3].lead_paragraph)
            console.log(docs)
            
            for(var i = 0; i <= 250; i ++){
                container.innerHTML += `<div class="row">
                                            <div class="col-sm-9">
                                                <div class="row">
                                                    <div class="col-12 col-sm-9">
                                                        <h1>${docs.response.docs[i].headline.main}</h1>
                                                        <p>${docs.response.docs[i].lead_paragraph}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <img class="new_img" src="${multimedia + docs.response.docs[i].multimedia[0].url}" class="rounded float-end" alt="...">
                                            </div>
                                            <br>
                                        </div>`

            }
        })
    
        function getnews(){
            return fetch(url_news)
        }
    }else{
         swal({
            title: "Sorry",
            text: "You have to select a month and a year",
            icon: "error"
         })       
    }
})




