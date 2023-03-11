import { config } from "../../config";
import axios from "axios";

export const getAddress = async () => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.get(`${config.api_host}/api/delivery-addresses?limit=`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getLocation = async (lokasi, kodeInduk) => {
  switch (lokasi) {
    case "provinsi":
      return await axios.get(
        `https://api.goapi.id/v1/regional/provinsi?api_key=FWZoe6M2mpLL2HbGvKJCdEN2N4SKMk`
      );
    case "kabupaten":
      return await axios.get(
        `https://api.goapi.id/v1/regional/kota?provinsi_id=${kodeInduk}&api_key=FWZoe6M2mpLL2HbGvKJCdEN2N4SKMk`
      );
    case "kecamatan":
      return await axios.get(
        `https://api.goapi.id/v1/regional/kecamatan?kota_id=${kodeInduk}&api_key=FWZoe6M2mpLL2HbGvKJCdEN2N4SKMk`
      );
    case "kelurahan":
      return await axios.get(
        `https://api.goapi.id/v1/regional/kelurahan?kecamatan_id=${kodeInduk}&api_key=FWZoe6M2mpLL2HbGvKJCdEN2N4SKMk`
      );
    default:
      return [];
  }
};

export const createAddress = async (data) => {
  const { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  return await axios.post(`${config.api_host}/api/delivery-addresses`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
