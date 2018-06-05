/* Examples */
(function($) {
  /*
   * Example 1:
   *
   * - no animation
   * - custom gradient
   *
   * By the way - you may specify more than 2 colors for the gradient
   */
  $('.first.circle').circleProgress({
    value: 0.35,
    animation: false,
    fill: {gradient: ['#ff1e41', '#ff5f43']}
  });

  /*
   * Example 2:
   *
   * - default gradient
   * - listening to `circle-animation-progress` event and display the animation progress: from 0 to 100%
   */
  $('.second.circle').circleProgress({
    value: 0.6
  }).on('circle-animation-progress', function(event, progress) {
    $(this).find('strong').html(Math.round(100 * progress) + '<i>%</i>');
  });

  /*
   * Example 3:
   *
   * - very custom gradient
   * - listening to `circle-animation-progress` event and display the dynamic change of the value: from 0 to 0.8
   */
  $('.third.circle').circleProgress({
    value: 0.75,
    fill: {gradient: [['#0681c4', .5], ['#4ac5f8', .5]], gradientAngle: Math.PI / 4}
  }).on('circle-animation-progress', function(event, progress, stepValue) {
    $(this).find('strong').text(stepValue.toFixed(2).substr(1));
  });

  /*
   * Example 4:
   *
   * - solid color fill
   * - custom start angle
   * - custom line cap
   * - dynamic value set
   */
  var c4 = $('.forth.circle');

  c4.circleProgress({
    startAngle: -Math.PI / 4 * 3,
    value: 0,
    thickness: 20,
    size: 200,
    //lineCap: 'round',
    fill: {color: '#18BC9C'}
  });

  // Let's emulate dynamic value update
  // setTimeout(function() { c4.circleProgress('value', 0.7); }, 1000);
  // setTimeout(function() { c4.circleProgress('value', 1.0); }, 1100);
  // setTimeout(function() { c4.circleProgress('value', missingPage/320); }, 2100);
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
      pageCircl.circleProgress({
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

//   var circles = $('.sixth.circle');

// circles.appear({ force_process: true });

// circles.on('appear', function() {
//   var circle = $(this);

//   if (!circle.data('inited')) {
//     circle.circleProgress({
//       value: 1,
//       size: 50,
//       thickness: 10,
//       fill: "#f55"
//     });

//     circle.data('inited', true);

//     circle.on('circle-animation-progress', function(event, progress, stepValue) {
//       $(this).find('.value').text((100 * stepValue).toFixed());
//     });
//   }
// });
})(jQuery);
