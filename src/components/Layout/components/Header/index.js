import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass, faEllipsisVertical, faEarthAsia, faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

import Tippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import images from '~/assets/images'

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',

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

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([])
        }, 0)
    }, [])

    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>
            <img src={images.logo} alt='tiktok' />
            <Tippy
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
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
            <div className={cx('actions')}>
                <Button text >Upload</Button>
                <Button primary >Log in</Button>

                <Menu
                    items={MENU_ITEMS}
                >
                    <button className={cx('more-btn')}>
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                    </button>
                </Menu>
            </div>
        </div>
    </header>;
}

export default Header;