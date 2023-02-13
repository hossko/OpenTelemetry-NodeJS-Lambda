# Overview:
Opentelemetry implementation for a NodeJS app running on AWS lambda. Used components are AWS lambda, AWS APIGateway, AWS DynamoDB, and AWS WebSite

Ref doc: https://opentelemetry.io/docs/instrumentation/js/serverless/

Add Otel configuration as a wrapper script and include it as a require for NodeJS runtime using env variable: NODE_OPTIONS: --require otel  

# Running the App Using AWS Sam Cli:
Install Sam cli for your workstation: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

```
# Deploy and Sync:
sam sync --stack-name=otel-nodejs-demo

# View logs
sam logs -t --stack-name=otel-nodejs-demo

# Delete stack
sam delete --stack-name=otel-nodejs-demo
```

# Making API Calls
```
# Insert Item
curl -X "PUT" -H "Content-Type: application/json" -d "{\"id\": \"123\", \"price\": 12345, \"name\": \"myitem\"}" https://${APIGW_FQDN}/items
# Get All Items
curl https://${APIGW_FQDN}/items
# Get an Item
curl https://${APIGW_FQDN}/items/123
# Delete an Item
curl -X "DELETE" https://${APIGW_FQDN}/items/123
```

# Expected Results
Using OpenTelemtry NodeAutoInstrumentation with AWS lambda detection should results in 3 Spans with same TraceID printed to the console logs. The TraceID is auto detected using the X-RAY headers passed from the APIGateway. 