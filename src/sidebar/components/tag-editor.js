'use strict';

// @ngInject
function TagEditorController(tags) {
  this.onTagsChanged = function() {
    const _taglist = JSON.parse(localStorage.getItem('hypothesis.user.tags.list'))
    for ( let i = 0; i < this.tagList.length; i++ ) {
      const spacePrefixedTag = ' ' + this.tagList[i].text
      const tagIndexInTagList = _taglist.indexOf(spacePrefixedTag)
      if ( tagIndexInTagList != -1) {
        this.tagList[i] = { text: spacePrefixedTag }
      }
    }
    tags.store(this.tagList);
    const newTags = this.tagList.map(function(item) {
      return item.text;
    });
    this.onEditTags({ tags: newTags });
  };

  this.autocomplete = function(query) {
    return Promise.resolve(tags.filter(query));
  };

  this.$onChanges = function(changes) {
    if (changes.tags) {
      this.tagList = changes.tags.currentValue.map(function(tag) {
        return { text: tag };
      });
    }
  };
}

module.exports = {
  controller: TagEditorController,
  controllerAs: 'vm',
  bindings: {
    tags: '<',
    onEditTags: '&',
  },
  template: require('../templates/tag-editor.html'),
};
