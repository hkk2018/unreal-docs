# 編程規範
[參考來源](https://github.com/Allar/ue4-style-guide#bp-vars)
### BP Naming
1. 凡是在BluePrint之中的命名原則上全採**PascalCase**，`Variable`如Health、HitRate，`Function`或`Macro`等通常以**動詞**或**On**起始，如GetEnemy、OnDie、IsDead。
2. 布林變數為例外，以b為前綴，例如bAlive。
3. Local Variable一律前綴L_，如L_Health。

1之理由：
新增Variable或Function等的預設名字，或新增Component後系統自動添加的Variable皆為PascalCase。
即使手動改成首字小寫，BP節點的顯示都會被系統自動轉為大寫，所以就直接按照系統規範的。

### Naming for Assets

依照檔案類型附上Prefix，如BP_MainCharacter、WBP_CardDeckEdition，詳情參考[asset-naming-conventions](https://github.com/Allar/ue4-style-guide#1-asset-naming-conventions-)。

<!-- ### Func -->