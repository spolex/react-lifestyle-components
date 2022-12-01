import 'bootstrap/dist/css/bootstrap.min.css';
import { CalendarView } from '../components/Calendar/CalendarView';

export default {
  title: 'COMPONENTS/Calendar',
  component: CalendarView,
};

const Template = args => <CalendarView {...args}></CalendarView>;

//👇 Each story then reuses that template
export const Basic = Template.bind({});
Basic.args = {
  year: '2022',
  month: '05',
  onCellClick: value => console.log(value),
};

export const Second = Template.bind({});
Second.args = {
  year: '2023',
  month: '05',
  onCellClick: value => console.log(value),
};
