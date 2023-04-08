contract RepeatStatement {
   uint static a;
   function func() internal {        
        TvmCell c;
        repeat (3) {      
            uint a =       1;     
        }        
    }

}