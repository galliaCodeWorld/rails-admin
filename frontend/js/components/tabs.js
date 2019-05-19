import $ from 'jquery'

import { init, ready } from '../core/events'

const TAB_SELECTOR = 'a[data-toggle="tab"]'
const TAB_PANE_SELECTOR = '.tab-pane'
const ERROR_SELECTOR = '.is-invalid'

// Save active tab to URL hash
init(function (root) {
  $(root).find(TAB_SELECTOR).on('shown.bs.tab', function (e) {
    const hash = $(this).attr('href')
    const withinModal = $(this).closest('.modal').length > 0

    if (hash.substr(0, 1) === '#' && !withinModal) {
      history.replaceState({ turbolinks: {} }, '', '#!' + hash.substr(1))
    }
  })
})

// Restore active tab when loading
ready(function () {
  focusActiveTab()
})

// Add error count to tabs
init(function (root) {
  $(root).find(TAB_PANE_SELECTOR).each(function () {
    const errorCount = $(this).find(ERROR_SELECTOR).length

    if (errorCount > 0) {
      const badge = $('<span>').addClass('badge badge-danger badge-pill').text(errorCount)
      const id = $(this).attr('id')
      const selector = `${TAB_SELECTOR}[href='#${id}']`

      $(selector).append(badge)
    }
  })
})

export function focusTab (id) {
  const selector = `${TAB_SELECTOR}[href='#${id}']`
  $(selector).tab('show')
}

export function focusActiveTab () {
  if (location.hash.substr(0, 2) === '#!') {
    // Focus on active tab from URL
    focusTab(location.hash.substr(2))
  } else {
    const $errorTabs = $(`${TAB_PANE_SELECTOR}:has(${ERROR_SELECTOR})`)

    if ($errorTabs.length) {
      focusTab($errorTabs.first().attr('id'))
    }
  }
}
