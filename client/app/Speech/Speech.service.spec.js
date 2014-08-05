'use strict';

describe('Service: Speech', function () {

  // load the service's module
  beforeEach(module('doraApp'));

  // instantiate service
  var Speech;
  beforeEach(inject(function (_Speech_) {
    Speech = _Speech_;
  }));

  it('should do something', function () {
    expect(!!Speech).toBe(true);
  });

});
