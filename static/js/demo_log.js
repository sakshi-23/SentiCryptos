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


    $(".card-header-divs").on("click",function(){
        $(".card-header-divs").removeClass("active");
         $(this).addClass("active");
        $(".card-content ").addClass("hidden");
       $("."+ $(this).attr("data-id")).removeClass("hidden");

    })



    $("#notificationId").on("click",function(){
        $("#fivenot").html("");
         $("#fivenot").addClass("hidden");
//         $(".dropdown-menu").html("")
     });
    $(".pending").on("swiperight","tr",function(e){
         $("#fivenot").html("");
         $("#fivenot").addClass("hidden");

        $(this).css({"-webkit-transform":"translate("+e.swipestop.coords[0]+"px,0)"})

         $(this).addClass('rotate-left').delay(700).fadeOut(1);

         dataid= $(this).attr("defect_record_id")
          $.get("/mark_defect_fixed/"+dataid, function(data, status){
                 demo.showNotification("Task marked Completed",0);


          });

      });

          $(".pending").on("swipeleft","tr",function(e){

             $("#fivenot").html("");
         $("#fivenot").addClass("hidden");

            $(this).css({"-webkit-transform":"translate(-"+e.swipestop.coords[0]+"px,0)"})
             dataid= $(this).attr("defect_record_id")
             $(this).addClass('rotate-right').delay(700).fadeOut(1);
              $.get("/mark_defect_deferred/"+dataid, function(data, status){
                 demo.showNotification("Task marked Deferred",1);


          });


      });

     $(".loader").removeClass("hidden");
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

                if(data[i].status=="deferred"){
                    deferred+='<tr defect_record_id='+val.defect_record_id+'><td>'+val.timestamp.substring(0,16)+'</td><td>'+val.aircraft_id+'</td><td>'+val.description+'</td><td>'+val.name+'</td><td>'+val.flight_end_time.substring(0,16)+'</td><td><button class="btn btn-sm btn-default">Deferred<i class="material-icons">play_arrow</i></button></td></tr>'

                }
                else if (data[i].status=="created"){
                    pending+='<tr defect_record_id='+val.defect_record_id+'><td>'+val.timestamp.substring(0,16)+'</td><td>'+val.aircraft_id+'</td><td>'+val.description+'</td><td>'+val.source+'</td><td>'+val.flight_end_time.substring(0,16)+'</td><td>'+val.time_to_fix+'</td><td><button class="btn btn-sm btn-default">Details<i class="material-icons">play_arrow</i></button></td><td><input type="text" placeholder="Commment"></td></tr>'
                    pending_new.push("Aircraft #"+val.aircraft_id+" reported "+val.description)
                }
                else{

                    completed+='<tr defect_record_id='+val.defect_record_id+'><td>'+val.timestamp.substring(0,16)+'</td><td>'+val.aircraft_id+'</td><td>'+val.description+'</td><td>'+val.name+'</td><td>'+val.flight_end_time.substring(0,16)+'</td><td>'+val.completed_timestamp.substring(0,16)+'</td></tr>'

                }

           }
           if(pending_size<pending_new.length){
                for (var i in (pending_new)){

                     $(".dropdown-menu").append('<li> <a href="#">'+pending_new[i]+'</a></li>')
                      if (parseInt(i)==(pending_new.length-pending_size-1))
                        break;
                }
                $("#fivenot").html((1+parseInt(i)));
                $("#fivenot").removeClass("hidden");
               pending_size = pending_new.length
           }
           pending_size = pending_new.length
           $(".completed").html(deferred+completed);
           $(".pending").html(pending);
//           $(".deferred").html();

         });
    }


   setInterval(
    getLogs,5000
   )




});

var pending_size=0;