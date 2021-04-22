# Combat System

comps:
1. StateManager：存放state與activity state的地方。
2. CollisionHandlerComponent：



## 一般小怪（僅具基本功能：巡邏、追主角、攻擊、被擊中會停止動作一下）製作SOP：
1. 載入小怪Mesh、動畫等資源，並為其創建BlendSpace（名以「BS_怪物名稱」，水平軸前四欄依序填Direction、-180、180、4，縱軸前四欄依序填Speed、0、375、2，並往下至Sample Interpolation Tab中的Target Weight Interpolation改5，之後填入相對應的動畫asset。Direction表示移動方向，如人以倒退的方式走即為＋-180，如螃蟹橫行則為+-90，如果無對應動畫就都填正面移動的即可）。
2. 至GenericAIEnemy/ABP/ABP_GenericEnemy，右鍵創建子類，名以「ABP_怪物名稱」，並開啟此檔進行
   1. Class Settings => Class Options => Target Skeleton => 改成相對應骨骼
   2. 進Class Defaults 
      1. 設定相對應之BlendSpace
      2. 設定Montage => 根據類別設置（且須注意Slot須與ABP_GenericEnemy中的Slot Node一致，否則不會播放，這是常犯錯誤），其中攻擊類別的需在Montage中設置Anim_Notifies
         1. ANS_HitBox，用來決定開啟攻擊偵測的期間，並在右邊Detail處設定Collision Part，比如在此Montage中怪物是使用右手攻擊則選RightHand。
         2. ANS_RotateOnwer，用來決定隨著主角方向轉動的期間（一般建議跟HitBox重疊，但稍微寬點。另外第二個之後的Notify可以新開Track放，較易讀） 
   3. 儲存修改並移至本目錄下之ChildClass集中存放。
3. 至GenericAIEnemy/CharacterBP/AI/BP_BaseAI，右鍵創建子類，名以「BP_怪物名稱」，並開啟此檔進行
   1. 設置CharacterMesh（視情況調整Capsule尺寸或人物方向等），並指定對應之ABP。
   2. 進入Class Defaults => Combat Tab=>CollisionSockets，比如說小怪使用右手攻擊，則找出（或創建）要用來作擊中判定的sockets，而填入RightHandCollisionSockets中，如此當怪物進行攻擊而啟動擊中判定時，便會利用這些socket的移動軌跡去作判定。
   3. 儲存修改並移至本目錄下之ChildClass集中存放。
4. 完成，拖入場景中即可對主人公進行攻擊


## 角色數值系統
### 概念
理想的數值系統應該
1. 可以註冊各種基本數值(HP、Mana、Atk、Def)。
2. 數值本身會具備一些基礎功能，比如說可以記錄裝備增益或者狀態增減益等。
3. 可以指定各種數值要搭配的進階功能（例如HP應該是可以再生的）。
4. 可以註冊經組合計算得出的數值（比如說格檔率，可能由Def決定，甚至同時取決於是否裝備盾牌）。
5. Actor在使用時，可以直接知道（有型別）各種數值本身具備的功能（不須每次用都要Cast to Class）。

基於第5點，UE4中沒有Varible可以記錄不同Class的資訊（例如HP用Class A，Atk用Class B，當然若此二者都用同一母Class，是可以概括存於Variable，但存取子類功能就還是需要Cast），所以最好的設定檔其實是利用BP本身，也就是在BP中宣告各數值的Instance，這樣在別處就可以直接取用（免Cast），而且