'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from 'next/link';

// Define props interface
interface ResponsiveAppBarProps {
  userPresent: boolean;
}

const ResponsiveAppBar: React.FC<ResponsiveAppBarProps> = ({ userPresent }) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  // Typing the event parameter for handleOpenNavMenu
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#284B63' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Amanuensis Mach
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuItem>
                <Link href={'/generate'} passHref>
                  <Typography textAlign="center" sx={{ color: '#353535' }}>Generate</Typography>
                </Link>
              </MenuItem>
              {userPresent && (
                <Box>
                  <SignedOut>
                    <MenuItem>
                      <Link href={'/sign-in'} passHref>
                        <Typography textAlign="center" sx={{ color: '#353535' }}>Login</Typography>
                      </Link>
                    </MenuItem>
                  </SignedOut>
                  <SignedIn>
                    <MenuItem>
                      <Link href={'/flashcards'} passHref>
                        <Typography textAlign="center" sx={{ color: '#353535' }}>Collection</Typography>
                      </Link>
                    </MenuItem>
                  </SignedIn>
                </Box>
              )}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Amanuensis Mach
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button 
                href={'/generate'}
                sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Generate
            </Button>
            <SignedIn>
              <Button 
                href={'/flashcards'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Collection
              </Button>
            </SignedIn>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            {userPresent && (
              <SignedOut>
                <Button
                  color="inherit"
                  href="/sign-in"
                  sx={{
                    backgroundColor: 'white',
                    color: '#3C6E71',
                    borderRadius: '20px',
                    padding: '8px 26px',
                    '&:hover': {
                      backgroundColor: 'white',
                      opacity: 1,
                    }
                  }}
                >
                  Login
                </Button>
              </SignedOut>
            )}
          </Box>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
