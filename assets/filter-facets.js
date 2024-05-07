$(document).ready(function(){

  if($('.js-range-slider').length > 0 ){
    var $range = $(".js-range-slider"),
        $from = $(".from"),
        $to = $(".to"),
        range,
        min = $range.data("min"),
        max = $range.data("max"),
        from,
        to;
    var updateValues = function () {
        $from.prop("value", from);
        $to.prop("value", to);
        $("#min_value").val(from);
        $("#max_value").val(to);
        updatePricerange()
    };
    
    $range.ionRangeSlider({
        onChange: function (data) {
            from = data.from;
            to = data.to;
            updateValues();
        }
    });
    range = $range.data("ionRangeSlider");
    var updateRange = function () {
        range.update({
            from: from,
            to: to
        });
    };
    $from.on("input", function () {
        from = +$(this).prop("value");
        if (from < min) {
            from = min;
        }
        if (from > to) {
            from = to;
        }
        updateValues();
        updateRange();
    });
    $to.on("input", function () {
        to = +$(this).prop("value");
        if (to > max) {
            to = max;
        }
        if (to < from) {
            to = from;
        }
        updateValues();
        updateRange();
    });
}

  
  var main_arr = [];  
  var cur_url = $('[data-filter-url]').data('col');
  var section_id = $('[data-filter-url]').data('id');

   function get_data(url, index) {
    $.get(url, function(data) {      
      var html = $(data).find('[data-collection]').html();
      var filter_html = $(data).find('[data-filter-update]').html();
      $('[data-collection]').html(html);
      $('[data-filter-update]').html(filter_html);    
    });
  }
  
  function updatePricerange(){    
    var search_param = [];
    update_filter(search_param);
    
    var get_url = cur_url+'?section_id='+section_id+'&'+main_arr.join('&');    
    if (main_arr != '') {
      history.pushState({ search_param }, '', window.location.pathname+'?'+main_arr.join('&'));
    } else {
      history.pushState({ search_param }, '', window.location.pathname);
    }
    get_data(get_url);
  }
  
  function update_filter(arr) {      
    $('[data-filter-box]:not([data-filter-price-box])').each(function(i, v) {     
      $(v).find('.filter_checkbox input:checked').each(function(j, ele) {        
        var filter_name = $(ele).data('name');
        var filter_value = $(ele).data('value');
        var final = filter_name+'='+filter_value;
       
        if (arr.indexOf(filter_value) == -1 && final.indexOf('undefined') == -1) {
          arr.push(final);
        }
      });
    });  
    
    if( $('#sort-by').val() ){
      var filter_name = 'sort_by';
      var filter_value = $('#sort-by').val();
      var sort_final = filter_name+'='+filter_value;
      arr.push(sort_final);
    }
    
    if( typeof $('#min_value').val() !=="undefined" && $('#min_value').val() !="" && typeof $('#max_value').val() !=="undefined" && $('#max_value').val() !=""){
      var price_value_min = $('#min_value').val();
      var price_value_max = $('#max_value').val();
      var price_final = 'filter.v.price.gte'+'='+price_value_min+'&'+'filter.v.price.lte'+ '='+price_value_max;       
      arr.push(price_final);
      //console.log(arr)
    }      
    main_arr = arr;
  }
  
  $(document).on('change', '#sort-by', function(){
    var search_param = [];
    update_filter(search_param);    
    var get_url = cur_url+'?section_id='+section_id+'&'+main_arr.join('&');    
    if (main_arr != '') {
      history.pushState({ search_param }, '', window.location.pathname+'?'+main_arr.join('&'));
    } else {
      history.pushState({ search_param }, '', window.location.pathname);
    }
    get_data(get_url);
  })
  
  $('body').on('click', '.filter_checkbox input', function() {
    //e.preventDefault();        
    var search_param = [];
    update_filter(search_param); 
    
    var get_url = cur_url+'?section_id='+section_id+'&'+main_arr.join('&');    
    if (main_arr != '') {
      history.pushState({ search_param }, '', window.location.pathname+'?'+main_arr.join('&'));
    } else {
      history.pushState({ search_param }, '', window.location.pathname);
    }
    get_data(get_url);
  });  
});