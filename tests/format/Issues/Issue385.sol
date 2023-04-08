contract Issue385 {
  function emptyTryCatch() {
            try{
            } catch {
                revert("BService.delegatecall.assign:undefined");
            }
  }
}
