<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>

<script src="src/js/pipe.js"></script>
<script src="src/js/token.js"></script>
<script src="src/js/path.js"></script>
<script src="src/js/characters.js"></script>
<script src="src/js/types.js"></script>
<script src="src/noodel.js"></script>

<link rel="stylesheet" type="text/css" href="docs.css">
<script type="text/javascript" src="docs.js"></script>


[_Noodel_](https://tkellehe.github.io/noodel) is a programming language that has the main focus of assisting ASCII Art code golfing challenges (and eventually other art/animation challenges). The main thing to focus on is the memory model of _Noodel_ which acts as a pipe of information moving through the different tokens. There also is a system of arrays that can be utilized and navigated in order to have a persistant memory (In progress...). Since this has already turned into a paragraph of random information about _Noodel_, it also has its own [256 Unicode character set](docs/code_page.md). Since the language is for challenges visit the [issues page](https://github.com/tkellehe/noodel/issues) and post challenges where the _Noodel_ was used. This will allow others to learn how to _Noodel_ as well as notice features that could be added to assist with challenges ([Learn more here](docs/posting_challenges.md)).


<div class="noodel-exec" code="“¤noodel¤ḷçẹḍ/8" input="" run></div>

## Introduction

_Noodel_ has three main data types: `NUMBER`, `STRING`, and `ARRAY`. `ARRAY` objects are always passed by reference, but the others are passed by value [(...)](docs/intro.md)

A _"Hello World"_ in [_Noodel_](https://tkellehe.github.io/noodel#introduction) is pretty simple: `“Hello,¤World!`

<div class="noodel-exec" code="“Hello,¤World!" input=""></div>

The `STRING` literal is created and placed into the pipe. At the very end, all of the data in the pipe gets pushed into the output of the program. Therein, the `Hello,¤World!` gets printed. But what happened to the `¤`? The `¤` is used to represent a space when handling `STRING` types. This allows for the space character to act as a NOP to seperate commands. The same was done with the line feed character which is represented by `¶`.
