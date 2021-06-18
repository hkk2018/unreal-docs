# Evil Zombie

## 場景
### 地圖配置
需要：
1. NavMesh
2. 地板要取消勾選CastShadow，並在Tag標註ground（詳閱：卸載地圖仍有陰影之問題）
3. Level Bp中有隨機性的配置，須根據層數大約配置變化內容（變化數約大於等於層數）

不需要：
1. Directional Light，因為在Root Level（MainLevel）有DL了。

### 卸載地圖仍有陰影之問題
由於在Android上，利用LevelStream卸載地圖仍會保留物品所產生的陰影（Windows沒這問題），而這陰影就會投射到下一層導致視覺干擾，所以目前的實際解決方法是利用鏡頭往下帶的時機，把舊圖的物品藏起來，這個須注意：

1. 唯Static Mesh Actor與BP_InstancedMeshes兩類會被隱藏
2. 通常地板會是Static Mesh Actor，須在Tag標註ground，因為連地板都被隱藏視覺上會非常奇怪，必須排除
3. 地板由於不需要產生陰影且不會被隱藏，所以要取消勾選CastShadow。
4. 相關邏輯在BP_GameLevel之Ref Scene Actors。

