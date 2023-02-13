const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { AwsLambdaInstrumentation } = require('@opentelemetry/instrumentation-aws-lambda');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");

const { AWSXRayIdGenerator } = require('@opentelemetry/id-generator-aws-xray');

// OTel JS - Core - Exporters
// const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector-grpc');

const provider = new NodeTracerProvider({idGenerator: new AWSXRayIdGenerator()});
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

// Expects Collector at env variable `OTEL_EXPORTER_OTLP_ENDPOINT`, otherwise, http://localhost:4317
// provider.addSpanProcessor(new SimpleSpanProcessor(new CollectorTraceExporter()));

provider.register();

registerInstrumentations({
 instrumentations: [
   getNodeAutoInstrumentations(),
   new AwsLambdaInstrumentation({
     disableAwsContextPropagation: false
   })
 ],
});