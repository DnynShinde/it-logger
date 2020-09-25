import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import { updateLog, clearCurrent } from "../../action/logActions";

const EditLogModal = ({ current, updateLog, clearCurrent }) => {
  const [message, setMessage] = useState("");
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState("");

  useEffect(() => {
    if (current !== null) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = () => {
    if (message === "" || tech === "") {
      M.toast({ html: "Please enter a message and tech!" });
    } else {
      updateLog({
        message,
        attention,
        tech,
        date: new Date(),
        id: current.id,
      });

      M.toast({ html: `Log #${current.id} updated successfully` });

      clearCurrent();
      //  Clear Fields
      setMessage("");
      setTech("");
      setAttention(false);
    }
  };
  return (
    <div id="edit-log-modal" className="modal" style={ModalStyle}>
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

const ModalStyle = {
  width: "75%",
  height: "75%",
};
EditLogModal.prototype = {
  current: PropTypes.object,
  updateLog: PropTypes.func.isRequired,
  clearCurrent: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => ({
  current: state.log.current,
});
export default connect(mapStateToProp, { updateLog, clearCurrent })(
  EditLogModal
);
