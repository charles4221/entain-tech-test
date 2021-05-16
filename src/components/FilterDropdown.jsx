import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { Button, Column, FilterItem, FilterMenu, FilterWrapper, Row } from './styled';
import { filterCategories } from '../constants/filters';
import { colours } from '../utils/theme';

const triggerEvents = ['click', 'touchstart', 'keyup'];
const keyCodesToIgnore = [
  32, // space - activates button
  13, // enter - activates button
  9, // tab - navigates through items
  38, // up arrow - navigates up
  40 // down arrow - navigates down
];

/**
 * Filter Dropdown Component.
 * Allows user to toggle the defined filter categories on or off.
 *
 * @param {Object} props The component properties.
 * @param {Array<String>} props.activeFilters The array of active filter IDs.
 * @param {Function} props.handleFilterChange A function to add or remove an ID from `activeFilters`.
 * @returns {JSX.Element} The component markup.
 */
const FilterDropdown = ({ activeFilters, handleFilterChange }) => {
  const wrapperRef = useRef();
  const menuRef = useRef();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const toggleFilters = () => setFiltersOpen((prevState) => !prevState);

  // Hook runs every time `filtersOpen` changes value.
  useEffect(() => {
    // The following will allow dismissing the dropdown when clicking away
    // from the dropdown elements, or pressing any keys on the keyboard that
    // aren't used for accessible navigation.
    const handleClicksAndKeyPresses = (e) => {
      const wrapper = wrapperRef.current;
      const menu = menuRef.current;
      const clickIsInContainer = wrapper.contains(e.target) && wrapper !== e.target;
      const clickIsInMenu = menu && menu.contains(e.target) && menu !== e.target;

      if (
        // Don't dismiss the dropdown if the click is inside itself
        (clickIsInContainer || clickIsInMenu) &&
        // Most keypresses will close the dropdwn, but certain keys need to to be ignored
        // since they will be used by people with accessibility tools
        // to navigate through and select the options.
        (e.type !== 'keyup' || keyCodesToIgnore.includes(e.which))
      ) {
        return;
      }

      // Close the filter menu if we reach this point.
      setFiltersOpen(false);
    };

    const attachEventListeners = () => {
      triggerEvents.forEach((event) =>
        document.addEventListener(event, handleClicksAndKeyPresses, true)
      );
    };

    const removeEventListeners = () => {
      triggerEvents.forEach((event) =>
        document.removeEventListener(event, handleClicksAndKeyPresses, true)
      );
    };

    if (filtersOpen) {
      attachEventListeners();
    } else {
      removeEventListeners();
    }

    // Hook returns a function which runs on component unmount.
    return () => {
      removeEventListeners();
    };
  }, [filtersOpen]);

  return (
    <FilterWrapper ref={wrapperRef}>
      <Button dropdown onClick={toggleFilters}>
        Filter
      </Button>
      <FilterMenu isOpen={filtersOpen} ref={menuRef}>
        {filterCategories.map(({ label, id, icon }) => {
          const active = activeFilters.includes(id);
          return (
            <FilterItem key={id} onClick={() => handleFilterChange(id)}>
              <Row>
                <Column size={2}>{icon}</Column>
                <Column size='auto'>{label}</Column>
                <Column size='auto' marginLeft='auto'>
                  <FontAwesomeIcon
                    icon={active ? faCheckCircle : faCircle}
                    color={active ? colours.primary : colours.primary50}
                  />
                </Column>
              </Row>
            </FilterItem>
          );
        })}
      </FilterMenu>
    </FilterWrapper>
  );
};

FilterDropdown.propTypes = {
  activeFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleFilterChange: PropTypes.func.isRequired
};

export default FilterDropdown;
