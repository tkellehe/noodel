[HOME](README.md)

Click [_Noodel_](https://tkellehe.github.io/noodel/compressor.html) to actually see the compressor if not on the _Noodel_ page:)


<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>

<script src="src/js/pipe.js"></script>
<script src="src/js/props.js"></script>
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
<textarea id="text-basic"></textarea>
<button onclick="$('#compressed-basic').val(characters.compress_basic($('#text-basic').val()))">COMPRESS</button>
<textarea id="compressed-basic"></textarea>
</div>

<div class="noodel-decompressor_basic">
<button onclick="$('#decompressed-basic').val(characters.decompress_basic($('#compressed-basic').val()))">DECOMPRESS</button>
<textarea id="decompressed-basic"></textarea>
</div>

## Occurance Compression

<div class="noodel-compressor_occur">
<textarea id="text-occur"></textarea>
<button onclick="var o = characters.compress_occur($('#text-occur').val()); $('#compressed-occur').val(o.key+'\n'+o.compressed)">COMPRESS</button>
<textarea id="compressed-occur"></textarea>
</div>

## Range Compression

<div class="noodel-compressor_range">
<textarea id="text-range"></textarea>
<button onclick="$('#compressed-range').val(characters.compress_range($('#text-range').val()))">COMPRESS</button>
<textarea id="compressed-range"></textarea>
</div>
