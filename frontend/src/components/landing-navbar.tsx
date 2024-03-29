import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useTranslation, withTranslation } from 'next-i18next';
import * as React from 'react';

import LanguageSwitcher from './language-switcher';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;

function DrawerAppBar(props: Props) {
  const { t } = useTranslation('common');
  // const drawerPosition = i18n.dir() === 'rtl' ? 'right' : 'left';

  const navItems = [t('signIn'), t('signUp')];
  const navItemMap = {
    [t('signIn')]: 'login',
    [t('signUp')]: 'register',
  };
  function getEnglishPath(item: string): string {
    return navItemMap[item] || '';
  }
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {t('projectName')}
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: 'center' }}
              LinkComponent={Link}
              href={getEnglishPath(item)}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        className="py-[15px] lg:py-[2vw] lg:px-[1vw]"
        component="nav"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon className="text-[2.5rem]" />
          </IconButton>

          <Typography
            className="font-size-32"
            variant="h6"
            component="div"
            sx={{
              justifyContent: 'flex-end',
              flexGrow: 1,
              display: { xs: 'flex', sm: 'block' },
            }}
          >
            {t('projectName')}
          </Typography>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button
                className="font-size-24 sm:px-[12px] lg:px-[1vw] "
                key={item}
                sx={{ color: '#fff' }}
              >
                <Link
                  className="text-white no-underline hover:text-red-300"
                  href={getEnglishPath(item)}
                >
                  {item}
                </Link>
              </Button>
            ))}
          </Box>
          <LanguageSwitcher mainColor="!text-white" mainFz="font-size-24" />
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              // if dir is rtl make right 0 and
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
export default withTranslation('common')(DrawerAppBar);
