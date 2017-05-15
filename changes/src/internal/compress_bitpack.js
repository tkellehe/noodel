(function(global, characters){


//----------------------------------------------------------------------------------------
var compress_bitpack7 = function(s) {
    var a = [], packed_count = 0
    // Every 9th character will get compressed into the previous 7 characters where
    // the 1st gets a bit set indicating that the next seven have a character hidden within.
    for(var i = 0; i < s.length; ++i) {
        // Gets the character in bit form.
        var bits = characters.bitify_char(s[i]);

        // If the 9th character compress, else do normal left shifting.
        if((i+1)%9 !== 0) {
            // Rotate the bits (place a zero in the back).
            // This allows for only the compressable characters to be used in the string.
            bits.push(bits.shift());
            a = a.concat(bits);
        } else {
            // We only need the last seven bits because the largest value is 97.
            bits.shift();
            // Tells that there is a character compressed in the next 7 characters.
            a[((i - 8 - packed_count) * 8) + 7] = 1;
            for(var j = (i - 7 - packed_count) * 8, k = 0, l = (i - 1 - packed_count) * 8; j <= l; j+=8) {
                // Places the bits into the unused bits of the next 7 characters.
                a[j + 7] = bits[k++];
            }
            ++packed_count;
        }
    }
    return characters.debitify_string(a);
};


//----------------------------------------------------------------------------------------
global.compress_bitpack = function(N, string) {
    // If it requires 7 bits to encode each character in the string, the best compression is the basic one.
    if(N === 7) return compress_bitpack7(string)

    var all_bits = [], packed_index = 0;
    for(var i = 0; i < string.length; ++i) {
        // Get the character in its bit format.
        var bits = characters.bitify_char(string[i]),
        // Used to determine whether or not the character must be packed into the previous N+1 characters.
        is_compressed = false;

        // 7 - N characters can be packed into the previous N+1 characters.
        var j = 7 - N;
        while(0 < j) {
            // If the current position is properly divisable by eight given offset j, then it can be packed.
            if((i+j)%8 === 0) {
                is_compressed = true;
                break;
            };
            // Move j.
            j--;
        }

        if(is_compressed) {
            // The offset into which bit holds the data in the characters being packed into.
            var offset = 8 - j - N;
            // Indicate that the next N characters hold a packed character.
            all_bits[((packed_index - N - 1)*8) + offset] = 1;
            // Loop through each of the bits in the character to be packed.
            for(var k = N; 0 < k; --k)
                // Places the bits into the correct location.
                all_bits[((packed_index - k)*8) + offset] = bits[8 - k];
        } else {
            // No packing required, therein just append on the bits.
            all_bits = all_bits.concat(bits);
            // Increment the packed_index, beause added a new character that can hold characters.
            packed_index++;
        }
    }

    // Can now turn the bits into actual characters.
    return characters.debitify_string(all_bits);
};


})(this, this.characters)