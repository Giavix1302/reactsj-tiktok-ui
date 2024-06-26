import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames/bind';
import styles from './Search.module.scss'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';

import * as searchService from '~/services/searchService'
import { useDebounce } from '~/hooks';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from "~/components/Icons";

const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)

    const inputRef = useRef()

    const debouncedValue = useDebounce(searchValue, 500)

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([])
            return
        }
        const fetchApi = async () => {
            setLoading(true)
            const result = await searchService.search(debouncedValue)
            setSearchResult(result)
            setLoading(false)
        }
        fetchApi()
    }, [debouncedValue])

    const handleClear = () => {
        setSearchValue('')
        inputRef.current.focus()
        setSearchResult([])
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleChange = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(" ")) {
            setSearchValue(searchValue)
        }
    }

    return (
        //Using a wrapper <div> tag around the reference element solves this by creating a new parentNode context. 
        <div>
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
                        onChange={handleChange}
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
                    <button className={cx('search-btn')} onMouseDown={e => e.preventDefault()}>
                        <SearchIcon width='2.4rem' height='2.4rem' />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;