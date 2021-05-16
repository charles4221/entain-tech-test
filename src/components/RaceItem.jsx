import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { parse } from 'date-fns';
import styled, { css } from 'styled-components';
import { filterCategories } from '../constants/filters';
import { RaceType } from '../utils/types';
import { Column, ListItem, Row } from './styled';

const CounterColumn = styled(Column)`
  text-align: right;

  ${(props) =>
    props.danger &&
    css`
      color: red;
    `}
`;

/**
 * Get Time Until Start.
 * Finds the difference between the start time of the race and the time right now,
 * and provides an object containing the minutes and seconds remaining.
 *
 * @param {Number} startTime The start time of the race in seconds since the epoch.
 * @param {Date}   now       The Date object for right now.
 * @returns {{ mins: Number, secs: Number }} An object containing the minutes and seconds remaining.
 */
const getTimeUntilStart = (startTime, now) => {
  const parsedStartTime = parse(startTime, 't', now);
  const timeInt = +parsedStartTime - +now;
  let timeObj = {};

  timeObj = {
    mins: Math.floor((timeInt / 1000 / 60) % 60),
    secs: Math.floor((timeInt / 1000) % 60)
  };

  return timeObj;
};

/**
 * Race Item Component.
 * Renders the details about a particular race within the widget.
 *
 * @param {Object} props The component properties.
 * @param {Number} props.race_number
 * @param {String} props.meeting_name
 * @param {String} props.category_id
 * @param {{ seconds: Number }} props.advertised_start
 * @param {Date} props.now
 * @returns {JSX.Element}
 */
const RaceItem = ({ race_number, meeting_name, category_id, advertised_start, now }) => {
  const [timeUntilStart, setTimeUntilStart] = useState(
    getTimeUntilStart(advertised_start.seconds, now)
  );
  const category = filterCategories.find(({ id }) => id === category_id);
  const { mins, secs } = timeUntilStart;
  const prettyName = `${category.label}, Race #${race_number} at ${meeting_name}`;

  // Hook runs every time `now` changes value.
  useEffect(() => {
    setTimeUntilStart(getTimeUntilStart(advertised_start.seconds, now));
  }, [advertised_start.seconds, now]);

  return (
    <ListItem
      href='#'
      aria-label={prettyName}
      onClick={(e) => {
        e.preventDefault();
        toast.success(`In prod, that click would take you to ${prettyName}`);
      }}
    >
      <Row>
        <Column size={1}>{category.icon}</Column>
        <Column size={2.5}>{`Race ${race_number}`}</Column>
        <Column>{meeting_name}</Column>
        <CounterColumn danger={mins < 2}>
          {mins > 0 && <span>{secs === 60 ? mins + 1 : mins}m</span>}{' '}
          {mins < 5 && <span>{secs}s</span>}
        </CounterColumn>
      </Row>
    </ListItem>
  );
};

RaceItem.propTypes = RaceType;

export default RaceItem;
