<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>

<script src="src/internal/pipe.js"></script>
<script src="src/internal/props.js"></script>
<script src="src/internal/token.js"></script>
<script src="src/internal/path.js"></script>
<script src="src/internal/characters.js"></script>
<script src="src/internal/NUMBER.js"></script>
<script src="src/internal/STRING.js"></script>
<script src="src/internal/ARRAY.js"></script>
<script src="src/noodel.js"></script>
<script src="src/noodel-misc.js"></script>
<script src="src/noodel-literals.js"></script>
<script src="src/noodel-basic_print.js"></script>
<script src="src/noodel-basic_pipe.js"></script>
<script src="src/noodel-loops.js"></script>
<script src="src/noodel-time.js"></script>
<script src="src/noodel-basic_cast.js"></script>
<script src="src/noodel-basic_operands.js"></script>
<script src="src/noodel-basic_array.js"></script>
<script src="src/noodel-string_manip.js"></script>

<link rel="stylesheet" type="text/css" href="docs.css">
<script type="text/javascript" src="docs.js"></script>


[_Noodel_](https://tkellehe.github.io/noodel) is a programming language that has the main focus of assisting ASCII Animation code golfing challenges. _Noodel_ has its own [256 character set](docs/code_page.md). There also is an editor designed for _Noodel_ that utilizes its _JavaScript_ parser [here](https://tkellehe.github.io/noodel/editor.html).

---

<div class="noodel-exec" code="¤noodel¤ḷçẹḍe" input="" run show></div>

---

Since the language is for challenges visit the [issues page](https://github.com/tkellehe/noodel/issues) and post challenges where _Noodel_ was used. This will allow others to learn how to _Noodel_ as well as notice features that could be added to assist with challenges ([Learn more](docs/posting_challenges.md)). This language is still under construction and since I like to do code for _Noodel_ from the online editor things may randomly break, features disappear/change, zero comments made on commits, or random issues appear for myself.


## Introduction

_Noodel_ has three main data types: `NUMBER`, `STRING`, and `ARRAY`. `ARRAY` objects are always passed-by-reference, but the others are passed-by-value [(...)](docs/intro.md)

A _"Hello World"_ in [_Noodel_](https://tkellehe.github.io/noodel#introduction) is pretty simple: `Hello,¤World!`

The `STRING` literal is created and placed onto the stack. At the very end, whatever is on the top of the stack gets printed. Therein, the `Hello,¤World!` gets printed. But what happened to the `¤`? The `¤` is used to represent a space when handling `STRING` types. This allows for the space character to act as a NOP to seperate commands. The same was done with the line feed character which is represented by `¶` [(...)](docs/string_compression.md)

---

<div class="noodel-exec" code="Hello,¤World!" input=""></div>

---

## The Memory Model

_Noodel_ is a stack-based language with a slight twist. The perspective of the stack can be changed. A simple example of this is if you need to store an object for later but do not want it to be operated on, you can move the top of the stack down. For example: `noodelʠsome¤workƥ`

---

<div class="noodel-exec" code="noodelʠsome¤workƥ" input=""></div>

---

The literal `noodel` gets pushed onto the stack, then the top of the stack gets moved with the `ʠ` command. Then the `STRING` literal `some¤work` gets pushed onto the stack. The command `ƥ` moves the top of the stack back up, therein `noodel` is on top and is printed.

Now that is kind of cool, but it gets more interesting when there are arrays involved. Let us take this script: `¤noodel¤ȷçıḷẹḍe`

---

<div class="noodel-exec" code="¤noodel¤ȷçıḷẹḍe" input=""></div>

---

It produces the same output as the script `¤noodel¤ḷçẹḍe`, but takes advantage of the fact that `ARRAY` types are pass-by-reference. So, first `¤noodel¤` is pushed onto the stack. Since the stack is merely and `ARRAY`, we call the `ȷ` command which jumps out of the current stack and into the containing stack. The top of this new stack is the stack with the `STRING` literal. So, we print it to the screen using `ç` therein the `ARRAY` object is sitting in the stdout. Then we call `ı` command to jump into the `ARRAY` at the top of the stack to make it the current stack. This allows us to now start operating on the `STRING` live.
