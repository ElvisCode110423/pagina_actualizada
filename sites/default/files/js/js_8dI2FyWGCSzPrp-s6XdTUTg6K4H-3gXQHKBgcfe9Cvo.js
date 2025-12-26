/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;
(function ($) {

/**
 * This script transforms a set of fieldsets into a stack of horizontal
 * tabs. Another tab pane can be selected by clicking on the respective
 * tab.
 *
 * Each tab may have a summary which can be updated by another
 * script. For that to work, each fieldset has an associated
 * 'horizontalTabCallback' (with jQuery.data() attached to the fieldset),
 * which is called every time the user performs an update to a form
 * element inside the tab pane.
 */
Drupal.behaviors.horizontalTabs = {
  attach: function (context) {
    $('.horizontal-tabs-panes', context).once('horizontal-tabs', function () {
      var focusID = $(':hidden.horizontal-tabs-active-tab', this).val();
      var tab_focus;

      // Check if there are some fieldsets that can be converted to horizontal-tabs
      var $fieldsets = $('> fieldset', this);
      if ($fieldsets.length == 0) {
        return;
      }

      // Create the tab column.
      var tab_list = $('<ul class="horizontal-tabs-list"></ul>');
      $(this).wrap('<div class="horizontal-tabs clearfix"></div>').before(tab_list);

      // Transform each fieldset into a tab.
      $fieldsets.each(function (i) {
        var $legend = $('> legend', this);
        $('.element-invisible', $legend).remove();
        var horizontal_tab = new Drupal.horizontalTab({
          title: $legend.text(),
          fieldset: $(this)
        });
        horizontal_tab.item.addClass('horizontal-tab-button-' + i);
        tab_list.append(horizontal_tab.item);
        $(this)
          .removeClass('collapsible collapsed')
          .addClass('horizontal-tabs-pane')
          .data('horizontalTab', horizontal_tab);
        if (this.id == focusID) {
          tab_focus = $(this);
        }
      });

      $('> li:first', tab_list).addClass('first');
      $('> li:last', tab_list).addClass('last');

      if (!tab_focus) {
        // If the current URL has a fragment and one of the tabs contains an
        // element that matches the URL fragment, activate that tab.
        // Before we filter out all unwanted characters that might crash with
        // jQuery
        var hash = window.location.hash.replace(/[^a-zA-Z0-9-_]/g, "");
        if (hash !== '#' && $(hash, this).length) {
          tab_focus = $(hash, this).closest('.horizontal-tabs-pane');
        }
        else {
          tab_focus = $('> .horizontal-tabs-pane:first', this);
        }
      }
      if (tab_focus.length) {
        tab_focus.data('horizontalTab').focus();
      }
    });
  }
};

/**
 * The horizontal tab object represents a single tab within a tab group.
 *
 * @param settings
 *   An object with the following keys:
 *   - title: The name of the tab.
 *   - fieldset: The jQuery object of the fieldset that is the tab pane.
 */
Drupal.horizontalTab = function (settings) {
  var self = this;
  $.extend(this, settings, Drupal.theme('horizontalTab', settings));

  this.link.click(function () {
    self.focus();
    return false;
  });

  // Keyboard events added:
  // Pressing the Enter key will open the tab pane.
  this.link.keydown(function(event) {
    if (event.keyCode == 13) {
      self.focus();
      // Set focus on the first input field of the visible fieldset/tab pane.
      $("fieldset.horizontal-tabs-pane :input:visible:enabled:first").focus();
      return false;
    }
  });

  // Only bind update summary on forms.
  if (this.fieldset.drupalGetSummary) {
    this.fieldset.bind('summaryUpdated', function() {
      self.updateSummary();
    }).trigger('summaryUpdated');
  }

};

Drupal.horizontalTab.prototype = {
  /**
   * Displays the tab's content pane.
   */
  focus: function () {
    this.fieldset
      .removeClass('horizontal-tab-hidden')
      .siblings('fieldset.horizontal-tabs-pane')
        .each(function () {
          var tab = $(this).data('horizontalTab');
          tab.fieldset.addClass('horizontal-tab-hidden');
          tab.item.removeClass('selected');
        })
        .end()
      .siblings(':hidden.horizontal-tabs-active-tab')
        .val(this.fieldset.attr('id'));
    this.item.addClass('selected');
    // Mark the active tab for screen readers.
    $('#active-horizontal-tab').remove();
    this.link.append('<span id="active-horizontal-tab" class="element-invisible">' + Drupal.t('(active tab)') + '</span>');
  },

  /**
   * Updates the tab's summary.
   */
  updateSummary: function () {
    this.summary.html(this.fieldset.drupalGetSummary());
  },

  /**
   * Shows a horizontal tab pane.
   */
  tabShow: function () {
    // Display the tab.
    this.item.removeClass('horizontal-tab-hidden');
    // Update .first marker for items. We need recurse from parent to retain the
    // actual DOM element order as jQuery implements sortOrder, but not as public
    // method.
    this.item.parent().children('.horizontal-tab-button').removeClass('first')
      .filter(':visible:first').addClass('first');
    // Display the fieldset.
    this.fieldset.removeClass('horizontal-tab-hidden');
    // Focus this tab.
    this.focus();
    return this;
  },

  /**
   * Hides a horizontal tab pane.
   */
  tabHide: function () {
    // Hide this tab.
    this.item.addClass('horizontal-tab-hidden');
    // Update .first marker for items. We need recurse from parent to retain the
    // actual DOM element order as jQuery implements sortOrder, but not as public
    // method.
    this.item.parent().children('.horizontal-tab-button').removeClass('first')
      .filter(':visible:first').addClass('first');
    // Hide the fieldset.
    this.fieldset.addClass('horizontal-tab-hidden');
    // Focus the first visible tab (if there is one).
    var $firstTab = this.fieldset.siblings('.horizontal-tabs-pane:not(.horizontal-tab-hidden):first');
    if ($firstTab.length) {
      $firstTab.data('horizontalTab').focus();
    }
    return this;
  }
};

/**
 * Theme function for a horizontal tab.
 *
 * @param settings
 *   An object with the following keys:
 *   - title: The name of the tab.
 * @return
 *   This function has to return an object with at least these keys:
 *   - item: The root tab jQuery element
 *   - link: The anchor tag that acts as the clickable area of the tab
 *       (jQuery version)
 *   - summary: The jQuery element that contains the tab summary
 */
Drupal.theme.prototype.horizontalTab = function (settings) {
  var tab = {};
  var idAttr = settings.fieldset.attr('id');

  tab.item = $('<li class="horizontal-tab-button" tabindex="-1"></li>')
    .append(tab.link = $('<a href="#' + idAttr + '"></a>')
    .append(tab.title = $('<strong></strong>').text(settings.title))
    );

  // No need to add summary on frontend.
  if (settings.fieldset.drupalGetSummary) {
    tab.link.append(tab.summary = $('<span class="summary"></span>'))
    }

  return tab;
};

})(jQuery);
;
(function ($) {

/**
 * Prevents consecutive form submissions of identical form values.
 *
 * Repetitive form submissions that would submit the identical form values are
 * prevented, unless the form values are different from the previously
 * submitted values.
 *
 * This is a simplified re-implementation of a user-agent behavior that should
 * be natively supported by major web browsers, but at this time, only Firefox
 * has a built-in protection.
 *
 * A form value-based approach ensures that the constraint is triggered for
 * consecutive, identical form submissions only. Compared to that, a form
 * button-based approach would (1) rely on [visible] buttons to exist where
 * technically not required and (2) require more complex state management if
 * there are multiple buttons in a form.
 *
 * This implementation is based on form-level submit events only and relies on
 * jQuery's serialize() method to determine submitted form values. As such, the
 * following limitations exist:
 *
 * - Event handlers on form buttons that preventDefault() do not receive a
 *   double-submit protection. That is deemed to be fine, since such button
 *   events typically trigger reversible client-side or server-side operations
 *   that are local to the context of a form only.
 * - Changed values in advanced form controls, such as file inputs, are not part
 *   of the form values being compared between consecutive form submits (due to
 *   limitations of jQuery.serialize()). That is deemed to be acceptable,
 *   because if the user forgot to attach a file, then the size of HTTP payload
 *   will most likely be small enough to be fully passed to the server endpoint
 *   within (milli)seconds. If a user mistakenly attached a wrong file and is
 *   technically versed enough to cancel the form submission (and HTTP payload)
 *   in order to attach a different file, then that edge-case is not supported
 *   here.
 *
 * Lastly, all forms submitted via HTTP GET are idempotent by definition of HTTP
 * standards, so excluded in this implementation.
 */
Drupal.behaviors.formSingleSubmit = {
  attach: function () {
    function onFormSubmit (e) {
      var $form = $(e.currentTarget);
      var formValues = $form.serialize();
      var previousValues = $form.attr('data-drupal-form-submit-last');
      if (previousValues === formValues) {
        e.preventDefault();
      }
      else {
        $form.attr('data-drupal-form-submit-last', formValues);
      }
    }

    $('body').once('form-single-submit')
      .delegate('form:not([method~="GET"])', 'submit.singleSubmit', onFormSubmit);
  }
};

})(jQuery);
;
