(function() {

    function loopify(uri,cb) {

      var context = new (window.AudioContext || window.webkitAudioContext)(),
          request = new XMLHttpRequest();

      request.responseType = "arraybuffer";
      request.open("GET", uri, true);

      var gainNode = context.createGain();

      // XHR failed
      request.onerror = function() {
        cb(new Error("Couldn't load audio from " + uri));
      };

      // XHR complete
      request.onload = function() {
        context.decodeAudioData(request.response,success,function(err){
          // Audio was bad
          cb(new Error("Couldn't decode audio from " + uri));
        });
      };

      request.send();

      function success(buffer) {

        var source;

        function play() {

          // Stop if it's already playing
          stop();

          // Create a new source (can't replay an existing source)
          source = context.createBufferSource();
          source.connect(context.destination);

          // Set the buffer
          source.buffer = buffer;
          source.loop = true;

          // Play it
          source.start(0);

        }

        function stop() {

          // Stop and clear if it's playing
          if (source) {
            source.stop();
            source = null;
          }

        }

        function rate(rate) {

          // Set current loop rate (pitch/velocity)
          if (source) {
            source.playbackRate.value = rate;
          }

        }
        
        function gain(gain) {
          
          // Set current loop gain
          if (source) {
            gainNode.gain.value = gain - 1;
            gainNode.connect(context.destination);
            source.connect(gainNode);
          }
        }

        cb(null,{
          play: play,
          stop: stop,
          rate: rate,
          gain: gain
        });

      }

    }

    loopify.version = "0.2";

    if (typeof define === "function" && define.amd) {
      define(function() { return loopify; });
    } else if (typeof module === "object" && module.exports) {
      module.exports = loopify;
    } else {
      this.loopify = loopify;
    }

})();
