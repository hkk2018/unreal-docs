# 環境設計

## 手遊效能要求 
1. 純環境Draw call一般須100以下。

## 效能檢測
1. cmd(`鍵)輸入stat scenerendering，可查到draw call（Mesh Draw Calls）。
2. draw call會受到選取（可用g鍵切換為game mode，以隱藏選取、輔助線及燈光符號）、開著MeshAsset等因素影響，檢測效能若出現非預期結果很可能與此有關。（經常發生：弄了老半天Draw Call還100多，全關了還有40多，不可能啊......啊MeshAssets開著沒開=.="）
3. Draw call for LODn ≒ mesh數（instanced mesh則同類只計1） * mat數 * 2（有動態陰影的話），同時間出現的LOD越多越多Draw call。
4. Lighting Build之前引擎會動態計算影子，即使是static的物件，所以Build之後才是真實值。（實測：mesh取消cast shadow跟Lighting Build完成後的結果一樣）[ref](https://forums.unrealengine.com/development-discussion/content-creation/116237-foliage-tool-and-draw-calls)

## 材質處理
1. Quixel材質載入時自動生成的Material Instance有許多參數可調，非常便利。
2. 若**Landscape Layer Blend（LLB）要用到Quixel材質，且想同時開出參數調整**，在4.26版必須將各材質寫成Mat Func（MF），複製幾份接到LLB上，且每層都需重新命名MF中的參數，因為名稱一樣只會對外顯示一個。[ref](https://www.youtube.com/watch?v=esuOUHfRjsE&ab_channel=MR3D-Dev)
3. 要替換Mat Func，不須斷開原有連線，點選該MF後Detail區選擇其他Mat Func即可。

## 燈光
1. 美術原則：**高對比**環境視覺上重視**Directional Light（DL）**，**低對比**重視**Sky Light（SL）**。
2. 調整燈光時，先關閉環境所有燈光以從零建構，如果重視SL，則先加入SL、SkyDome、fog等對SL影響大之因素進行調整(Recapture看效果)。

## Mesh處理
1. UE4對於場景中多個一樣的static mesh，它僅占一份的memory，但仍會增加draw call。[ref](https://forums.unrealengine.com/development-discussion/architectural-and-design-visualization/86096-static-mesh-instancing)
2. Instanced Static Mesh僅一次draw call，而Hierarchical Instanced Static Mesh則可進一步保留各別instance之LOD。[ref1](https://www.youtube.com/watch?v=oMIbV2rQO4k&ab_channel=TechArtAid)[ref2](https://answers.unrealengine.com/questions/178414/difference-between-instanced-static-mesh-component.html)
3. 場景設計實務上不太用3，一來只能在BP中調，二來限定單一種mesh，不適用在Editor擺設各種mesh的一般工作流程，所以通常是用Merge Actors，將所有mesh直接合併成1個或數個。
4. Merge Actor要能合併Material，需限定單一LOD，所以可以分成近景（細緻）、遠景（粗糙），而合併為2個mesh。
5. 屬於同一個單元的mesh（同一間房子or同一個區域）盡量要用資料夾分類，以便選取。
6. 可以將製作用的mesh移出到sub level，這樣在打包時才不會占用空間。

## Foliage效能
1. Foliage在開放世界可以藉由LOD優化效能，但在開發手遊時，場景中增加LOD反而會大幅提升Draw call。
2. LOD必須從asset中調整，可以重設LOD之數量，特定LOD之tri count等，手遊建議直接只留LOD0並適當減少triangle count/vertice count。

## Landscape優化
1. draw call數目 = n * component數 * section數，所以要減少後二者。[ref](https://zhuanlan.zhihu.com/p/80663129)
2. component數目無法動態更改，而刪除landscape後fooliage會受到影響（大多會被刪除，少數會留下，原因不明），無法避免，所以一開始component數就要先確定以免白工。

## 小技巧
1. 4.26版world outliner要一次收合資料夾要：1.shift_點擊根目錄小三角 2.釋放shift並再次點擊。（UE4整理物件動輒數百數千，資料夾又動不動展開，無此招則甚不便）[ref](https://forums.unrealengine.com/development-discussion/content-creation/59836-how-to-keep-closed-the-folders-in-world-outliner)
2. 如果以特定攝影機角度來看場景（按Play不是人物而是場景畫面）：1.設置Camera Actor並調至所欲角度，並設置Auto Activate For Player 2.將目前使用之GameMode的Default Pawn調None（此步可省，如果不想要有人物的話才調）。

## Blender基礎與工作流
1. 控制視物遠近、角度的關鍵字：Navigating。（shift_`開啟第一人稱移動視角模式，WSAD移動）
2. 點擊物件後tab切換至Edit Mode才可於材質面板逐面指定材質。
3. UE4之Send to Unreal工具可實現一鍵輸出至當前之引擎Instance。
4. 由於場景中物件最終會被合併（含材質），所以在無法或不便為物件繪製單一的UV texture的時候，可用mat slot的方式製作。