
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
			//hide form with questions
			$("#form-questions").hide();
			//and display sorry message. 
			$("#sorry-msg").show();
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
		if(!$attendingField.is(':checked') && !$attendingField.is(':checked')){
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

		if(!$attendingField.is(':checked') && !$attendingField.is(':checked')){
			//stop form submitting
			e.preventDefault();
			
			//if empty show error message and then focus on empty field
			$attendingMsg.show();
			scrollToAnchor('first-question');
		}
		
	});





	//venue location


	//food and drink locations


	//accomodation locations



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
	    var pinImage = new google.maps.MarkerImage("/images/interface/icon-map-marker.png",
	      new google.maps.Size(47, 54),
	      new google.maps.Point(0,0),
	      new google.maps.Point(23, 54));
	    var pinShadow = new google.maps.MarkerImage("/images/interface/icon-map-shadow.png",
	      new google.maps.Size(38, 17),
	      new google.maps.Point(0, 0),
	      new google.maps.Point(5, 17));


	    // Place marker
	    var marker = new google.maps.Marker({
		    map: map,
		    // icon: pinImage,
		    // shadow: pinShadow,
		    position: LatLong
	    });

	}

})

