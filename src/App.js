import { useEffect, useRef, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { ToastContainer } from 'react-toastify';
import { parse } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import FilterDropdown from './components/FilterDropdown';
import RaceItem from './components/RaceItem';
import {
  Column,
  Container,
  Fade,
  GlobalStyle,
  List,
  Logo,
  Main,
  Row,
  SpinnerWrapper,
  Widget,
  WidgetContent,
  WidgetHeader,
  WidgetTitle
} from './components/styled';
import { filterCategories } from './constants/filters';
import { fetchNextRaces } from './services/racesService';
import { colours } from './utils/theme';
import logo from './logo.svg';

/**
 * Entain Technical Test Application.
 * Renders the "Next 5 Races to Jump" widget.
 *
 * @returns {JSX.Element} The root React Application.
 */
const App = () => {
  const nodeRef = useRef();
  const [now, setNow] = useState(new Date());
  const [raceData, setRaceData] = useState([]);
  const [filteredRaceData, setFilteredRaceData] = useState([]);
  const [activeFilters, setActiveFilters] = useState(filterCategories.map(({ id }) => id));

  /**
   * Add or remove the `filterId` from the `activeFilters` array.
   * @param {String} filterId The `category_id` of the filter category.
   */
  const handleFilterChange = (filterId) =>
    setActiveFilters((prevFilters) => {
      if (prevFilters.includes(filterId)) {
        // Remove the id if it is already present.
        return prevFilters.filter((id) => id !== filterId);
      } else {
        // Add the id if not.
        return [...prevFilters, filterId];
      }
    });

  const handleFetchNextRaces = () => fetchNextRaces().then((data) => setRaceData(data));

  // Hook runs once on component mount.
  useEffect(() => {
    // Get the initial race data on load.
    handleFetchNextRaces();

    // Fetch fresh race data every 30 seconds.
    const fetchInterval = setInterval(handleFetchNextRaces, 30000);

    // Hook returns a function which runs on component unmount.
    return () => {
      // Ensure fetch interval is cleared on unmount.
      clearInterval(fetchInterval);
    };
  }, []);

  // Hook runs every time `now` changes value.
  useEffect(() => {
    // Update the `now` value every 1 second.
    // I use timeout here instead of interval, because this hook will
    // inherently be re-run after `setNow` completes, starting the timeout again.
    const updateNowEverySecond = setTimeout(() => {
      setNow(new Date());
    }, 1000);

    // Hook returns a function which runs on component unmount.
    return () => {
      // Ensure timeout is cleared on unmount.
      clearTimeout(updateNowEverySecond);
    };
  }, [now]);

  // Hook runs every time `raceData`, `activeFilters` or `now` change value.
  useEffect(() => {
    let filtered = raceData;

    // Remove any races that are 1m+ past their start time.
    filtered = filtered.filter(({ advertised_start }) => {
      const parsedStartTime = parse(advertised_start.seconds, 't', now);
      const timeInt = +parsedStartTime - +now;

      if (Math.floor(timeInt / 1000) < -59) {
        return false;
      }

      return true;
    });

    // If `activeFilters` exists and has length...
    if (activeFilters?.length) {
      // ...filter the data by the active categories.
      filtered = filtered?.filter(({ category_id }) => activeFilters.includes(category_id));
    }

    // Finally, we only want to see 5 items max at a time.
    filtered = filtered.slice(0, 5);

    // Set the filtered data to state.
    setFilteredRaceData(filtered);
  }, [raceData, activeFilters, now]);

  return (
    <Main>
      <GlobalStyle />
      <Container>
        <Logo src={logo} alt='Neds' width={200} />
        <Widget>
          <WidgetHeader>
            <Row>
              <Column size='auto'>
                <WidgetTitle>Next 5 Races!</WidgetTitle>
              </Column>
              <Column size='auto' marginLeft='auto'>
                <FilterDropdown
                  activeFilters={activeFilters}
                  handleFilterChange={handleFilterChange}
                />
              </Column>
            </Row>
          </WidgetHeader>
          <WidgetContent>
            {filteredRaceData?.length ? (
              <List>
                <TransitionGroup>
                  {filteredRaceData.map((race) => (
                    <Transition
                      key={race.race_id}
                      nodeRef={nodeRef}
                      timeout={300}
                      unmountOnExit
                      mountOnEnter
                    >
                      {(state) => (
                        <Fade state={state} ref={nodeRef}>
                          <RaceItem now={now} {...race} />
                        </Fade>
                      )}
                    </Transition>
                  ))}
                </TransitionGroup>
              </List>
            ) : (
              <SpinnerWrapper>
                <FontAwesomeIcon color={colours.primary} size='3x' icon={faSpinner} spin />
              </SpinnerWrapper>
            )}
          </WidgetContent>
        </Widget>
      </Container>
      <ToastContainer />
    </Main>
  );
};

export default App;
