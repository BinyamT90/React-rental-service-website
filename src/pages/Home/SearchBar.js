import SearchField from "react-search-field";
import React from "react";
function SearchBar(props) {

    return (
        <div>
            <SearchField
                placeholder="Search..."
                searchText="search something"
                classNames="test-class"
            />
        </div>
    );
}

export default SearchBar;
