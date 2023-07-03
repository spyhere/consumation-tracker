#!/usr/bin/env bash

sleep 5 && npm install
npm run migrate -y
npm run seed
npm start