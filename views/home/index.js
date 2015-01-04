define(function(require, exports, module) {

  var $ = require('jquery'),
      $document = $(document),
      $view
      
  var text = $(this).text(),
      isPreview = true;

  function init() {
    setHeight()
    registerEvents()
  }

  function setHeight() {
    var windowHeight = $document.height()

    $('#body').height(windowHeight)
  }

  function registerEvents() {
    // btn preview click
    $document.delegate('#btn-preview', 'click', function() {
      if (isPreview) {
        previewMarkDown()
      } else {
        returnToForm()
      }
    })
  }

  function previewMarkDown() {
    hideForm()
    loading(true)
    ajaxContent()
  }

  function hideForm() {
    var $form = $('.container')
    $form.children('.belong-form').hide()
  }

  function loading(start) {
    var $spinner = $('.spinner')
        $commitBar = $('.commit-bar')
        elements = {
          spinner: $spinner,
          dot1: $spinner.find('.dot1'),
          dot2: $spinner.find('.dot2')
        }

    if (start) {
      $spinner.show()
      $commitBar.hide()
      animateStart(elements)
    } else {
      $spinner.hide()
      $commitBar.show()
      animateEnd(elements)
    }
  }

  function animateStart() {
    elements.spinner.addClass('rotate-spinner')
    elements.dot1.addClass('bounce-dot')
    elements.dot2.addClass('bounce-dot')
  }

  function animateEnd() {
    elements.spinner.removeClass('rotate-spinner')
    elements.dot1.removeClass('bounce-dot')
    elements.dot2.removeClass('bounce-dot') 
  }

  function ajaxContent() {
    var title = $('#blog-title').val()
        content = $('#blog-content').val()

    $.ajax({
      url: '/mark',
      type: 'POST',
      data: {
        title: title,
        content: content
      },
      success: renderMarkDown
    })
  }

  function renderMarkDown(data) {
    previewBtnToggle()
    loading(false)
    render(data)
  }

  function previewBtnToggle() {
    var $previewBtn = $('#btn-preview')

    if (isPreview) {
      $previewBtn.text('Cancel')
      isPreview = false
    } else {
      $previewBtn.text('Preview')
      isPreview = true
    }
  }

  function render(data) {
    var $viewWrap = $('.view-preview')
        
    $view = $(data)
    $view.appendTo($viewWrap)
  }

  function returnToForm() {
    var $form = $('.container')

    $view.remove()
    previewBtnToggle()
    $form.children('.belong-form').show()
  }

	module.exports = init
})