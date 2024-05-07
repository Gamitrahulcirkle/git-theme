$(document).ready(function(){
    var index = 0;
    var productData = [];
    var bundleTotalPrice =0;
  
    $("body").on("click", ".plus_btn", function(e){
        $(this).addClass("qty_increased");
        $(this).closest('.product-btn').removeClass("no-quantity");

        let qty = $(this).closest(".product-btn").find("input[type='number']").val();        
        $(this).closest(".product-btn").find("input[type='number']").val(parseInt(qty)+1);

        addBundleProduct(e, index)
        progressBar()
        index += 1;
    })

    $("body").on("click",".remove_bundle", function(e){
        let Index = $(this).closest(".bundle-builder__selected-product").attr("data-index");
        let productId = $(this).closest(".bundle-builder__selected-product").attr("data-bundle-builder-selected-product-id");
        let productPrice = $(this).closest(".bundle-builder__selected-product").attr("data-bundle-builder-selected-product-price");
        updateQty(productId, Index);
        updateBundlePrice(productPrice,'minus')
        addProductAsBundle(productData);
        progressBar()
    });
    
    $("body").on("click",".minus_btn", function(e){
        let productId = $(this).closest(".product-btn").attr("data-product_id");
        let Index = $(".bundle-builder__selected-product[data-bundle-builder-selected-product-id="+productId+"]").attr("data-index");
        let productPrice = $(".bundle-builder__selected-product[data-bundle-builder-selected-product-id="+productId+"]").attr("data-bundle-builder-selected-product-price");
        updateQty(productId, Index);
        updateBundlePrice(productPrice,'minus')
        addProductAsBundle(productData);
        progressBar()
    });
  
    /*
    * Progress bar
    */
    function progressBar(){
      $(".progress_bar").hide();
      $(".bundle_total").hide();
      $(".lsg-bundle-submit-button").attr("disabled","disabled");
      
      if( productData.length > 0 ){
        $(".progress_bar").show();
        $(".bundle_total").show();
        $(".lsg-bundle-submit-button").removeAttr("disabled");
      }
      /* Progressbar */
      let totalBlock = $(".bundle-product-list").data("total_block");
      console.log( totalBlock );
      let partOf = ( 1/totalBlock)*100;
      var progressBarWidth = (productData.length - 1) * partOf + partOf;
      
      progressBarWidth = Math.min(progressBarWidth, 100);
      console.log( progressBarWidth );
      $(".current_progress").attr("style","background-color: #222f51;transition: width 0.5s ease; width:"+progressBarWidth+'%');       
    }
    /*
    * @ parameter product id  
    * @ type init
    */
    function updateQty(productId=0, Index){
        let inputFind = $(".product-btn[data-product_id="+productId+"]");
        let qty = inputFind.find("input[type='number']").val();
      
        if( qty <= 1 ){
            inputFind.addClass("no-quantity");
            inputFind.find(".plus_btn").removeClass("qty_increased");
        }

        inputFind.find("input[type='number']").val(parseInt(qty)-1);
        productData.splice(Index,1)
    }

    /*
    * @ parameter data
    * @ type array()
    */
    function addProductAsBundle(data=0){
        productData = data;
        $(".plus_btn").removeClass("disabled")
        let totalBlock = $(".bundle-product-list").data("total_block");
      
        /* Disabled button */
        if( productData.length >=totalBlock ){
            $(".plus_btn").addClass("disabled")            
        }
        
        $(".bundle-builder__selected-product").removeClass("active");
        $(".bundle-builder__selected-product").find("img[data-bundle-builder-selected-product-image]").attr('src', "");
        $(".bundle-builder__selected-product").find("[data-bundle-builder-selected-product-title]").text("");
        $(".bundle-builder__selected-product").attr("data-bundle-builder-selected-product-id"," ");
        $(".bundle-builder__selected-product").attr("bundle-builder-selected-product-price"," ");
        
        if( productData.length > 0 ){
            productData.forEach(function(item, inx){              
                let getElement = $(".bundle-builder__selected-product[data-index="+inx+"]");
                if( getElement.length > 0){                    
                    getElement.addClass("active");
                    getElement.find("img[data-bundle-builder-selected-product-image]").attr('src', item[1]);
                    getElement.find("[data-bundle-builder-selected-product-title]").text(item[2]);
                    getElement.attr("data-bundle-builder-selected-product-price", item[3]);
                    getElement.attr("data-bundle-builder-selected-product-id",item[4]);
                }
            })
        }        
    }

   /*
    * Bundle product total price manage
    */
    function updateBundlePrice(productPrice=0, operator){
      if( operator =="plus" ){
        bundleTotalPrice = parseInt( bundleTotalPrice ) + parseInt( productPrice );
        let totalprice = Shopify.formatMoney(bundleTotalPrice, window.SwymOverrideMoneyFormat)
          $(".bundle_total_price").attr("data-totale_price",bundleTotalPrice)
          $(".bundle_total_price").html(totalprice);
          return;
        }
      
        bundleTotalPrice = parseInt( bundleTotalPrice ) - parseInt( productPrice );
        let totalprice = Shopify.formatMoney(bundleTotalPrice, window.SwymOverrideMoneyFormat)
        $(".bundle_total_price").attr("data-totale_price",bundleTotalPrice)
        $(".bundle_total_price").html(totalprice);
    }
  
    /*
    * @ parameter e event and index
    * @ type event type click, index
    */
    function addBundleProduct(e, index){
        let findElement = $(e.target).closest(".col-md-4");
        let productImgSrc = findElement.find(".product-img img").attr("src");
        let productTitle = findElement.find(".product-title").text();
        let productPrice = findElement.find(".product-price").attr("data-product_price");
        let productId = findElement.find(".product-price").attr("data-product_id");
        let productdata = []
       
        productdata.push(index)
        productdata.push(productImgSrc);
        productdata.push(productTitle);
        productdata.push(productPrice);
        productdata.push(productId);
        productData.push(productdata)
      
        updateBundlePrice( productPrice, "plus" );  
        addProductAsBundle( productData ) //Calling function             
    }

   /* Add to cart bundle products */
   $(document).on("click", ".lsg-bundle-submit-button", function(e){
     e.preventDefault();
     
     var bundleDatad = {
       items:[]
     }
     if( $('input[name="id"]').val() ){
       let mainproduct = {};
       
       mainproduct['id'] = $('input[name="id"]').val();
       mainproduct['quantity'] = 1;
       bundleDatad.items.push(mainproduct);       
     }
     
     if( $('.bundle-builder__selected-product').length > 0){
       var ranNum = Math.floor(1000 + Math.random() * 9000);
       
       $('.bundle-builder__selected-product').each(function (index, item) {
        let variantID = $(this).attr("data-bundle-builder-selected-product-id")
        let get_quantity = 1;
        let data = {};
         
        if( variantID.trim() ){
          let properties = {
            "bundle_product" : ranNum
          }
          data['id'] = variantID;
          data['quantity'] = get_quantity;
          data['properties'] = properties;
          bundleDatad.items.push(data);
        }        
      });
    }
    
    if( bundleDatad.items.length > 0 ){
      $.ajax({
        type: 'POST',
        url: '/cart/add.js',
        dataType: 'json',
        data: bundleDatad,
        success: addToCartOk,
        error: addToCartFail
      });
    }

     /* 
     * ajax success callback function 
     */
     function addToCartOk(data){
       openCartDrawer();
       renderCartData();
     }
     
     /* 
     * ajax error callback function 
     */
     function addToCartFail(){
       console.log("Error");
     }
     
     /* 
     * Open cart drawer on form submit
     */     
     function openCartDrawer(){
       $('body').removeClass("quickViewOpen");
       $('.overlay').removeClass("quickViewOpen");
       $(".quick-view-modal").removeClass("open");
       $('.cart-btn').trigger('click');
     }

     /* 
     * Cart line item render in cart drawer after form submit
     */
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
   })
})