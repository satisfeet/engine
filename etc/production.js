exports.port = process.env.VCAP_APP_PORT;

exports.account = {
  username: 'bodokaiser',
  password: 'bodokaiser'
};

exports.storage = {
  url: JSON.parse(process.env.VCAP_SERVICES)['mongodb-2.2'][0].credentials.url
};
