(function () {
  'use strict';

  class Menu {
    constructor ({el}) {
      this.el = el;
      this.ctrls = document.querySelector('.menu__controls');
      this._onClick = this._onClick.bind(this);
      this._onMouseOver = this._onMouseOver.bind(this);
      this._onMouseOut = this._onMouseOut.bind(this);
      this._onRemoveItemClick = this._onRemoveItemClick.bind(this);
      this._currentCtrl = null;
      this._to = 0;

      this._initEvents();
    }

    _initEvents () {
      this.el.addEventListener('click', this._onClick);
      this.el.addEventListener('mouseover', this._onMouseOver);
      this.el.addEventListener('mouseout', this._onMouseOut);
    }

    _isItem (el) {
      return el.classList.contains('menu__item');
    }

    _removeItem (el) {
      if(!el.classList.contains('menu__controls'))
        return;
      let item = el.parentNode;
      el.removeEventListener('click',this._onRemoveItemClick);
      item.parentNode.removeChild(item);
    }

    _onClick (event) {
      if (this._isItem(event.target)) {
        this._onItemClick(event);
      }
    }

    _onItemClick (event) {
      console.log(event.target.firstChild.textContent);
    }

    _onMouseOver (event) {
      if (this._isItem(event.target)) {
        let div = event.target;
        let control = div.querySelector('.menu__controls');
        if(!control) {
          control = this.ctrls.cloneNode(true);
          div.appendChild(control);
          control.addEventListener('click',this._onRemoveItemClick);
        }
        if(this._currentControl && control !== this._currentControl) {
          this._currentControl.classList.add('menu__hidden');
          if(this._to) clearTimeout(this._to); this._to = 0;
        }
        control.classList.remove('menu__hidden');
        this._currentControl = control;
      }
    }

    _onMouseOut (event) {
      if (this._isItem(event.target))
        this._to = setTimeout(this._offRemoveControl.bind(this), 1);
    }

    _offRemoveControl() {
      if(this._currentControl) {
        this._currentControl.classList.add('menu__hidden');
        this._currentControl = null;
      }
      this._to = 0;
    }

    _onRemoveItemClick (event) {
      this._removeItem (event.target);
    }
  }

  //export
  window.Menu = Menu;

})();
