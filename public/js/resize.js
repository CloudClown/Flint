
$( document ).ready( function() {
  $('#messages').height($(window).height()-210);
  $('.unlocks').height($(window).height() -30);
  $('.photos').height($(window).height() -54);

  $( window ).resize(function() {
    $('#messages').height($(window).height()-210);
    $('.unlocks').height($(window).height() -30);
    $('.photos').height($(window).height() -54);
  });

});
