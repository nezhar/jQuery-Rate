/*
Author: Nezbeda Harald
Description: A jQuery plugin for ratings
*/
(function($) {
    "use strict";

    /*
      Rate Circle
    */
    $.fn.rateCircle = function(options) {
        // These are the default options
        var settings = $.extend({
            size: 100,
            lineWidth: 10,
            fontSize: 30,
            referenceValue: 100
        }, options);

        var canvasSize = settings.size,
            circlePosition = canvasSize / 2,
            circleSize = circlePosition - settings.lineWidth / 2,
            circleLineWidth = settings.lineWidth,
            textFontSize = settings.fontSize;

        $(this).html("");
        $(this).append("<canvas class='rate-circle-back' width='" + canvasSize + "' height='" + canvasSize + "'></canvas>");
        $(this).append("<canvas class='rate-circle-front' width='" + canvasSize + "' height='" + canvasSize + "'></canvas>");

        $(this).css('position', 'relative');
        $(this).css('display', 'block');
        $(this).css('width', canvasSize);
        $(this).css('height', canvasSize);
        $(this).css('margin', '0 auto');
        $(this).css('text-align', 'center');

        $(this).each(function() {

            var value = $(this).data('value');
            var percent;

            percent = 100 * value / settings.referenceValue;

            var backCanvas = $(this).find(".rate-circle-back");
            var back = backCanvas.get(0).getContext('2d');
            back.lineWidth = circleLineWidth;

            backCanvas.addClass("rate-color-back");
            back.strokeStyle = backCanvas.css('color');

            back.arc(circlePosition, circlePosition, circleSize, -(Math.PI / 180 * 90), 2 * Math.PI - (Math.PI / 180 * 90), false);
            back.stroke();

            var frontCanvas = $(this).find(".rate-circle-front");
            var front = frontCanvas.get(0).getContext('2d');

            front.lineWidth = circleLineWidth;

            frontCanvas.addClass("rate-color" + parseInt(percent / 10, 0)); //getColorClass(rate)
            front.strokeStyle = frontCanvas.css('color');

            var endAngle = (Math.PI * percent * 2 / 100);
            front.arc(circlePosition, circlePosition, circleSize, -(Math.PI / 180 * 90), endAngle - (Math.PI / 180 * 90), false);
            front.stroke();

            $(this).append("<span class='rate-circle-value'>" + value + "</span>");

            var rateValue = $(this).find(".rate-circle-value");
            rateValue.css("line-height", canvasSize + "px");
            rateValue.css("font-size", textFontSize + "px");
            rateValue.css("color", front.strokeStyle);
        });
    };

    /*
      Rate Box
    */
    $.fn.rateBox = function(options) {
        // These are the default options
        var settings = $.extend({
            width: 100,
            height: 10,
            fontSize: 30,
            referenceValue: 100
        }, options);

        $(this).each(function() {
            var value = $(this).data('value');
            var grade, gradientClass, text, percent;

            percent = 100 * value / settings.referenceValue;
            gradientClass = "rate-gradient" + parseInt(percent / 10, 0);

            $(this).html("<div></div>");
            var box = $(this).find('div');
            box.addClass(gradientClass);
            box.append("<span class='rate-box-value'>" + value + "</span>");
        });
    };
}(jQuery));
