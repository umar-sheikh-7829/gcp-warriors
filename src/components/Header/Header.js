import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'

export default function Header() {
  return (
    <div >
        <AppBar position="static">
            <Toolbar variant="dense" style={{display: "flex", justifyContent: 'center'}}>
                <Typography variant="h6" color="inherit" component="div">
                GCP-warriors Query Application
                </Typography>
            </Toolbar>
        </AppBar>
    </div>
  )
}
