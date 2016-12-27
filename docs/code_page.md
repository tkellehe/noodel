[HOME](README.md)

# Code Page

The following is the current 256 different characters that _Noodel_ recognizes.

```
'ð','¶','¤','!','"','#','$','%','&',"'",'(',')','*','+',',','-',
'.','/','0','1','2','3','4','5','6','7','8','9',':',';','<','=',
'>','?','@','A','B','C','D','E','F','G','H','I','J','K','L','M',
'N','O','P','Q','R','S','T','U','V','W','X','Y','Z','[','\\',']',
'^','_','`','a','b','c','d','e','f','g','h','i','j','k','l','m',
'n','o','p','q','r','s','t','u','v','w','x','y','z','{','|','}',
'~','\t','\n',' ','¡','¿','Æ','Ç','Ð','Ñ','×','Ø','Œ','Þ','ß','æ',
'ç','ı','ȷ','ñ','÷','ø','œ','þ','Ɓ','Ƈ','Ɗ','Ƒ','Ɠ','Ƙ','Ɲ','Ƥ',
'Ƭ','Ʋ','Ȥ','ɓ','ƈ','ɗ','ƒ','ɠ','ɦ','ƙ','ɱ','ɲ','ƥ','ʠ','ɼ','ʂ',
'ƭ','ʋ','ȥ','Ạ','Ḅ','Ḍ','Ẹ','Ḥ','Ị','Ḳ','Ḷ','Ṃ','Ṇ','Ọ','Ṛ','Ṣ',
'Ṭ','Ụ','Ṿ','Ẉ','Ỵ','Ẓ','Ȧ','Ḃ','Ċ','Ḋ','Ė','Ḟ','Ġ','Ḣ','İ','Ŀ',
'Ṁ','Ṅ','Ȯ','Ṗ','Ṙ','Ṡ','Ṫ','Ẇ','Ẋ','Ẏ','Ż','ạ','ḅ','ḍ','ẹ','ḥ',
'ị','ḳ','ḷ','ṃ','ṇ','ọ','ṛ','ṣ','ṭ','ụ','ṿ','ẉ','ỵ','ẓ','ȧ','ḃ',
'ċ','ḋ','ė','ḟ','ġ','ḣ','ŀ','ṁ','ṅ','ȯ','ṗ','ṙ','ṡ','ṫ','ẇ','ẋ',
'ẏ','ż','¢','£','¥','¦','©','¬','®','µ','€','«','»','‘','’','“',
'”','°','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹','⁺','⁻','⁼','⁽','⁾',
```

The first 97 characters _Noodel_ considers normal printable chars (ends at `~`).

The `ð`, `¶`, `¤` are `\t`, `\n`, and ` ` respectively. This is done to allow the parser to use the whitespace characters.