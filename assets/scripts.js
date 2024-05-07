$(document).ready(function(){
  /* Quick product add to cart : Start */
  //Qty update
  $(document).on("click",".quantity-increment",function() {
    let t = $(this).siblings('.quantity');
    let variant_id = $(this).attr("data-variant_id");
    let quantity = parseInt($(t).val());
    
    $(t).val(quantity + 1);
    quantity = quantity + 1;
    updateLineItemQty(variant_id, quantity ); // calling line nub: 223
  });

  $(document).on("click",".quantity-decrement",function() {
    let t = $(this).siblings('.quantity');
    let variant_id = $(this).attr("data-variant_id");
    let quantity = parseInt($(t).val());
    if(quantity > 1){
      $(t).val(quantity - 1);
    }
    quantity = quantity - 1;
    updateLineItemQty(variant_id, quantity ); // calling line nub: 223 
  })
  
  // Line item remove
  $(document).on("click", ".remove_item", function(){
    let variant_id = $(this).attr("data-variant_id");
    let quantity = 0;
    updateLineItemQty(variant_id, quantity );
  })
  
  // Add to cart 
  $(document).on("click",".js-add-to-cart", function(e){
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
  $(document).on("click", "#CartDrawer-Checkout", function(){
    $("#CartDrawer-Form").submit()
  })
  function addToCartOk(data){    
    openCartDrawer();
    renderCartData();
  }
  
  function updateLineItemQty(variant_id , qty){
    $.ajax({
      type: 'POST',
      url: '/cart/change.js',
      dataType: 'json',
      data: { quantity: qty, id: variant_id },
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
      
      // fetch(`/cart?section_id=main-cart`)
      //   .then((response) => response.text())
      //   .then((resText) => {          
      //     const cartHtml = new DOMParser().parseFromString(resText, 'text/html');          
      //     const cartSelectors = ['.main-cart-footer','.main-cart-body','.cart-count-bubble']
          
      //     for ( const cartselector of cartSelectors ){         
      //       const cartTargetElement = document.querySelector(cartselector);
      //       const cartSourceElement = cartHtml.querySelector(cartselector); 
            
      //       if (cartTargetElement && cartSourceElement) {
      //         cartTargetElement.replaceWith(cartSourceElement);
      //       }

      //       if( cartselector === '.cart-count-bubble' ){              
      //         document.querySelector("#cart-count-bubble").innerHTML = cartSourceElement.innerHTML;
      //       }
      //     }          
      //   }).cath((e) => {
      //     console.error(e);
      //   });
      
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
      
      // fetch(`/cart?section_id=cart-drawer`)
      //   .then((response) => response.text())
      //   .then((responseText) => {
      //     const html = new DOMParser().parseFromString(responseText, 'text/html');
      //     const selectors = ['.cart-tottl-itm','.mini-cart-body','.mini-cart-footer','.cart-count-bubble'];
          
      //     for (const selector of selectors) {
      //       const targetElement = document.querySelector(selector);
      //       const sourceElement = html.querySelector(selector);
            
      //       if (targetElement && sourceElement) {
      //         targetElement.replaceWith(sourceElement);
      //       }
            
      //       if( selector === '.cart-count-bubble' ){
      //         document.querySelector("#cart-count-bubble").innerHTML = sourceElement.innerHTML;
      //       }
      //     }
      //   }).catch((e) => {
      //     console.error(e);
      //   });
    }
  }
  function addToCartFail(){
    console.log("Error");
  }
  
  /* line 163 : End */
  /* bundle product variant change */
  $(document).on("change",".bundle_variant", function(){
    let vId = $(this).val()
    $(this).closest('.bundal-item').find('.bundal-cheack').val(vId)
   
  })  

  
  /* single product page add to cart */
  $(document).on("click", ".add-to-cart-btn", function(e){
    e.preventDefault();
    var productId = $('.product-variant-id').val();
    var p_qtv = $('.quantity').val();
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
       var ranNum = Math.floor(1000 + Math.random() * 9000);
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
    //console.log( data );
  })
  $('body').on("click", ".closequickview", function(){
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
          
          // $('.quick-view-thumb').slick({
          //   slidesToShow: 1,
          //   slidesToScroll: 1,
          //   asNavFor: '.quick-view-img',
          //   dots: true,
          //   centerMode: false,
          //   focusOnSelect: true
          // });
        }
      })
    }    
  });
  
  // $(document).on("click", ".color-chekbox li label, .box-radio label", function(){
  //   $(this).siblings('input[type="radio"]').prop('checked', true);
  //   var form_inputs = $('.js-product-form__input')    
  //   if( form_inputs.length > 0 ){
  //     form_inputs.each(function(i ,ele){
  //       console.log( "Index =>"+i);
  //       console.log(ele);
  //       console.log($(this));
  //      var input = $(this).find('input[type="radio"]:checked').val();
  //       console.log( input );
  //     });
  //   }
  // })
})