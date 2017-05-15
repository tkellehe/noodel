(function(global, characters){


//----------------------------------------------------------------------------------------
var decompress_bitpack7 = function(s) {
    var bits = characters.bitify_string(s), r = "";
    for(var i = 0; i < bits.length;) {
        if(bits[i+7] === 1) {
            var first = bits.slice(i, i+8);
            // Correct all of the bits.
            first.pop();
            first.unshift(0);
            r += characters.debitify_char(first);
            i += 8;
            // Figure out the compressed character and decode the others.
            var compressed = [];
            for(var j = 7; j--;) {
                var c = bits.slice(i, i+8);
                compressed.push(c.pop());
                // Correct the bit shift.
                c.unshift(0);
                r += characters.debitify_char(c);
                // Jump to the start of the next character.
                i += 8;
            }
            compressed.unshift(0);
            r += characters.debitify_char(compressed);
        } else {
            // Easiest case.
            for(var j = 8; j-- && i < bits.length;) {
                var c = bits.slice(i, i+8);
                // Correct the bit shift.
                c.unshift(c.pop());
                r += characters.debitify_char(c);
                // Jump to the start of the next character.
                i += 8;
            }
        }
    }
    return r;
};


//----------------------------------------------------------------------------------------
global.decompress_bitpack = function(N, compressed) {
    // If N is 7, then just use the basic decompession.
    if(N === 7) return decompress_bitpack7(compressed);

    var all_bits = characters.bitify_string(compressed), res = "";

    // Loop through each 8bit chunk in order to look at each character to find the packed characters.
    for(var i = 0; i < all_bits.length; i += 8) {
        // Grab the bits that we know holds a valid character.
        var packed_bits = all_bits.slice(i + (8 - N), i + 8);

        // Fill it with zeros.
        for(var c = 8 - N; c--;) packed_bits.unshift(0);
            res += characters.debitify_char(packed_bits);

        // If on the last character that could be holding a packed character.
        if(((i/8)+1)%(N+1) === 0) {
            // Loop back through each character that hold a packed character and get all of the characters packed.
            for(var k = 1; k < (8 - N); ++k) {
                var bits = [], offset = i - (N*8);
                // If the flag bit is set, then the next N characters hold a packed character.
                if(all_bits[offset+k] === 1) {
                    // Fill it with zeros.
                    for(var c = 8 - N; c--;) bits.push(0);
                    // Get the packed bits.
                    for(var j = 0; j < N; ++j)
                        bits.push(all_bits[offset+k+((j+1)*8)]);
                    res += characters.debitify_char(bits);
                } else {
                    // Can exit because no others should be one.
                    break;
                }
            }
        }
    }
    return res;
};


})(this, this.characters)