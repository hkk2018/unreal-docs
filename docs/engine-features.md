# 引擎功能介紹

## Event Dispatcher（事件分配器）
![Event Dispatcher](./assets/on-finish.png)

A事件發生，會告知B、C、D......等事件要跟著發生。
概念上如同Javascript的addEventListener，只是在OOP的設計模式中，是各類去向某一類註冊自己的CallBack函數（以「函數」來說只是幫助理解，即使在UE4中也可以以函數註冊，但通常是使用事件）。

以棒球作說明，有3個類別（class）：球、球員、裁判。設球被打擊到（OnHit），球本身會觸發A事件飛出去，而B事件屬於球員叫準備跑壘，C事件屬於裁判叫進行觀察。

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

String Table可以用來減少重複翻譯，例如A、B、C三處Text內容都是Apple，則在Dashboard會出現三次，但如果你在String Table中設置一項叫Apple，並讓該三處引用自String Table，則Dashboard只會出現一次Apple，所以就只要翻譯一次即可。

::: warning
Enum的元素名稱雖然也是Text，但在此用上String Table很容易發生異常，故建議不要在此設置String Table。

異常內容：一設置就無法取消，然後假設Enum的內容是Atk、Def，且已經用上String Table了，而這時因為key有錯字，Atk這條你就刪掉新創一個，再去Enum指定這個新創的，這個新創的名字即使也是Atk，拿去Foorlop以原本Enum為Key的Map資料就會搜不到東西。
:::
::: warning
Gather Text發生錯誤有可能是因為使用Git版控導致的，暫時關掉版控可以解決此異常。
:::

### 參考
有個概念後，可直接看實作示範，這樣最快。
[官方文檔](https://docs.unrealengine.com/4.26/zh-CN/ProductionPipelines/Localization/)
[實作示範](https://www.youtube.com/watch?v=UD2_TEgxkqs&ab_channel=UnrealEngine)
[其他參考1](https://forums.unrealengine.com/t/localization-dashboard-preview-and-explanation-of-ue4s-text-localization-process/24650)
[其他參考2](https://medium.com/@lojungyun/ue4-%E7%9A%84%E6%9C%AC%E5%9C%B0%E5%8C%96%E7%B3%BB%E7%B5%B1%E4%BB%8B%E7%B4%B9-%E8%A8%AD%E5%AE%9A%E7%AF%87-5108ddc1e0df)
[其他參考3](https://answers.unrealengine.com/questions/750398/how-to-change-game-language-during-game-play.html)

## DataAsset
DataAsset跟UObject的差異，只是它已經是實例，所以可以作為變數的預設值，一般的物件則必須在運行時實例化才可。
通常是拿來存放一些公用的資料，比如說被動技能系統的Icon、敘述或相關參數等，這樣無論是在主畫面的UI，或者在遊戲中的技能選擇，都可以直接透過DataAsset取得資訊。

然後DataAsset很容易遇到預設值遺失的問題，很可能是因為系統遺漏加載該DataAsset，所以需要在Asset Manager註冊。
配置方法是重點，錯誤的話沒用。
![img](assets/data-asset-config-wrong.jpg)
不能選個母Class全包，沒用，要針對各子類去配置如下圖，Primary Asset Type相當於ID，不可重複。
![img](assets/data-asset-config-correct.jpg)