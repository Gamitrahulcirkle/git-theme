$(document).ready(function(){ 
  $(".mobile-toggle").click(function(k){
    k.preventDefault();
    $(this).toggleClass("active");
    $(".mobile-nav").toggleClass("active");
    $('body,html').toggleClass('scrollno');
  });   
  $(".close-menu").click(function(k){
    k.preventDefault();
    $('.mobile-toggle').removeClass("active");
    $(".mobile-nav").removeClass("active");
    $('body,html').removeClass('scrollno');
  });    
    $('.menu-has-item').mouseenter(function() {
        $('body').addClass("show-megamenu scrollno");
    }).mouseleave(function () {
        $('body').removeClass("show-megamenu scrollno");
    }); 
  /********* On scroll heder Sticky *********/
  $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if (scroll >= 50) {
          $("header").addClass("head-sticky");
      } else {
          $("header").removeClass("head-sticky");
      }
  });
  //END
  /******* Accordian JS *******/
    function close_accordion_section() {
        jQuery('.accordion .accordion-title').removeClass('active');
        jQuery('.accordion .accordion-content').slideUp(300).removeClass('open');
    } 
    jQuery('.accordion-title').click(function (e) {
        // Grab current anchor value
        var currentAttrValue = jQuery(this).attr('href');
        if (jQuery(e.target).is('.active')) {
            close_accordion_section();
        } else {
            close_accordion_section();
            // Add active class to section title
            jQuery(this).addClass('active');
            // Open up the hidden content panel
            jQuery('.accordion ' + currentAttrValue).slideDown(300).addClass('open');
        }
        e.preventDefault();
    });  
    //FAQ ACCORDIAN
   $(document).on("click", ".set > a", function(){    
        if ($(this).hasClass("active")) {
            $(this).toggleClass("active");
            $(this).siblings(".content").slideToggle(200);
        } else { 
            $(this).toggleClass("active");
            $(this).siblings(".content").slideToggle(200);
        }
    });
    $('ul.tabs li').click(function(){
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('active');
        $('.tab-content').removeClass('active');
        $(this).addClass('active');
        $("#"+tab_id).addClass('active');
        $('.home-collection-slider').slick('refresh');

        /* On tab change category bundle products manage */      
        $(".bundle-product-step ").removeClass("active-bundle-step");      
        $("#"+tab_id).find(".step_1").addClass("active-bundle-step");
        $("#"+tab_id).find(".select_bundle_product").prop('checked', false);
        let findSteps = $("#"+tab_id).find(".next_step");
      
        if( typeof findSteps !="undefined" && findSteps != ""){
          findSteps.prop('disabled', true);
        }        
    })
     function addToCartSuccess() {
        // $.get( "/cart?view=mini", function( data ) {
        // $('#crt').html(data);
        $('#crt').removeClass('loading');
        // });
    }
    function refreshCart(cart) {
        $('.cart-count').text(cart.item_count);
    }
  
    $('body').on('click','.buttonAddtoCart',function(e){
        e.preventDefault();
        $('.productGrid .productItem').removeClass('qvopen');
        $('body').addClass('cartOpen');
        $('.fullPage').addClass('witmenu');
    });
  
    $('body').on('click','.fullPage.witmenu, .closemenu, .closecart', function(e){
        e.preventDefault();
        $('body').removeClass('menuOpen');
        $('.fullPage').removeClass('witmenu');
        $('body').removeClass('cartOpen');
    });
  
    $('.cart-btn').on('click',function(e){
        e.preventDefault();
        setTimeout(function(){
        $('body').addClass('cartOpen');
        $('.fullPage').addClass('witmenu');
        }, 50);
    });
  
    // $("#crt").on('click', "a.remove_item", function(r){
    //     $('#crt').addClass('loading');
    //     r.preventDefault();
    //     // var id = $(this).data("id");
    //     $(this).parents('.quick-cart-item').remove();
    //     $('.itemCount').text($('.cartDrawer .quick-cart-item').length );
    //     if($('.cartDrawer .quick-cart-item').length == 0) {
    //         $('#crt').empty();
    //         $('#crt').append('<p class="emptyCart text-center">You have no items in your shopping cart.</p>');
    //         $('#crt').removeClass('has-item');
    //         $('#crt').removeClass('loading');
    //     } else {
    //         addToCartSuccess();
    //     }
    //     // $.getJSON("/cart.js", function(cart) {
    //     //   refreshCart(cart);
    //     // });
    // });  
  
    var header_hright = $('header').outerHeight();  
    $('#shopify-section-header').next('.wrapper').css('margin-top', header_hright + 'px');    
     $('.our-fav-main-slider').slick({
        slidesToShow: 2,
        infinite: false,
        arrows: false, 
        variableWidth:false,
        asNavFor: '.our-fav-nav',
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1, 
                }
            }
        ]
    });
    $('.our-fav-nav').slick({
        slidesToShow:3, 
        asNavFor: '.our-fav-main-slider',
        dots: false,
        arrows: false, 
        infinite: false,
        focusOnSelect: true
    }); 
    $('a[data-slide]').click(function(e) {
        e.preventDefault();
        var slideno = $(this).data('slide');
        $('.our-dav-nav').slick('slickGoTo', slideno - 1);
    });
    if($('.home-collection-slider').length > 0 ){
        $('.home-collection-slider').slick({
            rows: 2,
            dots: false,
            arrows: true,
            infinite: true,
            speed: 800,
            slidesToShow: 4,
            slidesToScroll: 4, 
            responsive: [
            {
                breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        arrows: false,
                        dots:true
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
                } 
            ]
        });
    } 
   if($('.pdp-collection').length > 0 ){
        $('.pdp-collection').slick({
            autoplay: false, 
            infinite: false,
            slidesToShow: 2,
            slidesToScroll: 1,  
            arrows: true,
            dots: false,
            buttons: false,
            prevArrow: $('.prev'),
           nextArrow: $('.next'),
            responsive: [   
                {
                breakpoint: 576,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1 
                    }
                }
            ] 
        });
    }
    if($('.home-fab-slider').length > 0 ){
        $('.home-fab-slider').slick({
            autoplay: false, 
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,  
            arrows: true,
            dots: false,
            buttons: false,
            responsive: [  
                {
                breakpoint: 576,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1 
                    }
                }
            ] 
        });
    }
    
    if($('.brushed-cotton-slider').length > 0 ){
        $('.brushed-cotton-slider').slick({
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
        });
    }
    if($('.review-slider').length > 0 ){
        $('.review-slider').slick({
            autoplay: false,
            centerMode: false,
            slidesToShow: 2,
            slidesToScroll: 1,  
            arrows: true,
            dots: false,
            buttons: false,
            responsive: [  
                {
                breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 2,
                        arrows: false,
                        dots:true
                    }
                } 
            ]
        });
    }
      
  /* Collection page product sorting js:Start */
    // Shopify.queryParams = {};
    // if (location.search.length) {
    //   var params = location.search.substr(1).split('&');
      
    //   for (var i = 0; i < params.length; i++) {
    //     var keyValue = params[i].split('=');
        
    //     if (keyValue.length) {
    //       Shopify.queryParams[decodeURIComponent(keyValue[0])] = decodeURIComponent(keyValue[1]);
    //     }
    //   }
    // }  
    
    // $(document).on('change', '#sort-by', function(){
    //   let value = $(this).val();
    //   Shopify.queryParams.sort_by = value;
    //   location.search = new URLSearchParams(Shopify.queryParams).toString();
    // })
  
  /* End */  
});  

