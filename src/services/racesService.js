import { toast } from 'react-toastify';

/**
 * Fetch Next Races from the Neds API.
 * After data is returned we map an array with only the
 * second array item from `Object.entries` to make it simpler to work with.
 * @returns {Promise<Array>} An array of race summaries.
 */
export const fetchNextRaces = () =>
  fetch('https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=30')
    .then((res) => res.json())
    .then(({ data }) => {
      // Create a simplified array from the returned data.
      let races = [];

      // `next_to_go_ids` are already sorted by the BE by `advertised_start`,
      // so we can loop through these ids and push the corresponding race
      // object into our new array, so our races will be sorted correctly without
      // having to perform a sort on the frontend.
      data.next_to_go_ids?.forEach((id) => {
        races.push(data.race_summaries[id]);
      });

      return races;
    })
    .catch(() =>
      toast.error(
        'Sorry, there was an unexpected error. Please try refreshing the page or come back later.'
      )
    );
