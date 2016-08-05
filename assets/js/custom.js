////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// jQuery
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function($) {
    "use strict";

    equalHeight('.equal-height');

    $('.nav > li > ul li > ul').css('left', $('.nav > li > ul').width());

    var navigationLi = $('.nav > li');
    navigationLi.hover(function() {
        if ($('body').hasClass('navigation-fixed-bottom')){
            if ($(window).width() > 768) {
                var spaceUnderNavigation = $(window).height() - ($(this).offset().top - $(window).scrollTop());
                if(spaceUnderNavigation < $(this).children('.child-navigation').height()){
                    $(this).children('.child-navigation').addClass('position-bottom');
                } else {
                    $(this).children('.child-navigation').removeClass('position-bottom');
                }
            }
        }
    });

    setNavigationPosition();

    $('.tool-tip').tooltip();

    var select = $('select');
    if (select.length > 0 ){
        select.selectpicker();
    }

    var bootstrapSelect = $('.bootstrap-select');
    var dropDownMenu = $('.dropdown-menu');

    bootstrapSelect.on('shown.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-out');
        dropDownMenu.addClass('animation-fade-in');
    });

    bootstrapSelect.on('hide.bs.dropdown', function () {
        dropDownMenu.removeClass('animation-fade-in');
        dropDownMenu.addClass('animation-fade-out');
    });

    bootstrapSelect.on('hidden.bs.dropdown', function () {
        var _this = $(this);
        $(_this).addClass('open');
        setTimeout(function() {
            $(_this).removeClass('open');
        }, 100);
    });

    select.change(function() {
        if ($(this).val() != '') {
            $('.form-search .bootstrap-select.open').addClass('selected-option-check');
        }else {
            $('.form-search  .bootstrap-select.open').removeClass('selected-option-check');
        }
    });

//  Contact form

    $("#form-contact-submit").bind("click", function(event){
        $("#form-contact").validate({
            submitHandler: function() {
                $.post("assets/php/contact.php", $("#form-contact").serialize(),  function(response) {
                    $('#form-status').html(response);
                    $('#form-contact-submit').attr('disabled','true');
                });
                return false;
            }
        });
    });

//  Fit videos width and height

    if($(".video").length > 0) {
        $(".video").fitVids();
    }

//  Price slider

    var $priceSlider = $("#price-input");
    if($priceSlider.length > 0) {
        $priceSlider.slider({
            from: 1000,
            to: 299000,
            step: 1000,
            round: 1,
            format: { format: '$ ###,###', locale: 'en' }
        });
    }

//  Parallax scrolling and fixed header after scroll

    $('#map .marker-style').css('opacity', '.5 !important');
    $('#map .marker-style').css('bakground-color', 'red');

    $(window).scroll(function () {
        var scrollAmount = $(window).scrollTop() / 1.5;
        scrollAmount = Math.round(scrollAmount);
        if ( $("body").hasClass("navigation-fixed-bottom") ) {
            if ($(window).scrollTop() > $(window).height() - $('.navigation').height() ) {
                $('.navigation').addClass('navigation-fix-to-top');
            } else {
                $('.navigation').removeClass('navigation-fix-to-top');
            }
        }

        if ($(window).width() > 768) {
            if($('#map').hasClass('has-parallax')){
                //$('#map .gm-style > div:first-child > div:first-child').css('margin-top', scrollAmount + 'px'); // old script
                $('#map .gm-style').css('margin-top', scrollAmount + 'px');
                $('#map .leaflet-map-pane').css('margin-top', scrollAmount + 'px');
            }
            if($('#slider').hasClass('has-parallax')){
                $(".homepage-slider").css('top', scrollAmount + 'px');
            }
        }
    });

//  Smooth Navigation Scrolling

    $('.navigation .nav a[href^="#"], a[href^="#"].roll').on('click',function (e) {
        e.preventDefault();
        var target = this.hash,
            $target = $(target);
        if ($(window).width() > 768) {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - $('.navigation').height()
            }, 2000)
        } else {
            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, 2000)
        }
    });

