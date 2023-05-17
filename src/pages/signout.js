import { InputLabel } from "@material-ui/core";
import React, { useState, useEffect } from 'react';
const SignOut=()=>{
    useEffect(() => {
       sessionStorage.removeItem('userName');
      });

return (
    <InputLabel sx={{marginLeft:35}}><h2>You have successfully LogOut</h2></InputLabel>
);
}
export default SignOut;