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


[_Noodel_](https://tkellehe.github.io/noodel) is a programming language that has the main focus of assisting ASCII Art code golfing challenges (and eventually other art/animation challenges). The main thing to focus on is the memory model of _Noodel_ which acts as a pipe of information moving through the different tokens. There also is a system of arrays that can be utilized and navigated in order to have a persistant memory (In progress...). Since this has already turned into a paragraph of random information about _Noodel_, it also has its own [256 Unicode character set](docs/code_page.md). Since the language is for challenges visit the [issues page](https://github.com/tkellehe/noodel/issues) and post challenges where _Noodel_ was used. This will allow others to learn how to _Noodel_ as well as notice features that could be added to assist with challenges ([Learn more here](docs/posting_challenges.md)). This language is still under construction and since I like to do code for _Noodel_ from the online editor things may randomly break, features disappear/change, zero comments made on commits, or random issues appear for myself. There also is an editor designed for _Noodel_ that utilizes its _JavaScript_ parser [here](https://tkellehe.github.io/noodel/editor.html).

---

<div class="noodel-exec" code="“¤noodel¤ḷçẹḍ/8" input="" run show></div>

---

## Introduction

_Noodel_ has three main data types: `NUMBER`, `STRING`, and `ARRAY`. `ARRAY` objects are always passed by reference, but the others are passed by value [(...)](docs/intro.md)

A _"Hello World"_ in [_Noodel_](https://tkellehe.github.io/noodel#introduction) is pretty simple: `“Hello,¤World!`

---

<div class="noodel-exec" code="“Hello,¤World!" input=""></div>

---

The `STRING` literal is created and placed into the pipe. At the very end, all of the data in the pipe gets pushed into the output of the program. Therein, the `Hello,¤World!` gets printed. But what happened to the `¤`? The `¤` is used to represent a space when handling `STRING` types. This allows for the space character to act as a NOP to seperate commands. The same was done with the line feed character which is represented by `¶` [(...)](docs/string_compression.md)

## The Pipe

The main memory model used for _Noodel_ is a pipe. Yes, I totally made that up and it is similar to a Stack Based Language. The reason why I am willing to say that it is not Stack Based is because data flows through the different tokens in the order in which the are executed. The data can diverge or it can converge. It is not one stack sitting somewhere, but rather a constant flow of data. This is why I think _Noodel_ might do well in ASCII Art challenges [(...)](docs/the_pipe.md)
