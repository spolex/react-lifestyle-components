import './styles.module.css';

import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
import { Children, useEffect, useState } from 'react';

export const MonthView = ({ year, month, onCellClick }) => {
  const [firstDay, setFirstDay] = useState(moment(year.concat('-').concat(month)).startOf('month'));
  const [monthRange, setMonthRange] = useState(
    Array.from(
      moment
        .range(
          moment(year.concat('-').concat(month)).startOf('month').toDate(),
          moment(year.concat('-').concat(month)).endOf('month').toDate(),
        )
        .by('days'),
    ),
  );
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const startDate = moment(year.concat('-').concat(month));
    console.log(startDate.format());
    const newMonthRange = Array.from(
      moment
        .range(startDate.startOf('month').toDate(), startDate.endOf('month').toDate())
        .by('days'),
    );
    const newWeeks = [];
    newMonthRange.map(d => {
      console.log(d.format());
      if (!newWeeks.includes(d.week())) {
        newWeeks.push(d.week());
      }
    });
    setWeeks(newWeeks);
    setMonthRange(newMonthRange);
    setFirstDay(startDate.startOf('month'));
  }, [month, year]);

  return (
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col"></th>
            {moment.weekdays().map(weekDay => (
              <th scope="col" key={weekDay} className="days-of-week">
                {weekDay}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map(week => {
            const weekStart = moment(firstDay).week(week).startOf('week').format();
            const weekEnd = moment(firstDay).week(week).endOf('week').format();
            const weekRange = Array.from(moment.range(weekStart, weekEnd).by('day'));
            return (
              <tr key={week}>
                <th scope="row">{week}</th>
                {weekRange.map(d => (
                  <td
                    key={d.format('DD')}
                    className={
                      d.format('MM') != firstDay.format('MM') ? 'text-secondary' : 'text-body'
                    }
                    data-value={d.format()}
                    onClick={
                      d.format('MM') == firstDay.format('MM')
                        ? e => onCellClick(e.target.dataset.value)
                        : () => {}
                    }
                  >
                    {d.format('DD')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
