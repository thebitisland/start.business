var mapStyles = [{featureType:'water',elementType:'all',stylers:[{hue:'#d7ebef'},{saturation:-5},{lightness:54},{visibility:'on'}]},{featureType:'landscape',elementType:'all',stylers:[{hue:'#eceae6'},{saturation:-49},{lightness:22},{visibility:'on'}]},{featureType:'poi.park',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-81},{lightness:34},{visibility:'on'}]},{featureType:'poi.medical',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-80},{lightness:-2},{visibility:'on'}]},{featureType:'poi.school',elementType:'all',stylers:[{hue:'#c8c6c3'},{saturation:-91},{lightness:-7},{visibility:'on'}]},{featureType:'landscape.natural',elementType:'all',stylers:[{hue:'#c8c6c3'},{saturation:-71},{lightness:-18},{visibility:'on'}]},{featureType:'road.highway',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-92},{lightness:60},{visibility:'on'}]},{featureType:'poi',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-81},{lightness:34},{visibility:'on'}]},{featureType:'road.arterial',elementType:'all',stylers:[{hue:'#dddbd7'},{saturation:-92},{lightness:37},{visibility:'on'}]},{featureType:'transit',elementType:'geometry',stylers:[{hue:'#c8c6c3'},{saturation:4},{lightness:10},{visibility:'on'}]}];

