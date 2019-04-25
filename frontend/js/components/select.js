import $ from 'jquery'

import { init } from '../core/events'

init(function (root) {
  $(root).find('select[data-enable-select2]').each(function () {
    $(this).select2({
      theme: 'bootstrap',
      containerCssClass: ':all:',
      dropdownCssClass: function (el) {
        return el[0].className.replace(/\s*form-control\s*/, '')
      }
    })
  })
})
