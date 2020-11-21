require('dotenv').config();

process.env.PROT = process.env.PORT || 8080;
process.env.MONGODB_CONNECTION = process.env.MONGODB_CONNECTION || 'mongodb://localhost:27017/test';
process.env.SECRET_JWT_SEED = process.env.SECRET_JWT_SEED || 'seedTest';