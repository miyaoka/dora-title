'use strict';

angular.module('doraApp')
  .factory('Speech', function () {

    var voices = window.speechSynthesis.getVoices();
    var u = new SpeechSynthesisUtterance();
    u.volume = 1.0; // 0 to 1
    u.rate = .8; // .5(?) to 10
    u.pitch = 1.4; // 0 to 2
    var Speech = {
      play: function (text, loadOnly) {
        if (!window.speechSynthesis) {
          return;
        }
        speechSynthesis.cancel();
        //全てASCII文字で無ければ日本語として扱う
        if(!text.match(/^[\x20-\x7E]+$/)){
          u.lang = "ja-JP";
        }

        u.text = text;
        if(loadOnly){
          u.onstart = function(){
            speechSynthesis.pause();
            u.onstart = null;
          };
        }
        speechSynthesis.speak(u);
      },
      load: function(text){
        this.play(text, true);
      },
      resume: function(text){
        speechSynthesis.resume();
      }
    };

    return Speech;
  });
