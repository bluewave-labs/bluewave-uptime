import CustomizedTables from '../../Components/CustomizedTables';

const DetailsPage = () => {
  const monitorData = {
    "_id": "66863aa2437936b46e225d1f",
    "userId": "66863a8f437936b46e225d1a",
    "name": "Google",
    "description": "Google",
    "status": false,
    "type": "http",
    "url": "https://www.google.com/404",
    "isActive": true,
    "interval": 60000,
    "createdAt": "2024-07-04T06:01:06.527Z",
    "updatedAt": "2024-07-04T06:02:00.250Z",
    "__v": 0,
    "checks": [
      {
        "_id": "66863ad8437936b46e225d6d",
        "monitorId": "66863aa2437936b46e225d1f",
        "status": false,
        "responseTime": 144,
        "expiry": "2024-07-04T06:02:00.247Z",
        "statusCode": 404,
        "createdAt": "2024-07-04T06:02:00.248Z",
        "updatedAt": "2024-07-04T06:02:00.248Z",
        "__v": 0
      },
      {
        "_id": "66863b14437936b46e225d79",
        "monitorId": "66863aa2437936b46e225d1f",
        "status": false,
        "responseTime": 140,
        "expiry": "2024-07-04T06:03:00.167Z",
        "statusCode": 404,
        "createdAt": "2024-07-04T06:03:00.168Z",
        "updatedAt": "2024-07-04T06:03:00.168Z",
        "__v": 0
      }
    ]
  };

  return (
    <div>
      <CustomizedTables monitor={monitorData} />
    </div>
  );
};

export default DetailsPage;
