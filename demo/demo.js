jQuery(document).ready(function($) {

    // Simple usage
    $('.rate-circle-static-small').rateCircle();
    $('.rate-box-static-small').rateBox();

    $('.rate-circle-static-medium').rateCircle({size: 150});
    $('.rate-box-static-medium').rateBox({width: 150, height: 150});

    $('.rate-circle-static-big').rateCircle({size: 200});
    $('.rate-box-static-big').rateBox({width: 200, height: 200});

    // Custom options
    $('.rate-circle').rateCircle({
        size: 100, // Sets the size of the circle
        lineWidth: 10, // Sets the width of circle line
        fontSize: 30, // Font size of rate
        referenceValue: 100 // Used to calculate color and percentage
    });

    $('.rate-box').rateBox({
        width: 100, // Sets the with of the box
        height: 100, // Sets the height of the box
        fontSize: 30, // Font size of rate
        referenceValue: 100 // Used to calculate color and percentage
    });

    $('input[id*="rate-circle"]').on("change mousemove", function() {
        $(".rate-circle").data('value', $("#rate-circle-value").val());
        $('.rate-circle').rateCircle({
            size: $("#rate-circle-size").val(),
            lineWidth: $("#rate-circle-line-width").val(),
            fontSize: $("#rate-circle-font-size").val(),
        });
    });

    $('input[id*="rate-box"]').on("change mousemove", function() {
        $(".rate-box").data('value', $("#rate-box-value").val());
        $('.rate-box').rateBox({
            width: $("#rate-box-width").val(),
            height: $("#rate-box-height").val(),
            fontSize: $("#rate-box-font-size").val(),
        });
    });
});
