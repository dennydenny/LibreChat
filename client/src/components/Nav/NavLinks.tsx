import { FileText } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { Fragment, useState, memo } from 'react';
import { Menu, MenuItem, MenuButton, MenuItems, Transition } from '@headlessui/react';
import { useGetUserBalance, useGetStartupConfig } from 'librechat-data-provider/react-query';
import FilesView from '~/components/Chat/Input/Files/FilesView';
import { useAuthContext } from '~/hooks/AuthContext';
import useAvatar from '~/hooks/Messages/useAvatar';
import { LinkIcon, GearIcon } from '~/components';
import { UserIcon } from '~/components/svg';
import { useLocalize } from '~/hooks';
import Settings from './Settings';
import NavLink from './NavLink';
import Logout from './Logout';
import { cn } from '~/utils/';
import store from '~/store';

function NavLinks() {
  const localize = useLocalize();
  const { user, isAuthenticated } = useAuthContext();
  const { data: startupConfig } = useGetStartupConfig();
  const balanceQuery = useGetUserBalance({
    enabled: !!isAuthenticated && startupConfig?.checkBalance,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showFiles, setShowFiles] = useRecoilState(store.showFiles);

  const avatarSrc = useAvatar(user);
  const tariffLink = 'https://ohmygpt.ru/tariffs?' + user?.email;

  return (
    <>
      <a
        href={tariffLink}
        target="_blank"
        rel="noopener noreferrer"
        className="group-ui-open:bg-gray-100 dark:group-ui-open:bg-gray-700 duration-350 mt-text-sm flex h-auto w-full items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        id="headlessui-menu-button-:rq:"
        type="button"
        aria-haspopup="menu"
        aria-expanded="false"
        data-headlessui-state=""
      >
        <div className="-ml-0.9 -mt-0.8 h-8 w-8 flex-shrink-0">
          <img
            className="rounded-full"
            src="data:image/svg+xml,%3Csvg%20fill%3D%22%233acf70%22%20width%3D%22800px%22%20height%3D%22800px%22%20viewBox%3D%220%200%2036%2036%22%20version%3D%221.1%22%20preserveAspectRatio%3D%22xMidYMid%20meet%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%3E%0A%20%20%20%20%3Ctitle%3Eruble-solid%3C%2Ftitle%3E%0A%20%20%20%20%3Cpath%20d%3D%22M20.75%2C9.25H15v8.81h5.79a4.66%2C4.66%2C0%2C0%2C0%2C4.86-4.4A4.65%2C4.65%2C0%2C0%2C0%2C20.75%2C9.25Z%22%20class%3D%22clr-i-solid%20clr-i-solid-path-1%22%20transform%3D%22scale%280.9%29%20translate%282%2C%202%29%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3Cpath%20d%3D%22M18%2C2A16%2C16%2C0%2C1%2C0%2C34%2C18%2C16%2C16%2C0%2C0%2C0%2C18%2C2Zm2.75%2C18.56H15V22h8.29a1%2C1%2C0%2C0%2C1%2C0%2C2H15v5a1.25%2C1.25%2C0%2C0%2C1-2.5%2C0V24H11.25a1%2C1%2C0%2C0%2C1%2C0-2h1.21V20.56H11.25a1.25%2C1.25%2C0%2C0%2C1%2C0-2.5h1.21V8a1.25%2C1.25%2C0%2C0%2C1%2C1.25-1.25h7a7.14%2C7.14%2C0%2C0%2C1%2C7.36%2C6.9A7.15%2C7.15%2C0%2C0%2C1%2C20.75%2C20.56Z%22%20class%3D%22clr-i-solid%20clr-i-solid-path-2%22%20transform%3D%22scale%280.9%29%20translate%282%2C%202%29%22%3E%3C%2Fpath%3E%0A%20%20%20%20%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%2236%22%20height%3D%2236%22%20fill-opacity%3D%220%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </div>
        <div className="mt-2 grow overflow-hidden text-ellipsis whitespace-nowrap text-left text-black dark:text-gray-100">
          Тарифы
        </div>
      </a>
      <Menu as="div" className="group relative">
        {({ open }) => (
          <>
            <MenuButton
              className={cn(
                'group-ui-open:bg-gray-100 dark:group-ui-open:bg-gray-700 duration-350 mt-text-sm flex h-auto w-full items-center gap-2 rounded-lg p-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800',
                open ? 'bg-gray-100 dark:bg-gray-800' : '',
              )}
              data-testid="nav-user"
            >
              <div className="-ml-0.9 -mt-0.8 h-8 w-8 flex-shrink-0">
                <div className="relative flex">
                  {!user?.avatar && !user?.username ? (
                    <div
                      style={{
                        backgroundColor: 'rgb(121, 137, 255)',
                        width: '32px',
                        height: '32px',
                        boxShadow: 'rgba(240, 246, 252, 0.1) 0px 0px 0px 1px',
                      }}
                      className="relative flex items-center justify-center rounded-full p-1 text-white"
                    >
                      <UserIcon />
                    </div>
                  ) : (
                    <img className="rounded-full" src={user?.avatar || avatarSrc} alt="avatar" />
                  )}
                </div>
              </div>
              <div
                className="mt-2 grow overflow-hidden text-ellipsis whitespace-nowrap text-left text-black dark:text-gray-100"
                style={{ marginTop: '0', marginLeft: '0' }}
              >
                {user?.name || user?.username || localize('com_nav_user')}
              </div>
            </MenuButton>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-110 transform"
              enterFrom="translate-y-2 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition ease-in duration-100 transform"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-2 opacity-0"
            >
              <MenuItems className="absolute bottom-full left-0 z-[100] mb-1 mt-1 w-full translate-y-0 overflow-hidden rounded-lg border border-gray-300 bg-white p-1.5 opacity-100 shadow-lg outline-none dark:border-gray-600 dark:bg-gray-700">
                <div className="text-token-text-secondary ml-3 mr-2 py-2 text-sm" role="none">
                  {user?.email || localize('com_nav_user')}
                </div>
                <div className="my-1.5 h-px bg-black/10 dark:bg-white/10" role="none" />
                {startupConfig?.checkBalance &&
                  balanceQuery.data &&
                  !isNaN(parseFloat(balanceQuery.data)) && (
                  <>
                    <div className="text-token-text-secondary ml-3 mr-2 py-2 text-sm">
                      {`Balance: ${parseFloat(balanceQuery.data).toFixed(2)}`}
                    </div>
                    <div className="my-1.5 h-px bg-black/10 dark:bg-white/10" role="none" />
                  </>
                )}
                <MenuItem as="div">
                  <NavLink
                    svg={() => <FileText className="icon-md" />}
                    text={localize('com_nav_my_files')}
                    clickHandler={() => setShowFiles(true)}
                  />
                </MenuItem>
                {startupConfig?.helpAndFaqURL !== '/' && (
                  <MenuItem as="div">
                    <NavLink
                      svg={() => <LinkIcon />}
                      text={localize('com_nav_help_faq')}
                      clickHandler={() => window.open(startupConfig?.helpAndFaqURL, '_blank')}
                    />
                  </MenuItem>
                )}
                <MenuItem as="div">
                  <NavLink
                    svg={() => <GearIcon className="icon-md" />}
                    text={localize('com_nav_settings')}
                    clickHandler={() => setShowSettings(true)}
                  />
                </MenuItem>
                <div className="my-1.5 h-px bg-black/10 dark:bg-white/10" role="none" />
                <MenuItem as="div">
                  <Logout />
                </MenuItem>
              </MenuItems>
            </Transition>
          </>
        )}
      </Menu>
      {showFiles && <FilesView open={showFiles} onOpenChange={setShowFiles} />}
      {showSettings && <Settings open={showSettings} onOpenChange={setShowSettings} />}
    </>
  );
}

export default memo(NavLinks);
