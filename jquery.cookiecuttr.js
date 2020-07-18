/**
 * Copyright (C) 2012 Chris Wharton (chris@weare2ndfloor.com)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
 * HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
 * FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
 * OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
 * COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
 * BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
 * DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://gnu.org/licenses/>.

 Documentation available at http://cookiecuttr.com

 */
(function($) {
  $.cookieCuttr = function(options) {
    var defaults = {
      cookieCutter: false, // you'd like to enable the div/section/span etc. hide feature? change this to true
      cookieCutterDeclineOnly: false, // you'd like the CookieCutter to only hide when someone has clicked declined set this to true
      cookieAnalytics: true, // just using a simple analytics package? change this to true
      cookieDeclineButton: false, // this will disable non essential cookies
      cookieAcceptButton: true, // this will enable cookies
      cookieResetButton: false,
      cookieOverlayEnabled: false, // don't want a discreet toolbar? Fine, set this to true
      cookieReloadOnAction: true, // whether to reload the page (to activate cookies) when accept/decline/reset buttons are clicked
      cookiePolicyLink: '/privacy-policy/', // if applicable, enter the link to your privacy policy here...
      cookieNameAccept: 'cc_cookie_accept',
      cookieNameDecline: 'cc_cookie_decline',
      cookieButtonClassName: 'button', // defaults to button
      cookieAcceptButtonClassName: 'cc-cookie-accept',
      cookieDeclineButtonClassName: 'cc-cookie-decline',
      cookieResetButtonClassName: 'cc-cookie-reset',
      cookieMessage: 'We use cookies on this website, you can <a href="{{cookiePolicyLink}}" title="read about our cookies">read about them here</a>. To use the website as intended please...',
      cookieAnalyticsMessage: 'We use cookies, just to track visits to our website, we store no personal details.',
      cookieErrorMessage: "We\'re sorry, this feature places cookies in your browser and has been disabled. <br>To continue using this functionality, please",
      cookieWhatAreTheyLink: "http://www.allaboutcookies.org/",
      cookieWhatAreTheyLinkTitle: "Visit All about cookies (External link)",
      cookieDisable: '',
      cookieExpires: 365,
      cookieAcceptButtonText: "ACCEPT COOKIES",
      cookieDeclineButtonText: "DECLINE COOKIES",
      cookieResetButtonText: "RESET COOKIES FOR THIS WEBSITE",
      cookieWhatAreLinkText: "What are cookies?",
      cookieNotificationLocationBottom: false, // top or bottom - they are your only options, so true for bottom, false for top
      cookiePolicyPage: false,
      cookiePolicyPageMessage: 'Please read the information below and then choose from the following options',
      cookieDiscreetLink: false,
      cookieDiscreetReset: false,
      cookieDiscreetLinkText: "Cookies?",
      cookieDiscreetPosition: "topleft", //options: topleft, topright, bottomleft, bottomright
      cookieNoMessage: false, // change to true hide message from all pages apart from your policy page
      cookieDomain: ""
    };
    options = $.extend(defaults, options);
    //convert options
    var cookiePolicyLinkIn = options.cookiePolicyLink;
    var cookieCutter = options.cookieCutter;
    var cookieCutterDeclineOnly = options.cookieCutterDeclineOnly;
    var cookieAnalytics = options.cookieAnalytics;
    var cookieDeclineButton = options.cookieDeclineButton;
    var cookieAcceptButton = options.cookieAcceptButton;
    var cookieButtonClassName = options.cookieButtonClassName;
    var cookieAcceptButtonClassName = options.cookieAcceptButtonClassName;
    var cookieDeclineButtonClassName = options.cookieDeclineButtonClassName;
    var cookieResetButton = options.cookieResetButton;
    var cookieResetButtonClassName = options.cookieResetButtonClassName;
    var cookieOverlayEnabled = options.cookieOverlayEnabled;
    var cookieReloadOnAction = options.cookieReloadOnAction;
    var cookiePolicyLink = options.cookiePolicyLink;
    var cookieNameAccept = options.cookieNameAccept;
    var cookieNameDecline = options.cookieNameDecline;
    var cookieMessage = options.cookieMessage.replace('{{cookiePolicyLink}}', cookiePolicyLink);
    var cookieAnalyticsMessage = options.cookieAnalyticsMessage;
    var cookieErrorMessage = options.cookieErrorMessage;
    var cookieDisable = options.cookieDisable;
    var cookieWhatAreTheyLink = options.cookieWhatAreTheyLink;
    var cookieWhatAreTheyLinkTitle = options.cookieWhatAreTheyLinkTitle;
    var cookieExpires = options.cookieExpires;
    var cookieAcceptButtonText = options.cookieAcceptButtonText;
    var cookieDeclineButtonText = options.cookieDeclineButtonText;
    var cookieResetButtonText = options.cookieResetButtonText;
    var cookieWhatAreLinkText = options.cookieWhatAreLinkText;
    var cookieNotificationLocationBottom = options.cookieNotificationLocationBottom;
    var cookiePolicyPage = options.cookiePolicyPage;
    var cookiePolicyPageMessage = options.cookiePolicyPageMessage;
    var cookieDiscreetLink = options.cookieDiscreetLink;
    var cookieDiscreetReset = options.cookieDiscreetReset;
    var cookieDiscreetLinkText = options.cookieDiscreetLinkText;
    var cookieDiscreetPosition = options.cookieDiscreetPosition;
    var cookieNoMessage = options.cookieNoMessage;
    // cookie identifier
    var $cookieAccepted = (Cookies.get(cookieNameAccept) === cookieNameAccept);
    $.cookieAccepted = function() {
      return $cookieAccepted;
    };
    var $cookieDeclined = (Cookies.get(cookieNameDecline) === cookieNameDecline);
    $.cookieDeclined = function() {
      return $cookieDeclined;
    };
    var cookieAccept = '', cookieDecline = '', cookieOverlay = '', appOrPre = false;
    // write cookie accept button
    if (cookieAcceptButton) {
      cookieAccept = ' <a href="#accept" class="' + cookieButtonClassName + ' ' + cookieAcceptButtonClassName + '">' +
                     cookieAcceptButtonText + '</a> ';
    }
    // write cookie decline button
    if (cookieDeclineButton) {
      cookieDecline = ' <a href="#decline" class="' + cookieButtonClassName + ' ' + cookieDeclineButtonClassName + '">' +
                      cookieDeclineButtonText + '</a> ';
    }
    // write extra class for overlay
    if (cookieOverlayEnabled) {
      cookieOverlay = 'cc-overlay';
    }
    // to prepend or append, that is the question?
    if (cookieNotificationLocationBottom || (cookieDiscreetPosition === "bottomright") || (cookieDiscreetPosition === "bottomleft")) {
      appOrPre = true;
    }
    if ($cookieAccepted || $cookieDeclined) {
      // write cookie reset button
      if (cookieResetButton && cookieDiscreetReset) {
        if (appOrPre) {
          $('body').append('<div class="cc-cookies cc-discreet"><a class="' + cookieButtonClassName + ' ' + cookieResetButtonClassName + '" href="#" title="' + cookieResetButtonText + '">' + cookieResetButtonText + '</a></div>');
        } else {
          $('body').prepend('<div class="cc-cookies cc-discreet"><a class="' + cookieButtonClassName + ' ' + cookieResetButtonClassName + '" href="#" title="' + cookieResetButtonText + '">' + cookieResetButtonText + '</a></div>');
        }
        //add appropriate CSS depending on position chosen
        switch (cookieDiscreetPosition) {
          case "topleft":
            $('div.cc-cookies').css({"top": "0", "left": "0"});
            break;
          case "topright":
            $('div.cc-cookies').css({"top": "0", "right": "0"});
            break;
          case "bottomleft":
            $('div.cc-cookies').css({"bottom": "0", "left": "0"});
            break;
          case "bottomright":
            $('div.cc-cookies').css({"bottom": "0", "right": "0"});
            break;
        }
      } else if (cookieResetButton) {
        if (appOrPre) {
          $('body').append('<div class="cc-cookies"><a href="#" class="' + cookieButtonClassName + ' ' + cookieResetButtonClassName + '">' + cookieResetButtonText + '</a></div>');
        } else {
          $('body').prepend('<div class="cc-cookies"><a href="#" class="' + cookieButtonClassName + ' ' + cookieResetButtonClassName + '">' + cookieResetButtonText + '</a></div>');
        }
      } else {
        var cookieResetButton = "";
      }
    } else {
      // add message to just after opening body tag
      if (cookieNoMessage && !cookiePolicyPage) {
        // show no link on any pages APART from the policy page
      } else if (cookieDiscreetLink && !cookiePolicyPage) { // show discreet link
        if (appOrPre) {
          $('body').append('<div class="cc-cookies cc-discreet"><a href="' + cookiePolicyLinkIn + '" title="' + cookieDiscreetLinkText + '">' + cookieDiscreetLinkText + '</a></div>');
        } else {
          $('body').prepend('<div class="cc-cookies cc-discreet"><a href="' + cookiePolicyLinkIn + '" title="' + cookieDiscreetLinkText + '">' + cookieDiscreetLinkText + '</a></div>');
        }
        //add appropriate CSS depending on position chosen
        switch (cookieDiscreetPosition) {
          case "topleft":
            $('div.cc-cookies').css({"top": "0", "left": "0"});
            break;
          case "topright":
            $('div.cc-cookies').css({"top": "0", "right": "0"});
            break;
          case "bottomleft":
            $('div.cc-cookies').css({"bottom": "0", "left": "0"});
            break;
          case "bottomright":
            $('div.cc-cookies').css({"bottom": "0", "right": "0"});
            break;
        }
      } else if (cookieAnalytics) { // show analytics overlay
        if (appOrPre) {
          $('body').append('<div class="cc-cookies ' + cookieOverlay + '">' + cookieAnalyticsMessage + cookieAccept + cookieDecline + '<a href="' + cookieWhatAreTheyLink + '" title="' + cookieWhatAreTheyLinkTitle + '">' + cookieWhatAreLinkText + '</a></div>');
        } else {
          $('body').prepend('<div class="cc-cookies ' + cookieOverlay + '">' + cookieAnalyticsMessage + cookieAccept + cookieDecline + '<a href="' + cookieWhatAreTheyLink + '" title="' + cookieWhatAreTheyLinkTitle + '">' + cookieWhatAreLinkText + '</a></div>');
        }
      }
      if (cookiePolicyPage) { // show policy page overlay
        if (appOrPre) {
          $('body').append('<div class="cc-cookies ' + cookieOverlay + '">' + cookiePolicyPageMessage + " " + ' <a href="#accept" class="' + cookieButtonClassName + ' ' + cookieAcceptButtonClassName + '">' + cookieAcceptButtonText + '</a> ' + ' <a href="#decline" class="' + cookieButtonClassName + ' ' + cookieDeclineButtonClassName + '">' + cookieDeclineButtonText + '</a> ' + '</div>');
        } else {
          $('body').prepend('<div class="cc-cookies ' + cookieOverlay + '">' + cookiePolicyPageMessage + " " + ' <a href="#accept" class="' + cookieButtonClassName + ' ' + cookieAcceptButtonClassName + '">' + cookieAcceptButtonText + '</a> ' + ' <a href="#decline" class="' + cookieButtonClassName + ' ' + cookieDeclineButtonClassName + '">' + cookieDeclineButtonText + '</a> ' + '</div>');
        }
      } else if (!cookieAnalytics && !cookieDiscreetLink) { // show privacy policy option
        if (appOrPre) {
          $('body').append('<div class="cc-cookies ' + cookieOverlay + '">' + cookieMessage + cookieAccept + cookieDecline + '</div>');
        } else {
          $('body').prepend('<div class="cc-cookies ' + cookieOverlay + '">' + cookieMessage + cookieAccept + cookieDecline + '</div>');
        }
      }
    }
    if (cookieCutter) {
      if (
          (!cookieCutterDeclineOnly && ($cookieDeclined || !$cookieAccepted)) ||
          (cookieCutterDeclineOnly && $cookieDeclined)
      ) {
        $(cookieDisable).html('<div class="cc-cookies-error">' + cookieErrorMessage + ' <a href="#accept" class="' + cookieButtonClassName + ' ' + cookieAcceptButtonClassName + '">' + cookieAcceptButtonText + '</a> ' + '</div>');
      }
    }
    // if bottom is true, switch div to bottom if not in discreet mode
    if (cookieNotificationLocationBottom && (!cookieDiscreetLink || (cookieDiscreetLink && cookiePolicyPage))) {
      $('div.cc-cookies').css({ "top": "auto", "bottom": "0" });
    }
    // setting the cookies

    // for top bar
    $('.' + cookieButtonClassName + '.' + cookieAcceptButtonClassName + ', .' + cookieButtonClassName + '.' + cookieDeclineButtonClassName).on('click', function(e) {
      e.preventDefault();
      if ($(this).is('[href$="#decline"]')) {
        Cookies.set(cookieNameAccept, null, {
          path: '/'
        });
        Cookies.set(cookieNameDecline, cookieNameDecline, {
          expires: cookieExpires,
          path: '/'
        });
        if (options.cookieDomain) {
          // kill google analytics cookies
          ["__utma", "__utmb", "__utmc", "__utmz"].forEach(function(gaCookieName) {
            Cookies.set(gaCookieName, null, {
              domain: '.' + options.cookieDomain,
              path: '/'
            });
          });
        }
      } else {
        Cookies.set(cookieNameDecline, null, {
          path: '/'
        });
        Cookies.set(cookieNameAccept, cookieNameAccept, {
          expires: cookieExpires,
          path: '/'
        });
      }
      $(".cc-cookies").fadeOut(function() {
        if (cookieReloadOnAction) {
        // reload page to activate cookies
        location.reload();
        }
      });
    });
    //reset cookies
    $('a.' + cookieButtonClassName + '.' + cookieResetButtonClassName).on('click', function(f) {
      f.preventDefault();
      Cookies.set(cookieNameAccept, null, {
        path: '/'
      });
      Cookies.set(cookieNameDecline, null, {
        path: '/'
      });
      $(".cc-cookies").fadeOut(function() {
        if (cookieReloadOnAction) {
        // reload page to activate cookies
        location.reload();
        }
      });
    });
    //cookie error accept
    $('.cc-cookies-error a.' + cookieButtonClassName + '.' + cookieAcceptButtonClassName).on('click', function(g) {
      g.preventDefault();
      Cookies.set(cookieNameAccept, cookieNameAccept, {
        expires: cookieExpires,
        path: '/'
      });
      Cookies.set(cookieNameDecline, null, {
        path: '/'
      });
      if (cookieReloadOnAction) {
      // reload page to activate cookies
      location.reload();
      }
    });
  };
  // Hack to enforce compatibility with webpack
  if (typeof module !== 'undefined' && module !== null && module.exports) {
    module.exports = $.cookieCuttr;
  }
})(jQuery);
