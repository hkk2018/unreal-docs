基本觀念


### 1.Cannot create SoftObjectPath with short package name

* [錯誤分析](https://zhuanlan.zhihu.com/p/356289957)
* [解決方法](https://answers.unrealengine.com/questions/944064/error-when-packaging-2.html#)
* [其他參考1](https://forums.unrealengine.com/t/cannot-create-softobjectpath-with-short-package-name-nonenone/156335/4)
* [其他參考2](https://answers.unrealengine.com/questions/1003582/cannot-create-softobjectpath-with-short-package-na-2.html)

解決方法文章中，有該去哪些地方下中斷點的說明，且如果是不知道怎調試BP專案，在一些回覆也有提到，只要在BP專案中隨便增個C++類，就可以產生visual studio的sln檔，點進去後按Debug（F5），就會開始跑引擎、進入該遊戲專案，而同時能讀到引擎的錯誤訊息(該版本Debug Symbol要先抓)。

不過實際在弄遇到的問題是，非常多檔案都會呼叫到Cannot create SoftObjectPath with short package name... 該行，但呼叫不一定就會拋出錯誤，要ensureMsgf的第一個參數是false才會，所以你中斷點如果單純就這樣設在這行，只是一直被呼叫到而已，你很難知道何時真的報錯，所幸中斷點是可以設置中斷條件的，這樣就可以只在該參數false時中斷，但是由於  

    ensureMsgf(!FPackageName::IsShortPackageName(Path),...)

第一個參數是函數的計算結果而非變數，如果要取值會重新呼叫一次函數，vs不允許此事發生（我是覺得vs的debug似乎有點廢，有個功能可以記住算過的值不就好了...），所以你要知道第一項的值，
只好提前讀取此值並宣告為變數，這也就是說你要改原碼，再重新編譯了。

原碼怎抓很簡單，另外有些坑有文章可以參考[由原碼編譯引擎](https://zhuanlan.zhihu.com/p/62470691)、[由原碼編譯引擎1](https://zhuanlan.zhihu.com/p/107516361)，兩篇看完再開始作，比如說後文會提到多線程下載可以省很多時間。