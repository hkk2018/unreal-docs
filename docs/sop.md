# SOPs

## 新增技能
1. 右鍵點擊`BP_Skill_Base`創建子類（此母類處理施放時人物動作的播放、是否開啟OverlapDection、技能結束時的通知以及自我清理）
2. 保留`BP_Skill_`前綴，後自訂技能名稱（PascalCase）
3. BeginPlay事件處撰寫技能邏輯
4. 去`BP_SkillSystem`的`CastSkill`註冊此子類（要搭載技能系統的玩家只須引入此BP，並呼叫CastSkill輸入要施放的技能Id）
5. (Optional)如果是累計性技能要去`E_ConsistentSkill`增以該檔名，並去`BP_SkillSystem`的`ConsistentSkills`中為其對應相應Class，以上步驟乃是因為要計算累計技能數

