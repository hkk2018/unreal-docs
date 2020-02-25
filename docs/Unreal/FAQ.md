# FAQ

1.  
    Q : Why does the camara shake when your player penatrate other characters or pawns?  
    A : Probably due to SpringArm's `Do collision test` option being checked.

2\.  
Q : How to click on pawns or characters in a topdown game ?  
A :

* By BP's capsule compoent's `onClicked` event and `Default click trace channel` in player controler(ex: topdown controler) being set to Pawn or others. `Click Event Keys` specifies what to trigger by.
* get hit result under cursor for objects
