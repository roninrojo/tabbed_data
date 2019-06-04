/* main script */


$(document).ready(function () {
    
    $.ajax({
        url: 'https://randomuser.me/api/?results=1&noinfo',
        dataType: 'json',
        success: function (data) {
            console.log(data);
		
            var urlImg = data.results[0].picture.large;
            $('.thumbnail').attr("src", urlImg);
		
            var nameFirst = data.results[0].name.first;
            $('.name-first').text(nameFirst);
		
            var nameLast = data.results[0].name.last;
            $('.name-last').text(nameLast);
		
            var email = data.results[0].email;
            $('.email').text(email);
		
            var dob = data.results[0].dob.date;
            var date_parse = Date.parse(dob);
            var date = new Date(date_parse);
            var formatted_date =  (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear();
		
		    $('.dob').text(formatted_date);
		
            var phone = data.results[0].cell;
            $('.phone').text(phone);
	
            var locationCtiy = data.results[0].location.city;
            var locationStreet = data.results[0].location.street;
            var locationPostCode = data.results[0].location.postcode;
            $('.location-city').text(locationCtiy);
            $('.location-street').text(locationStreet);
            $('.location-postcode').text(locationPostCode);
        }
    });
    
});