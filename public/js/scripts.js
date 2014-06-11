
$(document).ready(function () {

	//cache jquery variables to prevent duplicate DOM lookups
	var $namesField = $("#names");
	var $validationMsg = $("#validation-msg");
	var $attendingField = $("#attending");
	var $notAttendingField = $("#notAttending");
	var $attendingMsg = $("#attending-msg");

	//scroll helper
	function scrollToAnchor(aid){
	  var aTag = $("a[name='"+ aid +"']");
	  $('html,body').animate({scrollTop: aTag.offset().top},'slow');
	}

	//listen for even on Not attending radio button
	$("#notAttending").bind("change", function(e){
		var $no = $(e.target);
		//if user selects no on attending
		if(($no).is(':checked')){

			//submit form to DB so no answer is counted

			$("#form-action").submit();
			//hide form with questions
			// $("#form-questions").hide();
			// //and display sorry message. 
			// $("#sorry-msg").show();
		}


	});

	//client side validation on form

	//listen for blur event on names field to see if user has left
	$namesField.bind("blur", function(e){
		if (!$namesField.val()){
			$validationMsg.show();
		}else{
			$validationMsg.hide();
		}
	});

	//listen for blur event on attending
	$($attendingField, $notAttendingField).bind("blur", function(e){
		//determine if either field is clicked
		if(!$attendingField.is(':checked') && !$attendingField.is(':checked')){
			//if both are empty show error message
			$attendingMsg.show();
		}else{
			$attendingMsg.hide();
		}
	});

	//listen for click event on attending
	$($attendingField, $notAttendingField).bind("click", function(e){
		//determine if either field is clicked
		if(!$attendingField.is(':checked') && !$notAttendingField.is(':checked')){
			//if both are empty show error message
			$attendingMsg.show();
		}else{
			$attendingMsg.hide();
		}
	})




	$form = $("#form-action")

	//prevent form from submitting if there is no value in the names field
	$form.bind("submit", function(e){

		if(!$namesField.val()){
			//stop form submitting
			e.preventDefault();
			
			//if empty show error message and then focus on empty field
			$validationMsg.show();
			scrollToAnchor('first-question');
		}

		if(!$attendingField.is(':checked') && !$notAttendingField.is(':checked')){

			//stop form submitting
			e.preventDefault();
			
			//if empty show error message and then focus on empty field
			$attendingMsg.show();
			scrollToAnchor('first-question');
		}
		
	});



	var eatingLocations =[
		{
			name:"Stowford Manor Farm",
			url: "http://www.stowfordmanorfarm.co.uk",
			lat: "51.31811432866838",
			lon: "-2.273397445678711",
			summary: "Wedding venue"
		},
		{
			name:"Hartley Farm",
			url: "http://www.hartley-farm.co.uk",
			lat: "51.355033236947925",
			lon: "-2.2861862182617188",
			summary: "Farm shop with a good cafe."
		},
		{
			name:"Lock Inn Cafe",
			url: "http://www.thelockinn.co.uk",
			lat: "51.3415640958471",
			lon: "-2.252047061920166",
			summary: "Big servings of nice food. Giant fry-ups available."
		},
		{
			name:"The New Inn",
			url: "http://www.thenewinnwestwood.co.uk",
			lat: "51.330103833288085",
			lon: "-2.2684460878372192",
			summary: "Pub with food."
		},
		{
			name:"Hungerford Arms",
			url: "http://www.hungerfordarms.co.uk",
			lat: "51.31647313346644",
			lon: "-2.2886109352111816",
			summary: "Pub that should be better than it is. Fine for beer in the sun."
		},
		{
			name:"The Poplars",
			url: "http://www.poplarsinn.co.uk",
			lat: "51.30963782091155",
			lon: "-2.2576475143432617",
			summary: "Good pub, nice food."
		},
		{
			name:"Sainsburys",
			url: "http://www.sainsburys.co.uk/sol/storelocator/storelocator_detail_view.jsp?storeId=2143&bmForm=store_details",
			lat: "51.33727458308745",
			lon: "-2.2522830963134766",
			summary: "Should provide for all your cash, booze and snacking needs"
		}
	];
	

	var sleepingLocations =[
		{
			name:"Stowford Manor Farm",
			url: "http://www.stowfordmanorfarm.co.uk",
			lat: "51.31811432866838",
			lon: "-2.273397445678711",
			summary: "Wedding venue"
		},
		{
			name:"Old Manor hotel",
			url: "http://www.oldmanorhotel.com",
			lat: "51.32691107277062",
			lon: "-2.2278213500976562",
			summary: "Nice posh hotel."
		},
		{
			name:"Home Farm Guest House",
			url: "http://www.homefarm-guesthouse.co.uk",
			lat: "51.315056528599236",
			lon: "-2.2590208053588867",
			summary: "Weird but convenient B&B."
		},
		{
			name:"The Granary",
			url: "http://www.thegranarybedandbreakfastbath.co.uk",
			lat: "51.29912048296244",
			lon: "-2.285757064819336",
			summary: "Fancy B&B."
		},
		{
			name:"Bath Lodge Castle",
			url: "http://www.bathlodgecastle.co.uk",
			lat: "51.30467458163684",
			lon: "-2.304854393005371",
			summary: "Posh Hotel."
		},
		{
			name:"The George Inn",
			url: "http://www.georgeinnnsp.co.uk/home",
			lat: "51.30078409992866",
			lon: "-2.324960231781006",
			summary: "Nice looking pub with rooms."
		}
	];
	


	//food and drink locations
	if($("#eating-map-canvas").length > 0){
		//instantiate google map

		var LatLong = new google.maps.LatLng(51.31811432866838, -2.273397445678711);

		var markers = [];
		//create array to hold values for zoom to fit later
		//when all markers add call fit to bounds zoom method
	  var boundsArray = [];

	  //create an object that can hold references to open windows
  	infoWindowsOpen = [];

	  var mapOptions = {
	    center: LatLong,
	    zoom: 12,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  var map = new google.maps.Map(document.getElementById("eating-map-canvas"),mapOptions);

	  var markerImage;
	  //custom marker graphic for hostel location
    var pinImage = new google.maps.MarkerImage("/img/marker-eating.png",
      new google.maps.Size(52, 74),
      new google.maps.Point(0,0),
      new google.maps.Point(26, 74));
    
    var pinShadow = new google.maps.MarkerImage("/img/marker-shadow.png",
      new google.maps.Size(52, 74),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 74));

    //custom marker graphic for hostel location
    var cashImage = new google.maps.MarkerImage("/img/marker-cash.png",
      new google.maps.Size(52, 74),
      new google.maps.Point(0,0),
      new google.maps.Point(26, 74));

    var venueImage = new google.maps.MarkerImage("/img/marker-venue.png",
      new google.maps.Size(52, 74),
      new google.maps.Point(0,0),
      new google.maps.Point(26, 74));

    $(eatingLocations).each(function(i,v){
    
    	if(v.name === "Sainsburys"){
    		markerImage = cashImage;
    	}else if(v.name === "Stowford Manor Farm"){
    		markerImage = venueImage;
    	}else{
    		markerImage = pinImage;
    	}

	    // Place marker
	    var marker = new google.maps.Marker({
		    map: map,
		    icon: markerImage,
		    shadow: pinShadow,
		    position: new google.maps.LatLng(parseFloat(v.lat),parseFloat(v.lon))
	    });

	    markers.push(marker);
			//add in values to HTML from JSON object passed in
	    var infowindow = new google.maps.InfoWindow({
	    	content: "<div class='info-window'><p class='map-name'><a href='"+ v.url +"'>"+v.name+"</a></p><p>"+v.summary+"</p></div>"
	    });

	    // Add listener for marker
	    google.maps.event.addListener(marker, "click", function() {

	      //close other windows before opening new one
	      $(infoWindowsOpen).each(function(){
	        this.close();
	      });

	      infowindow.open(map, marker);

	      //push new window onto array holding reference oto open windows
	      infoWindowsOpen.push(infowindow);
	    });

	    //add marker to bounds object
  		boundsArray.push(new google.maps.LatLng(parseFloat(v.lat),parseFloat(v.lon)));
    })

		//zoom to fit all items in bounds array at end
	  var latlngbounds = new google.maps.LatLngBounds();

    for(var i = 0; i < boundsArray.length; i++){
	    latlngbounds.extend(boundsArray[i]);
	  }

    //zoom to fit all markers on screen and center
    map.setCenter(latlngbounds.getCenter());
		map.fitBounds(latlngbounds);
	}



	//accommodation canvas
	if($("#sleeping-map-canvas").length > 0){
		//instantiate google map

		var LatLong = new google.maps.LatLng(51.31811432866838, -2.273397445678711);

		var markers = [];
		//create array to hold values for zoom to fit later
		//when all markers add call fit to bounds zoom method
	  var boundsArray = [];

	  //create an object that can hold references to open windows
  	infoWindowsOpen = [];

	  var mapOptions = {
	    center: LatLong,
	    zoom: 12,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  var map = new google.maps.Map(document.getElementById("sleeping-map-canvas"),mapOptions);

	  //custom marker graphic for hostel location
	  var markerImage;
    var pinImage = new google.maps.MarkerImage("/img/marker-accommodation.png",
      new google.maps.Size(52, 74),
      new google.maps.Point(0,0),
      new google.maps.Point(26, 74));
    var pinShadow = new google.maps.MarkerImage("/img/marker-shadow.png",
      new google.maps.Size(52, 74),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 74));

     var venueImage = new google.maps.MarkerImage("/img/marker-venue.png",
      new google.maps.Size(52, 74),
      new google.maps.Point(0,0),
      new google.maps.Point(26, 74));


    $(sleepingLocations).each(function(i,v){

    	if(v.name === "Stowford Manor Farm"){
    		markerImage = venueImage;
    	}else{
    		markerImage = pinImage;
    	}

	    // Place marker
	    var marker = new google.maps.Marker({
		    map: map,
		    icon: markerImage,
		    shadow: pinShadow,
		    position: new google.maps.LatLng(parseFloat(v.lat),parseFloat(v.lon))
	    });

	    markers.push(marker);
			//add in values to HTML from JSON object passed in
	    var infowindow = new google.maps.InfoWindow({
	    	content: "<div class='info-window'><p class='map-name'><a href='"+ v.url +"'>"+v.name+"</a></p><p>"+v.summary+"</p></div>"
	    });

	    // Add listener for marker
	    google.maps.event.addListener(marker, "click", function() {

	      //close other windows before opening new one
	      $(infoWindowsOpen).each(function(){
	        this.close();
	      });

	      infowindow.open(map, marker);

	      //push new window onto array holding reference oto open windows
	      infoWindowsOpen.push(infowindow);
	    });

	    //add marker to bounds object
  		boundsArray.push(new google.maps.LatLng(parseFloat(v.lat),parseFloat(v.lon)));
    });

		//zoom to fit all items in bounds array at end
	  var latlngbounds = new google.maps.LatLngBounds();

    for(var i = 0; i < boundsArray.length; i++){
	    latlngbounds.extend(boundsArray[i]);
	  }

    //zoom to fit all markers on screen and center
    map.setCenter(latlngbounds.getCenter());
		map.fitBounds(latlngbounds);
	}


	//venue location
	//if map canvas object is found in page
	if($("#map-canvas").length > 0){
		//instantiate google map

		var LatLong = new google.maps.LatLng(51.31811432866838, -2.273397445678711);

	  var mapOptions = {
	    center: LatLong,
	    zoom: 12,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

	  //custom marker graphic for hostel location
    var pinImage = new google.maps.MarkerImage("/img/marker-venue.png",
      new google.maps.Size(52, 74),
      new google.maps.Point(0,0),
      new google.maps.Point(26, 74));
    var pinShadow = new google.maps.MarkerImage("/img/marker-shadow.png",
      new google.maps.Size(52, 74),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 74));


    // Place marker
    var marker = new google.maps.Marker({
	    map: map,
	    icon: pinImage,
	    shadow: pinShadow,
	    position: LatLong
    });

    var infowindow = new google.maps.InfoWindow({
    	content: "<div class='info-window'><p class='map-name'><a href='http://www.stowfordmanorfarm.co.uk/'>Stowford Manor Farm</a></p></div>"
    });

    // Add listener for marker
    google.maps.event.addListener(marker, "click", function() {
      infowindow.open(map, marker);
    });

	};

	//honeymoon locations
	var honeymoonDestinations = [
		{
			location: "Stowford Manor Farm",
			lat:"51.31811432866838",
			lon:"-2.273397445678711"
		},
		{
			location: "Portland Bill",
			lat:"50.517956408330775",
			lon:"-2.4546074867248535"
		},
		{
			location: "Lyme Regis",
			lat:"50.725154955049604",
			lon:"-2.936643362045288"
		},
		{
			location: "Budleigh Salterton",
			lat:"50.63253216660307",
			lon:"-3.320016860961914"
		},
		{
			location: "Torquay",
			lat:"50.46471649673749",
			lon:"-3.525238037109375"
		},
		{
			location: "Totnes",
			lat:"50.43374151538998",
			lon:"-3.6857950687408447"
		},
		{
			location: "Salcombe",
			lat:"50.23987696243864",
			lon:"-3.767763376235962"
		},
		{
			location: "Saltash",
			lat:"50.23987696243864",
			lon:"-3.767763376235962"
		},
		{
			location: "St.Austell",
			lat:"50.34357068638224",
			lon:"-4.7946953773498535"
		},
		{
			location: "Penryn",
			lat:"50.17046647526639",
			lon:"-5.107183456420898"
		},
		{
			location: "Porthleven",
			lat:"50.08694148515897",
			lon:"-5.315580368041992"
		}
	]


	if($("#honeymoon-map-canvas").length > 0){

		var LatLong = new google.maps.LatLng(51.31811432866838, -2.273397445678711);

	  var mapOptions = {
	    center: LatLong,
	    zoom: 8,
	    maptypecontrol :false,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  var map = new google.maps.Map(document.getElementById("honeymoon-map-canvas"),mapOptions);
		var directionsService = new google.maps.DirectionsService();


		var pinImage = new google.maps.MarkerImage("/img/temp_marker.png",
      new google.maps.Size(2, 2),
      new google.maps.Point(0,0),
      new google.maps.Point(2, 2));
		var pinShadow = new google.maps.MarkerImage("/img/marker-shadow.png",
      new google.maps.Size(52, 74),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 74));

		function makeMarker( position) {
		
		 new google.maps.Marker({
		  position: position,
		  map: map,
		  icon: pinImage,
		  shadow: pinShadow
		 });
		}

	function displayRoute() {  

    var start = new google.maps.LatLng(51.31811432866838,-2.273397445678711);
    var end = new google.maps.LatLng(50.08694148515897,-5.315580368041992);


    var waypts = [
    	{
        location:new google.maps.LatLng(50.517956408330775,-2.4546074867248535)
      },
      {
        location:new google.maps.LatLng(50.725154955049604,-2.936643362045288)
      },
      {
        location:new google.maps.LatLng(50.63253216660307,-3.320016860961914)
      },
      {
        location:new google.maps.LatLng(50.46471649673749,-3.525238037109375)
      },
      {
        location:new google.maps.LatLng(50.43374151538998,-3.6857950687408447)
      },
      {
        location:new google.maps.LatLng(50.23987696243864,-3.767763376235962)
      },
      {
        location:new google.maps.LatLng(50.34357068638224,-4.7946953773498535)
      },
      {
        location:new google.maps.LatLng(50.17046647526639,-5.107183456420898)
      }
    ];

    var directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers:true});// also, constructor can get "DirectionsRendererOptions" object
    directionsDisplay.setMap(map); // map should be already initialized.

    var request = {
        origin : start,
        destination : end,
        travelMode : google.maps.TravelMode.DRIVING,
        waypoints: waypts
    };
    directionsService.route(request, function(response, status) {
    
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);

					  var leg = response.routes[ 0 ].legs[0];

					  var legs = response.routes[ 0 ].legs;

					  //loop through legs
					  for (var i = legs.length - 1; i >= 0; i--) {
					  	makeMarker( legs[i].start_location);
					  };

					  //plot end point
						makeMarker( legs[legs.length - 1].end_location);
        }
    });
    
	}

	displayRoute();
}

}); //end of doc ready