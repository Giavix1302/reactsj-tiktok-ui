import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faEllipsisVertical, faEarthAsia, faKeyboard, faGear, faCoins, faUser, faSignOut } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import images from '~/assets/images'

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Image from '~/components/Image';

import { InboxIcon, SearchIcon, SentIcon } from '~/components/Icons';

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'language',
            data: [
                {
                    code: 'en',
                    title: 'English'
                },
                {
                    code: 'vi',
                    title: 'Tiếng việt'
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback'
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
]



function Header() {

    const [searchResult, setSearchResult] = useState([])

    const currentUser = true

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([])
        }, 0)
    }, [])

    const handleMenuChange = (menuItem) => {
        console.log(menuItem);
    }

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@hoaaa'
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coins'
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Setting',
            to: '/setting'
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faSignOut} />,
            title: 'Log out',
            to: '/logout',
            separate: true
        },
    ]

    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>
            <img src={images.logo} alt='tiktok' />
            <HeadlessTippy
                interactive
                visible={searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Account</h4>
                            <AccountItem />
                            <AccountItem />
                            <AccountItem />
                        </PopperWrapper>
                    </div>
                )}
            >
                <div className={cx('search')}>
                    <input placeholder='Search acounts and videos' spellCheck={false} />
                    <button className={cx('clear')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                    <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />
                    <button className={cx('search-btn')}>
                        <SearchIcon width='2.4rem' height='2.4rem' />
                    </button>
                </div>
            </HeadlessTippy>
            <div className={cx('actions')}>
                {currentUser ? (
                    <>
                        <Tippy content="Messages">
                            <button className={cx('action-btn')}>
                                <SentIcon width='2.6rem' height='2.6rem' />
                            </button>
                        </Tippy>
                        <Tippy content="Inbox">
                            <button className={cx('action-btn')}>
                                <InboxIcon />
                                <span className={cx('badge')}>12</span>
                            </button>
                        </Tippy>

                    </>
                ) : (
                    <>
                        <Button text >Upload</Button>
                        <Button primary >Log in</Button>
                    </>

                )}
                <Menu
                    items={currentUser ? userMenu : MENU_ITEMS}
                    onChange={handleMenuChange}
                >
                    {currentUser ? (
                        <Image
                            className={cx('user-avatar')}
                            src='https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/866f38f49ae81c7c8a364b478d2be03c.jpeg?lk3s=a5d48078&nonce=39224&refresh_token=574b48f5f75dfd57dc74912148bf20bb&x-expires=1717682400&x-signature=Ao2Tx8x3P0CkND%2BQDFDZIRwYvaI%3D&shp=a5d48078&shcp=81f88b70'
                            alt="Nguyen Van A" 
                        />
                    ) : (
                        <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    )}

                </Menu>
            </div>
        </div>
    </header>;
}

export default Header;