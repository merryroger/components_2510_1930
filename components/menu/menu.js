(function () {
  'use strict';

  // Import
  let tmpl = window.menuTpl;

  class Menu {
    constructor ({el, data}) {
      this.el = el;
      this.initData = data;
      this.tmpl = tmpl;
      this._onClick = this._onClick.bind(this);
      this._currentCtrl = null;

      this._initEvents();
      this.render();
    }

    _initEvents () {
      this.el.addEventListener('click', this._onClick, true);
    }

    _isItem (el) {
      return el.classList.contains('menu__item') || 
            el.classList.contains('menu__details') || 
            el.classList.contains('menu__controls');
    }

    addItem (data) {
        this.initData.items.push(data);
        this.render();
    }

    _removeItem (el) {

      this.initData.items = this.initData.items.filter((item, index) => {
        return index !== +el.parentNode.dataset.index;
      });

      this.render();
    }

    _onClick (event) {
      if (this._isItem(event.target)) {
        this._onItemClick(event);
      }
    }

    _onItemClick (event) {
      let item = event.target;
      switch(item.dataset.action) {
        case 'remove': this._removeItem(item); break;
        default:
      }
    }
    
    render() {
      this.el.innerHTML = this.tmpl(this.initData);
    }

  }

  // Export
  window.Menu = Menu;

})(window);
