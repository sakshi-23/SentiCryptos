type = ['', 'info', 'success', 'warning', 'danger'];


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

    initDocumentationCharts: function() {
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [12, 17, 7, 17, 23, 18, 38], [1, 10, 7, 17, 23, 18, 38]
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);
    },

    initDashboardPageCharts: function() {

        /* ----------==========     Daily Sales Chart initialization    ==========---------- */

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [602,  652,792, 740, 630, 719, 655]
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 400,
            high: 900, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);



        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

        dataCompletedTasksChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [30, 10, 40, 30, 20,10,  5],
            ]
        };

        optionsCompletedTasksChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        md.startAnimationForLineChart(completedTasksChart);


        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        var dataEmailsSubscriptionChart = {
            labels:['BWN', 'CPH', 'DAC', 'DUS', 'FRA', 'HKG', 'MEL', 'MUC', 'PER', 'SYD', 'WSSS'],
            series: [
                [542, 443, 320, 300, 553, 653, 326, 434, 568, 610,900]

            ]
        };
        var optionsEmailsSubscriptionChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0
            }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value[0];
                    }
                }
            }]
        ];
        var emailsSubscriptionChart = Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

        //start animation for the Emails Subscription Chart
        md.startAnimationForBarChart(emailsSubscriptionChart);

    },

    updateDocumentationCharts: function() {

        /* ----------==========     Daily Sales Chart initialization    ==========---------- */

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [602,  652,792, 740, 630, 719, 655], [500,  692,732, 750, 670, 619, 755]
            ]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 400,
            high: 900, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        }

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);



        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

        dataCompletedTasksChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
                [30, 10, 40, 30, 20,10,  5], [10, 20, 30, 30, 25,8,  14],
            ]
        };

        optionsCompletedTasksChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 100, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        }

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        md.startAnimationForLineChart(completedTasksChart);


        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        var dataEmailsSubscriptionChart = {
            labels:['BWN', 'CPH', 'DAC', 'DUS', 'FRA', 'HKG', 'MEL', 'MUC', 'PER', 'SYD', 'WSSS'],
            series: [
                [542, 443, 320, 300, 553, 653, 326, 434, 568, 610,900],  [542, 413, 280, 390, 543, 693, 316, 494, 528, 510,980]

            ]
        };
        var optionsEmailsSubscriptionChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0
            }
        };
        var responsiveOptions = [
            ['screen and (max-width: 640px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function(value) {
                        return value[0];
                    }
                }
            }]
        ];
        var emailsSubscriptionChart = Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

        //start animation for the Emails Subscription Chart
        md.startAnimationForBarChart(emailsSubscriptionChart);

    },



    showNotification: function(message,from,align ) {
        color = Math.floor((Math.random() * 4) + 1);

        $.notify({
            icon: "notifications",
            message: message

        }, {
            type: type[color],
            timer: 2000,
            placement: {
                from: from,
                align: align
            }
        });
    }



}





$(document).ready( function() {


    $("#predicted").on("change",function(){
    var box=  $(".predictions")
         if($(this).is(':checked')) {
        demo.updateDocumentationCharts();
//        .removeClass("hidden");
//         $(".predictions").toggleClass('visuallyhidden');
        box.removeClass('hidden');
            setTimeout(function () {
              box.removeClass('visuallyhidden');
            }, 20);
        }
        else{
        demo.initDashboardPageCharts();
       box.addClass('visuallyhidden');

    box.one('transitionend', function(e) {

      box.addClass('hidden');

    });
        }


    })

    $("#searchDefects").on("change",function(){
        $("#searchDefectsValue").removeClass("hidden");
    });

    $("#notificationId").on("click",function(){
        $("#fivenot").hide();
     });

    $("#submit").on("click",function(){
        $("#showDashboardResults").addClass("hidden");
        $("#showDefects").removeClass("hidden");
        $(".loader").removeClass("hidden");
         $.get("/all_defects/SFO", function(data, status){
           var pending="",completed="",deferred="";
           data= JSON.parse(data);
            $(".loader").addClass("hidden");
           for (var i in data){
                var val=data[i];
                val.name=val.completed_person_name
                if(data[i].status=="deferred"){
                    deferred+='<tr><td>'+val.timestamp.substring(0,16)+'</td><td>'+val.aircraft_id+'</td><td>'+val.description+'</td><td>'+val.name+'</td><td><button class="btn btn-sm btn-default">Action<i class="material-icons">play_arrow</i></button></td></tr>'

                }
                else if (data[i].status=="created"){
                    pending+='<tr><td>'+val.timestamp.substring(0,16)+'</td><td>'+val.aircraft_id+'</td><td>'+val.description+'</td><td>'+val.source+'</td><td><button class="btn btn-sm btn-default">Action<i class="material-icons">play_arrow</i></button></td></tr>'

                }
                else{

                    completed+='<tr><td>'+val.timestamp.substring(0,16)+'</td><td>'+val.aircraft_id+'</td><td>'+val.description+'</td><td>'+val.name+'</td><td>'+val.completed_timestamp+'</td></tr>'

                }


           }
           $(".completed").html(completed);
           $(".pending").html(pending);
           $(".deferred").html(deferred);

         });
    })

    $("#showDashboard").on("click",function(){
        $("#showDashboardResults").removeClass("hidden");
    })
});