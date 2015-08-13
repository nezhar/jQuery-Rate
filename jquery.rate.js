/*
Author: Nezbeda Harald
Description: This is a jQuery plugin.
*/
(function( $ ) {
  "use strict";

    /*
      Rate Circle
    */
    $.fn.rateCircle = function(options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            size: 100,
            lineWidth: 10,
            fontSize: 30,
            referenceValue: 100
        }, options);

        var canvasSize = settings.size,
            circlePosition = canvasSize/2,
            circleSize = circlePosition-settings.lineWidth/2,
            circleLineWidth = settings.lineWidth,
            textFontSize = settings.fontSize;

        $(this).html("");
        $(this).append("<canvas class='rate-circle-back' width='"+canvasSize+"' height='"+canvasSize+"'></canvas>");
        $(this).append("<canvas class='rate-circle-front' width='"+canvasSize+"' height='"+canvasSize+"'></canvas>");

        $(this).css('position','relative');
        $(this).css('display','block');
        $(this).css('width', canvasSize);
        $(this).css('height', canvasSize);
        $(this).css('margin', '0 auto');
        $(this).css('text-align', 'center');

        $(this).each(function() {

          var rate = $(this).data('rate');
          var percent;

          percent = 100*rate/settings.referenceValue;

          var backCanvas = $(this).find(".rate-circle-back");
          var back = backCanvas.get(0).getContext('2d');
          back.lineWidth = circleLineWidth;

          backCanvas.addClass("rate-color-back");
          back.strokeStyle = backCanvas.css('color');

          back.arc(circlePosition, circlePosition, circleSize, -(Math.PI/180*90), 2*Math.PI - (Math.PI/180*90), false);
          back.stroke();

          var frontCanvas = $(this).find(".rate-circle-front");
          var front = frontCanvas.get(0).getContext('2d');
          
          front.lineWidth = circleLineWidth;

          frontCanvas.addClass("rate-color"+parseInt(rate/10, 0));//getColorClass(rate)
          front.strokeStyle = frontCanvas.css('color');

          var endAngle = (Math.PI * percent * 2 / 100);
          front.arc(circlePosition, circlePosition, circleSize, -(Math.PI/180*90), endAngle - (Math.PI/180*90), false);
          front.stroke();

          $(this).append("<span class='rate-circle-score'>"+rate+"</span>");

          var score = $(this).find(".rate-circle-score");
          score.css("line-height",canvasSize+"px");
          score.css("font-size",textFontSize+"px");
          score.css("color",front.strokeStyle);
        });
    };

    /*
      Rate Box
    */
    $.fn.rateBox = function() {
      $(this).each(function() {
        var rate = $(this).data('rate');
        var grade, gradientClass, text;

        if (rate) {
          grade = (Math.round( (7-rate) * 10 ) / 10).toFixed(1);
          gradientClass = "rate-gradient"+parseInt(grade, 0);
          text = "Gesamt";
        } else {
          grade = "";
          gradientClass = "rate-gradient-null";
          text = "";
        }

        $(this).html("<div></div>");
        var box = $(this).find('div');
        box.addClass(gradientClass);
        box.append("<span class='rate-box-average'>"+grade+"</span>");
        box.append("<span class='rate-box-gesamt'>"+text+"</span>");
        box.append("<span class='rate-box-circle'><i class='fa fa-circle-thin'></i></span>");
      });
    };

    /*
      Rate Bar Chart
    */
    $.fn.rateBarChart = function() {
      $(this).each(function() {
        var i,current,percent;
        var rate = $(this).data('rate');

        $(this).html("<table class='rate-chart'><col width='10%'><col width='70%'><col width='10%'></table>");
        var table = $(this).find('table');

        var sum = 0;
        for (i=0; i < rate.length; i++) {
          sum += rate[i];
        }

        for (i = rate.length-1; i >= 0; i--) {
          current = 6-i;
          if (sum) percent = parseInt(rate[i]/sum*100, 0);
          else percent= 0;
          table.append("<tr><td class='text-center'>"+current+":</td><td><div class='rate-chart-bar-back'><div class='rate-chart-bar-front' style='width:"+percent+"%;'></div></td><td class='text-left'>&nbsp;("+rate[i]+")</td></tr>");
        }
      });
    };

    /*
      Rate Value
    */
    $.fn.rateValue = function() {
      $(this).each(function() {
        var rate = $(this).data('rate');
        var grade, gradientClass;

        if (rate) {
          grade = (Math.round( (7-rate) * 10 ) / 10).toFixed(1);
          gradientClass = "rate-gradient"+parseInt(grade, 0);
        } else {
          grade = "";
          gradientClass = "rate-gradient-null";
        }

        $(this).html("<div></div>");
        var box = $(this).find('div');
        box.addClass("rate-value");
        box.addClass(gradientClass);
        box.append("<span class='rate-value-score'>"+grade+"</span>");
      });
    };

}( jQuery ));