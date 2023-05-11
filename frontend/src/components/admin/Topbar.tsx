import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Box, IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';

import { ColorModeContext } from '@/theme/theme';

const Topbar = () => {
  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="flex-end" pt={2} pr={2}>
      <IconButton onClick={colorMode.toggleColorMode} size="large">
        {theme.palette.mode === 'dark' ? (
          <DarkModeOutlinedIcon fontSize="large" />
        ) : (
          <LightModeOutlinedIcon fontSize="large" />
        )}
      </IconButton>
    </Box>
  );
};

export default Topbar;
