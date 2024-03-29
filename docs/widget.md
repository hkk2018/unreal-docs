# Widget

## 入門文章
https://baemincheon.github.io/2020/02/09/unreal-widget-coordinate-system/

## FGeomtry
1. 具有該Widget的位置、大小資訊。
2. 一般使用GetTickSpaceGeometry（有別種Geometry），官方推薦但沒多介紹。
3. 通常Event Construct處直接搜Geometry會查不到資料（如LocalSize為0,0），即使是第一個Tick也沒有，目前尚未找到開始有資料的事件，可能就要Delay或者透過Tick去檢查。
4. GetTopLeftLocal是取得相對於母容器的所在位置。
5. AbsoluteLocation是以螢幕左上角為起始點的座標系（所以視窗離螢幕左上角越遠，得出數值越大）
6. 滑鼠點擊事件（Mouse Event）可以得到的GetScreenSpacePosition，完全等同於AbsoluteLocation。
7. AbsoluteLocation跟LocalLocation之間的關係取決於DPI Scale。（Local * DPI scale = Abs）
8. LocalToAbsolute是計算自己作為容器，底下的座標所對應到的Absolute的位置。換言之，如果要知道自己的AbsLocation，LocalLocation要填0,0（重要，不是把自己的LocalLeftTop放進去，而是填0,0）。



## 雜項
1. 當joystick被全螢幕的Widget擋住 :可以將Widget最上層的Canvas之Visibility設成Not-Hit-Testable（Self Only），可以在營造出Canvas上空白處營造出穿透的效果，而能點到joystick。[有人說Widget之zorder改-1有用但我測是不行](https://answers.unrealengine.com/questions/401796/changing-zorder-of-virtual-joysticks.html)
2. 當遊戲畫面因長寬比不稱而有多餘黑區塊，導致全螢幕的Widget溢出時：概念上是要多一個ScaleBox去包Canvas，實作上是ScaleBox（橫向遊戲一般設Scale To Fit Y）包SizeBsox（要符合Camera的Aspect Ratio，如1.777=16:9，SizeBox可以設置1600x900）再包Canvas。[ref](https://forums.unrealengine.com/t/best-way-to-handle-widgets-and-screen-resolution/20123/7)
3. UMG也有如Web的Bubble、Capture系統，[參考](https://docs.unrealengine.com/4.26/en-US/BlueprintAPI/Widget/EventReply/)。
4. Select + Linked FText（Text內容索引至String Table）是很昂貴的，用在Widgt Binding大概會掉20Fps。無索引則幾乎不耗能。
## 
### List View & Tile View
<!-- 概念：這兩者添加子元素的方法比較少見，首先你要在Designer頁設置Entry Widget Class（下方創建數量只是Preview用，正式跑遊戲不會有，必須在BP加），然後到Graph頁用AddItem去加，然而這邊並非加Widget，而是加該Widget要用到的資料（以Object類夾帶即可），系統就會用這個資料搭配剛填寫的Class去Render，而很可能就是系統為了效能而不讓玩家自行創建多個Widget填入。

至於Widget跟資料的聯繫，則是透過實作OnListItemObjectSet，來取得，不過雷點就在這裡，如果在Entry Widget Class那區用加號新增子類，會產生一個有User List Entry的介面的User Widget，但就是沒有上述之OnListItemObjectSet，要User Object List Entry才有，而這必須自己手動設置。

其他：
1.Tile可以Wrap，List不行。
[ref](https://forums.unrealengine.com/t/umg-list-how-do-i-go-about-using-tile-view/117499/3)
[ref1](https://blog.csdn.net/weixin_39759600/article/details/111683135) -->