/*qty spinner start here*/
  (function ($) {
    // Efeito spinner sem plugin - pagina carrinho - increment
    // var quantity = 0;
    // $('.quantity-increment').click(function(){
    //   var t = $(this).siblings('.quantity');
    //   var variant_id = $(this).attr("data-variant_id");
    //   var quantity = parseInt($(t).val());      
    //   $(t).val(quantity + 1); 
    //   updateLineItemQty(variant_id, quantity ); // calling line nub: 
    // });
    // // Efeito spinner sem plugin - pagina carrinho - decrement
    // $('.quantity-decrement').click(function(){
    //   var t = $(this).siblings('.quantity');
    //   var variant_id = $(this).attr("data-variant_id");
    //   var quantity = parseInt($(t).val());
    //   if(quantity > 1){
    //     $(t).val(quantity - 1);
    //   }
    //   updateLineItemQty(variant_id, quantity );
    // });

    // function updateLineItemQty(variant_id , qty){     
    //   $.ajax({
    //     type: 'POST',
    //     url: '/cart/change.js',
    //     dataType: 'json',
    //     data: { quantity: qty, id: variant_id },
    //     success: renderCartData,
    //     error: 
    //   })
    // }
  })(jQuery);

/*qty spinner end here*/ 

/*pdp one page scroll script start here*/ 
// document.querySelectorAll('.product-image-link[href^="#"]').forEach(anchor => {
//   var headeroffset = $("header").height();
//   console.log( anchor );
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log( $(this.getAttribute('href')) );
//     console.log( $(this.getAttribute('href'))[0] );
//     $(this.getAttribute('href'))[0].scrollIntoView({
//       top: headeroffset,
//       behavior: 'smooth'
//     });
//   });
// });

