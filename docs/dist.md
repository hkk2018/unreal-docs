# 發佈
## UE4端
1.Project Settings -> Packaging -> Project -> 勾選For Distribution (否則上傳Google會以Debug版為由報錯)

2.Build Configuration選Shipping。(同項1之Project區或者打包輸出下方的選項都可設置，是一樣的，兩處會同時連動)

3.Project Settings中搜尋Distribtion Signing，沒填的話打包過程會報錯中止（ERROR: DistributionSigning settings are not all set.）。
填法就照該區提供的超連結步驟走即可，簡單說就是去Android Studio生成KeyStore，然後把該檔複製到這區所指示的資料夾位置，並填妥各欄位。（生成過一個以後製作別的遊戲也可以用這個，因為這只是上傳金鑰，單純作上傳的身分確認用而已）

4.Support arm64要勾（然後上傳arm64版本的檔案），不然上傳後Google會說你不符合啥64位元的設定。

5.現在google強制以androiod app bundle(.aab)的形式上傳，所以armv7也不要取消，製作.aab時會用到。

6.關於轉換成.aab，[按這裡](https://forums.unrealengine.com/development-discussion/android-development/1621046-android-app-bundle)

7.Project Setting => ProjectName（影響安裝完之顯示名稱）

8.由於是使用.aab檔，而.aab並不支援obb檔，所以記得勾選Disable verify obb on first start/update，否則遊戲一開始就會跳這個錯誤導致無法開始。

## Google Play Console端
1. 先按照指示把一些問卷填完。
2. 接受Play App Signing。
3. 把打包好的遊戲上傳。
4. 在公開測試上傳遊戲（以Evil Zombie來說6/15上6/19審過）。
5. 審查似乎不管遊戲內容，因為Evil Zombie下載後其實不能玩（進入遊戲前有報錯只能結束），但審查過了。
6. 公開測試要審核。
7. 內部測試、封閉測試、公開測試之間Store Version不可相同。
8. 內部測試推出後要到可以下載到最新版本，大約要等近1hr。（內部測試推出，電腦連到Google Play看到的是最新版本，但透過電腦安裝此正確版本到手機，手機安裝的仍是上一版本）

# 更新
記得要變更Store Version(如1->2)，不然會報錯。



