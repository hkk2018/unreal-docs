# 打包

## 基本程序
1.Project Settings -> Packaging -> Project -> 勾選For Distribution (否則上傳Google會以Debug版為由報錯)

2.Build Configuration選Shipping。(同項1之Project區或者打包輸出下方的選項都可設置，是一樣的，兩處會同時連動)

3.Project Settings中搜尋Distribtion Signing，沒填的話打包過程會報錯中止（ERROR: DistributionSigning settings are not all set.）。
填法就照該區提供的超連結步驟走即可，簡單說就是去Android Studio生成KeyStore，然後把該檔複製到這區所指示的資料夾位置，並填妥各欄位。（生成過一個以後製作別的遊戲也可以用這個，因為這只是上傳金鑰，單純作上傳的身分確認用而已）

4.Support arm64要勾（然後上傳arm64版本的apk檔），不然上傳後Google會說你不符合啥64位元的設定。

5.Project Setting => Project Name（影響安裝完之顯示名稱）。若無效則去Android => Application Display Name修改。

6.Android Package Name一旦上傳到Play之後就不可更改，只能重開新專案，須小心。（打包後似乎就不可改了，印象中編譯會報錯，刪除intermediate可以繞過）


## 關於以.aab檔發佈
試著使用過.aab檔發布，但是會遇到著名的問題
![img](./assets/Screenshot_20210620-213553_EvilZombie.jpg)
[嘗試過一些解法但無效或不實際](https://answers.unrealengine.com/questions/958844/solution-no-google-play-store-key-no-obb-found-and.html)，最後只好回到以apk+obb的方式上傳。（當然store key的部分應該沒問題）
其實整個測試看下來，再加上aab檔的定義「App bundle 可以被分解成多個小區塊，Google Play Store 會將這些區塊重新組合為 apk 檔並提供使用者下載。」，可以合理推測，aab檔其實就等價於apk檔，而是真的不含資源檔的。
[參考討論](https://forums.unrealengine.com/t/tutorial-how-to-create-android-app-bundle-at-unreal-engine/138830/6)
[參考討論2](https://forums.unrealengine.com/t/android-app-bundle/126314/3)

所以，如果你勾選Package game data inside .apk，讓obb含在apk檔之中，應該也可解，但是實際測試.aab檔從90多mb變成300多mb，超過了.aab檔150mb的大小限制而無法上傳到Google。這即使縮減obb檔，未來還是非常有機會超過的，所以此路不通，只好暫時回去用apk+obb。

Google的aab檔，有支援一種類似obb檔的資源檔叫Play Asset Delivery (PAD) ，不過看起來跟UE的支援度還很差，所以就先擱置了。

<!-- 5.現在google強制以androiod app bundle(.aab)的形式上傳，所以armv7也不要取消，製作.aab時會用到。 -->

<!-- 6.關於轉換成.aab，[按這裡](https://forums.unrealengine.com/development-discussion/android-development/1621046-android-app-bundle) -->


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


### ERROR: cmd.exe failed with args
這個問題疑似是在改動Android Package Name發生的。
![img](assets/android-package-name.png)
最一開始我並不知道癥結點，只覺得沒改動什麼、引擎也沒當掉，就突然出錯了，很無言而已。那接下來就是單純除錯，先查了[討論串](https://answers.unrealengine.com/questions/867231/error-cmdexe-failed-with-args-1.html)，按照建議移除所有SDK Build Tool並裝最新版，再加更新一些其他周邊的東西，無法修復。

後來就從Log再細查，因為在這個錯誤報出導致失敗時，該處的Log再前面一點有Android拋錯的詳細細節，根據這點我猜可能是特定版本的問題，所以我從最新版退到次新版（SDK Manager有個Show Package Details可以選擇版本），問題就解決了。

不過隨後我上傳這個編譯好的包，因為上面的Android Package Name跟之前不符被Google擋下（這次編譯時我應該是有順便調動Package Name），我沒多想就把Package Name改回之前的再編譯一次。沒想到這次再調回去，又報一樣的錯了，且是在packagename.debug（程序名稱不精準）之類的附近出錯，我這才發現之前的錯誤可能就是與此有關。那因為討論串很多人把Intermidiate刪掉就好了，且安裝新的Build Tool就能沒事，根據這兩點，我猜新裝SDK Build Tool時會記錄Package Name於Intermidiate，之後就是作檢查，所以刪掉此資料之後就是重新記錄而不會報錯。根據這假設我刪除Intermidiate後，就編譯成功了。

### fatal error: UTF-16 (LE) byte order mark detected

UATHelper: Packaging (Android (ETC2)):     C:/Users/hongk/Documents/Unreal Projects/DynamicCombatSys/Intermediate/Plugins/NativizedAssets/Android/Game/Intermediate/Build/Android/UE4/Shipping/NativizedAssets/Module.NativizedAssets.15_of_33.cpp(7,10): fatal error: UTF-16 (LE) byte order mark detected in 'C:/Users/hongk/Documents/Unreal Projects/DynamicCombatSy
s/Intermediate/Plugins/NativizedAssets/Android/Game/Source/NativizedAssets/Private/NativizedAssets_Dependencies.cpp', but encoding is not supported

當啟用Nativization時，遇到檔名有中文者會報出錯誤，如上錯誤訊息可以在NativizedAssets_Dependencies.cpp查找到中文字。本例是某張圖片因為夾帶了複製兩字導致編譯失敗。