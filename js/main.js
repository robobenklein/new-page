(function() {
  var c = angular.module("beyond", []),
    g = ["b1.jpg", "b2.jpg", "b3.jpg", "b4.jpg", "b5.jpg"],
    h = "l1.jpg l2.jpg l3.jpg l4.jpg l5.jpg l6.jpg l7.jpg l8.jpg l9.jpg l10.jpg l11.jpg".split(" "),
    k = "d1.jpg d2.jpg d3.jpg d4.jpg d5.jpg d6.jpg d7.jpg d8.jpg d9.jpg d10.jpg d11.jpg d12.jpg".split(" ");

  function p(a, z) {
    function r(b) {
      b ? (authToken = b, gapi.config.update("googleapis.config/auth/useFirstPartyAuth", !0), gapi.config.update("googleapis.config/auth/useFirstPartyAuthV2", !0), gapi.client.setApiKey("AIzaSyDTJMEt0xU7d0PuFT04HApPMGQJXtvif90"), gapi.auth.setToken({
        access_token: authToken
      }), a.$apply(function() {
        a.notAuth = !1
      }), gapi.client.request({
        root: "https://beyond-pa.clients6.google.com",
        path: "/v1/beyondmode/"
      }).then(function(b) {
        b = b.result;
        if (b.side !== a.side) {
          var e = b.side || "OFF";
          window.localStorage.setItem("side",
            e);
          a.$apply(function() {
            a.side = e;
            a.notChosen = "OFF" === e;
            m()
          })
        }
      })) : a.$apply(function() {
        a.notAuth = !0
      })
    }

    function t() {
      var b;
      if (5 < u) return "img/bg-split.jpg";
      if ("LIGHT" === a.side) b = h.concat(g);
      else if ("DARK" === a.side) b = k.concat(g);
      else return "img/bg-split.jpg";
      return "https://www.gstatic.com/beyond/img/" + b[Math.floor(Math.random() * b.length)]
    }

    function A(a) {
      var d = a.currentTarget,
        e = d.href;
      d.href && !d.classList.contains("menu__item--side") && window.chrome && chrome.tabs && ("_blank" === d.target ? chrome.tabs.create({
          url: e
        }) :
        chrome.tabs.update({
          url: e
        }), a.preventDefault())
    }

    function m() {
      var b = t();
      if ("img/bg-split.jpg" === b) a.background0 = "img/bg-split.jpg", a.background1 = "img/bg-split.jpg";
      else {
        for (; b === a.background0 || b === a.background1;) b = t();
        var d = new Image;
        d.src = b;
        d.onerror = function() {
          u++;
          window.setTimeout(function() {
            m();
            a.$apply()
          }, 500)
        };
        d.onload = function() {
          a.$apply(function() {
            0 === a.activeBackground ? (a.background1 = b, a.activeBackground = 1) : (a.background0 = b, a.activeBackground = 0)
          })
        }
      }
    }
    var f = document.getElementsByClassName("menu")[0],
      v = f.querySelectorAll(".menu__item"),
      l, u = 0;
    a.apiReady = !1;
    a.side = window.localStorage.getItem("side") || "OFF";
    a.background0 = null;
    a.background1 = null;
    a.activeBackground = 0;
    a.notChosen = "OFF" === a.side;
    a.notAuth = null === window.localStorage.getItem("side");
    a.language = chrome.i18n.getUILanguage();
    document.documentElement.setAttribute("lang", a.language);
    a.dir = -1 !== ["ar", "he"].indexOf(a.language) ? "rtl" : "ltr";
    a.isEnglish = -1 !== a.language.indexOf("en");
    a.isChromeBook = -1 !== window.navigator.userAgent.indexOf("CrOS");
    window.onLoadCallback = function() {
      chrome.identity.getAuthToken({
        interactive: !1
      }, r)
    };
    f.addEventListener("mouseover", function() {
      clearTimeout(l);
      l = setTimeout(function() {
        f.className = "menu"
      }, 50)
    });
    f.addEventListener("mouseout", function() {
      clearTimeout(l);
      l = setTimeout(function() {
        f.className = "menu menu--closed"
      }, 50)
    });
    for (var n = 0; n < v.length; n++) v[n].addEventListener("click", A);
    a.getAuth = function() {
      chrome.identity.getAuthToken({
        interactive: !0
      }, r)
    };
    a.getMessage = function() {
      return z.trustAsHtml(chrome.i18n.getMessage.apply(this,
        arguments).replace(" \n", "<br>"))
    };
    a.side && m()
  }
  var q = ["beyond", "app", "MainCtrl"],
    w = this;
  q[0] in w || !w.execScript || w.execScript("var " + q[0]);
  for (var x; q.length && (x = q.shift());) q.length || void 0 === p ? w[x] ? w = w[x] : w = w[x] = {} : w[x] = p;
  p.$inject = ["$scope", "$sce"];
  c.controller("beyond.main", p);
  var y = document.createElement("script");
  y.setAttribute("type", "text/javascript");
  y.setAttribute("src", "https://apis.google.com/js/client.js?onload=onLoadCallback");
  document.getElementsByTagName("body")[0].appendChild(y);
})();
