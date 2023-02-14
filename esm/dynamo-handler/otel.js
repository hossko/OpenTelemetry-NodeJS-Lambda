// otel.js

import { SimpleSpanProcessor, ConsoleSpanExporter } from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { AwsLambdaInstrumentation } from '@opentelemetry/instrumentation-aws-lambda';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

import { AWSXRayIdGenerator } from '@opentelemetry/id-generator-aws-xray';

  const provider = new NodeTracerProvider({idGenerator: new AWSXRayIdGenerator()});
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

  // Initialize the provider
  provider.register();

  // Registering instrumentations / plugins
  registerInstrumentations({
    instrumentations: [
      getNodeAutoInstrumentations(),
      new AwsLambdaInstrumentation({
        disableAwsContextPropagation: false
      })
    ],
   });