$.ajaxSetup({
    cache: true
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OpenStreetMap - Homepage
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var self = {};
self.layers = [];

function fixZoom(){
    
        console.log("HEY")
        var zoom = self.map.getZoom(),
            x = -4 * (zoom-12) * 2,
            y = 7 * (zoom-12) * 2;

        if (zoom == 12){
            x = -4;
            y = 7;
        } else if(zoom <12){
            x=-4 / ((12-zoom) * 2);
            y=7 / ((12-zoom)* 2);
        } else if(zoom >= 15){
            x = -4 * (zoom-12) * 2.7;
            y = 7 * (zoom-12) * 2.7;
        }

        $(".leaflet-map-pane path").css("transform", "translate3d(" + x + "px, " + y + "px, 0px)");
}

function createHomepageOSM(_latitude,_longitude){
    setMapHeight();
    if( document.getElementById('map') != null ){

        try{
            var map_height = parseInt(window.innerHeight * 0.70)
            if (map_height != 0 && map_height != NaN && map_height != null){
                if (parseInt(map_height) < 400)
                    map_height = 400
                if (parseInt(map_height) > 1000)
                    map_height = 1000
                document.getElementById('map').style.height=map_height+'px'
            }
        } catch(err) {}

        var tweets = twitter.getTweets();
        self.map = L.map('map', {
            center: [_latitude,_longitude],
            zoom: 12,
            maxZoom: 15,
            minZoom: 10,
            scrollWheelZoom: true
        });
        //L.tileLayer('http://openmapsurfer.uni-hd.de/tiles/roadsg/x={x}&y={y}&z={z}', {
            //L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            //subdomains: '0123',
        //    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        //})
        // replace "toner" here with "terrain" or "watercolor"
        new L.StamenTileLayer("toner").addTo(self.map)
        self.map.on('zoomend', function() {
            fixZoom();
        });

        var opts = {
          lines: 9, // The number of lines to draw
          length: 30, // The length of each line
          width: 7, // The line thickness
          radius: 21, // The radius of the inner circle
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
          top: '50%', // Top position relative to parent
          left: '50%' // Left position relative to parent
        };
        var target = document.getElementById('map');
        self.spinner = new Spinner(opts).spin(target);


        //-------------------------------------------------------------------------------------
        // ----------
        // MARKERS

        var addMarkers = function(file, cluster, color, name){
            var markers;
            $.getScript(file, function(){

                if (cluster == false)
                    var zoomLevelCluster = 1;
                else
                    var zoomLevelCluster = 13;

                var iconCreateFunction = function (cluster) {
                    var childCount = cluster.getChildCount();

                    var c = ' ';

                    return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster ' + color + c, iconSize: new L.Point(40, 40) });
                }

                markers = L.markerClusterGroup({
                    showCoverageOnHover: false,
                    disableClusteringAtZoom: zoomLevelCluster,
                    iconCreateFunction: iconCreateFunction
                });

                for (var i = 0; i < locations.length; i++) {

                    if (cluster == true){
                        if ((file == "assets/js/data/locations_guarderia.js") || (file == "assets/js/data/locations_infantil.js" || (file == "assets/js/data/locations_zapato.js")))
                            mHtml = '<i style="font-size:13px; padding-top:7px; padding-left:8px;" class="fa ' + locations[i][3] + '"></i>'
                        else if ((file == "assets/js/data/locations_bking.js") || (file == "assets/js/data/locations_mcdonald.js"))
                            mHtml = '<i style="font-size:13px; padding-top:7px; padding-left:7px;" class="fa ' + locations[i][3] + '"></i>'
                        else
                            mHtml = '<i style="font-size:13px; padding-top:7px; padding-left:6px;" class="fa ' + locations[i][3] + '"></i>'
                    } else {
                        if(locations[i][3]=="metro"){
                            mHtml = '<img style="padding-top:6px;" width="18px" src="./assets/img/metro.png"/>'
                        } else if (locations[i][3]=="renfe") {
                            mHtml = '<img style="padding-top:5px;padding-right:1px" width="13px" src="./assets/img/cercanias.png"/>'
                        } else {
                            mHtml = '<i style="color:red; font-size:13px; padding-top:7px; padding-left:7px;" class="fa ' + locations[i][3] + '"></i>'
                        }
                    }

                    var _icon = L.divIcon({
                        html: mHtml, //'<img src="' + locations[i][7] +'">',
                        iconSize:     [40*0.65, 48*0.65],
                        iconAnchor:   [20*0.65, 48*0.65],
                        popupAnchor:  [0, -48*0.65],
                        className: "leaflet-div-icon "+color
                    });
                    var title = locations[i][0];
                    var marker = L.marker(new L.LatLng(locations[i][2],locations[i][1]), {
                        title: title,
                        icon: _icon
                    });
                    if (name == null) {
                        marker.bindPopup(
                            '<div class="popup_info">' +
                                '<h3>' + locations[i][0].split(" ").slice(1).join(' ') + '</h3>' +
                                '<hr>' +
                                '<h3>' + locations[i][0].split(" ")[0].split(',').join(', ') + '</h3>' +
                            '</div>'
                        );
                    } else {
                        marker.bindPopup(
                            '<div class="popup_info">' +
                                '<h3>' + name + '</h3>' +
                                '<hr>' +
                                '<h3>' + locations[i][0] + '</h3>' +
                            '</div>'
                        );
                    }
                    markers.addLayer(marker);
                }

                if(name != null)
                    self.map.addLayer(markers);
                self.layers.push(markers);
            });
            return markers;
        }

        $('#bus_type').change(function() {
            for (var i = 5; i < self.layers.length; i++) {
                self.map.removeLayer(self.layers[i]);
            }

            if ($(this).val() == 1){
                addMarkers("assets/js/data/locations_libreria.js", true, "red", "LIBRERÍA");
                addMarkers("assets/js/data/locations_bibliotecas.js", true, "green", "BIBLIOTECA MUNICIPAL");
            }
            else if ($(this).val() == 2){
                addMarkers("assets/js/data/locations_guarderia.js", true, "red", "GUARDERÍA");
                addMarkers("assets/js/data/locations_infantil.js", true, "green", "ESCUELA MUNICIPAL INFANTIL");
            }
            else if ($(this).val() == 3){
                addMarkers("assets/js/data/locations_gimnasio.js", true, "red", "GIMNASIO");
                addMarkers("assets/js/data/locations_polideportivos.js", true, "green", "POLIDEPORTIVO MUNICIPAL");
            }
            else if ($(this).val() == 4){
                addMarkers("assets/js/data/locations_academia.js", true, "red", "ACADEMIA");
                addMarkers("assets/js/data/locations_idiomas.js", true, "green", "ESCUELA OFICIAL DE IDIOMAS");
            }
            else if ($(this).val() == 5){
                addMarkers("assets/js/data/locations_zapato.js", true, "red", "ZAPATERÍA");
            }
            else if ($(this).val() == 6){
                addMarkers("assets/js/data/locations_mercadona.js", true, "red", "SUPERMERCADO");
            }
            else if ($(this).val() == 7){
                addMarkers("assets/js/data/locations_bking.js", true, "green", "HAMBURGUESERÍA");
                addMarkers("assets/js/data/locations_mcdonald.js", true, "red", "HAMBURGUESERÍA");
            }

        });

        addMarkers("assets/js/data/renfe.js", false, "blue", null);
        setTimeout(function(){
            addMarkers("assets/js/data/metro.js", false, "blue", null);
        }, 200);
        setTimeout(function(){
            addMarkers("assets/js/data/bicimad.js", false, "blue", null);
        }, 400);
        setTimeout(function(){
            addMarkers("assets/js/data/bus.js", false, "blue", null);
        }, 600);
        setTimeout(function(){
            addMarkers("assets/js/data/aparcamientos.js", false, "blue", null);
        }, 800);


        self.metro = 1;

        self.map.on('zoomend', function(e) {

            if (self.map.getZoom() >= 14) {
                for (var i = 0; i < 5; i++) {
                    if ($.inArray(''+i, self.transport_types) != -1)
                        self.map.addLayer(self.layers[i])
                    else
                        self.map.removeLayer(self.layers[i]);
                }
                self.metro = 1
            } else {
                self.map.removeLayer(self.layers[0]);
                self.map.removeLayer(self.layers[1]);
                self.map.removeLayer(self.layers[2]);
                self.map.removeLayer(self.layers[3]);
                self.map.removeLayer(self.layers[4]);
                self.metro = 0;
            }
        });

        // MARKERS
        // ----------
        //-------------------------------------------------------------------------------------


        //-------------------------------------------------------------------------------------
        // ----------
        // LOCATE MYSELF

        self.map.on('locationfound', function(event){
            $('#map').removeClass('fade-map');
            self.myposition = L.marker(event.latlng);
            self.map.removeLayer(self.myposition);
            self.myposition.addTo(self.map);
        });

        $('.geo-location').on("click", function(event) {
            $('#map').addClass('fade-map');
            self.map.locate({setView : true})
        });

        $('body').addClass('loaded');
        setTimeout(function() {
            $('body').removeClass('has-fullscreen-map');
        }, 1000);
        $('#map').removeClass('fade-map');

        // LOCATE MYSELF
        // ----------
        //-------------------------------------------------------------------------------------


        //-------------------------------------------------------------------------------------
        // ----------
        // CHOROPLETH

        self.geojson;

        self.genreSelectors = ["mujer_ES","hombre_ES","mujer_EX","hombre_EX"]
        self.getSelector = function(){

            var country = $(".checkbox_country:checked").map(function(){
                return $(this).val();
            }).get();

            var genre = $(".checkbox_genre:checked").map(function(){
                return $(this).val();
            }).get();

            self.genreSelectors = [];

            country.forEach(function(origin){
                genre.forEach(function(sex){
                    self.genreSelectors.push(sex + "_" + origin);
                })
            })

            self.map.removeLayer(self.geojson)
            self.legend.removeFrom(self.map)
            self.transport.removeFrom(self.map)

            loadCloropleth("assets/js/data/madrid_barrios.json", styleCloropleth, false);
        }

        self.minAge = "0"
        self.maxAge = "120"
        self.onSliderChanged = function(){

            var val = self.ageSlider.val().split(";");
            if((val[0] != self.minAge) || (val[1] != self.maxAge)) {
                self.minAge = val[0];
                self.maxAge = val[1];
                self.getSelector()
            }
        }

        function getValue(feature){
            if (self.heatmap == 0){
                var population = 0;

                for (var key in feature.properties.population) {
                    if ($.inArray(key, self.genreSelectors) != -1) {
                        for (var key2 in feature.properties.population[key]){
                            if ((parseInt(key2) >= parseInt(self.minAge)) && (parseInt(key2) <= parseInt(self.maxAge))) {
                                population += feature.properties.population[key][key2];
                            }
                        }
                    }
                }
                return population;
            } else{
                return feature.properties.renta;
            }
        }

        function setColorScales(json){
            var value, minRange, maxRange;
                self.min = 999999,
                self.max = 0;
            json.features.forEach(function(feature){
                value = getValue(feature);
                if(value < self.min) self.min = value;
                if(value > self.max) self.max = value;
            });

            if (self.heatmap==0){
                minRange = '#F8BBD0';//'#ff0';
                maxRange = '#FF4081';//'#F00';
            } else {
                minRange = '#F8BBD0';
                maxRange = '#673AB7';
            }
            self.color_scale = d3.scale.linear().domain([self.min, self.max]).range([minRange, maxRange]).clamp(true);
        }

        function styleCloropleth(feature) {
            return {
                fillColor: self.color_scale(getValue(feature)),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.3
            };
        }

        function styleCloropleth(feature) {
            return {
                fillColor: self.color_scale(getValue(feature)),
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.3
            };
        }

        function highlightFeature(e) {
            var layer = e.target;

            self.latest = e;

            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.5
            });

            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }

            self.infoUpdate(layer.feature);
        }

        function resetHighlight(e) {
            self.geojson.resetStyle(e.target);
            self.infoUpdate();
        }

        function clickOnDistrit(e) {

            //Resize container
            //$("#close-button").slideDown( 1000 );
            //$("#map-container").animate({width: '41.66666667%'});
            //$("#main-content").animate({width: '58.33333333%'});

            $('#noStats').css("display","none");
            $('#stats').css("display","block");

            //$('#main-content').animate({
            //scrollTop: $("#form-map").height()},
            //'slow');

            d3.select("#district_text").html("Estas son algunas estadísticas acerca de la población del distrito "+"<font color='#388DC3'><b>" + e.target.feature.properties.DESBDT.split(" ").slice(1).join(' ') + "</b></font>")

            d3.select("#sexRatio").html("");
            drawCHgraps(e.target.feature);

            d3.select("#chartSVG").html("");
            self.chartPOPAGE = multibarHM(e.target.feature, "chartPOPAGE", self.chartPOPAGE)

            updateIdealista(e.latlng.lat, e.latlng.lng, 0.001);

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
                loadFoursquareData(e.latlng.lat,e.latlng.lng,query,2000);
                twitter.getTweets(query);
            }else{
                toastr["warning"]("Select a business type to see related business")
            }

            console.log(e.target.feature.properties.DESBDT + " : " + getValue(e.target.feature) + " : " + e.latlng.lat + "|" + e.latlng.lng)
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: clickOnDistrit
            });
        }

        var loadCloropleth = function(file, style, dd){

            if (self.heatmap == 1) {
                d3.select('.populationSelector').style("display", "none")
            }
            if (self.heatmap == 0){
                d3.select('.populationSelector').style("display", "")
            }

            if (dd){
                d3.json(file, function(json) {

                    self.dataJson = json;
                    setColorScales(json);

                    self.geojson = L.geoJson(json, {
                        style: style,
                        onEachFeature: onEachFeature
                    })//.addTo(map);

                    self.map.addLayer(self.geojson)
                    self.legend.addTo(self.map);
                    self.transport.addTo(self.map)

                    self.spinner.stop();
                });
            }else{
                self.spinner = new Spinner(opts).spin(target);

                setColorScales(self.dataJson);

                self.geojson = L.geoJson(self.dataJson, {
                    style: style,
                    onEachFeature: onEachFeature
                })//.addTo(map);

                self.map.addLayer(self.geojson)
                self.legend.addTo(self.map);
                self.transport.addTo(self.map)

                self.spinner.stop();
            }
        }

        self.cloro_control = L.control();
        self.cloro_control.onAdd = function (map) {
            self.cloroplethControl = L.DomUtil.create('div', 'cloroplethControl'); // create a div with a class "info"
            var myhtml = ''
            myhtml += '<h5>Controles del mapa</h5>'
            myhtml += '<div class="form-group control-form"><b>Mostrar:</b> '
            myhtml += '  <select name="district" id="cloro_type">'
            myhtml += '    <option value="1">Población</option>'
            myhtml += '    <option value="2">Renta</option>'
            myhtml += '  </select>'
            myhtml += '</div>'

            self.htmlPop = '<div class="populationSelector">'
            self.htmlPop += '<form action="" onchange="self.getSelector()">'
            self.htmlPop += '<input type="checkbox" class="checkbox_genre" checked name="women" value="mujer"> Mujeres <i style="color:#ff69b4;" class="fa fa-female"></i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
            self.htmlPop += '<input type="checkbox" class="checkbox_genre" checked name="men" value="hombre"> Hombres <i style="color:#1e90ff;" class="fa fa-male"></i><br>'
            self.htmlPop += '<input type="checkbox" class="checkbox_country" checked name="nationals" value="ES"> Nacionales <i style="color:#f00;" class="fa fa-flag-o"></i>&nbsp;&nbsp;&nbsp;'
            self.htmlPop += '<input type="checkbox" class="checkbox_country" checked name="Foreigners" value="EX"> Extranjeros <i style="color:#000;" class="fa fa-compass"></i><br>'
            self.htmlPop += '</form>'
            self.htmlPop += '<div class="form-group">'
            self.htmlPop += '<h4><b>Rango de edad:</b></h4>'
            self.htmlPop += '    <div class="price-range" onmouseup="self.onSliderChanged()">'
            self.htmlPop += '        <input id="age-input" type="text" name="price" value="0;120">'
            self.htmlPop += '    </div>'
            self.htmlPop += '</div>'
            self.htmlPop +='</div>'

            self.htmlInfo = '<div class="info">'
            self.htmlInfo += '  <h4>Población por distrito</h4>'
            self.htmlInfo += '  Pon el ratón encima de una región para<br>obtener más info'
            self.htmlInfo += '</div>';

            self.cloroplethControl.innerHTML = myhtml + self.htmlInfo + self.htmlPop;
            return self.cloroplethControl;
        };
        self.cloro_control.addTo(self.map);

        self.ageSlider = $("#age-input");
        if(self.ageSlider.length > 0) {
            self.ageSlider.slider({
                from: 0,
                to: 120,
                step: 1,
                round: 1
            });
        }

        // method that we will use to update the control based on feature properties passed
        self.infoUpdate = function (props) {
            var info1, info2;
            if (self.heatmap == 0){
                info1 = "Población"
                info2 = "people"
            } else {
                info1 = "Renta media"
                info2 = "€/year"
            }

            self.htmlInfo = '<h4>' + info1 + ' por distrito</h4>' +  (props ?
                'Distrito: <b>' + props.properties.DESBDT.split(" ").slice(1).join(' ') + '</b><br />' + getValue(props) + ' ' + info2
                : 'Pon el ratón encima de una región para<br>obtener más info');

            d3.select('.info').html(self.htmlInfo);
        };

        self.legend = L.control({position: 'bottomright'});

        self.legend.onAdd = function (map) {

            var step = (self.max-self.min)/6
            var grade = [self.min,self.min+step,self.min+2*step,self.min+3*step,self.min+4*step,self.min+5*step,self.max]

            var div = L.DomUtil.create('div', 'info legend'),
                grades = grade,
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML += grades[0] + ' - ' + grades[6]
            div.innerHTML += '<br>'
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + self.color_scale(grades[i] + 1) + '"></i>'// + grades[i] + '+';
            }

            return div;
        };

        self.transport_types = ["0","1"]
        self.getTransport = function(){
            self.transport_types = $(".checkbox_transport:checked").map(function(){
                console.log($(this).val())
                return $(this).val();
            }).get();

            if (self.map.getZoom() >= 14) {
                for (var i = 0; i < 5; i++) {
                    if ($.inArray(''+i, self.transport_types) != -1)
                        self.map.addLayer(self.layers[i])
                    else
                        self.map.removeLayer(self.layers[i]);
                }
            }
        }

        self.transport = L.control({position: 'bottomright'});

        self.transport.onAdd = function (map) {
            self.transportControl = L.DomUtil.create('div', 'info transport');

            self.transportControl.innerHTML = '<b>Transporte público y Aparcamientos</b> <b style="font-size:9px">(Solo visible con zooms cercanos)</b><br>'
            self.transportControl.innerHTML += '<form action="" onchange="self.getTransport()"><input type="checkbox" class="checkbox_transport" checked name="Metro" value="1"> Metro <img style="padding-bottom:2px" width="18px" src="./assets/img/metro.png"/>&nbsp;&nbsp;<input type="checkbox" class="checkbox_transport" checked name="Renfe" value="0"> Renfe <img style="padding-bottom:4px" width="18px" src="./assets/img/cercanias.png"/>&nbsp;&nbsp;<input type="checkbox" class="checkbox_transport" name="Bicimad" value="2"> Bicimad <i class="fa fa-bicycle"></i>&nbsp;&nbsp;<input type="checkbox" class="checkbox_transport" name="Aparcamiento" value="3">Aparcamiento <i class="fa fa-paypal"></i>&nbsp;&nbsp;<input type="checkbox" class="checkbox_transport" name="Bus" value="4">Bus <i class="fa fa-bus"></i>';
            self.transportControl.innerHTML += '</form>'

            return self.transportControl;
        };

        self.heatmap = 0
        loadCloropleth("assets/js/data/madrid_barrios.json", styleCloropleth, true);

        $('#cloro_type').change(function() {

            self.map.removeLayer(self.geojson)
            self.legend.removeFrom(self.map)
            self.transport.removeFrom(self.map)

            self.heatmap = $(this).val()-1
            loadCloropleth("assets/js/data/madrid_barrios.json", styleCloropleth, false);

            fixZoom();
        });

        // CHOROPLETH
        // ----------


        // ----------
        // LEAFLET - DRAW

        // Initialize the FeatureGroup to store editable layers
        var drawnItems = new L.FeatureGroup();
        self.map.addLayer(drawnItems);

        // Initialize the draw control and pass it the FeatureGroup of editable layers
        var drawControl = new L.Control.Draw({
            draw: {
                polyline: false,
                polygon: false,
                rectangle: false,
                marker: false
            }
        });
        self.map.addControl(drawControl);

        d3.select(".leaflet-top.leaflet-left").append("div")
            .html("Haz click para dibujar un círculo")
            .attr("class", "help_circle")

        self.map.on('draw:created', function (e) {

            d3.select(".help_circle").remove();

            var type = e.layerType,
                layer = e.layer;
            if (type === 'circle') {

                if(self.prevCircle != null) drawnItems.removeLayer(self.prevCircle);

                console.log(layer._latlng.lat + ":" + layer._latlng.lng)
                //updateIdealista(40.415914, -3.696148, 0.001);
                updateIdealista(layer._latlng.lat, layer._latlng.lng, 0.001);

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
                    loadFoursquareData(layer._latlng.lat,layer._latlng.lng,query,layer.getRadius());
                    twitter.getTweets(query);
                }else{
                    toastr["error"]("In order to see related business", "Select a business type!")
                }

            }
            drawnItems.addLayer(layer);
            layer.bringToBack();
            self.prevCircle = layer;
            clickOnDistrit(self.latest);
        });

        //LEAFLET - DRAW
        // ---------

    }

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "positionClass": "toast-top-left",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

}
