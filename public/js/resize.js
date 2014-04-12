
$( document ).ready( function() {
  $('#messages').height($(window).height()-207);
  $('.unlocks').height($(window).height() -32);
  $('.photos').height($(window).height() -32);

  $( window ).resize(function() {
    $('#messages').height($(window).height()-107);
    $('.unlocks').height($(window).height() -32);
    $('.photos').height($(window).height() -32);
  });

});
