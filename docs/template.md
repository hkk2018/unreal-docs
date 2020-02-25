# Url編碼兩三事

結論：

後端收到含有UTF-8字元的Url時，會以UTF-8的編碼形式呈現，所以Node收到的Url要加一個decodeURI(url)轉換才會對應到正確的中文檔名。

> URL的編碼格式是採用ASCII碼，不是Unicode，而中文並非ASCII碼。
因此在瀏覽器上看到的中文網址都是經過UTF8的解碼後得到的結果。
所以當我們把瀏覽器的網址複製下來貼到記事本後，就會看到好像亂碼的URL。
https://lyhpcha.pixnet.net/blog/post/279329665


> 先說為什麼需要作 URLEncode，RFC 3986規範了哪些字元是作為保留字（如：!、@、/、?等），如果URL中使用到了這些保留字，就必須將它編碼為「%HEXHEX」的形式，舉例來說，「空白字元」的 ASCII code 是32，所以會被編碼為 %20，而其它 non-ASCII 字元（如：中文字）則以 UTF-8 字元編碼後的位元組來編碼成 %HEXHEX 的形式。
如果有一個字串是：「This is my \*\*書本\*\*」，根據 RFC 3986 的定義，作完 URL encode 之後應該會變成「This%20is%20my%20%2A%2A%E6%9B%B8%E6%9C%AC%2A%2A」。

https://blog.xuite.net/dizzy03/murmur/44843892-%5B%E8%BD%89%5D+%E6%B7%B7%E4%BA%82%E7%9A%84+URLEncode

https://notfalse.net/40/http-representation

https://blog.longwin.com.tw/2010/01/javascript-encodeuri-component-utf-8-2010/

https://dotblogs.com.tw/marcus116/2012/07/29/73690