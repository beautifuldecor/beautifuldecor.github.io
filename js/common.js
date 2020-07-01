var doc = document;

window.onload = function () {
    var loadMoreButton = doc.getElementsByClassName("more__more-btn")[0],
        goodsContent   = doc.getElementsByClassName('goods__content')[0];

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
        console.log(err, data); 
    })
}



//https://spreadsheets.google.com/feeds/cells/1JhYqoP99niOPAsUNpTLzUj0D9jx1Y3-Dfb_ps5Z3Cms/1/public/full?alt=json
// https://docs.google.com/spreadsheets/d/1JhYqoP99niOPAsUNpTLzUj0D9jx1Y3-Dfb_ps5Z3Cms/edit?alt=json
// https://spreadsheets.google.com/fee ds/list/1JhYqoP99niOPAsUNpTLzUj0D9jx1Y3-Dfb_ps5Z3Cms/od6/public/values?alt=json
// https://docs.google.com/spreadsheets/d/e/2PACX-1vTPxT-Isnte4poBEWx99a02hzBuEj4crGAxWeeAce4y63B5IWdgmqWckf2Fp2JlcbMknQgzslaNAk5s/pubhtml
//// https://docs.google.com/spreadsheets/d/1JhYqoP99niOPAsUNpTLzUj0D9jx1Y3-Dfb_ps5Z3Cms/values?usp=sharing