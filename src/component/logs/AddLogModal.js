import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import { addLog } from "../../action/logActions";

const AddLogModal = ({ addLog }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech!" });
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date(),
      };

      addLog(newLog);

      M.toast({ html: `New log is added by ${tech}` });

      //  Clear Fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };
  return (
    <div id="add-log-modal" className="modal" style={ModalStyle}>
      <div className="modal-content">
        <h4>Enter System Logs</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor="message" className="active">
              Log Message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={(e) => setTech(e.target.value)}
            >
              <option value="" disabled>
                Select Technician
              </option>
              <option value="Balaso">Balaso</option>
              <option value="Anjali">Anjali</option>
              <option value="Kartik">Kartik</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  name="attention"
                  value={attention}
                  className="filled-in"
                  onChange={(e) => setAttention(!attention)}
                />
                <span>Need Attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect blue waves-light  btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

AddLogModal.prototype = {
  addLog: PropTypes.func.isRequired,
};

const ModalStyle = {
  width: "75%",
  height: "75%",
};

export default connect(null, { addLog })(AddLogModal);
