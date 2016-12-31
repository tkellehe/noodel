[HOME](README.md)

Click [_Noodel_](https://tkellehe.github.io/noodel/compressor.html) to actually see the compressor if not on the _Noodel_ page:)


<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>

<script src="src/js/characters.js"></script>

<link rel="stylesheet" type="text/css" href="docs.css">
<script type="text/javascript" src="docs.js"></script>

## Basic Compression

<div class="noodel-compressor_basic">
<textarea id="text"></textarea>
<button onclick="$('#compressed').val(characters.compress_basic($('#text').val()))">COMPRESS</button>
<textarea id="compressed"></textarea>
</div>
