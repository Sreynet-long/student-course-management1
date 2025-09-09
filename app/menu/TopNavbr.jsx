import React from 'react'
import { Stack, Box, Typography,Avatar, Grid ,TextField, InputAdornment} from '@mui/material'
import {CiSearch} from "react-icons/ci";

export default function TopNavbr() {
  return (
    <Stack direction="row" className='p-4'>
        <Grid container>
            <Grid>
                <TextField 
                    fullWidth
                    variant='outline'
                    size='small'
                    placeholder='Search'
                    InputProps={{
                        startAdornment:(
                            <InputAdornment position='end'>
                            <CiSearch size="25"  color='#259525' variant="outline"/>
                            </InputAdornment>
                        )
                    }}
                />
            </Grid>
            <Grid>
                <Avatar sx={{ margin: "5px 10px 5px 0px" }} alt="Nara" src="/static/images/avatar/2.jpg" />
            </Grid>
        </Grid>
    </Stack>
  )
}
