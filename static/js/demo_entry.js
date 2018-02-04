type = [ 'success','danger'];


demo = {
    initPickColor: function() {
        $('.pick-class-label').click(function() {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    },






    showNotification: function(message,color,from,align ) {


        $.notify({
            icon: "notifications",
            message: message

        }, {
            type: type[color],
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });
    }



}





$(document).ready( function() {

//
//    $(".card-header-divs").on("click",function(){
//        $(".card-header-divs").removeClass("active");
//         $(this).addClass("active");
//        $(".card-content ").addClass("hidden");
//       $("."+ $(this).attr("data-id")).removeClass("hidden");
//
//    })



    $("#notificationId").on("click",function(){
        $("#fivenot").html("");
         $("#fivenot").addClass("hidden");
//         $(".dropdown-menu").html("")
     });



//     $(".loader").removeClass("hidden");
    function getLogs(){
//
         $.get("/all_defects/SFO", function(data, status){
           var pending="",completed="",deferred="";
           data= JSON.parse(data);
           pending_new=[]
            $(".loader").addClass("hidden");
//            $(".dropdown-menu").html("");
           for (var i in data){
                var val=data[i];
                val.name=val.completed_person_name?val.completed_person_name:"John Thompson"
                if(data[i].aircraft_id!="100098")
                    continue
                if( data[i].status=="deferred"){
                    deferred+='<tr defect_record_id='+val.defect_record_id+'><td>'+val.timestamp.substring(0,16)+'</td><td>'+val.aircraft_id+'</td><td>'+val.description+'</td><td>'+val.name+'</td><td>'+val.priority+'</td><td><button class="btn btn-sm btn-default">Deferred</td></tr>'

                }
                else if (data[i].status=="created"){
                    pending+='<tr defect_record_id='+val.defect_record_id+'><td>'+val.timestamp.substring(0,16)+'</td><td>'+val.aircraft_id+'</td><td>'+val.description+'</td><td><button class="btn btn-sm btn-success">NEW</button></td><td>'+val.priority+'</td><td><button class="btn btn-sm btn-default">View</button></td></tr>'
                    pending_new.push("Aircraft #"+val.aircraft_id+" reported "+val.description)
                }
                else{

                    completed+='<tr defect_record_id='+val.defect_record_id+'><td>'+val.timestamp.substring(0,16)+'</td><td>'+val.aircraft_id+'</td><td>'+val.description+'</td><td>'+val.name+'</td><td>'+val.priority+'</td><td>'+val.completed_timestamp.substring(0,16)+'</td></tr>'

                }

           }

           pending_size = pending_new.length
           $(".completed").html(pending+deferred+completed);

//           $(".deferred").html();

         });
    }


   setInterval(
    getLogs,5000
   )

//getLogs()

$.each(defects, function (i, item) {
    $('.issue-select').append($('<option>', {
        value: item.name,
        text : item.name
    }));
});


$(".issue-select").on("change",function(){
    if(  ['8','11','12'].indexOf($(this).val())==-1)
        $(".issue").removeClass("hidden");
    $(".sub-issue").addClass("hidden");
    if ($(this).val()=="Seat belt")
        $(".seatbelt").removeClass("hidden").addClass("selected-sub");
    else
        $(".others").removeClass("hidden").addClass("selected-sub");
})


$(".submit").on("click",function(e){
    e.preventDefault();

var data={
	"city_code" : $("#to").val(),
	"source" : $("#from").val(),
	"dest" : $("#to").val(),
	"defect_type" : 2,
	"seat_no" : "10F",
	"timestamp" : new Date(),
	"status" : "created",
	"description": $(".selected-sub").val(),
	"name":$(".issue-select").val(),
	"aircraft_id" : "100098",
	"aircraft" : "Boeing 777-300ER",
	"flight_start_time" : "2017-10-15 14:20:05.226899",
	"flight_end_time" : "2017-10-15 20:20:05.226899",
	"priority": $(".priority").val()
}

        $.ajax({
                type: "POST",
                url: "/create_defect",
                data: JSON.stringify(data),

                dataType: "json",
                   headers: {
              'Content-Type': 'application/json',

          },
            success: function(data){
                demo.showNotification("Defect Id #11930 created. Cause: "+$(".issue-select").val(),0)
                $(".issue").addClass("hidden");
            },

    });

});

});

var pending_size=0;

var defects=[{'description': 'Problem with the Air Conditioner', 'defect_type': 8, 'name': 'Air Conditioner'}, {'description': 'Problem with the armrest', 'defect_type': 7, 'name': 'Armrest'}, {'description': 'Brathroom clogged', 'defect_type': 11, 'name': 'Bathroom clogged'}, {'description': 'Bathroom seat broken', 'defect_type': 12, 'name': 'Bathroom seat'}, {'description': 'The tray is broken', 'defect_type': 5, 'name': 'Broken Tray'}, {'description': 'The infotainment system is not working', 'defect_type': 1, 'name': 'Flight infotainment'}, {'description': 'Issue with the foot support', 'defect_type': 4, 'name': 'Foot rest'}, {'description': 'Issue with the overhead bin', 'defect_type': 9, 'name': 'Overhead bin'}, {'description': 'The overhead light is not working', 'defect_type': 6, 'name': 'Overhead light'}, {'description': 'Problem with the seat', 'defect_type': 3, 'name': 'Seat Issue'}, {'description': 'Problem with the seat belt', 'defect_type': 2, 'name': 'Seat belt'}, {'description': 'The window blinds are not shutting', 'defect_type': 10, 'name': 'Window blinds'},{'description': 'The window blinds are not shutting', 'defect_type': 11, 'name': '---ADD NEW---'}]







