import React, { useEffect, useMemo } from "react";
import _ from "lodash";

const NavBar = ({ onOpen, onSearch }) => {
  const debouncedSearch = useMemo(() => {
    return _.debounce((value) => onSearch(value), 300);
  }, [onSearch]);

  // ✅ cancel on unmount
  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleSearch = (e) => {
    const value = e.target.value;
    debouncedSearch(value); // ✅ call the debounced function with value
  };
  return (
    <>
      <div className="navbar bg-base-100 p-4">
        {/* Start */}
        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-48 md:w-auto"
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* End */}
        <div className="navbar-end">
          <button className="btn btn-primary" onClick={onOpen}>
            Add Client
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
