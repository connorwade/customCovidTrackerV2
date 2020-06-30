const defaultState = {
  graphs: [
    {
      location: "UT",
      dataKeys: ["positive", "recovered", "death"],
      title: "Utah Starter Graph",
    },
    {
      location: "NY",
      dataKeys: ["positive", "recovered", "death"],
      title: "New York Starter Graph",
    },
    {
      location: "HI",
      dataKeys: ["positive", "recovered", "death"],
      title: "Hawaii Starter Graph",
    },
  ],
};

const resetState = {
  modalContent: {},
  modalOpen: false,
  currentSelection: "",
};

export { defaultState, resetState };
