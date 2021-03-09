# Blender建模

## 基礎知識
### 常用操作
1. 欲針對點(Vertex)、線(Edge)、面(Face)編輯，須Tab鍵切換至Edit Mode。
2. 欲在場景中新增Mesh等物件，按shift_a（Add功能的快鍵）。
3. 欲控制視物遠近、角度，shift_`開啟第一人稱移動視角模式，WSAD移動；平移視窗shift_MMB。（關鍵字：Navigating）。
4. Cursor可用於決定新增物件的產生位置，可以shift_c重置位置，或按n開啟側欄=>view=>3D Cursor手動調整。
5. 位移(g)、旋轉(r)、縮放(s)模式下，可以搭配按鍵x、y、z鎖定該軸移動；若只想在xy平面移動，則按shift_z。
6. 若想使夾角圓滑化，先進入Edit Mode，選擇其中一個Edge，按ctrl_b（關鍵字：Bevel Edges，MMB調整切割數量）調動即可。

### Loop（環、圈）相關功能
1. 欲環狀選取Edge（Edge Loop），alt_RMB點選該Edge（尚有Edge Ring、Face Loop）。
2. 欲產生新的Loop，Edit Mode之下按ctrl_r，MMB可調整圈數（關鍵字：Loop Subdivide）。
3. 

## Modifier

### Boolean
1. 透過聯集、交集、相減等操作產生出新的形狀。
2. 可用於移除建模時重疊的部分（Mesh間重疊，占用poly count但卻看不到的部分）。將要製作的部分合併（ctrl_j），並創一個cube涵蓋該部分，取交集便可。[ref](https://www.youtube.com/watch?v=kf16s5MPBLg&ab_channel=XenWildman)


## 常用幾何形狀製作

### 中空圓柱體
1. 新增Mesh=>Circle。
2. Extrude成紙筒狀。
3. 應用Solidify Modifier並調整厚度。

### 曲面光滑圓柱體（上下兩圓面平坦）
1. 新增圓柱體並加上subdivision modifer（Catmull-Clark type），適當調整參數使其夠圓。
2. 接下來要讓上下兩面保持平坦，先進入edit mode，然後以下4步任選其一：    
    * 利用Loop Subdivide，於軀幹新增loop並拉到貼齊上圓面，並再重複此操作一次。下圓面同前。
    * 利用Edge Loop選取上圓面的圓周，然後執行split=>Face by Edges（在點線面選取區之右側mesh選單內）。下圓面同前。（原理：Splitting an edge affects vertex normal generation at that edge, making the edge appear sharp）[ref](https://docs.blender.org/manual/zh-hant/2.92/modeling/modifiers/generate/edge_split.html)
    * 附加Edge split modifier，並將次序移到最前，然後以下2擇1：
        * 設置Edge Angle角度介於0~89度之間（大於該角度者會split）
        * 啟用Sharp Edges，並將上下兩圓周標記為sharp
    * Bevel待補 

[ref1](https://www.youtube.com/watch?v=9OqomK0HWew&ab_channel=Park3D)
[ref2](https://www.youtube.com/watch?v=V7Qb0DfVRlA&ab_channel=RandomArtAttack)
[ref3](https://blender.stackexchange.com/questions/126313/how-can-i-make-a-hollow-cylinder-faces-to-be-smooth-but-not-rounded-just-smooth/126409)

### S字母
1. 新增cube並進入edit mode刪除所有vertex。
2. 點選poly build模式，ctrl_LMB即可新增vertex，新增2點以成線。
3. 同時選取兩點或者選其邊，ctrl_RMB點擊空白處會直接產生面，重複此步驟直到完成。

[ref](https://www.youtube.com/watch?v=9OqomK0HWew&ab_channel=Park3D)

## 異常排除
1. 有時看起來很規律的模型，在施用modifier（ex：subdivision）後，在某些點行為異常，那麼這可能在建模上有些問題，這可以在Edit Mode底下使用Select All by Trait，然後在點線面模式間切換觀察。
2. Blender的face如果vertex超過4個點可能會有些奇怪問題，比如成面時可能會略過某些點。(vertxt選取順序似乎也會影響成面演算法)
3. 輸出至遊戲引擎，若有些面看不到，則有可能是因為Normal方向相反所致。在Blender中可以勾選Face Orientation查詢，藍色指外紅色指內。
4. 輸入至遊戲引擎會四邊形（或>=4）會被自動轉換成三角形，此過程中可能因Normal計算錯誤而導致有些面看不到，故若有問題須在Blender處加上traianguate modifier後再輸出。

[ref1](https://blender.stackexchange.com/questions/80455/strange-bug-with-the-subdivision-surface-modifier)
[ref2](https://www.youtube.com/watch?v=clzstqtN6YQ&ab_channel=BailyDesign)
[ref3](https://answers.unrealengine.com/questions/969180/mesh-imported-fbx-from-blender-appears-to-be-broke.html)


## 進階觀念
1. Shade Smooth是使Normal漸層化（Normal決定光影效果），可以使Mesh視覺上看起來圓滑（但不會改變外型） ，通常會搭配Object Data Properties（綠色三角形）選項中Normal項的Auto Smooth，以區分出何處須漸層化。