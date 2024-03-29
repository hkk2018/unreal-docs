# 專案設置

## 資料夾結構
### Enum
Enum應集中放一個資料夾，因為Enum的DisplayName是FText，會被翻譯系統搜尋到，須藉由資料夾路徑排除。

不用Enum的DisplayName翻譯功能之理由：
1. 一般來說Enum都不會是對外顯示的名稱，即使少數狀況可以順便這樣作，也應該避免以減少混亂。
2. 4.26的Enum的FText有Bug，只要關聯上StringTable就無法Unlink，只能砍掉重來，而很容易弄壞程式。

至於要顯示Enum的名稱的話，一般Enum是作為Id索引用，索引的資料屬性通常會以Struct包成一包，該處另設Ftext顯示，或者作一Get函數來取用皆可。

## 其他
1. 如果覺得燈光有Fade In的現象，那是Auto Exposure的效果，可在Project Setting中將此項取消。[ref](https://forums.unrealengine.com/t/lighting-fades-in/53518)
2. DataAsset在母類，矩陣類的資料最好全都留空，在實例才創，原因是如果資料中比如說名稱為FText，那麼母類跟子類都各會被翻譯系統搜到一次，所以統一由子類為準即可。（FText不在矩陣內的話就手動排除）