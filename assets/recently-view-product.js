$(document).ready(function(){
  //Get & set product handle in localstorage 
  const recentViewedProducts = localStorage.getItem('recently-viewed-products') ? JSON.parse(localStorage.getItem('recently-viewed-products')) : [];
  const productHandle = $(".recently-viewed-products").data("product_handle");
  
  $(".recently-viewed-products").hide();
  if ( recentViewedProducts.length > 0 ) {
    $(".recently-viewed-products").show();
    $.each(recentViewedProducts, function( index, handle ) {
      $.get(`/products/${handle}?view=recently-view-product`, function(data){
        $(".js-recently-view-pdp").append(data);
      })
    })
    
    setTimeout(sliderSetup, 2000);
    function sliderSetup(){
      $('.brushed-cotton-sliderd').slick({
        autoplay: false,
        centerMode: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        buttons: false,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              arrows: false,
              dots:true
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              arrows: false,
              dots:true
            }
          }
        ]
      }) 
    }  
  }
  if (!recentViewedProducts.includes(productHandle)) {
    recentViewedProducts.push(productHandle);
    if (recentViewedProducts.length > 11) {
        recentViewedProducts.pop();
    }
    // Set local storage item
    localStorage.setItem('recently-viewed-products', JSON.stringify(recentViewedProducts));
  }
})