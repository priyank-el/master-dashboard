import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
  Box,
  styled,
  useTheme
} from '@mui/material';

import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
// import useAuth from 'app/hooks/useAuth';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';

import { Span } from '../../Typography';
import { toast } from 'react-toastify';
import { messages } from 'constants/allActions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfileData } from 'store/actions/userActions';
import { useState } from 'react';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease'
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: 'flex',
  borderRadius: 24,
  cursor: 'pointer',
  alignItems: 'center',
  '& span': { margin: '0 8px' }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary }
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' }
}));

const Layout1Topbar = () => {

  const theme = useTheme();
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate()

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  const logout = () => {
    const token = localStorage.getItem("JwtToken")
    if (token) {
      localStorage.removeItem("JwtToken")
      toast.success(messages.ADMIN_LOGGED_OUT)
      navigate('/')
    }
    else {
      console.log("token not found");
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    setLoading(true)
    const data = await dispatch(getProfileData())
    if (data.success === true) {
      console.log("data is -> ", data.data);
      setUser(data.data)
      setLoading(false)
    }
    else {
      console.log("fall in side..");
    }
  }

  if (loading) {
    return <h1 className='text-center'>Loading...</h1>
  }

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>

          <IconBox>
            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>
          </IconBox>
        </Box>

        <Box display="flex" alignItems="center">
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                </Hidden>
                {
                  user?.profile
                    ?
                    < Avatar className='ms-3' alt="Travis Howard"
                      src={`http://localhost:3003/uploads/admin/${user.profile}`} />
                    :
                    < Avatar className='ms-3' alt="Travis Howard"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D" />
                }
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <Link to="/profile">
                <Icon> person </Icon>
                <Span> Profile </Span>
              </Link>
            </StyledItem>

            <StyledItem onClick={() => navigate('/update-password')}>
              <Icon> settings </Icon>
              <Span> Update Password </Span>
            </StyledItem>

            <StyledItem onClick={logout}>
              <Icon> power_settings_new </Icon>
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot >
  );
};

export default memo(Layout1Topbar);
