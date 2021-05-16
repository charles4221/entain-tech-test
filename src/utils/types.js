import PropTypes from 'prop-types';

export const RaceType = {
  race_id: PropTypes.string.isRequired,
  race_number: PropTypes.number.isRequired,
  meeting_name: PropTypes.string.isRequired,
  category_id: PropTypes.string.isRequired,
  advertised_start: PropTypes.exact({
    seconds: PropTypes.number.isRequired
  }).isRequired
};