$('.product-image-link').on('click', function(e) {
  e.preventDefault();
  var headeroffset = $("header").height();
  let element = $(this).attr("href");
  scrollImage(element, headeroffset);
});

const scrollImage = function(element, hoff){
  $(element)[0].scrollIntoView({
    top: hoff,
    behavior: 'smooth'
  });
}
/*pdp one page scroll script end here*/ 
  
$(window).on('scroll', function() {
  /*sticky product-detail add to cart start here*/
  if( $('.pdp-qty-add-box').length > 0 ){
    var fixmeTop = $(".pdp-qty-add-box").offset().top;
      $(window).scroll(function() {
        $(window).scrollTop() >= fixmeTop ? $(".main-add-to-cart-btn").addClass("sticky-menu") : $(".main-add-to-cart-btn").removeClass("sticky-menu")
      });      
  }
  /*sticky product-detail add to cart end here*/
});

//mobile fitst slick with window reload
$(window).on('load resize orientationchange', function() {
    $('.mobile_slider').each(function() {
        var $mobile_slider = $(this);
        /* Initializes a slick carousel only on mobile screens */
        // slick on mobile
        if ($(window).width() > 768) {
            if ($mobile_slider.hasClass('slick-initialized')) {
                $mobile_slider.slick('unslick');
            }
        } else {
            if (!$mobile_slider.hasClass('slick-initialized')) {
                $mobile_slider.slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    mobileFirst: true,
                    infinite: true,
                    arrows: false,
                    dots:true,
                    touchThreshold: 100,
                    swipeToSlide: true,
                    waitForAnimate: false,
                });
            }
        }
    });
  //END 
});


