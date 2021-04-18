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

var date_today = new Date()
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var day = date_today.getDate()
var month = date_today.getMonth() + 1
var year = date_today.getFullYear()

var search = document.getElementById('search')
var start_date = document.getElementById('start_date')
var end_date = document.getElementById('end_date')
var date = document.getElementById('date')
var container = document.getElementById('container')
var img_news = ''


start_date.value = year + "-" + (month ? '0' + month : month) + "-" + day
end_date.value = year + "-" + (month ? '0' + month : month) + "-" + day
date.innerHTML = "Today is: " + day + " / " + months[month - 1] + " / " + year

search.addEventListener('click', function(){

    let dt_start = new Date(start_date.value)
    let dt_end = new Date(end_date.value)
    let st_day = dt_start.getDate() + 1
    let en_day = dt_end.getDate() + 1
    let st_month = dt_start.getMonth() + 1
    let en_month = dt_end.getMonth() + 1
    let st_year = dt_start.getFullYear()
    let en_year = dt_end.getFullYear()

    container.innerHTML = ''
    let key = 'n7YKG0MPOmRl8ESF86N0V6VXLSUubtdo'
    //let url_news = 'https://api.nytimes.com/svc/archive/v2/' + year + '/' + month + '.json?api-key=' + key
    let url_news = `https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=${st_year}${(st_month ? '0' + st_month : st_month)}${st_day}&end_date=${en_year}${(en_month ? '0' + en_month : en_month)}${en_day}&api-key=` + key
    let multimedia = "https://static01.nyt.com/"

    if(month != "Select a Month" && year != "Select a Year"){
        getnews()
        .then(data => data.json())
        .then(docs => {
                
            //console.log(docs.response.docs.length)
            //console.log(docs.response.docs[0].pub_date)
            console.log(docs.response.docs[0])
            //console.log(docs.response.docs[10].multimedia.length)
            
            for(var i = 0; i < docs.response.docs.length; i ++){
                if(docs.response.docs[i].multimedia.length == 0){
                    img_news = 'img/news_failed.jpg'
                }else{
                    img_news = multimedia + docs.response.docs[i].multimedia[0].url      
                }
                
                let pub_date = new Date(docs.response.docs[i].pub_date)
                container.innerHTML += `<div class="row">
                                            <div class="col-sm-8">
                                                <div class="row">
                                                    <div class="col-12 col-sm-12">
                                                        <h1>${i+1 + " - " + docs.response.docs[i].headline.main}</h1>
                                                        <p>${docs.response.docs[i].abstract}</p>
                                                        <br>
                                                        <h5>${docs.response.docs[i].byline.original}</h5>
                                                        <p>${months[pub_date.getMonth()] + " " + (pub_date.getDate()) + ", " + pub_date.getFullYear()}</p>
                                                        <p>${docs.response.docs[i].lead_paragraph}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <img class="new_img" src="${img_news}" class="rounded float-end" alt="...">
                                            </div>
                                            <br>
                                        </div>
                                        <hr class="hr">`
                
            }
        })
        .catch(function(error) {
            swal({
                title: "Sorry",
                text: "Problems returning the news " + error,
                icon: "error"
             })       
        })
    
        async function getnews(){
            /*let request = await fetch(url_news, {
                            method: 'GET',
                            mode: 'no-cors',
                            cache: 'no-cache',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Content-Type': 'multipart/form-data',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Header': '*'
                            }   
            })
            console.log(request)*/
            return await fetch(url_news)
        }
    }else{
         swal({
            title: "Sorry",
            text: "You have to select a month and a year",
            icon: "error"
         })       
    }
})




