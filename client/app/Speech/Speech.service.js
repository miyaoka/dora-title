'use strict';

angular.module('doraApp')
  .factory('Speech', function ($timeout) {

    var Speech = {
      play: function (text, loadOnly) {
        if (!window.speechSynthesis) {
          return;
        }

        var u = new SpeechSynthesisUtterance();
        u.volume = 1.0; // 0 to 1
        u.rate = .8; // .5(?) to 10
        u.pitch = 1.4; // 0 to 2

        u.text = text;

        //全てASCII文字で無ければ日本語として扱う
        if(!text.match(/^[\x20-\x7E]+$/)){
          u.lang = "ja-JP";
        }

        //loadのみなら再生開始後止める
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
      resume: function(){
        speechSynthesis.resume();
      },
      delayedPlay: function(text, delayTime) {
        this.load(text);
        $timeout(function(){
          speechSynthesis.resume();
        }, delayTime);
      },
      delayedResume: function(delayTime) {
        $timeout(function(){
          speechSynthesis.resume();
        }, delayTime);
      }
    };

    return Speech;
  });
