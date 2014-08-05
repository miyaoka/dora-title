'use strict';

angular.module('doraApp')
  .controller('MainCtrl', function ($scope, $state, Speech) {

    var titleImg = $('#title-img');
    // string / image
    var maxStringRatio = .3;
    var msgWidthRatio = .8;
    var msgHeightRatio = .25;
    var defaultTitle = 'あつい';

    //サウンドロゴ再生から読み上げ開始までの差(ms)
    var SpeechDelay = 1500;

    //サウンドロゴ
    var titleAudio = document.getElementById('title-audio');
    //ロード完了時
    titleAudio.addEventListener('loadeddata', function(){
      titleAudio.play();
      Speech.delayedResume(SpeechDelay);
    });


    $scope.style = {};
    $scope.msg = $state.params.msg || defaultTitle;

    //初回用読み上げロード（PC用。mobileがresume再生するのに合わせるため）
    Speech.load($scope.msg);

    $scope.msgUpdate = function(){
      $state.go('.', {msg: $scope.msg || defaultTitle});
    };
    $scope.onClick = function(){
      switch(titleAudio.readyState) {
        case 0:
          //ロードしていないならロード完了イベントで再生（mobile用）
          titleAudio.load();
          Speech.load($scope.msg);
          break;
        case 4:
          //ロード完了済みならその場でプレイ
          playAudio();
          break;
      }
    };
    var playAudio = function(){
      $scope.debug = 'playaudio';
      titleAudio.currentTime = 0;
      titleAudio.play();
      Speech.delayedPlay($scope.msg, SpeechDelay);
    };

    $scope.resize = function(){
      var dw = titleImg[0].clientWidth;
      var dh = titleImg[0].clientHeight;

      var fontSize;
      if($scope.msg.length < 1){
        return;
      } else if($scope.msg.length == 1){
        fontSize = dw * maxStringRatio;
      } else {
        var stringRatio = msgWidthRatio / $scope.msg.length;
        if(stringRatio > maxStringRatio){
          stringRatio = maxStringRatio;
        }
        fontSize = dw * stringRatio;
      }

      $scope.style.fontSize = fontSize + 'px';
      $scope.style.top = dh * msgHeightRatio - fontSize * .5 + 'px';
      $scope.$apply();
    };

    $scope.$watch(function(){
      return $('#title-msg')[0].clientWidth;
    }, function(){
      var msgWidth = $('#title-msg')[0].clientWidth;
      $scope.style.marginLeft = msgWidth * -.5 + 'px';
    });

    $(window).resize( $scope.resize );

    titleImg.load( function(){
      $scope.style.display = 'block';
      $scope.resize();

//      $scope.playAudio();
    });

  });