# 發佈
## UE4端
1.Project Settings -> Packaging -> Project -> 勾選For Distribution (否則上傳Google會以Debug版為由報錯)

2.Build Configuration選Shipping。(同項1之Project區或者打包輸出下方的選項都可設置，是一樣的，兩處會同時連動)

3.Project Settings中搜尋Distribtion Signing，沒填的話打包過程會報錯中止（ERROR: DistributionSigning settings are not all set.）。
填法就照該區提供的超連結步驟走即可，簡單說就是去Android Studio生成KeyStore，然後把該檔複製到這區所指示的資料夾位置，並填妥各欄位。

4.Support arm64要勾（然後上傳arm64版本的檔案），不然上傳後Google會說你不符合啥64位元的設定。

5.現在google強制以androiod app bundle(.aab)的形式上傳，所以armv7也不要取消，製作.aab時會用到。

6.關於轉換成.aab，[按這裡](https://forums.unrealengine.com/development-discussion/android-development/1621046-android-app-bundle)

## Google Play Console端
1. 先按照指示把一些問卷填完。
2. 接受Play App Signing。
3. 

# 更新
記得要變更Store Version(如1->2)，不然會報錯。



