import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Table } from '../components/Table';
import moment from 'moment';

export default {
  title: 'COMPONENTS/Table',
  component: Table,
};

export const WorkOut = args => {
  const [_data, setData] = useState(args.dataset);
  const [_metadata, setMetadata] = useState(args.metadata);
  const [min, setMin] = useState(args.min);
  const [max, setMax] = useState(args.max);

  useEffect(() => {
    setMin(args.min);
    setMax(args.max);
    setData(args.dataset);
  }, [args.max, args.min, args.dataset]);

  const onItemChange = udpatedItem => {
    console.log('Itemmmmmmmm is changing!!!');
    console.log(udpatedItem);
    setData(
      _data.map(item => {
        if (item.id === udpatedItem.id) {
          return udpatedItem;
        }
        return item;
      }),
    );
  };

  const handleOnAdd = () => {
    console.log(max);
    if (_data.length < max) {
      console.log('Adding row!!!');
      var newItem = {};
      Object.keys(_metadata).map(key => {
        if (key === 'id') newItem[key] = _data.length + 1;
        else newItem[key] = _metadata[key].default;
      });
      setData([..._data, newItem]);
    } else console.log('That is the max!!!');
  };

  const handleOnDelete = () => {
    if (_data.length > min) {
      console.log('We are deleting data');
      setData(_data.filter(item => item.id !== _data.length));
    } else console.log('That is the min!!!');
  };

  return (
    <Table
      onItemChange={onItemChange}
      data={_data}
      metadata={_metadata}
      handleOnAdd={handleOnAdd}
      handleOnDelete={handleOnDelete}
      handleOnSave={args.handleOnSave}
      {...args}
    />
  );
};

WorkOut.args = {
  title: 'Curl biceps',
  muscleGroup: 'Biceps',
  dataset: [
    { id: 1, date: '2022-11-23', repetitions: 15, weigth: 100 },
    { id: 2, date: '2022-11-23', repetitions: 10, weigth: 18 },
  ],
  metadata: {
    id: { name: 'id', type: 'text' },
    date: {
      name: 'date',
      type: 'date',
      default: moment(new Date()).format('YYYY-MM-DD'),
    },
    repetitions: { name: 'repetitions', type: 'number', default: 10 },
    weigth: { name: 'weigth', type: 'number', default: 50 },
  },
  max: 10,
  min: 1,
  handleOnSave: data => {
    console.log('Saving data!!!!');
    console.log(data);
  },
};

export const Project = args => {
  const [_data, setData] = useState([]);
  const [_metadata, setMetadata] = useState({});
  const [min, setMin] = useState(args.min);
  const [max, setMax] = useState(args.max);
  const [_format, setFormat] = useState(args.format);
  const [initialDate, setInitialDate] = useState(args.initialDate);
  const [months, setMonths] = useState(
    Array.from(Array(12).keys()).map(month => moment(initialDate).add(month, 'M').format(_format)),
  );

  useEffect(() => {
    setMin(args.min);
    setMax(args.max);

    args.schema = { ...args.schema, end_date: { name: 'end_date', type: 'date' } };
    months.map(month => {
      args.schema = { ...args.schema, [month]: { name: [month], type: 'number' } };
    });
    setMetadata(args.schema);

    setData(
      args.dataset.map(item => {
        var new_end_date = moment(item.start_date).add(item.duration, 'M').format(_format);
        months.map(month => {
          var include = Number(item.start_date <= month && month <= new_end_date);
          return (item[month] = (include * item.value) / item.duration);
        });
        return {
          ...item,
          end_date: new_end_date,
        };
      }),
    );
  }, [args.max, args.min]);

  const save = () => {
    console.log(JSON.stringify(_data));
  };

  const onItemChange = udpatedItem => {
    console.log('Itemmmmmmmm is changing!!!');
    console.log(udpatedItem);
    setData(
      _data.map(item => {
        if (item.id === udpatedItem.id) {
          return udpatedItem;
        }
        return item;
      }),
    );
  };

  const handleOnAdd = () => {
    console.log(max);
    if (_data.length < max) {
      console.log('Adding row!!!');
      var newItem = {};
      Object.keys(_metadata).map(key => {
        if (key === 'id') newItem[key] = _data.length + 1;
        else newItem[key] = _metadata[key].default;
      });
      setData([..._data, newItem]);
    } else console.log('That is the max!!!');
  };

  const handleOnDelete = () => {
    if (_data.length > min) {
      console.log('We are deleting data');
      setData(_data.filter(item => item.id !== _data.length));
    } else console.log('That is the min!!!');
  };

  return (
    <Table
      data={_data}
      metadata={_metadata}
      onItemChange={onItemChange}
      handleOnAdd={handleOnAdd}
      handleOnDelete={handleOnDelete}
      handleOnSave={save}
      {...args}
    />
  );
};

Project.args = {
  title: 'Deatailed Forecast',
  muscleGroup: 'Forecast',
  format: 'YYYY-MM-DD',
  initialDate: '2023-04-01',
  dataset: [
    {
      id: 1,
      project_code: 'EXT-034422-00020',
      project_desc: 'Machine Learning Service',
      metric: 'Service Revenue',
      value: 150000,
      start_date: '2023-04-01',
      duration: 6,
    },
    {
      id: 2,
      project_code: 'EXT-034422-00025',
      project_desc: 'Machine Learning Service',
      metric: 'Centers Revenue',
      value: 4000,
      start_date: '2023-04-01',
      duration: 3,
    },
  ],
  schema: {
    id: { name: 'id', type: 'text' },
    project_code: { name: 'Project Code', type: 'text', default: 'Project Code' },
    project_desc: { name: 'Project Description', type: 'text', default: 'Project Description' },
    metric: { name: 'Metrics', type: 'text', default: 'Insert your metric name' },
    value: { name: 'Total', type: 'number', default: 3 },
    duration: { name: 'Duration', type: 'number', default: 3 },
    start_date: {
      name: 'Start date',
      type: 'date',
      default: moment(new Date()).format('YYYY-MM-DD'),
    },
  },
  max: 10,
  min: 1,
};
