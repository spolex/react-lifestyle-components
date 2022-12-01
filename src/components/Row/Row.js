export const Row = ({ item, metadata, onItemChange }) => {
  return (
    <tr>
      {Object.keys(metadata).map(key => {
        if (key !== 'id') {
          return (
            <td key={key}>
              {
                <input
                  className="form-control"
                  type={metadata[key].type}
                  value={item[key]}
                  onChange={event => {
                    onItemChange({
                      ...item,
                      [key]:
                        metadata[key].type === 'number'
                          ? Number(event.target.value)
                          : event.target.value,
                    });
                  }}
                />
              }
            </td>
          );
        }
      })}
    </tr>
  );
};
