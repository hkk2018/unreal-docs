# 環境設計

## 手遊效能要求 
1.純環境Draw call須100以下。
2.console輸入stat scenerendering，可查到Mesh Draw Calls。
3.

## 材質處理
1. Quixel材質載入時自動生成的Material Instance有許多參數可調，非常便利。
2. 若**landscape layer blend（LLB）要用到Quixel材質，且想同時開出參數調整**，在4.26版必須將各材質寫成Mat Func（MF），複製幾份接到LLB上，且每層都需重新命名MF中的參數，因為名稱一樣只會對外顯示一個。[ref](https://www.youtube.com/watch?v=esuOUHfRjsE&ab_channel=MR3D-Dev)
3. 要替換Mat Func，不須斷開原有連線，點選該MF後Detail區選擇其他Mat Func即可。
## 燈光
1. 美術原則：**高對比**環境視覺上重視**Directional Light（DL）**，**低對比**重視**Sky Light（SL）**。
2. 調整燈光時，先關閉環境所有燈光以從零建構，如果重視SL，則加入SL、SkyDome、fog等對SL影響大之因素進行調整(Recapture看效果)

## Mesh處理
1. Foliage是合併所有mesh與材質（待確認／似乎沒有唷），最省效能。
2. UE4對於場景中多個一樣的static mesh，它僅占一份的memory，但仍會增加draw call。[ref](https://forums.unrealengine.com/development-discussion/architectural-and-design-visualization/86096-static-mesh-instancing)
3. Instanced Static Mesh僅一次draw call，而Hierarchical Instanced Static Mesh則可進一步保留各別instance之LOD。[ref1](https://www.youtube.com/watch?v=oMIbV2rQO4k&ab_channel=TechArtAid)[ref2](https://answers.unrealengine.com/questions/178414/difference-between-instanced-static-mesh-component.html)


## Landscape優化
1.draw call數目 = n * component數 * section數，所以要減少後二者。[ref](https://zhuanlan.zhihu.com/p/80663129)
2.