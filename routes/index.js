
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Flint Home' });
};

exports.match = function(req, res) {
  res.render('match', { title: 'Flint User List' })
};

exports.chat = function(req, res){
  res.render('chat', { title: 'Flint Chat' });
};
