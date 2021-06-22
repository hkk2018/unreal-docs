# 引擎功能介紹

## Event Dispatcher（事件分配器）
![Event Dispatcher](./assets/on-finish.png)

A事件發生，會告知B、C、D......等事件要跟著發生。
概念上如同Javascript的addEventListener，只是在OOP的設計模式中，是各類（B、C、D）去向某一類（A）註冊自己的CallBack函數。

以「函數」來說只是幫助理解，更精確地說是「事件」本位（類似C#），以棒球作說明，有3個類別（class）：球、球員、裁判。設球被打擊到，球本身會觸發A事件即被擊中，而B事件屬於球員叫準備跑壘，C事件屬於裁判叫進行觀察。

這種情況，會在球類上創建Event Dispatcher，任何要觸發的事件，不論是自己或者別人的，都要在這邊註冊（Bind），當程式碼運行過程中要觸發這些註冊的事件，則利用呼叫（Call）的功能以觸發所有註冊的事件；所以上述的A事件，要在自身的BP綁定，B、C則是要引用球類實例，去把自己身上的事件註冊到球類的Event Dispatcher上。

通常Event Dispatcer的使用大致上就是為了要告知某一特定事件的發生，如A事件（被擊中），所以Event Dispatcher的命名就當作該事件命名即可（例如OnHit），需要搞清楚的只是光只有Event Dispatcher是不會觸發任何事件的，因為它就只是調度器，所以球類自己必須創建一個事件並把它註冊到這上面才行。


* Call: 告知、觸發所有註冊的事件，順序即訂閱順序
* Bind: 將任意事件註冊在分配器上（重複註冊不會導致多次觸發）
* Unbind: 取消註冊
* Unbind all: 取消分配器上的所有註冊（吧
* Event: 幫你在EventGraph貼上這個分配器預設好的一個事件，只是讓你省力不用自己創一個。還需要Bind才會被觸發
* Asign: 就是幫你一次作好上述的Event跟Bind的功能（幫你一次貼上兩個Node）

::: tip
子類可在EventGraph放上母類具有的事件，其作用等同Override，母類在該事件宣告的程式碼不會執行，如要執行，要在子類的該事件上右鍵選Add call to parent function。
:::

## Localization
### 使用概述
UE4內建有翻譯系統，它透過Text類與Localization Dashboard完成。Text類是一種專門支援語言翻譯的類別，每個Text生成後，都可以選擇是否要翻譯，若要則系統會為此Text生成唯一的ID(Key)，而你在上面填的內容，則視為母語（Native）文本，你可以在Dashboard中設置何種語言為母語文本，設置好之後，在Dashboard可以幫你找出所有用Text的地方，然後你就可以根據母語文本去設置對應到其他語言的翻譯內容。

### 參考
有個概念後，可直接看實作示範，這樣最快。
[官方文檔](https://docs.unrealengine.com/4.26/zh-CN/ProductionPipelines/Localization/)
[實作示範](https://www.youtube.com/watch?v=UD2_TEgxkqs&ab_channel=UnrealEngine)
[其他參考1](https://forums.unrealengine.com/t/localization-dashboard-preview-and-explanation-of-ue4s-text-localization-process/24650)
[其他參考2](https://medium.com/@lojungyun/ue4-%E7%9A%84%E6%9C%AC%E5%9C%B0%E5%8C%96%E7%B3%BB%E7%B5%B1%E4%BB%8B%E7%B4%B9-%E8%A8%AD%E5%AE%9A%E7%AF%87-5108ddc1e0df)