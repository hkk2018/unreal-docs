# 新手教學

## 常見問題

1. 移動資料夾後，可能會在原處留下空資料夾，無法刪除，要右鍵點選Fix up redirectors in folder後才可刪。原因是該資料夾其實並未全空，若右鍵選show in explorer可看到資料夾尚有檔案，其記錄了關聯的資訊。

2. 移動資料夾後，如果操控不到主角，很可能是因為該關的Game Mode的設定跑掉了，可以從World Setting調整。

3. TopDown模式下新創地圖，結果人物卻不能走？新增Nav Mesh Bounds Volumn以涵蓋人物試試。

4. Bp的子Class一旦啟用一些母Class有的事件，就等同於Override，母Class該事件的邏輯不會觸發，此時可在該事件（如BeginPlay）右鍵選擇Add call to parent function，即可執行母Class的事件。
<!-- 3.  -->

## Hot Keys

Branch Node(if node): B_LMB
移動場景中的物件同時複製：ALT_移動


