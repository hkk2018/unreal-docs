# Widget

## 雜項
1. 當joystick被全螢幕的Widget擋住 :可以將Widget最上層的Canvas之Visibility設成Not-Hit-Testable（Self Only），可以在營造出Canvas上空白處營造出穿透的效果，而能點到joystick。[有人說Widget之zorder改-1有用但我測是不行](https://answers.unrealengine.com/questions/401796/changing-zorder-of-virtual-joysticks.html)
2. 當遊戲畫面因長寬比不稱而有多餘黑區塊，導致全螢幕的Widget溢出時：概念上是要多一個ScaleBox去包Canvas，實作上是ScaleBox（橫向遊戲一般設Scale To Fit Y）包SizeBsox（要符合Camera的Aspect Ratio，如1.777=16:9，SizeBox可以設置1600x900）再包Canvas。[ref](https://forums.unrealengine.com/t/best-way-to-handle-widgets-and-screen-resolution/20123/7)



## 