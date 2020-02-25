$commitMsg = Read-Host -Prompt 'commit msg'
git add .;
git commit -m $commitMsg;
git push origin master

Read-Host -Prompt "Press Enter to continue"