//  Rating

    var ratingOverall = $('.rating-overall');
    if (ratingOverall.length > 0) {
        ratingOverall.raty({
            path: 'assets/img',
            readOnly: true,
            score: function() {
                return $(this).attr('data-score');
            }
        });
    }
    var ratingIndividual = $('.rating-individual');
    if (ratingIndividual.length > 0) {
        ratingIndividual.raty({
            path: 'assets/img',
            readOnly: true,
            score: function() {
                return $(this).attr('data-score');
            }
        });
    }
    var ratingUser = $('.rating-user');
    if (ratingUser.length > 0) {
        $('.rating-user .inner').raty({
            path: 'assets/img',
            starOff : 'big-star-off.png',
            starOn  : 'big-star-on.png',
            width: 150,
            //target : '#hint',
            targetType : 'number',
            targetFormat : 'Rating: {score}',
            click: function(score, evt) {
                showRatingForm();
            }
        });
    }

//  Agent State

    $('#agent-switch').on('ifClicked', function(event) {
        agentState();
    });

    $('#create-account-user').on('ifClicked', function(event) {
        $('#agent-switch').data('agent-state', '');
        agentState();
    });

// Set Bookmark button attribute

    var bookmarkButton = $(".bookmark");

    if (bookmarkButton.data('bookmark-state') == 'empty') {
        bookmarkButton.removeClass('bookmark-added');
    } else if (bookmarkButton.data('bookmark-state') == 'added') {
        bookmarkButton.addClass('bookmark-added');
    }

    bookmarkButton.on("click", function() {
        if (bookmarkButton.data('bookmark-state') == 'empty') {
            bookmarkButton.data('bookmark-state', 'added');
            bookmarkButton.addClass('bookmark-added');
        } else if (bookmarkButton.data('bookmark-state') == 'added') {
            bookmarkButton.data('bookmark-state', 'empty');
            bookmarkButton.removeClass('bookmark-added');
        }
    });

    if ($('body').hasClass('navigation-fixed-bottom')){
        $('#page-content').css('padding-top',$('.navigation').height());
    }

//  Masonry grid listing

    if($('.property').hasClass('masonry')){
        var container = $('.grid');
        container.imagesLoaded( function() {
            container.masonry({
                gutter: 15,
                itemSelector: '.masonry'
            });
        });
        if ($(window).width() > 991) {

            $('.masonry').hover(function() {
                    $('.masonry').each(function () {
                        $('.masonry').addClass('masonry-hide-other');
                        $(this).removeClass('masonry-show');
                    });
                    $(this).addClass('masonry-show');
                }, function() {
                    $('.masonry').each(function () {
                        $('.masonry').removeClass('masonry-hide-other');
                    });
                }
            );

            var config = {
                after: '0s',
                enter: 'bottom',
                move: '20px',
                over: '.5s',
                easing: 'ease-out',
                viewportFactor: 0.33,
                reset: false,
                init: true
            };
            window.scrollReveal = new scrollReveal(config);
        }
    }

//  Magnific Popup

    var imagePopup = $('.image-popup');
    if (imagePopup.length > 0) {
        imagePopup.magnificPopup({
            type:'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            overflowY: 'scroll'
        });
    }

//  iCheck

    if ($('.checkbox').length > 0) {
        $('input').iCheck();
    }

    if ($('.radio').length > 0) {
        $('input').iCheck();
    }

