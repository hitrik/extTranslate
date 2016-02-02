"use strict";

var apiKey = "trnsl.1.1.20151222T105508Z.60547ebe16619f87.7af0cb1b066ad0e26872cd1db0390b5ae4be682d";

var getData = function(url) {
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(res) {
            if(res) return res;
        })
        .catch(function(error) {
            console.log('error', error);
        });
};

var $ = (function() {
    return {
        body: document.body,
        input: document.querySelector('input'),
        button: document.querySelector('button'),
        translate: document.querySelector('.translate'),
        trademark: document.querySelector('.trademark')
    };
}());

var yaAPI = {
    getLangUrl: function(text) {
        return "https://translate.yandex.net/api/v1.5/tr.json/detect?key=" + apiKey + "&text=" + text;
    },
    getTranslateUrl: function(text, lang) {
        return "https://translate.yandex.net/api/v1.5/tr.json/translate?key=" +
            apiKey + "&text=" + text + "&lang=" + lang + "-" + (lang === 'en' ? 'ru' : 'en');
    },
    getLang: function(text) {
        "use strict";

        var self = this;
        var url = this.getLangUrl(text);
        getData(yaAPI.getLangUrl(text)).then(function(res) {
            let l = res.lang;
            self.getTranslate(text, l);
        });
    },
    getTranslate: function(text, lang) {
        "use strict";

        let url = this.getTranslateUrl(text, lang);
        getData(url).then(function(res) {
            if(res.code === 200) {
                $.translate.innerHTML = res.text || "Не удалось перевести";
                $.translate.classList.add('animated');
                $.translate.classList.add('zoomIn');
                setTimeout(function() {
                    $.translate.classList.remove('animated');
                    $.translate.classList.remove('zoomIn');
                }, 800);
            }
        });
    },
    showTranslate: function(content) {
        if(!content) return false;

    }
};

$.input.addEventListener('keyup', function(e) {
    "use strict";

    e.preventDefault();
    if(e.keyCode === 13) {
        let val = $.input.value;
        if(!val) return false;
        yaAPI.getLang(val);
    }
}, false);
$.button.addEventListener('click', function(e) {
    "use strict";

    e.preventDefault();
    let val = $.input.value;
    if(!val) return false;
    yaAPI.getLang(val);
}, false);

$.trademark.addEventListener('click', function() {
    chrome.runtime.sendMessage({greeting: "openTab"}, function(response) {});
}, false);