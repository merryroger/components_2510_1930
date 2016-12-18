(function () {
  'use strict';

  //Import
  let tmpl = window.formTpl;

  class Form {

    constructor ({ el, data, onSubmit }) {
      this.el = el;
      this.initData = data;
      this.tmpl = tmpl;
      this._closed = true;

      this._onClick = this._onClick.bind(this);
      this.onSubmit = onSubmit;

      this._addEvents();
      this.render();

      this.form = this.el.querySelector('.add__form');
    }

    _addEvents() {
      this.el.addEventListener('click', this._onClick);
      this.el.addEventListener('submit', this._onSubmit.bind(this));
    }

    _getValueByName(name) {
      return this.el.querySelector(`[name="${name}"]`).value;
    }

    _getData() {
      return {
        href: this._getValueByName('url'),
        anchor: this._getValueByName('anchor'),
        details: this._getValueByName('description')
      };
    }

    _onClick(event) {
      switch(event.target.dataset.action) {
        case 'add':
        case 'close': this._toggleForm();
      }
    }

    _onSubmit(event) {
      event.preventDefault();

      let data = this._getData();

      this.onSubmit(data);
      this.form.reset();
    }

    _toggleForm() {
      this.form.style.display = (this._closed) ? 'block' : 'none';
      this._closed = !this._closed;
      
      if(!this._closed)
        setTimeout(this._setFocus.bind(this), 1);
      
      this.el.querySelector('.form__open').classList.toggle('form__hidden');
      this.el.querySelector('.form__submit').classList.toggle('form__hidden');
      this.el.querySelector('.form__close').classList.toggle('form__hidden');
    }

    _setFocus() {
      this.el.querySelector(`[tabindex="1"]`).focus();
    }

    render() {
      this.el.innerHTML = this.tmpl(this.initData);
/*
      this.el.innerHTML = `<div class="form">
        <div class="form__pad">
          <div class="form__ctrl">
            <span class="form__open" data-action="add">Add</span>
            <button form="add_form" class="form__submit form__hidden" type="submit">
              <span>Append an item</span>
            </button>
            <span class="form__close form__hidden" data-action="close">Cancel</span>
            <form id="add_form" class="add__form form__hidden">
              <div class="form__elem elem__inline">
                <label for="url">URL</label><br />
                <input type="text" name="url" required autofocus placeholder="Your URL" tabindex="1" />
              </div>
              <div class="form__elem elem__inline">
                <label for="anchor">Anchor</label><br />
                <input type="text" name="anchor" required placeholder="Appropriate anchor" tabindex="2" />
              </div><br clear="all" />
              <div class="form__elem">
                <label for="description">Description</label><br />
                <textarea name="description" rows="1" tabindex="3"></textarea>
              </div>
            </form>
          </div>
        </div>
      </div>`;
    */
    }

  }

  // Export
  window.Form = Form;

})(window);