import { Button } from '../Button';
import { Row } from '../Row/Row';

export const Table = ({
  title,
  metadata,
  data,
  handleOnSave,
  onItemChange,
  handleOnDelete,
  handleOnAdd,
}) => {
  return (
    <div>
      <div>
        <h2>{title}</h2>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            {Object.keys(metadata).map(key => {
              if (key !== 'id')
                return (
                  <th key={metadata[key].name} scope="col">
                    {metadata[key].name}
                  </th>
                );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <Row
              key={item.id.value}
              item={item}
              metadata={metadata}
              onItemChange={onItemChange}
            ></Row>
          ))}
        </tbody>
      </table>
      <div className="row">
        <div className="col-10">
          <Button color="success" onClick={e => handleOnSave(data)}>
            Submit
          </Button>
        </div>
        <div className="col-2">
          <Button color="danger" onClick={handleOnDelete}>
            -
          </Button>
          <Button color="primary" onClick={handleOnAdd}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
