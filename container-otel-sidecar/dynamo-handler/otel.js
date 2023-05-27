const { BatchSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { AwsLambdaInstrumentation } = require('@opentelemetry/instrumentation-aws-lambda');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { AWSXRayIdGenerator } = require('@opentelemetry/id-generator-aws-xray');

const { SemanticResourceAttributes,} = require('@opentelemetry/semantic-conventions');
const { Resource } = require('@opentelemetry/resources');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
///////////////////////////////////////////////////////////////////////////////////

const providerConfig = {
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.AWS_LAMBDA_FUNCTION_NAME,
  }),
  idGenerator: new AWSXRayIdGenerator()
};
const provider = new NodeTracerProvider(providerConfig);

// Console Exporter
//provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// OTLP GRPC Exporter
const collectorOptions = {
  url: process.env.OTEL_COLLECTOR,
};
const exporter = new OTLPTraceExporter(collectorOptions);
provider.addSpanProcessor(new BatchSpanProcessor(exporter));

// Expects Collector at env variable `OTEL_EXPORTER_OTLP_ENDPOINT`, otherwise, http://localhost:4317

provider.register();

registerInstrumentations({
 instrumentations: [
   getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-fs': {
        enabled: false,
      },
    }),
   new AwsLambdaInstrumentation(),
   "@opentelemetry/instrumentation-aws-sdk",
   "@opentelemetry/instrumentation-http",
   "@opentelemetry/instrumentation-graphql",
   "@opentelemetry/instrumentation-mongodb"
 ],
});