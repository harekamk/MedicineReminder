import API from "./api";

export const getAlerts =
  async () => {

    const res =
      await API.get(
        "/alerts"
      );

    return res.data;
  };