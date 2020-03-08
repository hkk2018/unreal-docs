# Quirks

## Coding
<!-- 馬的這條又好了>
<!-- 1. 非exposed的Variable在BeginPlay階段(Event)不是預設值，是該type的預設值。(如int為0) -->

1. montage沒有播放，可能是因為
    * 沒有在Animation BP中插入Slot
    * Play Montage節點上的In Skeletal Mesh Component沒接（不會報錯）
