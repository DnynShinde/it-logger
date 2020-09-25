import React, { useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { searchLogs } from "../../action/logActions";

const SearchBar = ({ searchLogs }) => {
  const text = useRef("");

  const onChange = (e) => {
    searchLogs(text.current.value);
  };

  const onClick = (e) => {
    searchLogs("");
  };

  return (
    <nav style={{ marginBottom: "30px" }} className="blue">
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder="Search logs"
              ref={text}
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons" onClick={onClick}>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

SearchBar.prototype = {
  searchLogs: PropTypes.func.isRequired,
};

export default connect(null, { searchLogs })(SearchBar);
