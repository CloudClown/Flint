
$( document ).ready( function() {
  $('#messages').height($(window).height()-127);
  $('.unlocks').height($(window).height() -2);

  $( window ).resize(function() {
    $('#messages').height($(window).height()-127);
    $('.unlocks').height($(window).height() -2);
  });

});
