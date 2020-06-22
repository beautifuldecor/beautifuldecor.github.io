var doc = document;

window.onload = function () {
    var loadMoreButton = doc.getElementsByClassName("more__more-btn")[0],
        goodsContent   = doc.getElementsByClassName('goods__content')[0];

    function loadMore() {
        goodsContent.style.height   = 'auto';
        goodsContent.style.overflow = 'unset';
    }

    loadMoreButton.addEventListener("click", loadMore);
}