//  Pricing Tables in Submit page

    if($('.submit-pricing').length >0 ){
        $('.btn').click(function() {
                $('.submit-pricing .buttons td').each(function () {
                    $(this).removeClass('package-selected');
                });
                $(this).parent().css('opacity','1');
                $(this).parent().addClass('package-selected');

            }
        );
    }

    centerSearchBox();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On RESIZE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).on('resize', function(){
    setNavigationPosition();
    setCarouselWidth();
    equalHeight('.equal-height');
    centerSlider();
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// On LOAD
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function(){

//  Show Search Box on Map

    $('.search-box.map').addClass('show-search-box');

//  Show All button

    showAllButton();

//  Draw thumbnails in the footer

    drawFooterThumbnails();

//  Show counter after appear

    var $number = $('.number');
    if ($number.length > 0 ) {
        $number.waypoint(function() {
            initCounter();
        }, { offset: '100%' });
    }

    agentState();

//  Owl Carousel

    // Disable click when dragging
    function disableClick(){
        $('.owl-carousel .property').css('pointer-events', 'none');
    }
    // Enable click after dragging
    function enableClick(){
        $('.owl-carousel .property').css('pointer-events', 'auto');
    }

    if ($('.owl-carousel').length > 0) {

        $('.owl-carousel .property').css("display","none");
        if ($('.carousel-full-width').length > 0) {
            setCarouselWidth();
        }
        $(".featured-properties-carousel").owlCarousel({
            items: 5,
            itemsDesktop: [1700,4],
            responsiveBaseWidth: ".featured-properties-carousel",
            pagination: false,
            startDragging: disableClick,
            beforeMove: enableClick
        });
        $(".testimonials-carousel").owlCarousel({
            items: 1,
            responsiveBaseWidth: ".testimonial",
            pagination: true
        });
        $(".property-carousel").owlCarousel({
            items: 1,
            responsiveBaseWidth: ".property-slide",
            pagination: false,
            autoHeight : true,
            navigation: true,
            navigationText: ["",""],
            startDragging: disableClick,
            beforeMove: enableClick
        });
        $(".homepage-slider").owlCarousel({
            autoPlay: 10000,
            navigation: true,
            mouseDrag: false,
            items: 1,
            responsiveBaseWidth: ".slide",
            pagination: false,
            transitionStyle : 'fade',
            navigationText: ["",""],
            afterInit: sliderLoaded,
            afterAction: animateDescription,
            startDragging: animateDescription
        });
    }
    function sliderLoaded(){
        $('#slider').removeClass('loading');
        document.getElementById("loading-icon").remove();
        centerSlider();
    }
    function animateDescription(){
        var $description = $(".slide .overlay .info");
        $description.addClass('animate-description-out');
        $description.removeClass('animate-description-in');
        setTimeout(function() {
            $description.addClass('animate-description-in');
        }, 400);
    }


});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Mobile Slider

function centerSlider(){
    if ($(window).width() < 979) {
        var $navigation = $('.navigation');
        $('#slider .slide').height($(window).height() - $navigation.height());
        $('#slider').height($(window).height() - $navigation.height());

    }
    var imageWidth = $('#slider .slide img').width();
    var viewPortWidth = $(window).width();
    var centerImage = ( imageWidth/2 ) - ( viewPortWidth/2 );
    $('#slider .slide img').css('left', -centerImage);
}

// Set height of the map

function setMapHeight(){
    var $body = $('body');
    if($body.hasClass('has-fullscreen-map')) {
        $('#map').height($(window).height() - $('.navigation').height());
    }
    if($body.hasClass('has-fullscreen-map')) {
        $(window).on('resize', function(){
            $('#map').height($(window).height() - $('.navigation').height());
            var mapHeight = $('#map').height();
            var contentHeight = $('.search-box').height();
            var top;
            top = (mapHeight / 2) - (contentHeight / 2);
            if( !$('body').hasClass('horizontal-search-float') ){
                $('.search-box-wrapper').css('top', top);
            }
        });
    }
    if ($(window).width() < 768) {
        $('#map').height($(window).height() - $('.navigation').height());
    }
}

function setNavigationPosition(){
    $('.nav > li').each(function () {
        if($(this).hasClass('has-child')){
            var fullNavigationWidth = $(this).children('.child-navigation').width() + $(this).children('.child-navigation').children('li').children('.child-navigation').width();
            if(($(this).children('.child-navigation').offset().left + fullNavigationWidth) > $(window).width()){
                $(this).children('.child-navigation').addClass('navigation-to-left');
            }
        }
    });
}

// Agent state - Fired when user change the state if he is agent or doesn't

function agentState(){
    var _originalHeight = $('#agency .form-group').height();
    var $agentSwitch = $('#agent-switch');
    var $agency = $('#agency');

    if ($agentSwitch.data('agent-state') == 'is-agent') {
        $agentSwitch.iCheck('check');
        $agency.removeClass('disabled');
        $agency.addClass('enabled');
        $agentSwitch.data('agent-state', '');
    } else {
        $agentSwitch.data('agent-state', 'is-agent');
        $agency.removeClass('enabled');
        $agency.addClass('disabled');
    }
}

function initCounter(){
    $('.number').countTo({
        speed: 3000,
        refreshInterval: 50
    });
}

function showAllButton(){
    var rowsToShow = 2; // number of collapsed rows to show
    var $layoutExpandable = $('.layout-expandable');
    var layoutHeightOriginal = $layoutExpandable.height();
    $layoutExpandable.height($('.layout-expandable .row').height()*rowsToShow-5);
    $('.show-all').on("click", function() {
        if ($layoutExpandable.hasClass('layout-expanded')) {
            $layoutExpandable.height($('.layout-expandable .row').height()*rowsToShow-5);
            $layoutExpandable.removeClass('layout-expanded');
            $('.show-all').removeClass('layout-expanded');
        } else {
            $layoutExpandable.height(layoutHeightOriginal);
            $layoutExpandable.addClass('layout-expanded');
            $('.show-all').addClass('layout-expanded');
        }
    });

}

//  Center Search box Vertically

function centerSearchBox() {
    var $searchBox = $('.search-box-wrapper');
    var $navigation = $('.navigation');
    var positionFromBottom = 20;
    if ($('body').hasClass('navigation-fixed-top')){
        $('#map, #slider').css('margin-top',$navigation.height());
        $searchBox.css('z-index',98);
    } else {
        $('.leaflet-map-pane').css('top',0); //-50
        $(".homepage-slider").css('margin-top', -$('.navigation header').height());
    }
    if ($(window).width() > 768) {
        $('#slider .slide .overlay').css('margin-bottom',$navigation.height());
        $('#map, #slider').each(function () {
            if (!$('body').hasClass('horizontal-search-float')){
                var mapHeight = $(this).height();
                var contentHeight = $('.search-box').height();
                var top;
                if($('body').hasClass('has-fullscreen-map')) {
                    top = (mapHeight / 2) - (contentHeight / 2);
                }
                else {
                    top = (mapHeight / 2) - (contentHeight / 2) + $('.navigation').height();
                }
                $('.search-box-wrapper').css('top', top);
            } else {
                $searchBox.css('top', $(this).height() + $navigation.height() - $searchBox.height() - positionFromBottom);
                $('#slider .slide .overlay').css('margin-bottom',$navigation.height() + $searchBox.height() + positionFromBottom);
                if ( $('body').hasClass('has-fullscreen-map') ) {
                    $('.search-box-wrapper').css('top', $(this).height() - $('.navigation').height());
                }
            }
        });
    }
}

// Set Owl Carousel width

function setCarouselWidth(){
    $('.carousel-full-width').css('width', $(window).width());
}

// Show rating form

function showRatingForm(){
    $('.rating-form').css('height', $('.rating-form form').height() + 85 + 'px');
}

//  Equal heights

function equalHeight(container){

    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto');
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

//  Creating property thumbnails in the footer

function drawFooterThumbnails(){

    /*
    var i = 0;
    var rows = 1; // how many rows to display, default = 1
    var thumbnailsPerRow = 1; // how many thumbnails per row to display, default = 1

    $.getScript("assets/js/locations.js", function(){
        // Create thumbnail function
        function createThumbnail() {
            for (i = 0; i < rows * thumbnailsPerRow; i++) {
                $('.footer-thumbnails').append("<div class='property-thumbnail'><a href='" + locations[i][5] + "'><img src="  + locations[i][6] + "></a></div>");
                var $thumbnail = $('.footer-thumbnails .property-thumbnail');
                $thumbnail.css('width', 100/thumbnailsPerRow + '%');
            }
        }

        if ($(window).width() < 768) {
            rows = 1;
            thumbnailsPerRow = 5;
            //createThumbnail();
        } else if ($(window).width() >= 768 && $(window).width() < 1199 ) {
            rows = 1;
            thumbnailsPerRow = 10;
            createThumbnail();
        } else if ($(window).width() >= 1200) {
            rows = 1;
            thumbnailsPerRow = 20;
            createThumbnail();
        }
    });
    */
}

var updateIdealista = function(latitude, longitude, radius){

    radius = radius * 2;
    var opts = {
      lines: 8, // The number of lines to draw
      length: 8, // The length of each line
      width: 3, // The line thickness
      radius: 5, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#000', // #rgb or #rrggbb or array of colors
      speed: 1, // Rounds per second
      trail: 50, // Afterglow percentage
      shadow: false, // Whether to render a shadow
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '48px', // Top position relative to parent
      left: '26%' // Left position relative to parent
    };
    var target = document.getElementById('container_idealista');
    self.spinner_idealista = new Spinner(opts).spin(target);

    var status_value = $("#property_status").val();
    var status = 'sale';
    if (status_value == 1)
        status = 'rent'

    $.ajax({
        url: "http://business.thebitisland.com/idealistaapi/"+latitude+"/"+longitude+"/"+radius+"/"+status,
        success: function(myData){
            console.dir(myData);
            $('.owl-wrapper').empty();
            $('.owl-carousel .property').css("display","inline");
            $("#noIdealista").empty();
            $('#apinotworking').remove();
            var i = 0;
            //$.each(myData[1].elementList, function(index, value){
            var max = (myData[1].elementList.length > 4)?5:myData[1].elementList.length
            for (var i = 0; i < max ; i++) {
                value = myData[1].elementList[i];
                console.log(i + ' - ' + value);
                var thumb = (value.thumbnail==="")?'assets/img/dummy.jpg':value.thumbnail;
                var item = '<div class="owl-item" style="width: 381px;"><div style="max-height: 200px;" class="property big">'
                item += '<a href="http://'+value.photosUrl+'">'
                item += '<div class="property-image">'
                item += '<img alt="" src="'+thumb+'">'
                item += '</div>'
                item += '<div class="overlay">'
                item += '<div class="info">'
                item += '<div class="tag price">'+value.price+'€</div>'
                item += '<h3>'+value.address+'</h3>'
                item += '<figure>'+value.neighborhood+'</figure>'
                item += '</div>'
                item += '<ul class="additional-info">'
                item += '<li>'
                item += '<header>Area:</header>'
                item += '<figure>'+value.size+'m<sup>2</sup></figure>'
                item += '</li>'
                item += '<li>'
                item += '<header>Beds:</header>'
                item += '<figure>'+value.rooms+'</figure>'
                item += '</li>'
                item += '<li>'
                item += '<header>Baths:</header>'
                item += '<figure>2</figure>'
                item += '</li>'
                item += '<li>'
                item += '<header>Garages:</header>'
                item += '<figure>0</figure>'
                item += '</li>'
                item += '</ul>'
                item += '</div>'
                item += '</a>'
                item += '</div></div>'

                $('.owl-wrapper').append(item);
            }
            self.spinner_idealista.stop();
        },
        error: function(){
            $('.owl-wrapper').html('<h4>La API de Idealista no está disponible ahora mismo, inténtelo de nuevo más tarde</h4>');
            self.spinner_idealista.stop();
        }
    });

}

var loadFoursquareData = function(lat,lon,query,radius) {

    self.ratings = []
    var xmlhttp;
    var txt,x,i;

    console.log(radius);

    $("#noBusiness").css("display","none");
    var url="https://api.foursquare.com/v2/venues/explore?client_id=LXYDA3DJQAXS1F35ROQVWJTLGNBOYJHJPJZPNWHQ1DMTLJVM&venuePhotos=1&client_secret=CR30J1LYOGBZDCZQ2KQFXC2X4ADDO22SNXZO2HRDIGOBIURE&v=20120609&ll="+lat+","+lon+"&query="+query+"&llAcc=1&radius="+radius;
    console.log(url);
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {

            //var html_intro = "<div class='row'>";
            //var html_final = "</div><!-- /.row-->";
            var body = "";
            var picture_dimension="250x140"
            var stars_5= "<p><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span></p>";
            var stars_4= "<p><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star-empty'></span></p>";
            var stars_3= "<p><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star-empty'></span><span class='glyphicon glyphicon-star-empty'></span></p>";
            var stars_2= "<p><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star-empty'></span><span class='glyphicon glyphicon-star-empty'></span><span class='glyphicon glyphicon-star-empty'></span></p>";
            var stars_1= "<p><span class='glyphicon glyphicon-star'></span><span class='glyphicon glyphicon-star-empty'></span><span class='glyphicon glyphicon-star-empty'></span><span class='glyphicon glyphicon-star-empty'></span><span class='glyphicon glyphicon-star-empty'></span></p>";
            var jsonObj = JSON.parse(xmlhttp.responseText);
            var items = jsonObj.response.groups[0].items;
            var items_length = jsonObj.response.groups[0].items.length;

            console.log(jsonObj.response.groups[0].items);
            var total_iterations;
            var success = false;

            if (items_length > 8) {
                total_iterations = 8;
            } else {
                total_iterations = items_length;
            }
            //console.log(jsonObj.response.groups[0].items.length);

            for (var i = 0; i < total_iterations; i++) {

                var venues = jsonObj.response.groups[0].items[i].venue;
                ///var tips= jsonObj.response.groups[0].items[i].tips;
                //console.log(venues);
                var id = venues.id;
                //console.log(id);
                var location= venues.location;
                var address = location.address;
                var rating = venues.rating;
                var name = venues.name;
                var group_items=venues.photos.groups;

                //console.log(group_items);
                if($.isArray(group_items) && group_items.length > 0){

                   var photo_suffix= venues.photos.groups[0].items[0].suffix;
                   var photo_prefix = "https://irs2.4sqi.net/img/general/";
                   var photo = photo_prefix+picture_dimension+photo_suffix;

                   //console.log(photo);
                   //console.log(tips);
                   //console.log(location);
                   if(rating){
                     self.ratings.push(rating);
                   }
                   var reference = "http://foursquare.com/v/"+id;
                   var stars_rating;

                   if (rating == 10) {
                       stars_rating = stars_5;
                   } else if (rating >= 8 && rating < 10) {
                       stars_rating = stars_4;
                   } else if (rating >= 5 && rating < 8) {
                       stars_rating = stars_3;
                   } else if (rating >= 2 && rating < 5) {
                       stars_rating = stars_2;
                   } else {
                       stars_rating = stars_1;
                   }

                   body += "<div class='col-xs-6' style='margin-bottom:10px;'><div class='property'><a href="+reference+" target='blank'><div class='property-image'><img alt=''src="+photo+"></div><div class='overlay'><div class='info'><h3>"+name+"</h3><div class='tag price'>"+stars_rating+"</div><figure>"+address+"</figure></div></div></a></div><!-- /.property --></div><!-- /.col-xs-6 -->";
                    success = true
                }

            }




            //var final_html= html_intro + body + html_final;
            //console.log(final_html);
            //console.log(self.ratings);

            if(!success)
                body = "<p>No results available in the area =(</p>"

            document.getElementById("foursquare").innerHTML=body;

        }
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function update_wordcloud(text){
    var s = text.split(' '),
        countDict = {}, wordList = [];

    for (var i=s.length; i--;) {
        countDict[s[i]] = (s[i] in countDict) ? countDict[s[i]]+1 : 1;
    }

    for (word in countDict) {
        wordList.push(word)
    }

    d3.layout.cloud().size([document.getElementById("wordcloud_twitter").offsetWidth - 30, 300])
        .words(wordList.map(function(d) {
          return {text: d, size: 10 + countDict[d]/10 * 90};
        }))
        .padding(5)
        .rotate(function() { return ~~(Math.random() * 2) * 90; })
        .font("Impact")
        .fontSize(function(d) { return d.size; })
        .on("end", cloud_draw)
        .start();
}

var fill = d3.scale.category20();

function cloud_draw(words) {
  d3.select("#wordcloud_twitter").html("")
  d3.select("#wordcloud_twitter").append("svg")
      .attr("width", document.getElementById("wordcloud_twitter").offsetWidth - 30)
      .attr("height", 300)
      .style("display","block")
      .style("margin","auto")
    .append("g")
      .attr("transform", "translate(" + (document.getElementById("wordcloud_twitter").offsetWidth - 30)/2 + ",150)")
    .selectAll("text")
      .data(words)
    .enter().append("text")
      .style("font-size", function(d) { return d.size + "px"; })
      .style("font-family", "Impact")
      .style("fill", function(d, i) { return fill(i); })
      .attr("text-anchor", "middle")
      .attr("transform", function(d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function(d) { return d.text; });
}

var searchPlace = function(query, _callback) {
    var xmlhttp;
    var txt,x,i;

    var url="http://nominatim.openstreetmap.org/search?q="+query+"&format=json&polygon=1"
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {

            var jsonObj = JSON.parse(xmlhttp.responseText);
            var items = jsonObj[0];

            self.lon = jsonObj[0].lon;
            self.lat= jsonObj[0].lat;
            //console.log(lon);
            //console.log(lat);
            _callback();

        }
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

var getSearch = function(){

    var search_text = $("#search-box-property-id").val();
    console.log(search_text)

    if (search_text != ""){

        searchPlace(search_text, function() {
            console.log(self.lat + "|" + self.lon)

            try {
                self.map.removeLayer(self.searchposition);
            } catch(err) {}

            var centerPoint = L.latLng(self.lat, self.lon);
            self.searchposition = L.marker(centerPoint);
            self.searchposition.addTo(self.map);
            self.map.panTo(centerPoint);

            updateIdealista(self.lat, self.lon, 0.001);

            var query = $( "#bus_type option:selected" ).text();
            if(query!= "Business type"){

                if(query == "Book store"){
                    query = "librerias";
                }else if(query == "Nursery"){
                    query = "guarderia";
                }else if(query == "Gymnasium"){
                    query = "gimnasio";
                }else if(query == "Shoeshop"){
                    query = "zapateria";
                }else if(query == "Mercadona"){
                    query = "mercadona";
                }else if(query == "Language School"){
                    query = "academia idioma";
                }else if(query == "Burguer King"){
                    query = "Burguer King";
                }
                loadFoursquareData(self.lat, self.lon, query, 2000);
                twitter.getTweets(query);
            }else{
                toastr["warning"]("Add a business type to see related business!", "")
            }


        });

    } else {
        toastr["error"]("Search Box cannot be empty!", "")
    }
}

String.prototype.removeStopWords = function() {
    var x;
    var y;
    var word;
    var stop_word;
    var regex_str;
    var regex;
    var cleansed_string = this.valueOf();

    var stop_words = new Array(
        "a",
        "acá",
        "ahí",
        "ajeno",
        "al",
        "algo",
        "algún",
        "allá/í",
        "ambos",
        "ante",
        "antes",
        "aquel",
        "aquella",
        "aquí",
        "arriba",
        "así",
        "atrás",
        "aun",
        "aunque",
        "bajo",
        "bastante",
        "bien",
        "cabe",
        "cada",
        "casi",
        "cierto",
        "como",
        "con",
        "conmigo",
        "conseguimos",
        "conseguir",
        "consigo",
        "consigue",
        "consiguen",
        "consigues",
        "contigo",
        "contra",
        "cual",
        "cuales",
        "cualquier",
        "cuan",
        "cuando",
        "cuanto",
        "de",
        "dejar",
        "del",
        "demás",
        "demasiada/o/s",
        "dentro",
        "desde",
        "donde",
        "dos",
        "el",
        "él",
        "ella/o/s",
        "empleáis",
        "emplean",
        "emplear",
        "empleas",
        "empleo",
        "en",
        "encima",
        "entonces",
        "entre",
        "era/s",
        "eramos",
        "eran",
        "eres",
        "es",
        "esa/e/o/s",
        "esta/s",
        "estaba",
        "estado",
        "estáis",
        "estamos",
        "están",
        "estar",
        "este/o/s",
        "estoy",
        "etc",
        "fin",
        "fue",
        "fueron",
        "fui",
        "fuimos",
        "gueno",
        "ha",
        "hace/s",
        "hacéis",
        "hacemos",
        "hacen",
        "hacer",
        "hacia",
        "hago",
        "hasta",
        "incluso",
        "intenta/s",
        "intentáis",
        "intentamos",
        "intentan",
        "intentar",
        "intento",
        "ir",
        "jamás",
        "junto/s",
        "la",
        "lo",
        "los",
        "las",
        "largo",
        "más",
        "me",
        "menos",
        "mi",
        "mis",
        "mía",
        "mías",
        "mientras",
        "mío",
        "míos",
        "misma/o/s",
        "modo",
        "mucha",
        "muchísima/o/s",
        "mucho",
        "muchos",
        "muy",
        "nada",
        "ni",
        "ningún/a/o/s",
        "no",
        "nos",
        "nosotras/os",
        "nuestra/o/s",
        "nunca",
        "os",
        "otra/o/s",
        "para",
        "parecer",
        "pero",
        "poca/o/s",
        "podéis",
        "podemos",
        "poder",
        "podría/s",
        "podríais",
        "podríamos",
        "podrían",
        "por",
        "por qué",
        "porque",
        "primero",
        "puede/n",
        "puedo",
        "pues",
        "que",
        "qué",
        "querer",
        "quién/es",
        "quienesquiera",
        "quienquiera",
        "quizá/s",
        "sabe/s/n",
        "sabéis",
        "sabemos",
        "saber",
        "se",
        "según",
        "ser",
        "si",
        "sí",
        "siempre",
        "siendo",
        "sin",
        "sino",
        "so",
        "sobre",
        "sois",
        "solamente",
        "solo",
        "sólo",
        "somos",
        "soy",
        "sr",
        "sra",
        "sres",
        "sta",
        "su/s",
        "suya/o/s",
        "tal/es",
        "también",
        "tampoco",
        "tan",
        "tanta/o/s",
        "te",
        "tenéis",
        "tenemos",
        "tener",
        "tengo",
        "ti",
        "tiempo",
        "tiene",
        "tienen",
        "toda/o/s",
        "tomar",
        "trabaja/o",
        "trabajáis",
        "trabajamos",
        "trabajan",
        "trabajar",
        "trabajas",
        "tras",
        "tú",
        "tu",
        "tus",
        "tuya/o/s",
        "último",
        "ultimo",
        "un/a/o/s",
        "usa/s",
        "usáis",
        "usamos",
        "usan",
        "usar",
        "uso",
        "usted/es",
        "va/n",
        "vais",
        "valor",
        "vamos",
        "varias/os",
        "vaya",
        "verdadera",
        "vosotras/os",
        "voy",
        "vuestra/o/s",
        "y",
        "ya",
        "yo"
    )

    // Split out all the individual words in the phrase
    words = cleansed_string.match(/[^\s]+|\s+[^\s+]$/g)

    // Review all the words
    for(x=0; x < words.length; x++) {
        // For each word, check all the stop words
        for(y=0; y < stop_words.length; y++) {
            // Get the current word
            word = words[x].replace(/\s+|[^a-z]+/ig, "");   // Trim the word and remove non-alpha

            // Get the stop word
            stop_word = stop_words[y];

            // If the word matches the stop word, remove it from the keywords
            if(word.toLowerCase() == stop_word) {
                // Build the regex
                regex_str = "^\\s*"+stop_word+"\\s*$";      // Only word
                regex_str += "|^\\s*"+stop_word+"\\s+";     // First word
                regex_str += "|\\s+"+stop_word+"\\s*$";     // Last word
                regex_str += "|\\s+"+stop_word+"\\s+";      // Word somewhere in the middle
                regex = new RegExp(regex_str, "ig");

                // Remove the word from the keywords
                cleansed_string = cleansed_string.replace(regex, " ");
            }
        }
    }
    return cleansed_string.replace(/^\s+|\s+$/g, "");
}
