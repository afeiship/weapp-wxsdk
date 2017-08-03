(function () {

  var global = global || window || self || this;
  var nx = global.nx || require('next-js-core2');

  var NxWeappWxsdk = nx.declare('nx.weapp.Wxsdk', {
    methods:{
      init:function(){
        if(!wx){
          return nx.error('Can not found `wx` in this env')
        }
        this.wx = wx;
      },
      chooseImage: function(inOptions){
        var self = this;
        return new Promise(function(resolve,reject){
          self.wx.chooseImage(
            nx.mix( {
              count: 9,
              sizeType:['original','compressed'],
              sourceType:['album','camera']
            } , self.__toPromise(resolve,reject), inOptions)
          );
        });
      },
      __toPromise: function(resolve,reject){
        return {
          success: function(resp){
            resolve( resp );
          },
          fail: function(error){
            reject( error );
          }
        }
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxWeappWxsdk;
  }

}());
