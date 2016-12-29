[HOME](README.md)

Click [_Noodel_](https://tkellehe.github.io/noodel/compressor.html) to actually see the compressor if not on the _Noodel_ page:)


<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>

<script src="src/js/pipe.js"></script>
<script src="src/js/token.js"></script>
<script src="src/js/path.js"></script>
<script src="src/js/characters.js"></script>
<script src="src/js/types.js"></script>
<script src="src/noodel.js"></script>
<script src="src/noodel-basic_array.js"></script>
<script src="src/noodel-basic_cast.js"></script>
<script src="src/noodel-basic_operands.js"></script>
<script src="src/noodel-basic_pipe.js"></script>
<script src="src/noodel-basic_print.js"></script>
<script src="src/noodel-literals.js"></script>
<script src="src/noodel-loops.js"></script>

<link rel="stylesheet" type="text/css" href="docs.css">
<script type="text/javascript" src="docs.js"></script>

## Basic Compression

<div class="noodel-compressor_basic">
<textarea id="text"></textarea>
<button onclick="$('#compressed').val(characters.compress_basic($('#text').val()))">COMPRESS</button>
<textarea id="compressed"></textarea>
</div>
