import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/material';
import Link from 'next/link';
import { NextPage } from 'next';
import classes from './imageGring.module.css';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Header:NextPage<{searchInput:(input:string)=>void,setFilterInput:(input:string)=>void,filterInput:string}> =(props)=>{



  const handleChange = (event: SelectChangeEvent) => {
    props.setFilterInput(event.target.value as string);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
       
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          {/* <Typography>
          <Link href ="/form">Add Pic</Link>
          </Typography> */}
          <Button>
            <Link href ="/form">Add Pic</Link>
          </Button>
          <Search  sx={{marginLeft:"1rem"}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange ={(event)=>props.searchInput(event?.target.value)}
            />
           
          </Search>

          <Select
          sx={{margin:"0 1rem 0 1rem",color:"#fff"}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={props.filterInput}
    label="Age"
    onChange={handleChange}
  >
    <MenuItem value="All">All</MenuItem>
    <MenuItem value="bird">bird</MenuItem>
    <MenuItem value="flower">flower</MenuItem>
    <MenuItem value="mountain">Mountain</MenuItem>
    <MenuItem value="building">Building</MenuItem>
  </Select>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;