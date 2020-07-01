var doc = document;

window.onload = function () {
    var loadMoreButton = doc.getElementsByClassName("more__more-btn")[0],
        goodsContent   = doc.getElementsByClassName('goods__content')[0],
        resultJSON = [];

    function loadMore() {
        goodsContent.style.height   = 'auto';
        goodsContent.style.overflow = 'unset';
    }

    loadMoreButton.addEventListener("click", loadMore);

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
        paste(data.feed.entry, data.feed.entry.length);
    }); 


    function paste(_d, l) {
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
              if (idx % 8 === 0) resultJSON.push([])
              resultJSON[resultJSON.length - 1].push(list[idx++])
            }

        };
    };

    console.log(resultJSON);
}



