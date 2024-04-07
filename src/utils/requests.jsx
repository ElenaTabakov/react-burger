import PropTypes from "prop-types";

export const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export const request = async (url, options) => {
  const res = await fetch(url, options);
  return checkResponse(res);
};

request.propTypes = {
  url: PropTypes.string.isRequired,
  options: PropTypes.object,
};