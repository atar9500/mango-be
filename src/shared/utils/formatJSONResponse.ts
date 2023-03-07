const formatJSONResponse = <T>(response: T, statusCode = 200) => {
  return {
    statusCode,
    body: JSON.stringify(response),
  };
};

export default formatJSONResponse;
