'use strict'

//Así se obtiene el API en jQuery
/*$.get("https://api.nytimes.com/svc/archive/v1/2020/12.json?api-key=n7YKG0MPOmRl8ESF86N0V6VXLSUubtdo", function(data){
    console.log(data)
})*/

    var consulta = document.getElementById('consulta')
    var headline = document.getElementById('headline')
    var abstract = document.getElementById('abstract')
    var byline_original = document.getElementById('byline_original')
    var lead_paragraph = document.getElementById('lead_paragraph')

    consulta.addEventListener('click', function(){

        let mes = document.getElementById('mes').value
        let ano = document.getElementById('ano').value
        let key = 'n7YKG0MPOmRl8ESF86N0V6VXLSUubtdo'
        let url = 'https://api.nytimes.com/svc/archive/v1/' + ano + '/' + mes + '.json?api-key=' + key
        let multimedia = "https://static01.nyt.com/"

        let paragraph = document.createElement('p')
        let imagen = document.createElement('img')

        getnews()
        .then(data => data.json())
        .then(docs => {
            
            console.log(docs.response.docs.length)
            console.log(docs.response.docs[2].lead_paragraph)
            console.log(docs.response.docs[2])

            headline.innerHTML = docs.response.docs[2].headline.main
            abstract.innerHTML = docs.response.docs[2].abstract
            byline_original.innerHTML = docs.response.docs[2].byline.original
            
            imagen.src = multimedia + docs.response.docs[2].multimedia[0].url
            paragraph.innerHTML = docs.response.docs[2].lead_paragraph
            
            lead_paragraph.appendChild(imagen)
            lead_paragraph.appendChild(paragraph)
            
        })

        function getnews(){
            return fetch(url)
        }
})




