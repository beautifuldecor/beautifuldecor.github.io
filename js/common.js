var doc = document;

window.onload = function () {
    var goodsContent   = doc.getElementsByClassName('goods__content')[0],
        resultJSON = [],
        contentItem = '',
        foundedArray;

    // Request
    let getJSON = function(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            let status = xhr.status;
            if (status == 200) {
                callback(null, xhr.response)
            } else {
                callback(status, xhr.response)
            }
        };
        xhr.send();
    }
    getJSON('https://spreadsheets.google.com/feeds/cells/1JhYqoP99niOPAsUNpTLzUj0D9jx1Y3-Dfb_ps5Z3Cms/1/public/full?alt=json', function (err, data) {
        createItems(data.feed.entry, data.feed.entry.length);
    }); 


    // Creating posts array
    function createItems(_d, l) {
        // Create array with all items
        var itemsValues = [];

        for (var i = 0; i <= l-1; i++) {
            itemsValues.push(_d[i].gs$cell.inputValue);

            if (i == l-1) {
                createResult(itemsValues);
            }
        };

        // Create arrays with rows
        function createResult(list) {
            var idx = 0;
          
            while (idx < list.length) {
              if (idx % 9 === 0) resultJSON.push([])
              resultJSON[resultJSON.length - 1].push(list[idx++])
            }

            createItemsHTML(resultJSON);
        };
    };

    // Creating posts
    function createItemsHTML(resultJSON) {        
        for (var i = 1; i <= resultJSON.length-1; i++) {
            contentItem = `<div class="content__item"><div class="item__photo"> <img src="${resultJSON[i]['3']}" alt="${resultJSON[i][1]}" class="photo__photo-item"></div><div class="item__info"><h1 class="item__title">${resultJSON[i][1]}</h1><p class="item__paragraph">${resultJSON[i][7]}</p> <a class="more-btn postMore" id="${resultJSON[i][8]}">Show more</a></div></div>`
            goodsContent.innerHTML += contentItem;
        };


        var elements = document.getElementsByClassName("postMore");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            elements[i].onclick = function(element){
                seeMore(element);
            };
        };

        function seeMore(element) {
            var elementID = element.path[0].id;
            console.log(resultJSON, elementID)


            for(var i = 0; i <= elements.length; i++) {
                const found = resultJSON[i].find(element => element === elementID);
                if(found != undefined) {
                    foundedArray = resultJSON[i];
                    console.log(resultJSON[i]);
                }
            }

            

            contentPost = `<div class="detailForPost"><div class="detailForPost__photo"><div> <img src="${foundedArray[3]}" alt=""></div></div><div class="detailForPost__info"><div class="container"><div class="info__centering"><div class="infobox__title"><h4 class="title__small">Tne new way in</h4><h1 class="title__big green">${foundedArray[1]}</h1></div><p class="post-infobox post-infobox-p">${foundedArray[6]}</p> <a href="">See more imagies</a> <br> <br> <a class="closePostBTN">Close me</a></div></div></div></div>`
            doc.body.innerHTML += contentPost;



            doc.getElementsByTagName("HEADER")[0].style.display = 'none';
            doc.getElementsByTagName("FOOTER")[0].style.display = 'none';
            doc.getElementsByTagName("SECTION")[0].style.display = 'none';
            doc.getElementsByTagName("SECTION")[1].style.display = 'none';

            function closePost() {
                location.reload();
                // If you want update it: reload only some elements by using JS or HTML
            };
            doc.getElementsByClassName('closePostBTN')[0].addEventListener("click", closePost);
        };
        
        
    };
    
    function loadMore() {
        doc.getElementsByClassName('goods__content')[0].classList.add("sectionMore");
    };
    doc.getElementsByClassName("more__more-btn")[0].addEventListener("click", loadMore);
}



