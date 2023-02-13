# Overview:
Opentelemetry implementation for a NodeJS app running on AWS lambda. Used components are AWS lambda, AWS APIGateway and AWS DynamoDB, and AWS WebSite
Ref doc: https://opentelemetry.io/docs/instrumentation/js/serverless/
Add Otel configucation in a wrapper script and include it as a require for NodeJS runtime using env variable: NODE_OPTIONS: --require otel  

# Running the App Using AWS Sam Cli:
Install Sam cli for your workstation: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

Deploy and Sync

# Insert Item
curl -X "PUT" -H "Content-Type: application/json" -d "{\"id\": \"123\", \"price\": 12345, \"name\": \"myitem\"}" https://94fuqc2e10.execute-api.us-east-1.amazonaws.com/items
# Get All Items
curl https://dnxojxeg13.execute-api.us-east-1.amazonaws.com/items
# Get an Item
curl https://94fuqc2e10.execute-api.us-east-1.amazonaws.com/items/123
# Delete an Item
curl -X "DELETE" https://94fuqc2e10.execute-api.us-east-1.amazonaws.com/items/123