import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment/moment';
import { MonthView } from '../components/Calendar';

export default {
  title: 'COMPONENTS/Month',
  component: MonthView,
};

const Template = args => <MonthView {...args}></MonthView>;

//👇 Each story then reuses that template
export const Month = Template.bind({});
Month.args = {
  month: '1',
  year: '2022',
  onCellClick: value => console.log(value),
};
