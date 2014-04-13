var TodoList = (function(_, $) {
'use strict';
function TodoList(opts) {
    this.$list = opts.list;
    this.$form = opts.form;
    this.$input = this.$form.find('input[name=title]');
  }
TodoList.prototype.addTask = function(title, id) {
    if (this.$list.children('li:first').data('empty')) {
      this.$list.empty();
    }

    var $li = $('<li></li>');
    $li.text(' ' + title).prepend(this._checkbox(id));

    this.$list.append($li);
  };
    TodoList.prototype._checkbox = function(id) {
    var $checkbox = $('<input type="checkbox">').val(id);
    return $checkbox;
  };
return TodoList;
})(_, $);
