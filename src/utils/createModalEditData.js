const createModalEditData = (rowData) => {
  const newData = rowData.reduce(
    (prev, curr) => ({ ...prev, [curr.id]: curr.content }),
    {}
  );
  delete newData.undefined;
  return newData;
};

export default createModalEditData;

