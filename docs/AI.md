# AI系統
## 概論
1. 定義遇到什麼情況作什麼事 => Behavior Tree。
2. Behavior Tree要用到哪些變數（人物狀態、敵人位置等） => 用一份Blackboard檔定義（並在runtime實際產生）這些變數。
3. Blackboard只是一些變數的集合，這些變數的數值由外部控制（例如在AI controller中設定，或者是Behavior Tree的service亦可控制，這兩者都有能力直接訪問Blackboard）。
4. UE中負責AI相關功能的單位是AI controller（簡稱AIC），所以在AIC中可以執行Behavior Tree，並可取得該tree所使用的Blackboard（但若無使用Blackboard就不會返回值，且在RunBehaviorTree之後Blackboard變數才會被系統賦值）。
5. 簡言之，Behavior Tree一般根據Blackboard的數值作決策（並非強制使用Blackboard，但比起直接在Behavior Tree訪問特定instance的狀態，多一層Blackboard可使Behavior Tree與Blackboard更通用），而Blackboard的數值要自己找時機更新（透過AIC或者BTService的scope存取、更動數值）。

## Behavior Tree
### 概述
1. 畫面中所有的node，都能設定a.執行條件（Decorator，無設定則預設執行），b.次要執行事務（Service，是該node主要功能外附屬的功能）。
2. Service通常是拿來更新數值，如更新Blackboard的數值。其實此功能設計的概念就是，讓你在往下一個node跑之前可以先進行一些狀態的更新，讓下一個node的Decorator或者其執行內容能根據最新的狀態來執行。
3. 畫面中以node方式呈現的，可以分為Composite與Task。
4. Composite（同時作／只作第一個合乎條件的／作到直到出現不合條件的）=> 相當於邏輯閘。
5. Task即是主要要實現的功能，例如追逐敵人、播放死亡動畫等。
6. Composite可以往下接Composite或Task，進而形成一個樹狀的結構，所以叫作行為樹。

### Flow Control
1. Notify Observer：On Result Change => 有變無、無變有時觸發Abort，On Value Change => 值改變（物件Ref改變或者有無之變動）觸發Abort。[ref](https://www.youtube.com/watch?v=PcBV-X5R9dE&list=PLSlkDq2rO1t47gMJ0GdO5aSTfOKy_TTln&index=12&ab_channel=MathewWadstein)
2. Obserer aborts：none表不特別去中斷（但下次經過此條件時不會執行），self表該Node底下的都中斷，lower priority表更右的都不會執行但自己本身不中斷，both表sefl + lower priority。[ref](https://www.youtube.com/watch?v=kEI4Ez-WnJQ&list=PLSlkDq2rO1t47gMJ0GdO5aSTfOKy_TTln&index=8&ab_channel=MathewWadstein)


### Task
1. Task物件建立後就會一直存在，不隨行為樹事件的執行重新產生（意即當執行時記得Reset變數）。