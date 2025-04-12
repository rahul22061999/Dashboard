import React from "react";

const NavBar = ({ onOpen }) => {
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
