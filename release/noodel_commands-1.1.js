\p => [ð¬¶¤ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.!?,0123456789:;"'_<=>\*\+\-\/\\\@\#\$\%\&\^\|\(\)\[\]\{\}\`\~]
\c => [ẠḄḌẸḤỊḲḶṂṆỌṚṢṬỤṾẈỴẒȦḂĊḊĖḞĠḢİĿṀṄȮṖṘṠṪẆẊẎŻạḅḍẹḥịḳḷṃṇọṛṣṭụṿẉỵẓȧḃċḋėḟġḣŀṁṅȯṗṙṡṫẇẋẏżƁƇƊƑƓƘƝƤƬƲȤɓƈɗƒɠɦƙɱ]
\m => [°¹²³⁴⁵⁶⁷⁸⁹]
\l => [ɲƥʠɼʂƭʋȥÆÇÐÑØŒÞßæçıȷñøœþ€¢£¥…µ¡¿×÷¦©®«»‘’“”°¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾]
\k => [\p\c\l ]
\a => [\k\n]


--- NOPs ---
    space     - Use to separate commands.
    new line  - Use to separate commands also ends some scopes of commands.

--- MISC ---
    %[0-9A-F]+  - Use in a STRING to create a Unicode character based off of the hex value.
    ɲ`            - terminate()
    ɲ~            - a = path.first() a.props.clear()
    ṛ             - a = path.top()
                    if a is NUMBER =>
                      max, min
                      b = path.top()
                      if b == undefined => max = MAX(0, a.value) min = MIN(0, a.value)
                      else => max = MAX(a.value, b.value) min = MIN(a.value, b.value)
                      path.top(NUMBER(random_int(min, max)))
                    elif a is ARRAY or a is STRING =>
                      path.top(a)
                      path.top(NUMBER(random_int(0, a.length() - 1)))
    ṛ(\d+)        - path.top(NUMBER(random_int(0, valueOf($1)))
    ƥ             - path.move_up()
    ʠ             - path.move_down()
    (\m)+ƥ        - for i = 0, i < valueOf($1), ++i => path.move_up()
    (\m)+ʠ        - for i = 0, i < valueOf($1), ++i => path.move_down()
    µƥ            - a = path.top() for i = 0, i < a.integerify().value, ++i => path.move_up()
    µʠ            - a = path.top() for i = 0, i < a.integerify().value, ++i => path.move_down()
    ƥ\*           - path.move_to_top()
    ʠ\*           - path.move_to_bottom()
    ı             - path.jump_in()
    ȷ             - path.jump_out()
    ɲo            - a = path.first()
                    if a is NUMBER => path.top(NUMBER(a.value % 2))
                    elif a is STRING or a is ARRAY => path.top(NUMBER(a.length() % 2))
    ɲe            - a = path.first()
                    if a is NUMBER => path.top(NUMBER((a.value % 2) ? 1 : 0))
                    elif a is STRING or a is ARRAY => path.top(NUMBER((a.value % 2) ? 1 : 0))
    ɲO            - a = path.top()
                    if a is NUMBER => path.top(NUMBER(a.value % 2))
                    elif a is STRING or a is ARRAY => path.top(NUMBER(a.length() % 2))
    ɲE            - a = path.top()
                    if a is NUMBER => path.top(NUMBER((a.value % 2) ? 1 : 0))
                    elif a is STRING or a is ARRAY => path.top(NUMBER((a.value % 2) ? 1 : 0))
    ɲ!            - a = path.top()
                    if a == undefined => path.top(NUMBER(1))
                    else path.top(a.is_falsy())
    ɲ?            - a = path.top()
                    if a == undefined => path.top(NUMBER(0))
                    else path.top(a.is_truthy())

--- Literals ---
 -- String --
    (\p+)           - if has_null($1) => path.top(ARRAY(split($1, "ð"))) else => path.top(STRING($1))
    “(\c*)          - path.top(STRING(decompress_basic($1)))
    ”(\c*)          - a = string_break(decompress_basic($1)) foreach e in a => e = STRING(e); path.top(ARRAY(a))
    (\c+)‘(\c+)     - path.top(STRING(decompress_occur($1, $2)))
    (\c+)’(\c+)     - a = string_break(decompress_occur($1, $2)) foreach e in a => e = STRING(e); path.top(ARRAY(a))
    (\p)…(\p)       - path.top(STRING($1 +...+ $2))
    µ…(\p)          - a = path.top() a = numerical_eval_numbers(a) path.top(STRING(numberical_eval(a.value) +...+ $1))
    (\p)…µ          - a = path.top() a = numerical_eval_numbers(a) path.top(STRING($1 +...+ numberical_eval(a.value)))
    µ…µ             - a = path.top() a = numerical_eval_numbers(a)
                      b = path.top() b = numerical_eval_numbers(b)
                      path.top(STRING(numberical_eval(a.value) +...+ numberical_eval(b.value)))

    
 -- Numeric --
    ɲ(-?\d*\.?\d+)  - path.top(NUMBER(valueOf($1)))
    ɲ(-)            - path.top(NUMBER(-1))
    ɲ(-?\d*/\d+)    - path.top(NUMBER(valueOf($1)))

 -- Array --
    #(\d)+…(\d)+    - path.top(ARRAY(NUMBER(valueOf($1)) ,..., NUMBER(valueOf($2))))
    #µ…(\d)+        - a = path.top() a = numerical_eval_numbers(a) path.top(ARRAY(a ,..., NUMBER(valueOf($1))))
    #(\d)+…µ        - a = path.top() a = numerical_eval_numbers(a) path.top(ARRAY(NUMBER(valueOf($2)) ,..., a))
    #µ…µ            - a = path.top() a = numerical_eval_numbers(a)
                      b = path.top() b = numerical_eval_numbers(a)
                      path.top(ARRAY(a ,..., b))
    '(\p)…(\p)      - path.top(ARRAY(STRING($1) ,..., STRING($2)))
    'µ…(\p)         - a = path.top() a = numerical_eval_numbers(a) path.top(ARRAY(numberical_eval(a.value) ,..., $1))
    '(\p)…µ         - a = path.top() a = numerical_eval_numbers(a) path.top(ARRAY(STRING($1) ,..., STRING(numberical_eval(a.value)))
    'µ…µ            - a = path.top() a = numerical_eval_numbers(a)
                      b = path.top() b = numerical_eval_numbers(a)
                      path.top(ARRAY(STRING(numberical_eval(a.value)) ,..., STRING(numberical_eval(b.value)))

--- Operators ---
    ⁺        - a = path.top() b = path.top() path.top(a.add(b))
    ⁻        - a = path.top() b = path.top() path.top(a.sub(b))
    ⁺s       - a = path.top() b = path.top() path.top(a.add_flip(b))
    ⁻s       - a = path.top() b = path.top() path.top(a.sub_flip(b))
    (\m+)⁺   - a = path.top() for c = 0, c < valueOf($1) and path.first() != undefined, ++c => a = a.add(path.top()); path.top(a)
    (\m+)⁻   - a = path.top() for c = 0, c < valueOf($1) and path.first() != undefined, ++c => a = a.sub(path.top()); path.top(a)
    (\m+)⁺s  - a = path.top() for c = 0, c < valueOf($1) and path.first() != undefined, ++c => a = a.add_flip(path.top()); path.top(a)
    (\m+)⁻s  - a = path.top() for c = 0, c < valueOf($1) and path.first() != undefined, ++c => a = a.sub_flip(path.top()); path.top(a)
    µ⁺       - a = path.top() b = path.top()
               for c = 0, c < a.integerify().value and path.first != undefined, ++c => b = b.add(path.top()); path.top(b)
    µ⁻       - a = path.top() b = path.top()
               for c = 0, c < a.integerify().value and path.first != undefined, ++c => b = b.sub(path.top()); path.top(b)
    µ⁺s      - a = path.top() b = path.top()
               for c = 0, c < a.integerify().value and path.first != undefined, ++c => b = b.add_flip(path.top()); path.top(b)
    µ⁻s      - a = path.top() b = path.top()
              for c = 0, c < a.integerify().value and path.first != undefined, ++c => b = b.sub_flip(path.top()); path.top(b)
    ⁺(\d+)   - a = path.top() for c = 0, c < valueOf($1), ++c => a = a.increment(tkn); path.top(a)
    ⁻(\d+)   - a = path.top() for c = 0, c < valueOf($1), ++c => a = a.decrement(tkn); path.top(a)
    ⁺s(\d+)  - a = path.top() for c = 0, c < valueOf($1), ++c => a = a.increment_flip(tkn); path.top(a)
    ⁻s(\d+)  - a = path.top() for c = 0, c < valueOf($1), ++c => a = a.decrement_flip(tkn); path.top(a)
    ⁺µ       - a = path.top() b = path.top()
               if b is NUMBER =>
                 path.top(NUMBER(b.value * a.integerify().value))
               else =>
                 for c = 0, c < a.integerify().value, ++c => b = b.increment(tkn); path.top(b)
    ⁻µ       - a = path.top() b = path.top()
               if b is NUMBER =>
                 path.top(NUMBER(b.value / a.integerify().value))
               else =>
                 for c = 0, c < a.integerify().value, ++c => b = b.decrement(tkn); path.top(b)
    ⁺sµ      - a = path.top() b = path.top()
               if b is NUMBER =>
                 path.top(NUMBER(b.pow(a.integerify().value)))
               else =>
                 for c = 0, c < a.integerify().value, ++c => b = b.increment_flip(tkn); path.top(b)
    ⁻sµ      - a = path.top() b = path.top()
               if b is NUMBER =>
                 path.top(NUMBER(b.pow(1 / a.integerify().value)))
               else =>
                 for c = 0, c < a.integerify().value, ++c => b = b.decrement_flip(tkn); path.top(b)
    ɲ%       - a = path.top().integerify() b = path.top()
               if b is NUMBER => path.top(NUMBER(b.value % a.value))
               elif b is STRING => [split string into a.value equal parts and push on the whole and then the remainder]
               elif b is ARRAY => [removes the remainder for the array then pushes the array back on the pushes the remainder]
    ɲ%s      - a = path.top() b = path.top().integerify()
               if a is NUMBER => path.top(NUMBER(a.value % b.value))
               elif a is STRING => [split string into b.value equal parts and push on the whole and then the remainder]
               elif a is ARRAY => [removes the remainder for the array then pushes the array back on the pushes the remainder]

--- Array Like Operators ---
    ɲ_        - a = path.top()
                if a is NUMBER => o.back(NUMBER(a.value * a.value))
                elif a is STRING => foreach s in a.value => path.top(STRING(s))
                elif a is ARRAY => foreach e in a.value => path.top(e)
    ɲl        - a = path.top() path.top(NUMBER(a.length())) # For numbers that means abs.
    ẹ         - a = path.top()
                if a is NUMBER => path.top(NUMBER(a.reciprocal()))
                elif a is STRING => path.top(STRING(a.value.slice(1, a.length()) + a.value.slice(0, 1)))
                elif a is ARRAY => a.value.unshift(a.value.pop()) path.top(a)
    Ẹ         - a = path.top()
                if a is NUMBER => path.top(NUMBER(a.square_root()))
                elif a is STRING => len = a.length() path.top(STRING(a.value.slice(len - 1, len) + a.value.slice(0, len - 1)))
                elif a is ARRAY => a.value.push(a.value.shift()) path.top(a)
    ạ         - a = path.top()
                index = undefined
                delta = undefined
                count = undefined
                if a is NUMBER => index = a.value delta = a.sign() a = path.top() if a == undefined => path.top(NUMBER(index + delta)) exit
                if a is NUMBER => count = a.value a = path.top() if a = undefined => path.top(NUMBER(index + (delta * count))) exit
                if a is NUMBER => path.top(NUMBER(abs((index + (delta * count))%a.value)))
                elif a is STRING or ARRAY =>
                  if a is STRING => a = ARRAY(string_break(a.value))
                  if index == undefined => index = a.props("frame")
                  if index == undefined => index = 0 delta = 1
                  if count == undefined => count = a.props("frame_count")
                  if count == undefined => count = a.length()
                  if delta == undefined => delta = a.props("frame_delta")

                  item = undefined

                  if count != 0 =>
                    index = a.correct_index(index)
                    item = a.access(index)
                    index += delta
                    --count
 
                  if count == 0 =>
                    a.props("frame_count", undefined)
                    a.props("frame", undefined)
                    a.props("frame_delta", undefined)
                  else =>
                    a.props("frame_count", count)
                    a.props("frame", index)
                    a.props("frame_delta", delta)
                  
                  path.top(a)
                  if item != undefined => path.top(item);
    ạ(-?\d*)  - a = path.top()
                index = $1 == "-" ? -1 : valueOf($1)
                delta = $1.contains("-") ? -1 : 1
                count = undefined
                if a is NUMBER => count = a.value a = path.top() if a = undefined => path.top(NUMBER(index + (delta * count))) exit
                if a is NUMBER => path.top(NUMBER(abs((index + (delta * count))%a.value)))
                elif a is STRING or ARRAY =>
                  if a is STRING => a = ARRAY(string_break(a.value))
                  if a.props("frame") != undefined => index = a.props("frame")
                  if count == undefined => count = a.props("frame_count")
                  if count == undefined => count = a.length()

                  item = undefined

                  if count != 0 =>
                    index = a.correct_index(index)
                    item = a.access(index)
                    index += delta
                    --count
 
                  if count == 0 =>
                    a.props("frame_count", undefined)
                    a.props("frame", undefined)
                    a.props("frame_delta", undefined)
                  else =>
                    a.props("frame_count", count)
                    a.props("frame", index)
                    a.props("frame_delta", delta)
                  
                  path.top(a)
                  if item != undefined => path.top(item)
    Ạ           - a = path.top()
                  if a is ARRAY =>
                    b = path.top()
                    if b is ARRAY =>
                      if a.props("frame") == undefined => a.props("frame", 0)
                      item = b.access(a.access(a.props("frame")));
                      a.props("frame", a.correct_index(a.props("frame") + 1))
                      path.top(b)
                      path.top(a)
                      if item != undefined => path.top(item)

--- Casting ---
    ɲ'      - a = path.top()
              if a is ARRAY => foreach e in a.value => e = e.stringify(); path.top(a)
              elif a is NUMBER path.top(a.stringify())
              else path.top(a.reverse())
    ɲ"      - a = path.top()
              if a is STRING => s = "" a = string_null_break(a.value) foreach e in a => s += e; path.top(STRING(s))
              else path.top(a.stringify())
    ɲ#      - a = path.top()
              if a is ARRAY => foreach e in a.value => e = e.numberify(); path.top(a)
              elif a is STRING path.top(a.numberify())
              else path.top(NUMBER(-1 * a.value))
    ɲ       - a = path.top()
              if a is ARRAY => foreach e in a.value => e = e.numberify(); path.top(a)
              elif a is STRING => a = ARRAY(string_null_break(a.value))
                foreach e in a.value => e = NUMBER(valueOf(e));
                if a.length() > 1 => path.top(a) elif a.length == 1 => path.top(a.value[0]) else path.top(NUMBER(0))
              elif a is NUMBER => path.top(NUMBER(-1 * a.abs()))
    œ       - a = [] while path.first() != undefined a.push(path.top()); if a.length() != 0 => path.top(ARRAY(a))
    œ(\d+)  - a = [] c = valueOf($1) whilec != 0 and path.first() != undefined => a.push(path.top()); if a.length() != 0 => path.top(ARRAY(a))
    µœ      - a = path.top() if a != undefined => a = a.integerify() b = [] while a.value != 0 and path.first() != undefined => b.push(path.top()) --a.value; path.top(ARRAY(b))
    ʋ       - a = path.top()
              if a is NUMBER => a = ARRAY(factorize_number(a.value)) foreach e in a => e = NUMBER(e); path.top(a)
              elif a is STRING => a = string_break(a.value) foreach e in a => e = STRING(e); path.top(ARRAY(a))
              elif a is ARRAY => path.top(a.reverse())
    ȥ       - a = path.top()
              path.top(numerical_eval(a))

--- Loops ---
    ḷ(\k*)       - while(true) => $1
    Ḷ(\k*)       - if tkn.count == undefined => tkn.count = a.integerify().value
                   while(0 < tkn.count) => $1 tkn.count--
                   tkn.count = undefined
    Ḷ(\d+)(\k*)  - if tkn.count == undefined => tkn.count = valueOf($1)
                   while(0 < tkn.count) => $2 tkn.count--
                   tkn.count = undefined
    ṃ(\k*)       - while(path.first().is_truthy().value == 1) $1
    Ṃ(\k*)       - while(path.top().is_truthy().value == 1) $1
    ṇ(\k*)       - while(path.first().is_truthy()) $1; path.top()
    Ṇ(\k*)       - while(path.first().is_truthy()) path.top() $1;
    ḅ            - break from a loop that is before this command and that does not have a break.
    Ḅ            - a = path.top() if a != undefined && a.is_truthy().value == 1 => path.top(a) else => ḅ
    ɱ            - path.top(NUMBER(get_containing_loop_token().loop_count))

--- Time ---
    ḍ              - a = path.top() delay_ms(a.integerify().value)
    ḍ(\d+)         - delay_ms(valueOf($1))
    ḍ[shqeto]      - if $1 == "s" => delay_ms(1000)
                     elif $1 == "h" => delay_ms(500)
                     elif $1 == "q" => delay_ms(250)
                     elif $1 == "e" => delay_ms(125)
                     elif $1 == "t" => delay_ms(100)
                     elif $1 == "o" => delay_ms(10)
    ḍ(\d*)/(\d*)   - num = 1000 den = 1
                     if $1.length > 0 => num *= valueOf($1)
                     if $2.length > 0 => den = valueOf($1)
                     delay_ms(num / den)
    ḍ(\d*)\.(\d*)  - delay_ms(valueOf("0" + $1 + "." + $2 + "0") * 1000)

--- Printing ---
    þ - path.stdout(i.first())
    Þ - path.stdout(i.front())
    ç - path.stdout.clear() path.stdout(path.first())
    Ç - path.stdout.clear() path.stdout(path.top())
    ñ - path.stdout(path.first()) path.stdout(STRING("¶"))
    Ñ - path.stdout(path.top()) path.stdout(STRING("¶"))
    Ð - path.stdout(path.stack)
    ß - path.stdout.clear()

--- Pipe Manipulation ---
    ḃ       - path.top()
    Ḃ       - path.jump_up() path.top()
    ė       - path.bottom(path.top())
    Ė       - path.top(path.bottom())
    ṡ       - a = path.top() b = path.top() path.top(a) path.top(b)
    Ṡ       - a = path.bottom() b = path.bottom() path.bottom(a) path.bottom(b)
    ḋ       - a = path.first() path.top(a.copy())
    (\m)+ḋ  - a = path.first() for c = 0, c < valueOf($1), ++c => path.top(a.copy)

--- String Manipulation ---
    ɲL - a = path.top()
         path.top(a.to_lowercase())
    ɲU - a = path.top()
         path.top(a.to_uppercase())
    ɲS - a = path.top()
         path.top(a.switchcase())
    ṙ  - a = path.top().integerify() b = path.top().integerify() c = path.top()
         path.top(c.relocate(a.value, b.value))

--- All Characters ---
ð¬¶¤ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.!?,0123456789:;"'_<=>*+-/\@#$%&^|()[]{}`~
ẠḄḌẸḤỊḲḶṂṆỌṚṢṬỤṾẈỴẒȦḂĊḊĖḞĠḢİĿṀṄȮṖṘṠṪẆẊẎŻạḅḍẹḥịḳḷṃṇọṛṣṭụṿẉỵẓȧḃċḋėḟġḣŀṁṅȯṗṙṡṫẇẋẏżƁƇƊƑƓƘƝƤƬƲȤɓƈɗƒɠɦƙɱ
ɲƥʠɼʂƭʋȥÆÇÐÑØŒÞßæçıȷñøœþ€¢£¥…µ¡¿×÷¦©®«»‘’“”°¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾
