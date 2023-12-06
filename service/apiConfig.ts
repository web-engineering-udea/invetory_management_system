const SERVER_URL = '/api';

const API_ROUTES = {
  users: `${SERVER_URL}/users`,
  roles: `${SERVER_URL}/roles`,
  lots: `${SERVER_URL}/lots`,
  collections: `${SERVER_URL}/collections`,
  shipments: `${SERVER_URL}/shipments`,
  shipmentSummary: `${SERVER_URL}/shipments/summary`,
  collectionsIndicators: `${SERVER_URL}/collections/indicators`,
  profile: `${SERVER_URL}/users/profile`,
  fileUpload: `${SERVER_URL}/file-upload`,
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export { SERVER_URL, API_ROUTES, fetcher };