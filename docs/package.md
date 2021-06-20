# 打包
## 經驗
1. 如果打包時檔案很大、很多Shader，很可能是系統將所有地圖都Cook了（有時候又不會，不知道...），此可由專案資料夾=>Saved=>Cooked查證。若是，一則刪除無用地圖，二則把所有地圖都放到一個資料夾，並在Project Setting中的Package頁，設置Directories to never cook。
2. 如果Icon加不了（Could not mark image file for add），原因是Git，關了再加即可。[ref](https://answers.unrealengine.com/questions/906467/could-not-mark-image-file-for-add-when-changing-ic.html)

## 編譯問題
打包的編譯過程中很容易發生錯誤，一旦有錯誤，編譯就會失敗，而錯誤通常也不少，但大多是容易處理的，就不會特別說明，稍作調查即可解決，但若是難處理的，就會在底下紀錄解決經驗。

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

原碼怎抓很簡單，另外有些坑有文章可以參考[由原碼編譯引擎](https://zhuanlan.zhihu.com/p/62470691)、[由原碼編譯引擎1](https://zhuanlan.zhihu.com/p/107516361)，兩篇看完再開始作，比如說後文會提到多線程下載可以省很多時間。（但編譯很久，12小時之類的）

下載後，編譯完就可以用VS開引擎（確認UE4.Sln檔要設成StartUp專案，詳[參官方文檔](https://docs.unrealengine.com/4.26/en-US/ProductionPipelines/DevelopmentSetup/BuildingUnrealEngine/)），開了之後即使你抓的版本是你專案的版本(比如說遊戲專案是4.26，你平常用4.26.2的引擎開，那你編譯的也是4.26.2的版本)，專案也無法直接開，而呈現類似版本不相容的樣子。這時就是點你要開的專案，然後選Copy一份的選項去開，開到後來會複製成功，可是會報編譯錯誤，這個不用管，只要複製成功，就有一個具有Sln專案檔遊戲專案，一樣去點開該Sln檔，就可以像之前一樣開啟專案。

接下來就可以順利使用中斷點的條件來偵錯了，而找到這次錯誤來自於一個名為Status的變數，這變數是物件，但是初始值似乎是False，可能原本要創Object但一創出來Bool的時候就先按編譯之後才改變數型態成物件，導致初始值吃到Bool的。