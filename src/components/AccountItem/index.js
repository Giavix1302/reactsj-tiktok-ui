import classNames from "classnames/bind";
import styles from "./AccountItem.module.scss"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/866f38f49ae81c7c8a364b478d2be03c.jpeg?lk3s=a5d48078&nonce=39224&refresh_token=574b48f5f75dfd57dc74912148bf20bb&x-expires=1717682400&x-signature=Ao2Tx8x3P0CkND%2BQDFDZIRwYvaI%3D&shp=a5d48078&shcp=81f88b70" alt="" />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Nguyen Van A</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
                </h4>
                <span className={cx('username')}>nguyenvana</span>
            </div>
        </div>
    );
}

export default AccountItem;