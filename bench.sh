#!/bin/bash

echo Fastify Hello World Run
npx autocannon http://127.0.0.1:3000/graphql -m POST -b '{"query":"{\n  hello\n}\n"}' -H "Accept:application/json" -H "Content-Type:application/json" --no-progress

echo Express Hello World Run
npx autocannon http://127.0.0.1:4000/graphql -m POST -b '{"query":"{\n  hello\n}\n"}' -H "Accept:application/json" -H "Content-Type:application/json" --no-progress

echo Fastify CRUD Run
npx autocannon http://127.0.0.1:3000/graphql -m POST -b '{"query":"{\n  items{\n name\n message\n} \n}\n"}' -H "Accept:application/json" -H "Content-Type:application/json" --no-progress

echo Express CRUD Run
npx autocannon http://127.0.0.1:4000/graphql -m POST -b '{"query":"{\n  items{\n name\n message\n} \n}\n"}' -H "Accept:application/json" -H "Content-Type:application/json" --no-progress
