# Quirks

## Coding
<!-- 馬的這條又好了>
<!-- 1. 非exposed的Variable在BeginPlay階段(Event)不是預設值，是該type的預設值。(如int為0) -->

1. montage沒有播放，可能是因為
    * 沒有在Animation BP中插入Slot
    * Play Montage節點上的In Skeletal Mesh Component沒接（不會報錯）

2. launch的遊戲不能一執行就open level，例如在game instance初始化的事件中執行。Editor開的遊戲可以，實際編譯的不行。（通常一開始就使用open level是為了測試作為監聽server的功能）。

3. 刪除不了？（跟移動資料夾無關，通常發生在migration之後，可能有一包資源刪不了）試試該資料夾右鍵Resave all。

4. 字型如果用得好好卻突然找不到，可能需要在Content Browser找到字型所在的資料夾，此會觸發引擎想起有字型的存在而載入。
5. 如果材質突然壞掉，有可能是因為預設的texture出了問題（即使會在mat inst覆寫）。比如說Normal的圖須藍色，如果預設的圖隨便用一個，即使Mat Inst用正確的，結果是整個材質會壞掉（preview時看不出來，放到場景時該材質會變成深黑色），此時須將預設之圖改為合乎規範的才可。