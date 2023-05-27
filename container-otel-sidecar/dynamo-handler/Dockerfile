FROM public.ecr.aws/lambda/nodejs:18

COPY app.js otel.js package*.json ./

RUN npm install
# If you are building your code for production, instead include a package-lock.json file on this directory and use:
# RUN npm ci --production

RUN yum install -y unzip
COPY otel-collector/layer.zip /tmp/layer.zip
RUN unzip /tmp/layer.zip -d /opt
RUN rm /tmp/layer.zip

# COPY ADOT CONFIG
COPY otel-collector/config.yaml /opt/collector-config/

# Command can be overwritten by providing a different command in the template directly.
CMD ["app.handler"]
