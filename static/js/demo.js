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

//    setInterval(function(){
         $.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,LTC,ETH,XLM,ADA,XRP&tsyms=USD", function(data, status){

           for (var val in data["RAW"]){
            $("#"+val).find(".price_usd").html(data["RAW"][val]["USD"]["PRICE"].toFixed(2))
             $("#"+val).find(".vol").html(data["DISPLAY"][val]["USD"]["VOLUME24HOUR"])
             if (parseFloat(data["RAW"][val]["USD"]["CHANGEPCT24HOUR"])>0)
             {
                change = parseFloat(data["RAW"][val]["USD"]["CHANGEPCT24HOUR"]).toFixed(2)+'% <i class="fa fa-long-arrow-up"></i>'
                $("#"+val).find(".change").removeClass("text-danger")
                $("#"+val).find(".change").addClass("text-success")
                $("#"+val).find(".card-header").attr("data-background-color","green")


             }
             else{
                change = (parseFloat(data["RAW"][val]["USD"]["CHANGEPCT24HOUR"])*-1).toFixed(2)+'% <i class="fa fa-long-arrow-down"></i>'
                $("#"+val).find(".change").addClass("text-danger")
                $("#"+val).find(".change").removeClass("text-success")
                 $("#"+val).find(".card-header").attr("data-background-color","red")
             }

              $("#"+val).find(".change").html(change)

           }
           });

//    },1000)


//    $("")


    $.get("/top_feed", function(data, status){
        pos=""
        neg=""
        data=JSON.parse(data)
        for (var i in data["top_positive"]){
            pos+="<tr><td>"+data["top_positive"][i]["headline"]+"</td></tr>"

        }
        for (var i in data["top_negative"]){
            neg+="<tr><td>"+data["top_negative"][i]["headline"]+"</td></tr>"

        }
        $(".negative").html(neg)
        $(".positive").html(pos)

    });


    function callFeed(){
        $(".card-holder").html(
        '<div class="card-header"><div class="pull-right"><i class="material-icons icon">compare_arrows</i></div><div class="new-tweet"><p class="tweet-content"></p></div></div>'
     )
        $.get("/feed", function(data, status){
        pos=""
        neg=""
        data=JSON.parse(data)
        dataid=data["id"]
        $(".tweet-content").html(data["headline"])

    });
    }

    callFeed();






        $(".card-holder").on("swiperight",".card-header",function(e){
         $("#fivenot").html("");
         $("#fivenot").addClass("hidden");

        $(this).css({"-webkit-transform":"translate("+e.swipestop.coords[0]+"px,0)"})

         $(this).addClass('rotate-left').delay(500).fadeOut(1);


           $.get("/vote?sentiment=p&id="+dataid, function(data, status){

            setTimeout(function(){  callFeed();}, 3000);





          });


      });

          $(".card-holder").on("swipeleft",".card-header",function(e){

          $("#fivenot").html("");
         $("#fivenot").addClass("hidden");

            $(this).css({"-webkit-transform":"translate(-"+e.swipestop.coords[0]+"px,0)"})

             $(this).addClass('rotate-right').delay(500).fadeOut(1);
              $.get("/vote?sentiment=n&id="+dataid, function(data, status){
                  setTimeout(function(){  callFeed();}, 3000);


            });



      });








});