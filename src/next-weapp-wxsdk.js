(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  //constant
  var PROMISFY = function(resolve, reject) {
    return {
      success: function(resp) {
        resolve(resp);
      },
      fail: function(error) {
        reject(error);
      }
    };
  };

  var NxWeappWxsdk = nx.declare('nx.weapp.Wxsdk', {
    methods: {
      init: function() {
        if (!global.wx) {
          return nx.error('Can not found `wx` in this env');
        }
        this.wx = global.wx;
      },
      chooseImage: function(inOptions) {
        return new Promise(function(resolve, reject) {
          global.wx.chooseImage(
            nx.mix(
              {
                count: 9,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera']
              },
              PROMISFY(resolve, reject),
              inOptions
            )
          );
        });
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWeappWxsdk;
  }
})();
