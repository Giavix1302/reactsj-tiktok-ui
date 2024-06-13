import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames/bind';
import styles from './Search.module.scss'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';

import * as searchService from '~/apiServices/searchService'
import { useDebounce } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from "~/components/Icons";

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    const debounced = useDebounce(searchValue, 500)

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([])
            return
        }
        const fetchApi = async () => {
            setLoading(true)
            const result = await searchService.search(debounced)
            setSearchResult(result)
            setLoading(false)
        }
        fetchApi()
        
    }, [debounced])

    const handleClear = () => {
        setSearchValue('')
        inputRef.current.focus()
        setSearchResult([])
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Account</h4>
                        {searchResult.map(result => <AccountItem key={result.id} data={result} />)}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input

                    ref={inputRef}
                    value={searchValue}
                    placeholder='Search acounts and videos'
                    spellCheck={false}
                    onChange={e => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading &&
                    <button
                        className={cx('clear')}
                        onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                }

                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <SearchIcon width='2.4rem' height='2.4rem' />
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;