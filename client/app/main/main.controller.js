'use strict';

angular.module('doraApp')
  .controller('MainCtrl', function ($scope, $state, ngAudio) {

    var titleImg = $('#title-img');
    // string / image
    var maxStringRatio = .3;
    var msgWidthRatio = .8;
    var msgHeightRatio = .25;
    var defaultTitle = 'あつい';

    $scope.style = {};
    $scope.msg = $state.params.msg || defaultTitle;

    $scope.msgUpdate = function(){
      $state.go('.', {msg: $scope.msg || defaultTitle});
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

      ngAudio.play('title-audio');
    });

  });