exports.server = {
  ip: process.env.OPENSHIFT_NODEJS_IP,
  port: process.env.OPENSHIFT_NODEJS_PORT
};

exports.account = {
  username: process.env.NODE_USERNAME,
  password: process.env.NODE_PASSWORD
};

exports.storage = {
  url: process.env.NODE_MONGO_URL
};
