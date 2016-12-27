[HOME](README.md)

# Code Page

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


The following is the current 256 different characters that _Noodel_ recognizes.

<div class="noodel-char_table"></div>

The first 98 characters _Noodel_ considers normal printable chars (ends at `~`).

The `¶`and `¤` are `\n`, and ` ` respectively. This is done to allow the parser to use the whitespace characters to separate commands.
