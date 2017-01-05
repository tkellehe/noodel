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


[_Noodel_](https://tkellehe.github.io/noodel) is a programming language that has the main focus of assisting ASCII Art code golfing challenges (and eventually other art/animation challenges). _Noodel_ has its own [256 character set](docs/code_page.md). There also is an editor designed for _Noodel_ that utilizes its _JavaScript_ parser [here](https://tkellehe.github.io/noodel/editor.html).

---

<div class="noodel-exec" code="¤noodel¤ḷçẹḍe" input="" run show></div>

---

Since the language is for challenges visit the [issues page](https://github.com/tkellehe/noodel/issues) and post challenges where _Noodel_ was used. This will allow others to learn how to _Noodel_ as well as notice features that could be added to assist with challenges ([Learn more](docs/posting_challenges.md)). This language is still under construction and since I like to do code for _Noodel_ from the online editor things may randomly break, features disappear/change, zero comments made on commits, or random issues appear for myself.


## Introduction

_Noodel_ has three main data types: `NUMBER`, `STRING`, and `ARRAY`. `ARRAY` objects are always passed by reference, but the others are passed by value [(...)](docs/intro.md)

A _"Hello World"_ in [_Noodel_](https://tkellehe.github.io/noodel#introduction) is pretty simple: `Hello,¤World!`

The `STRING` literal is created and placed into the pipe. At the very end, all of the data in the pipe gets pushed into the output of the program. Therein, the `Hello,¤World!` gets printed. But what happened to the `¤`? The `¤` is used to represent a space when handling `STRING` types. This allows for the space character to act as a NOP to seperate commands. The same was done with the line feed character which is represented by `¶` [(...)](docs/string_compression.md)

---

<div class="noodel-exec" code="Hello,¤World!" input=""></div>

---

## The Pipe

The main memory model used for _Noodel_ is a pipe. Yes, I totally made that up and it is similar to a Stack Based Language. The reason why I am willing to say that it is not Stack Based is because data flows through the different tokens in the order in which they are executed. The data can diverge or it can converge. It is not one stack sitting somewhere, but rather a constant flow of data. This is why I think _Noodel_ might do well in ASCII Art challenges [(...)](docs/the_pipe.md)

After completing some challenges, I am going with the second memory model. I tried doing both this one and my backup one, but it made it more complicated. Doing the backup gives me the results of the pipe as well as some extra functionality. So, the first change will be to the _noodel_commands.txt_, then to the parser, and then finally actually clean up the commands. Just putting this comment here because a lot of stuff will break for a good long while until I have time to completely scrub the code. I am doing a majority of this from my phone, so it make it difficult to make large changes fast.
