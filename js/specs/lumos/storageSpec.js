define(function (require) {
  var Storage = require('lumos/storage'),
      subject;

  module('Storage', {
    beforeEach: function() {
      subject = new Storage('foo');
    },

    afterEach: function() {
      subject.clean();
    }
  });

  test('Primitive read/write', function () {
    equal(subject.access_key, 'foo', 'it has an access key');
    equal(subject.read(), undefined, 'read() is undefined the first time');
    subject.write('bar');
    equal(subject.read(), 'bar', 'read() returns bar after writting');
  });

  test('Serialization', function () {
    var pairs = [2, 4];
    subject.insert(pairs);
    deepEqual(subject.get(), pairs, 'insert()/get() serializes the arrays');

    var string = 'string';
    subject.insert(string);
    deepEqual(subject.get(), string, 'insert()/get() serializes strings');
  });
});
