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
            referenceValue: 100,
            valuePrefix: '',
            valueSufix: '',
        }, options);

        var canvasSize = settings.size,
            circlePosition = canvasSize / 2,
            circleSize = circlePosition - settings.lineWidth / 2,
            circleLineWidth = settings.lineWidth,
            textFontSize = settings.fontSize,
            referenceValue = settings.referenceValue,
            valuePrefix = settings.valuePrefix,
            valueSufix = settings.valueSufix;

        $(this).html("");
        $(this).append("<canvas class='rate-circle-back' width='" + canvasSize + "' height='" + canvasSize + "'></canvas>");
        $(this).append("<canvas class='rate-circle-front' width='" + canvasSize + "' height='" + canvasSize + "'></canvas>");

        $(this).css("position", "relative");
        $(this).css("display", "block");
        $(this).css("width", canvasSize);
        $(this).css("height", canvasSize);
        $(this).css("margin", "0 auto");
        $(this).css("text-align", "center");

        $(this).each(function() {

            var percent,
                value = $(this).data("value"),
                backCanvas = $(this).find(".rate-circle-back"),
                back = backCanvas.get(0).getContext("2d");

            percent = 100 * value / referenceValue;
            back.lineWidth = circleLineWidth;

            backCanvas.addClass("rate-color-back");
            back.strokeStyle = backCanvas.css("color");

            back.arc(circlePosition, circlePosition, circleSize, -(Math.PI / 180 * 90), 2 * Math.PI - (Math.PI / 180 * 90), false);
            back.stroke();

            var frontCanvas = $(this).find(".rate-circle-front");
            var front = frontCanvas.get(0).getContext("2d");

            front.lineWidth = circleLineWidth;

            frontCanvas.addClass("rate-color" + parseInt(percent / 10, 0)); //getColorClass(rate)
            front.strokeStyle = frontCanvas.css("color");

            var endAngle = (Math.PI * percent * 2 / 100);
            front.arc(circlePosition, circlePosition, circleSize, -(Math.PI / 180 * 90), endAngle - (Math.PI / 180 * 90), false);
            front.stroke();

            $(this).append("<span class='rate-circle-value'>" + valuePrefix + value + valueSufix + "</span>");

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
            height: 100,
            fontSize: 30,
            referenceValue: 100,
            valuePrefix: '',
            valueSufix: '',
        }, options);

        var boxWidth = settings.width,
            boxHeight = settings.height,
            textFontSize = settings.fontSize,
            referenceValue = settings.referenceValue,
            valuePrefix = settings.valuePrefix,
            valueSufix = settings.valueSufix;

        $(this).each(function() {
            var box,
                grade,
                gradientClass,
                text,
                percent,
                value = $(this).data("value");

            percent = 100 * value / referenceValue;
            gradientClass = "rate-gradient" + parseInt(percent / 10, 0);

            $(this).html("<div></div>");
            box = $(this).find("div");
            box.addClass(gradientClass);

            box.css("width", boxWidth + "px");
            box.css("height", boxHeight + "px");
            box.css("margin", "0 auto");

            box.append("<span class='rate-box-value'>" + valuePrefix + value + valueSufix + "</span>");

            var rateValue = $(this).find(".rate-box-value");
            rateValue.css("font-size", textFontSize + "px");
            rateValue.css("height", boxHeight + "px");
            rateValue.css("line-height", boxHeight + "px");
        });
    };
}(jQuery));
