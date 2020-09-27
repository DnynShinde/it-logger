import React, { useEffect } from "react";
import TechItem from "./TechItem";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getTechs } from "../../actions/techActions";

const TechListModal = ({ getTechs, tech: { techs, loading } }) => {
  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  return (
    <div id="tech-list-modal" className="modal">
      <div className="model-content">
        <h4>Technician List</h4>
        <div className="collection">
          {!loading &&
            techs !== null &&
            techs.map((tech) => <TechItem tech={tech} key={tech.id} />)}
        </div>
      </div>
    </div>
  );
};

TechListModal.prototype = {
  tech: PropTypes.object.isRequired,
  getTechs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tech: state.tech,
});

export default connect(mapStateToProps, { getTechs })(TechListModal);
