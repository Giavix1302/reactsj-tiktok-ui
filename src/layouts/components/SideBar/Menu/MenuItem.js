import { useState } from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function MenuItem({ title, to, icon, activeIcon }) {
    const [isActiveIcon, setActiveIcon] = useState(false)

    const handleActiveIcon = (nav) => {
        nav.isActive ? setActiveIcon(true) : setActiveIcon(false)
        return cx('menu-item', { active: nav.isActive })
    }

    return (
        <NavLink className={handleActiveIcon} to={to} >
            {isActiveIcon ? activeIcon : icon}
            <span className={cx('title')}>{title}</span>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
}

export default MenuItem;