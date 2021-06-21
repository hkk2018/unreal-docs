# Evil Zombie

## 場景
### 地圖配置
需要：
1. NavMesh
2. 地板要取消勾選CastShadow，並在Tag標註ground（詳閱：卸載地圖仍有陰影之問題）。
3. Level Bp中有隨機性的配置，須根據層數大約配置變化內容（變化數約大於等於層數）。

不需要：
1. Directional Light，因為在Root Level（MainLevel）有DL了。

### 卸載地圖仍有陰影之問題
由於在Android上，利用LevelStream卸載地圖仍會保留物品所產生的陰影（Windows沒這問題），而這陰影就會投射到下一層導致視覺干擾，所以目前的實際解決方法是利用鏡頭往下帶的時機，把舊圖的物品藏起來，這個須注意：

1. 唯Static Mesh Actor與BP_InstancedMeshes兩類會被隱藏。
2. 通常地板會是Static Mesh Actor，須在Tag標註ground，因為連地板都被隱藏視覺上會非常奇怪，必須排除。
3. 地板由於不需要產生陰影且不會被隱藏，所以要取消勾選CastShadow。
4. 相關邏輯在BP_GameLevel之Ref Scene Actors。

## 容易莫名其妙壞掉的地方
1. 如果選技能的文字、圖片不見了（通常在Editor開來玩如果遇到此狀況會報錯），要去BP_PassiveSkillManagerCompoent之PassiveSkillInfos、WB_PassiveSkillForList之SkillInfos與WB_PassiveSkillForBar之Infos（這個比較少壞），設置DA_PlayerPassiveSkillInfos。最正確的查法是用DA_PlayerPassiveSkillInfos的定義Class並以Reference Viewer查，即可查到所有要填此DA的檔案。另外，在Android中發生了主畫面地圖沒事，但進戰鬥地圖便喪失該DA預設值的情況，各種微調測約10次只有1次沒此狀況，跟天人討論後天人查到資料，最後是在asset manager設定後再測試就好了。(ref)[https://answers.unrealengine.com/questions/836900/i-have-some-blueprint-subclasses-of-primarydataass.html]


## Migrate須要填寫正確才能運行的內容
1. Project Setting => interatable & projectile
2. input
3. asset manager填passive skill DA之class與資產（這樣在Android才不會在某些地方遺失預設值）