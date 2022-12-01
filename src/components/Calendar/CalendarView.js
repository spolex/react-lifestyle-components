import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);
import { useState } from 'react';
import { MonthView } from './MonthView';

export const CalendarView = ({ year, month, onCellClick }) => {
  const [currentYear, setCurrentYear] = useState(Number(year));
  const [allMonths, setAllMonths] = useState(moment.months());
  const [currentMonth, setCurrentMonth] = useState(Number(month));

  const handleMonthChange = newMonth => {
    setCurrentMonth(Number(newMonth));
  };

  return (
    <div className="Container">
      <div className="row">
        <ul className="list-group list-group-horizontal justify-content-center">
          <li className="list-group-item" onClick={e => setCurrentYear(currentYear - 1)}>
            -
          </li>
          <h3 className="text-center">{currentYear}</h3>
          <li className="list-group-item" onClick={e => setCurrentYear(currentYear + 1)}>
            +
          </li>
        </ul>
      </div>
      <div className="row">
        <ul className="list-group list-group-horizontal justify-content-center">
          <li className="list-group-item" onClick={e => setCurrentMonth(currentMonth - 1)}>
            -
          </li>
          {allMonths.map((m, i) => {
            if ((currentMonth - 3 <= i) & (currentMonth + 1 >= i))
              return (
                <li
                  key={m}
                  className={
                    m == allMonths[currentMonth - 1] ? 'list-group-item active' : 'list-group-item'
                  }
                  onClick={e => handleMonthChange(e.target.dataset.value)}
                  data-value={i + 1}
                >
                  {m}
                </li>
              );
          })}
          <li className="list-group-item" onClick={e => setCurrentMonth(currentMonth + 1)}>
            +
          </li>
        </ul>
      </div>
      <hr />
      <div className="row">
        <MonthView
          onCellClick={onCellClick}
          month={allMonths[currentMonth - 1]}
          year={currentYear.toString()}
        ></MonthView>
      </div>
    </div>
  );
};
