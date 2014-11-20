(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function(root, $, _) {
    var GMailUI;
    GMailUI = {};
    root.GMailUI = GMailUI;
    GMailUI.Helper = (function() {
      function Helper() {}

      Helper.hover = function(target, hoverClass) {
        target.hover((function(e) {
          target.addClass(hoverClass);
        }), (function(e) {
          target.removeClass(hoverClass);
        }));
      };

      return Helper;

    })();
    GMailUI.UIElement = (function() {
      function UIElement(html) {
        this.setElement(html);
      }

      UIElement.prototype.element = null;

      UIElement.prototype.getElement = function() {
        return this.element;
      };

      UIElement.prototype.setElement = function(e) {
        if (_.isString(e || _.isElement(e))) {
          this.element = $(e);
        } else {
          this.element = e;
        }
        return this.element;
      };

      UIElement.prototype.addClass = function() {
        this.element.addClass.apply(this.element, arguments);
      };

      UIElement.prototype.removeClass = function() {
        this.element.removeClass.apply(this.element, arguments);
      };

      UIElement.prototype.css = function() {
        this.element.css.apply(this.element, arguments);
      };

      UIElement.prototype.show = function() {
        this.element.show();
      };

      UIElement.prototype.hide = function() {
        this.element.hide();
      };

      UIElement.prototype.toggle = function() {
        this.element.toggle.apply(this.element, arguments);
      };

      UIElement.prototype.replaceWith = function(e) {
        if (e instanceof GMailUI.UIElement) {
          this.element.replaceWith(e.getElement());
        } else if (_.isElement) {
          this.element.replaceWith(e);
        } else {
          throw new Error('Unknown element');
        }
        return e;
      };

      return UIElement;

    })();
    GMailUI.Container = (function(_super) {
      __extends(Container, _super);

      function Container(container) {
        this.container = container;
      }

      Container.prototype.setContainer = function(container) {
        this.container = container;
      };

      Container.prototype.getContainer = function() {
        return this.container;
      };

      Container.prototype.append = function(e) {
        if (e instanceof GMailUI.UIElement) {
          this.container.append(e.getElement());
        } else if (_.isElement) {
          this.container.append(e);
        } else {
          throw new Error('Unknown element');
        }
        return e;
      };

      return Container;

    })(GMailUI.UIElement);
    GMailUI.OnAble = (function(_super) {
      __extends(OnAble, _super);

      function OnAble(hoverClass, selectedClass) {
        this.selectedClass = selectedClass;
        this.on = __bind(this.on, this);
        if (hoverClass) {
          GMailUI.Helper.hover(this.getElement(), hoverClass);
        }
      }

      OnAble.prototype.toggle = function(target, selected) {
        target.toggleClass(this.selectedClass, selected);
        target.attr('aria-checked', selected ? 'true' : 'false');
      };

      OnAble.prototype.setSelected = function(selected, exclusive) {
        var target;
        if (exclusive == null) {
          exclusive = false;
        }
        if (!this.selectedClass) {
          throw new Error('Not available for this element');
        }
        target = this.getElement();
        this.toggle(target, selected);
        if (exclusive && selected) {
          this.toggle(target.siblings(), false);
        }
      };

      OnAble.prototype.addOnChange = function(onChange, exclusive) {
        if (exclusive == null) {
          exclusive = false;
        }
        if (!this.selectedClass) {
          throw new Error('Not available for this element');
        }
        this.on('click', (function(_this) {
          return function(e) {
            var checked;
            e = _this.getElement();
            checked = e.hasClass(_this.selectedClass);
            if (exclusive && checked) {
              return;
            }
            if (_this.menu instanceof GMailUI.PopupMenuItem) {
              _this.menu.setSelected(!checked, true);
            }
            _this.setSelected(!checked, exclusive);
            if (typeof onChange === "function") {
              onChange(e, !checked);
            }
          };
        })(this));
      };

      OnAble.prototype.on = function(type, f) {
        var element;
        element = this.getElement();
        return element.on.apply(element, arguments);
      };

      return OnAble;

    })(GMailUI.UIElement);
    GMailUI.Breadcrumbs = (function() {
      function Breadcrumbs() {}

      Breadcrumbs.LIST_SEL = 'ol.gbtc';

      Breadcrumbs.markup = _.template("<li class=\"gbt\">\n  <a href=\"#\" class=\"gbgt\">\n  <span class=\"gbts\">\n    <span><%- label %></span>\n    <% if(isMenu) { %>\n    <span class=\"gbma\"></span>\n    <% } %>\n  </span>\n  </a>\n</li>");

      Breadcrumbs.add = function(label, onClick, isMenu) {
        var item;
        if (isMenu == null) {
          isMenu = true;
        }
        item = $(this.markup({
          label: label,
          isMenu: !!isMenu
        }));
        if (onClick) {
          (item.find('.gbgt')).on('click', onClick);
        }
        item.prependTo($(this.LIST_SEL));
        return item;
      };

      return Breadcrumbs;

    })();
    GMailUI.ModalDialog = (function(_super) {
      __extends(ModalDialog, _super);

      ModalDialog.BG = $("<div class=\"Kj-JD-Jh\" style=\"opacity: 0.75; width: 2560px; height: 2560px; margin-left: -230px; margin-top: -64px;\"></div>");

      ModalDialog.template = _.template("<div class=\"Kj-JD\" tabindex=\"0\" style=\"left: 50%; top: 40%; width: 460px; overflow: visible; margin-left: -230px; margin-top: -64px;\" role=\"dialog\" aria-labelledby=\"<%= id %>\">\n  <div class=\"Kj-JD-K7 Kj-JD-K7-GIHV4\" id=\"<%= id %>\">\n    <span class=\"Kj-JD-K7-K0\" act=\"title\"><%- title %></span>\n    <span class=\"Kj-JD-K7-Jq\" act=\"close\"></span>\n  </div>\n  <div act=\"container\">\n  </div>\n</div>");


      /*
        <div class="Kj-JD-Jz">
          <div id="ri_selecttimezone_invalid" style="margin-bottom: 15px;display:none">
            <div class="asl T-I-J3 J-J5-Ji" style="margin-bottom: -5px;"></div>
            Invalid Date
          </div>
          <div style="float:left;padding-right:10px">
            <label for="ri_selectdate" class="el">Select date</label>
            <br><input id="ri_selectdate" class="rbx nr">
          </div>
          <div style="float:left;padding-right:10px">
            <label for="ri_selecttime" class="el">
              time <span class="font-gray">(24h format)</span>
            </label>
            <br><input id="ri_selecttime" class="rbx nr" style="width:120px" autocomplete="OFF">
          </div>
          <div style="float:left">
            <label for="ri_selecttimezone" class="el">timezone (optional)</label>
            <br><input id="ri_selecttimezone" class="rbx nr" style="width:120px" autocomplete="OFF">
          </div>
          <div style="clear:both;"></div>
        </div>
        <div class="Kj-JD-Jl">
          <button id="ri_b2" class="J-at1-atl"> Add reminder </button>
          <button id="ri_b1" class="J-at1-auR"> Cancel </button>
        </div>
       */

      function ModalDialog(title) {
        this.close = __bind(this.close, this);
        this.setElement(GMailUI.ModalDialog.template({
          id: _.uniqueId('modalDialog-'),
          title: title
        }));
        ModalDialog.__super__.constructor.call(this, this.getElement().find("[act='container']"));
      }

      ModalDialog.prototype.title = function(title) {
        var e;
        e = this.getElement().find("[act='title']");
        return e.text.apply(e, arguments);
      };

      ModalDialog.prototype.open = function() {
        var body, closeButton, element;
        body = $('body');
        GMailUI.ModalDialog.BG.appendTo(body);
        element = this.getElement();
        closeButton = element.find("[act='close']");
        closeButton.on('click', this.close);
        return element.appendTo(body);
      };

      ModalDialog.prototype.close = function() {
        var element;
        element = this.getElement();
        GMailUI.ModalDialog.BG.detach();
        element.remove();
      };

      return ModalDialog;

    })(GMailUI.Container);
    GMailUI.ModalDialog.Container = (function(_super) {
      __extends(Container, _super);

      function Container() {
        Container.__super__.constructor.call(this, this.setElement("<div class=\"Kj-JD-Jz\">"));
      }

      return Container;

    })(GMailUI.Container);
    GMailUI.ModalDialog.Footer = (function(_super) {
      __extends(Footer, _super);

      function Footer() {
        Footer.__super__.constructor.call(this, this.setElement("<div class=\"Kj-JD-Jl\">"));
      }

      return Footer;

    })(GMailUI.Container);
    GMailUI.ModalDialog.Button = (function(_super) {
      __extends(Button, _super);

      Button.template = _.template("<button\n<% if(tooltip) { %>\ndata-tooltip=\"<%- tooltip %>\"\n<% } %>\nclass=\"<%= clazz %>\"><%- label %></button>");

      function Button(label, tooltip, type) {
        if (tooltip == null) {
          tooltip = '';
        }
        if (type == null) {
          type = 'normal';
        }
        this.setElement(GMailUI.ModalDialog.Button.template({
          label: label,
          tooltip: tooltip,
          clazz: (function() {
            switch (type) {
              case 'cancel':
                return 'J-at1-auR';
              default:
                return 'J-at1-atl';
            }
          })()
        }));
      }

      return Button;

    })(GMailUI.OnAble);
    GMailUI.ButtonBar = (function(_super) {
      __extends(ButtonBar, _super);

      function ButtonBar() {
        ButtonBar.__super__.constructor.call(this, this.setElement("<div class=\"G-Ni J-J5-Ji\">"));
      }

      return ButtonBar;

    })(GMailUI.Container);
    GMailUI.Button = (function(_super) {
      __extends(Button, _super);

      Button.template = _.template("<div class=\"J-JK\" role=\"menuitem\" style=\"-webkit-user-select: none;\">\n  <div class=\"J-JK-Jz\"\n    <% if(tooltip) { %>\n      data-tooltip=\"<%- tooltip %>\"\n      aria-label=\"<%- tooltip %>\"\n    <% } %>\n    <% if(title) { %>\n      title=\"<%- title %>\"\n    <% } %>\n    style=\"-webkit-user-select: none;\">\n    <%- label %>\n  </div>\n</div>");

      Button.hoverClass = 'J-JK-JT';

      function Button(label, tooltip, title) {
        var element;
        if (tooltip == null) {
          tooltip = '';
        }
        if (title == null) {
          title = '';
        }
        element = this.setElement(GMailUI.Button.template({
          label: label,
          tooltip: tooltip,
          title: title
        }));
        Button.__super__.constructor.call(this, GMailUI.Button.hoverClass);
      }

      return Button;

    })(GMailUI.OnAble);
    GMailUI.ButtonBarButton = (function(_super) {
      __extends(ButtonBarButton, _super);

      ButtonBarButton.template = _.template("<div class=\"T-I J-J5-Ji T-I-Js-IF ns T-I-ax7 L3\"\n  <% if(tooltip) { %>\n    data-tooltip=\"<%- tooltip %>\"\n    aria-label=\"<%- tooltip %>\"\n  <% } %>\n  <% if(title) { %>\n    title=\"<%- title %>\"\n  <% } %>\n  role=\"button\" tabindex=\"0\" style=\"-webkit-user-select: none;\">\n  <div class=\"asa\">\n    <span class=\"J-J5-Ji ask\">&nbsp;</span>\n    <div class=\"ase T-I-J3 J-J5-Ji\"></div>\n  </div>\n  <div class=\"G-asx T-I-J3 J-J5-Ji\">&nbsp;</div>\n</div>");

      ButtonBarButton.hoverClass = 'T-I-JW';

      ButtonBarButton.pushedClass = 'T-I-Kq';

      function ButtonBarButton(label, tooltip, title) {
        var element;
        if (tooltip == null) {
          tooltip = '';
        }
        if (title == null) {
          title = '';
        }
        element = this.setElement(GMailUI.ButtonBarButton.template({
          label: label,
          tooltip: tooltip,
          title: title
        }));
        ButtonBarButton.__super__.constructor.call(this, GMailUI.ButtonBarButton.hoverClass);
        element.on('mousedown', function(e) {
          e.preventDefault();
        });
        element.on('click', function(e) {
          e.stopPropagation();
        });
      }

      return ButtonBarButton;

    })(GMailUI.OnAble);
    GMailUI.ButtonBarPopupButton = (function(_super) {
      __extends(ButtonBarPopupButton, _super);

      ButtonBarPopupButton.expandedClass = 'T-I-Kq';

      function ButtonBarPopupButton(popup, label, tooltip, title) {
        var element;
        this.popup = popup;
        if (tooltip == null) {
          tooltip = '';
        }
        if (title == null) {
          title = '';
        }
        this.close = __bind(this.close, this);
        ButtonBarPopupButton.__super__.constructor.call(this, label, tooltip, title);
        element = this.getElement();
        element.attr('aria-haspopup', 'true');
        this.on('click', (function(_this) {
          return function(e) {
            var target;
            if (!_this.popup.isAdded) {
              target = element.parent().parent();
              if (_this.popup.isAdded = target.length > 0) {
                target.append(_this.popup.getElement());
              }
            }
            if (_this.popup.getElement().is(':visible')) {
              return _this.close();
            } else {
              ($('body')).on('click', _this.close);
              element.addClass(GMailUI.ButtonBarPopupButton.expandedClass);
              element.attr('aria-expanded', 'true');
              _this.popup.css({
                left: element.parent().position().left,
                top: element.outerHeight()
              });
              return _this.popup.show();
            }
          };
        })(this));
      }

      ButtonBarPopupButton.prototype.close = function() {
        var element;
        ($('body')).off('click', this.close);
        element = this.getElement();
        element.removeClass(GMailUI.ButtonBarPopupButton.expandedClass);
        element.attr('aria-expanded', 'false');
        return this.popup.hide();
      };

      return ButtonBarPopupButton;

    })(GMailUI.ButtonBarButton);
    GMailUI.Popup = (function(_super) {
      __extends(Popup, _super);

      function Popup() {
        var element;
        element = this.setElement("<div class=\"J-M agd jQjAxd J-M-ayU aCP\" style=\"display: none; -webkit-user-select: none;\" role=\"menu\" aria-haspopup=\"true\" aria-activedescendant=\"\">\n  <div class=\"SK AX\" style=\"-webkit-user-select: none;\">\n  </div>\n</div>");
        Popup.__super__.constructor.call(this, element.children());
        element.on('click', function(e) {
          e.stopPropagation();
        });
      }

      return Popup;

    })(GMailUI.Container);
    GMailUI.PopupLabel = (function(_super) {
      __extends(PopupLabel, _super);

      PopupLabel.template = _.template("<div class=\"J-awr J-awr-JE\" aria-disabled=\"true\" style=\"-webkit-user-select: none; \"><%- label %></div>");

      function PopupLabel(label) {
        this.setElement(GMailUI.PopupLabel.template({
          label: label
        }));
      }

      return PopupLabel;

    })(GMailUI.UIElement);
    GMailUI.PopupMenuItem = (function(_super) {
      __extends(PopupMenuItem, _super);

      PopupMenuItem.template = _.template("<div class=\"J-N J-Ks\" role=\"menuitemcheckbox\"\n  <% if(tooltip) { %>\n    data-tooltip=\"<%- tooltip %>\"\n    aria-label=\"<%- tooltip %>\"\n  <% } %>\n  <% if(title) { %>\n    title=\"<%- title %>\"\n  <% } %>\n  style=\"-webkit-user-select: none; \" aria-checked=\"false\">\n  <div class=\"J-N-Jz\">\n    <div class=\"J-N-Jo\"></div>\n    <%- label %>\n    <% if(hasChildren) { %>\n    <span class=\"J-Ph-hFsbo\"></span>\n    <% } %>\n  </div>\n</div>");

      PopupMenuItem.hoverClass = 'J-N-JT';

      PopupMenuItem.selectedClass = 'J-Ks-KO';

      function PopupMenuItem(menu, label, tooltip, title, hasChildren) {
        var element, id;
        this.menu = menu;
        if (tooltip == null) {
          tooltip = '';
        }
        if (title == null) {
          title = '';
        }
        if (hasChildren == null) {
          hasChildren = false;
        }
        this.reposition = __bind(this.reposition, this);
        element = this.setElement(GMailUI.PopupMenuItem.template({
          label: label,
          tooltip: tooltip,
          title: title,
          hasChildren: hasChildren
        }));
        PopupMenuItem.__super__.constructor.call(this, GMailUI.PopupMenuItem.hoverClass, GMailUI.PopupMenuItem.selectedClass);
        element.on('mousedown', function(e) {
          e.preventDefault();
        });
        if (this.menu instanceof GMailUI.PopupMenu) {
          id = _.uniqueId('PopupMenuItem-');
          element.attr('id', id);
          element.hover(((function(_this) {
            return function(e) {
              var target;
              if (!_this.menu.isAdded) {
                target = _this.getMenuTarget().parent();
                if (_this.menu.isAdded = target.length > 0) {
                  target.append(_this.menu.getElement());
                }
              }
              _this.menu.getElement().attr('aria-activedescendant', id);
              _this.menu.inMenu = true;
              _.delay((function() {
                if (!_this.menu.inMenu) {
                  return;
                }
                _this.reposition();
                _this.menu.show();
              }), _this.menu.delay);
            };
          })(this)), ((function(_this) {
            return function(e) {
              _this.menu.inMenu = false;
              _.delay(_this.menu.hideMenu, _this.menu.delay);
            };
          })(this)));
        }
      }

      PopupMenuItem.prototype.getMenuTarget = function() {
        return this.menu.parent.getElement();
      };

      PopupMenuItem.prototype.reposition = function() {
        var element, popup, ppos;
        element = this.getElement();
        popup = this.getMenuTarget();
        ppos = popup.position();
        this.menu.css({
          top: element.position().top + ppos.top,
          left: ppos.left + popup.outerWidth()
        });
      };

      return PopupMenuItem;

    })(GMailUI.OnAble);
    GMailUI.Section = (function(_super) {
      __extends(Section, _super);

      function Section() {
        Section.__super__.constructor.call(this, this.setElement("<div style=\"-webkit-user-select: none;\"></div>"));
      }

      return Section;

    })(GMailUI.Container);
    GMailUI.Separator = (function(_super) {
      __extends(Separator, _super);

      function Separator() {
        this.setElement("<div class=\"J-Kh\" style=\"-webkit-user-select: none;\" role=\"separator\"></div>");
      }

      return Separator;

    })(GMailUI.UIElement);
    GMailUI.ErrorSection = (function(_super) {
      __extends(ErrorSection, _super);

      ErrorSection.template = _.template("<div class=\"asd ja\" style=\"-webkit-user-select: none; \">\n  <%- message %>\n</div>");

      function ErrorSection(message) {
        var element;
        ErrorSection.__super__.constructor.call(this);
        element = this.getElement();
        element.addClass('b7o7Ic');
        this.append(new GMailUI.Separator);
        this.setContainer(element.append($(GMailUI.ErrorSection.template({
          message: message
        }))));
      }

      ErrorSection.prototype.setMessage = function(message) {
        this.getContainer().html(message);
      };

      return ErrorSection;

    })(GMailUI.Section);
    GMailUI.PopupMenu = (function(_super) {
      __extends(PopupMenu, _super);

      PopupMenu.template = "<div class=\"J-M J-M-ayU\" style=\"-webkit-user-select: none; display: none; \" role=\"menu\" aria-haspopup=\"true\" aria-activedescendant=\"\">\n</div>";

      PopupMenu.prototype.delay = 300;

      PopupMenu.prototype.inMenu = false;

      function PopupMenu(parent) {
        var element;
        this.parent = parent;
        this.hideMenu = __bind(this.hideMenu, this);
        PopupMenu.__super__.constructor.call(this, this.setElement($(GMailUI.PopupMenu.template)));
        element = this.getElement();
        element.on('click', function(e) {
          e.stopPropagation();
        });
        element.hover(((function(_this) {
          return function(e) {
            _this.inMenu = true;
          };
        })(this)), ((function(_this) {
          return function(e) {
            _this.inMenu = false;
            _.delay(_this.hideMenu, _this.delay);
          };
        })(this)));
      }

      PopupMenu.prototype.hideMenu = function() {
        if (this.inMenu) {
          return;
        }
        this.close();
      };

      PopupMenu.prototype.show = function() {
        if (typeof this.onShow === "function") {
          this.onShow();
        }
        PopupMenu.__super__.show.call(this);
      };

      PopupMenu.prototype.onShow = function() {};

      PopupMenu.prototype.close = function() {
        this.getElement().attr('aria-activedescendant', null);
        this.hide();
      };

      return PopupMenu;

    })(GMailUI.Container);
    GMailUI.RawHTML = (function(_super) {
      __extends(RawHTML, _super);

      function RawHTML(html) {
        RawHTML.__super__.constructor.call(this, html);
      }

      return RawHTML;

    })(GMailUI.UIElement);
    return GMailUI.PopupCheckbox = (function(_super) {
      __extends(PopupCheckbox, _super);

      PopupCheckbox.template = _.template("<div class=\"J-LC\" aria-checked=\"false\" role=\"menuitem\"\n  <% if(tooltip) { %>\n    data-tooltip=\"<%- tooltip %>\"\n    aria-label=\"<%- tooltip %>\"\n  <% } %>\n  <% if(title) { %>\n    title=\"<%- title %>\"\n  <% } %>\n  style=\"-webkit-user-select: none;\">\n  <div class=\"J-LC-Jz\" style=\"-webkit-user-select: none;\">\n    <div class=\"J-LC-Jo J-J5-Ji\" style=\"-webkit-user-select: none;\"></div><%- label %>\n  </div>\n</div>");

      PopupCheckbox.hoverClass = 'J-LC-JT';

      PopupCheckbox.selectedClass = 'J-LC-JR-Jp';

      function PopupCheckbox(label, selected, tooltip, title) {
        var element;
        if (selected == null) {
          selected = false;
        }
        if (tooltip == null) {
          tooltip = '';
        }
        if (title == null) {
          title = '';
        }
        element = this.setElement(GMailUI.PopupCheckbox.template({
          label: label,
          title: title,
          tooltip: tooltip
        }));
        PopupCheckbox.__super__.constructor.call(this, GMailUI.PopupCheckbox.hoverClass, GMailUI.PopupCheckbox.selectedClass);
        this.setSelected(selected);
      }

      return PopupCheckbox;

    })(GMailUI.OnAble);
  })(this, jQuery, _);

}).call(this);

//# sourceMappingURL=gmailui.js.map
