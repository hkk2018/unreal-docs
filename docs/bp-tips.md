# BP tips
## 一般項
1. Node間的連線可以以Reroute的方式作整理。
2. 寫function時input的變數可以不用透過連線取用（右鍵以該變數名搜尋即有，不用為此創建Globla/Local變數）。
3. Parent Class可以在Class Settings中改，這意味著你如果想在子母類間新增一類將非常容易。如果沒此功能（或沒發現這個功能...），你就要從原本子類再衍生出孫類，而把子類的內容手動騰到孫類。
4. 如何在遊戲一開始不自動生成角色，而之後再生成？GameMode的DefaultPawnClass設None，然後之後透過函數 SpawnActor + Possess以生成並接管。
5. 函數如果要回傳空物件，例如if最近敵人為true就回傳此敵人，false則返回空，則fasle處記得也要接Return Ndoe，否則函數會回傳上次執行所cached的回傳值，而非空物件。
6. Bp Variable的Private其實是Protected，子代可以存取該Variable（但右鍵搜尋不到，只能透過Show Inherited Variables去找）。
7. 將函數勾選為Pure，就可以不用多去連Exec線（白線），類似的例子如GetActorLocation等，所以使用上會經常為了減少連線而用。但Pure實際的效果其實是Cache計算結果，當同一Graph多重引用時，計算只會執行一次（一般的則是引用幾次重算幾次），而在絕大多數的場合都不需要重新計算，所以使用Pure一來讓Code好讀，二來節省效能，好處多多。
8. 

## Animation Blueprint
1. 雖然創建ABP時需要選定骨骼，但是子類可以更改，此一特性使得ABP可以有一母類定義通用邏輯，子類再配置特定角色的骨骼並分配給角色BP。
2. 關於ABP的複用，請參考reference
[舊討論串，供參考但可不讀](https://answers.unrealengine.com/questions/128525/how-to-reuse-animation-blueprint-across-different.html)
[新討論串有最新進度](https://forums.unrealengine.com/development-discussion/animation/95850-animation-blueprint-code-with-different-skeletons/page2)
[找不到Play Anim Sequence節點](https://answers.unrealengine.com/questions/995831/cant-find-play-anim-sequence-node-in-anim-bp.html)