/* product add to cart quick view js : Start */
$(document).ready(function(){
  /* Quick product add to cart : Start */
  //Qty update
  $("body").on("click",".quantity-increment",function() {
    let t = $(this).siblings('.quantity');
    let variant_id = $(this).attr("data-item_key");
    let quantity = parseInt($(t).val());
    
    $(t).val(quantity + 1);
    quantity = quantity + 1;
    updateLineItemQty(variant_id, quantity ); // calling line nub: 223
  });

  $("body").on("click",".quantity-decrement",function() {
    let t = $(this).siblings('.quantity');
    let variant_id = $(this).attr("data-item_key");
    let quantity = parseInt($(t).val());
    if(quantity > 1){
      $(t).val(quantity - 1);
    }
    quantity = quantity - 1;
    updateLineItemQty(variant_id, quantity ); // calling line nub: 223 
  })
  
  // Line item remove
  $("body").on("click", ".remove_item", function(){
    var propertyValue = $(this).data("item_property_value"); 
    
    /*Remove bundle products from cart */
    if($(this).hasClass("Bundle_pack") ){
      var qtyArr = {
        updates: []
      }
      
      if( $(this).closest(".mini-cart-item").length > 0 ){
        $(".mini-cart-item").each(function(index, element){
          if( $(element).find(".bdl_"+propertyValue).length > 0 ){
            let itemLineqty = 0;
            qtyArr.updates.push(itemLineqty);
          }else{
            let itemLineqty = parseInt( $(element).find(".quantity").val() );
            qtyArr.updates.push(itemLineqty);
          }
        })
        
        if( qtyArr.updates.length > 0 ){
          $.ajax({
            type: 'POST',
            url: '/cart/update.js',
            dataType: 'json',
            data: qtyArr,
            success: renderCartData,
            error: addToCartFail
          })
        }
      }
    }else{
      let variant_id = $(this).attr("data-item_key");
      let quantity = 0;
      updateLineItemQty(variant_id, quantity ); 
    }          
  })
  
  // Add to cart 
  $("body").on("click",".js-add-to-cart", function(e){
    e.preventDefault();
    let variantId = $(this).attr('data-product_variantId');
    
    if( typeof variantId !=="undefined" && variantId !="" ){     
      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: { "id": variantId, "quantity": 1 },
        success: addToCartOk,
        error: addToCartFail
      });
    }
  });

  //Line item Checkout
  $("body").on("click", "#CartDrawer-Checkout", function(){
    $("#CartDrawer-Form").submit()
  })
  function addToCartOk(data){ 
    console.log("data");
    openCartDrawer();
    renderCartData();
  }
  
  function updateLineItemQty(variant_id , qty){    
    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      dataType: 'json',
      data: { "quantity":qty, "id":variant_id },
      success: renderCartData,
      error: addToCartFail
    })
  }
  
  function openCartDrawer(){  
    $('body').removeClass("quickViewOpen");
    $('.overlay').removeClass("quickViewOpen");
    $(".quick-view-modal").removeClass("open");
    $('.cart-btn').trigger('click');
  }
  
  function renderCartData() {
    $(".cart-error-msg").html(" ");
    if (window.location.pathname === '/cart') { 
      $.get(`/cart?section_id=main-cart`, function(data) {       
        const cartSelectors = ['.main-cart-footer','.main-cart-body','.cart-count-bubble']
          
          for ( const cartselector of cartSelectors ){            
            const cartTargetElement = $(cartselector);
            const cartSourceElement = $(data).find(cartselector).html();
            
            if (cartTargetElement && cartSourceElement) {
              cartTargetElement.html(cartSourceElement);
            }

            if( cartselector === '.cart-count-bubble' ){              
              $("#cart-count-bubble").html(cartSourceElement)
            }
          } 
      })
      
    }else{
      $.get(`/cart?section_id=cart-drawer`, function(data) {        
        const selectors = ['.cart-tottl-itm','.mini-cart-body','.mini-cart-footer','.cart-count-bubble'];  
          for ( const selector of selectors ){             
            const TargetElement = $(selector);
            const SourceElement = $(data).find(selector).html();
            
            if (TargetElement && SourceElement) {
              TargetElement.html(SourceElement);
            }

            if( selector === '.cart-count-bubble' ){              
              $("#cart-count-bubble").html(SourceElement)
            }
          } 
      })
    }
  }
  function addToCartFail(res){
    if( res.responseJSON.status != "bad_request" ){
      $(".cart-error-msg").html(res.responseJSON.description); 
      cartItems();
    }   
  }
  function cartItems(){
    $.getJSON(`/cart.js`, function(data){
      $("#cart-count-bubble").html(data.item_count)      
    });
  }
  /* line 163 : End */
  
  /* bundle product variant change */
  $("body").on("change",".bundle_variant", function(){
    let vId = $(this).val()
    $(this).closest('.bundal-item').find('.bundal-cheack').val(vId)   
  })
  
  /* single product page add to cart */
  $("body").on("click", ".main-add-to-cart-btn", function(e){
    e.preventDefault();
    var productId = $('.product-variant-id').val();
    var p_qtv = parseInt( $('.quantity').val() );
    
    if( typeof p_qtv ==="undefined" && p_qtv =="" ){
      p_qtv = 1;
    }
    var data = {
      items: []
    };
    var mainproduct = {};
      mainproduct['id'] = productId;
      mainproduct['quantity'] = p_qtv;   
      data.items.push(mainproduct);      
    
    if($("#html").prop('checked') == true){
       //var ranNum = Math.floor(1000 + Math.random() * 9000);
      $('.bundal-item').each(function () {
        var bundleData = {}; 
        var get_id = $(this).find('input[name="check"]:checked').val();
        var get_quantity = 1;
       
        if( typeof get_id !=="undefined" && get_id !="" ){ 
          // let properties = {
          //   "bundle_product" : ranNum
          // }
          bundleData['id'] = get_id;
          bundleData['quantity'] = get_quantity;
          //bundleData['properties'] = properties;
          data.items.push(bundleData);
        }        
      });
    }
    
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      dataType: 'json',
      data: data,
      success: addToCartOk,
      error: addToCartFail
    });    
  })
  
  $('body').on("click", ".closequickview, .quickViewOpen", function(){
    $('body').removeClass("quickViewOpen");
    $('.overlay').removeClass("quickViewOpen");
    $(".quick-view-modal").removeClass("open");
  })
  
  $('body').on("click", ".js-quickview", function(){
    
    let handle = $(this).data("product_handle");
    $('body').addClass("quickViewOpen");    
    $('.overlay').addClass("quickViewOpen");
    $(".quick-view-modal").addClass("open");
    
    if( typeof handle !=="undefined" && handle !=""){
      $.get(`/products/${handle}?view=quick-view`, function(data){
        $(".quick-view-modal").html(data);
        if( $('.quick-view-img').length > 0 || $('.quick-view-thumb').length ){
          
          $('.quick-view-thumb').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true
          });          
        }
      })
    }    
  }); 

  /* Predictive search */
  $(".js-search").on('input', function() {
    
    let searchTerm = $(this).val();
    if( searchTerm ){
      $('body').addClass("prediactiveSeachOpen");    
      // $('.overlay').addClass("quickViewOpen");
      $(this).closest(".search-form").find('.search_result_close').addClass("show");
      $(this).closest(".search-form").find(".prediactive_search").addClass("open");
    }else{
      $('body').removeClass("prediactiveSeachOpen");
      $(this).closest(".search-form").find(".prediactive_search").removeClass("open");
      $(this).closest(".search-form").find('.search_result_close').removeClass("show");
    }
    $.get(`/search/suggest?q=${searchTerm}&section_id=prediactive-search`, function(data){
      $(".prediactive_search").html( $(data).html() )
    })    
  })
  
  /* Search form submit on enterKey click : Start */
  $('body').on("keypress", "form.main-search-form", function(e){
    if( e.keyCode === 13 ){
      e.preventDefault();
      $(this).submit();
    }
  })
  
  $('body').on("keypress", "form.header-search-form", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $(this).submit();
    }
  });
  /* Search form submit on enterKey click : End */
  
  // $('.js-search').keydown(function(e) {
    
  //   let searchTerm = $(this).val();
  //   console.log( searchTerm );
  //     if (e.keyCode == 13) {
  //       $('.search-form').submit();
  //     }
  //   });
  
  $("body").on("click", ".prediactiveSeachOpen", function(e){
    e.preventDefault();
    $(this).find(".prediactive_search").removeClass("open");
    $(this).find('.search_result_close').removeClass("show");
  })
  
  $(".search_result_close").on("click", function(e){
    e.preventDefault();
     $(this).closest(".search-form").find(".prediactive_search").removeClass("open");
     $(this).closest(".search-form").find('.search_result_close').removeClass("show");
    $(".js-search").val("");
  })


  /* Bundle products */
  
  $("body").on("click", ".steps", function(){
    let setepIndx = $(this).attr("data-index");
    
    $(this).closest(".tab-content").find(".bundle-product-step").removeClass("active-bundle-step");
    $(this).closest(".tab-content").find(".step_"+setepIndx).addClass("active-bundle-step");    
  })

  $("body").on("click", ".select_bundle_product", function(){ 
    var $this = $(this);
    var btnEnable = false;
    
    if( $this.closest(".bundle_product_lists").find(".product-details").length > 0 ){
       $this.closest(".bundle_product_lists").find(".product-details").each(function(i, element) {
        let checkedFind = $( element ).find(".select_bundle_product").prop('checked');         
        if( checkedFind ){
          btnEnable = true;
        }
      })
    }      
    if( btnEnable ){ 
       $(this).closest(".bundle-product-step").find(".next_step").prop('disabled', false); 
    }else{
      $(this).closest(".bundle-product-step").find(".next_step").prop('disabled', true);
    }    
  })

  $("body").on("click", ".final_step", function(){   //This event trigger on tab change line: 66 to 68   
    var bdlProductArr = [];
    var money_format = $(this).attr('data-money_format');    
    let setepIndx = $(this).attr("data-index");
    
    $(this).closest(".tab-content").find(".bundle-product-step").removeClass("active-bundle-step");
    $(this).closest(".tab-content").find(".step_"+setepIndx).addClass("active-bundle-step");
    $(".js-bundle-product-list").empty();    
    
    if( $(this).closest(".tab-content").find(".select_bundle_product").length > 0 ){
      $(this).closest(".tab-content").find(".select_bundle_product").each(function(){
        if ($(this).prop('checked')==true){
          let element= {};
          let productHandle = $(this).attr("data-product_handle");
          let variantId = $(this).val();
          
          element['id'] = variantId;
          element['handle'] = productHandle;
                
          bdlProductArr.push(element);         
        }
      })
    }

    if( bdlProductArr.length > 0 ){
      bdlProductArr.forEach(function(itm, inx){
        if( itm['id'] !="" && itm['handle'] ){
          $.get(`/products/${itm['handle']}?variant=${itm['id']}&view=bundle-product-lists`, function(data){
            $(".js-bundle-product-list").append(data);
          })
        }
      })
    }
  })

  /*On custom page(bundle-product) bundle products add to cart */
  $("body").on("click", ".js-bundle-product-add", function(e){
    e.preventDefault();
    
    var ranNum = Math.floor(1000 + Math.random() * 9000);    
    var bdlData = {
      items: []
    };
    
    if( $(this).closest(".bundle-product-step").find(".select_bundle_product").length > 0 ){
      $(this).closest(".bundle-product-step").find(".select_bundle_product").each(function(){        
        if ($(this).prop('checked')==true){
          let bndlEle= {};
          let productHandle = $(this).attr("data-product_handle");
          let variantId = $(this).val();
          let properties = {
            "_Bundle_pack" : ranNum
          }
          bndlEle['id'] = variantId;          
          bndlEle['quantity'] = 1;
          bndlEle['properties'] = properties;
          
          bdlData.items.push(bndlEle);         
        }
      })
      
      if( bdlData.items.length > 0 ){
         $.ajax({
          type: 'POST',
          url: '/cart/add.js',
          dataType: 'json',
          data: bdlData,
          success: addToCartOk,
          error: addToCartFail
        });
      }
    }
  })

  /* Product show as color option */
  $('body').on("click",".swatch", function(e){
    e.preventDefault()
    let productHandle = $(this).attr("data-product_handle");
    
    $.get(`/products/${productHandle}?view=product-as-color-swatch`, function(data){
      console.log(data)
      $(".pdp-wrapper").html($(data).find(".pdp-wrapper[data-name='main-product']").html());
      $(".you-may-also-like-section").html( $(data).find(".you-may-also-like-section[data-name='related-products']").html());
      let sliderElement = $(data).find(".you-may-also-like-section[data-name='related-products']").find('.brushed-cotton-slider');
      if($(sliderElement).length > 0 ){
        $(sliderElement).slick({
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
        });
    }
      window.history.pushState('', null, window.location.origin+'/products/'+productHandle);
    })
  })

   //Video section Open modal
    var youtubePlayer, vimeoPlayer, mp4VideoPlayer;
    
    $(".play-btn").click(function () {
      
      var section_id = $(this).data("section_id");
      var videoId = $(this).data("video_id");
      var videoType = $(this).data("video_type");
      var videoUrl = $(this).attr("data-video_url");
      
      $("#youtubePlayer_"+section_id).html(" ");
      
      if( videoType == "youtube" ){
        vimeoPlayer='';
        mp4VideoPlayer='';
        playYoutubeVideo(videoId, section_id)
        
      }else if(videoType == "vimeo"){
        youtubePlayer='';
        mp4VideoPlayer='';
        playVimeoVideo(videoId, section_id)
      }else{
        youtubePlayer='';
        vimeoPlayer='';
        playMp4Video(videoId, videoUrl, section_id)
      }
      if( videoId !="" ){
        $("#customModal_"+section_id).fadeIn();          
      }      
    });

    function playMp4Video(videoId, videoUrl, id){      
      if( typeof videoUrl !="undefined" && videoUrl !="" && typeof id !="undefined" && id !="" ){        
        mp4VideoPlayer = `<video id="videoPlayer_${id}" controls> <source src="${ videoUrl }" type="video/mp4"> </video>`;
        $("#customModal_"+id).find('#youtubePlayer_'+id).html(mp4VideoPlayer);
        $("#customModal_"+id).fadeIn();        
        $('#videoPlayer_'+id)[0].play();
      }      
    }
    
    function playYoutubeVideo(videoId, id){
      youtubePlayer = new YT.Player('youtubePlayer_'+id, {
        videoId: videoId, // YouTube video ID
        playerVars: {
          'autoplay': 1,
          'controls': 0,
        },
        events: {
          'onReady': function (event) {
            event.target.playVideo();
          },
          'onStateChange': function (event) {
            if (event.data === YT.PlayerState.ENDED) {
              // Close modal when the video ends
              $("#customModal_"+id).fadeOut();
            }
          }
        }
      })
    }

   function playVimeoVideo(videoId, id){
     vimeoPlayer = new Vimeo.Player('youtubePlayer_'+id, {
       id: videoId,
       autoplay: true,
     })
     
     // Close modal when the video ends
     vimeoPlayer.on('ended', function () {
       $("#customModal_"+id).fadeOut();
     })
   }

  function closeVimeoVideo(id){    
    if (typeof vimeoPlayer !=="undefined" && vimeoPlayer !="") {
      //vimeoPlayer.pause();
      vimeoPlayer.pause().then(function () {
        vimeoPlayer.destroy();
      })
    }
  }
    
  function closeYoutubeVideo(){
    if ( typeof youtubePlayer !=="undefined" && youtubePlayer !="") {      
      //youtubePlayer.stopVideo();
      youtubePlayer.destroy();
    }
  }

  function closeMp4Video(id){
    if( typeof mp4VideoPlayer !=="undefined" && mp4VideoPlayer !=""){      
      //$('#videoPlayer').get(0).pause().remove();
      $('#videoPlayer_'+id)[0].pause()
    }
  }  
  // Close modal
  $(".close").click(function () {
    let sectionId = $(this).data("section_id");
    closeYoutubeVideo(sectionId);
    closeVimeoVideo(sectionId);
    closeMp4Video(sectionId)
    $("#customModal_"+sectionId).fadeOut();
  })
    
  // Close modal on outside click
  // $("body").click(function (e) {
  //   let sectionId = e.target.id;
  //   let searchString = "customModal_";
  //   console.log( searchString );
  //   console.log( sectionId );
  //   if( sectionId.indexOf(searchString) !== -1 ){
  //     let mainSection = sectionId.split(searchString);
  //     let currentSectionId = searchString+mainSection[1];
      
  //     if (e.target.id === currentSectionId) {
  //       closeYoutubeVideo(mainSection[1]);
  //       closeVimeoVideo(mainSection[1]);
  //       closeMp4Video(mainSection[1]);
  //       $("#"+currentSectionId).fadeOut();
  //     }
  //   }
  // })
})