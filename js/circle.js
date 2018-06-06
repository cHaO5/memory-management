(function($) {
  var c = $('.forth.circle');

  c.circleProgress({
    startAngle: -Math.PI / 4 * 3,
    value: 0,
    thickness: 20,
    size: 200,
    fill: {color: '#18BC9C'}
  });

  $('#startBtn').click(function(){
    var selected = $('input[type="radio"][name="customRadio"]:checked').val()
    var pageCircle = $('#pageFaultCircle');
    if (selected === "FIFO") {
      pageCircle.circleProgress({
        value: 0,
        fill: { color: '#18BC9C' }
      });
      pageCircle.circleProgress('value', $('#pageFaultRate').text());
    } else if (selected === "LRU") {
      pageCircle.circleProgress({
        value: 0,
        fill: { color: '#ffa500' }
      });
      pageCircle.circleProgress('value', $('#pageFaultRate').text());
    }

    pageCircle.on('circle-animation-progress', function(event, progress, stepValue) {
      $('.circleValue').text((100 * stepValue).toFixed(2) + '%');
    });

    console.log(selected);
    
  })
})(jQuery);
