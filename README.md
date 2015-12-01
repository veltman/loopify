# loopify

Some basic seamless looping with the WebAudioAPI.  Works in [some browsers](http://caniuse.com/#feat=audio-api), not IE so much.

## Why?

Because looping an HTML5 audio element is generally inconsistent and not seamless.  You'll often get a little gap at the beginning of every new play with something like this:

```html
<audio loop>
  <source src="whoompthereitis.mp3" type"audio/mpeg">
</audio>
<!-- Whoomp there it isn't :( -->
```

## How?

Include `loopify.js` on a page and create a loop with `loopify(url,callback)`.

```html
<script src="loopify.js" type="text/javascript"></script>
<script>

// SUpply an audio filename and a callback
loopify("whoompthereitis.mp3",function(err,loop) {

  // If something went wrong, `err` is supplied
  if (err) {
    return console.err(err);
  }

  // Play it whenever you want
  loop.play();

  // Stop it later if you feel like it
  loop.stop();

});

</script>
```

## More details, barely

### loopify(url,callback)

`url` is an audio filename or full URL. It has to be reachable by XHR.

`callback` is a function that takes two arguments, `err` and `loop`:

```js

function ready(err,loop) {
  // do something with err

  // or do something with loop
}

```

`err` will be `null` as long as the audio was successfully loaded.

The `loop` parameter has two methods: `.stop()` and `.play()`.  You can trigger those however you want, as many times as you want.

If you call `loop.play()` on a loop that's already playing, it will reset to the beginning of the loop.

## Notes

You should probably use `.wav` files for short loops, because compressed formats like `.mp3` produce [different results in different browsers](https://forestmist.org/blog/web-audio-api-loops-and-formats).

## License

Available under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions.

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
