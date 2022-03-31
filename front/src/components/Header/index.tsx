import React from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import useAuth from 'src/hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { postLogout } from 'src/api';
import { useRouter } from 'next/router';
import Layout from '../Layout';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  color: ${(props) => props.theme.PUBLIC_BLACK};

  a,
  button {
    cursor: pointer;
    text-decoration: none;
    outline: none;
    color: #000;
  }
`;

const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const MenuContainer = styled.div`
  font-size: 1.1rem;
  z-index: 999;

  a,
  button {
    margin-left: 1rem;
  }

  button {
    font-size: 1.1rem;
    padding: 0;
  }
`;

const Header = () => {
  const currentUser = useAuth();
  const router = useRouter();
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  const NotLoggedInClick = () =>
    toast.warn('로그인이 필요합니다', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const onClickMyPage = (url: string) => {
    router.push(`/user/${url}`);
  };

  const onClickLogout = async () => {
    try {
      await postLogout();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container>
        <Logo>
          <Link href="/">
            <a>Reviewfolio</a>
          </Link>
        </Logo>
        <MenuContainer>
          {currentUser.isAuthenticate ? (
            <>
              {currentUser.data.position === 'programmer' ? (
                <Link href="/list">
                  <a>신청하기</a>
                </Link>
              ) : (
                <Link href="/request">
                  <a>요청하기</a>
                </Link>
              )}
              <Link href="/payment">
                <a>결제하기</a>
              </Link>
              <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                마이페이지 <MdKeyboardArrowDown size="1.5rem" />
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          // onKeyDown={handleListKeyDown}
                        >
                          <MenuItem onClick={() => onClickMyPage('status')}>{`${
                            currentUser.data.position === 'programmer' ? '신청현황' : '요청내역'
                          }`}</MenuItem>
                          <MenuItem onClick={handleClose}>내 정보</MenuItem>
                          <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          ) : (
            <>
              <a onClick={NotLoggedInClick}>요청하기</a>
              <a onClick={NotLoggedInClick}>결제하기</a>
              <a onClick={NotLoggedInClick}>마이페이지</a>
            </>
          )}
        </MenuContainer>
      </Container>
    </>
  );
};

export default Header;
