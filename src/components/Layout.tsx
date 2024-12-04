import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AppBar } from './AppBar';
import { DrawerHeader } from './DrawerHeader';
import { Drawer } from './Drawer';
import { EditCalendarOutlined, GroupsOutlined, InsightsOutlined } from '@mui/icons-material';
import { Link, Outlet } from 'react-router-dom';
import { Container, Tooltip } from '@mui/material';
import { useState } from 'react';

export default function Layout() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display : 'flex', height : '100vh' }}>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight : 5
                            },
                            open && { display : 'none' }
                        ]}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
              Project planning dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Project planning', 'Analytics', 'Clients'].map((text) => (
                        <ListItem key={text}     sx={{ display : 'block' }}>
                            <Tooltip title={open ? '' : text} placement={'right'}>
                                <ListItemButton to={ text === 'Project planning' ? '/' :  text === 'Analytics' ? 'analytics' : 'clients '} component={Link}
                                    sx={[
                                        {
                                            minHeight : 48,
                                            px        : 2.5
                                        },
                                        open
                                            ? {
                                                justifyContent : 'initial'
                                            }
                                            : {
                                                justifyContent : 'center'
                                            }
                                    ]}
                                >
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth       : 0,
                                                justifyContent : 'center'
                                            },
                                            open
                                                ? {
                                                    mr : 3
                                                }
                                                : {
                                                    mr : 'auto'
                                                }
                                        ]}
                                    >
                                        {text === 'Project planning' ? <EditCalendarOutlined /> : null}
                                        {text === 'Analytics' ? <InsightsOutlined /> : null}
                                        {text === 'Clients' ? <GroupsOutlined /> : null}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={text}
                                        sx={[
                                            open
                                                ? {
                                                    opacity : 1
                                                }
                                                : {
                                                    opacity : 0
                                                }
                                        ]}
                                    />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow : 1, p : 0 }}>
                <DrawerHeader />
                <Container maxWidth={false} disableGutters sx={{ pb : 0, height : '100%' }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
}
