# 效能
## 效能低下原因
1. actor重複spawn，系統清理不及 
2. 移動計算(特效、物體)

## 提升效能方式
1. nativization，理論上快10倍（但豬與菇沒特別感覺）

## 手遊限制

tris:上限200k

draw call：上限300

recycle actors	不要一直生，不然會來不及清理


