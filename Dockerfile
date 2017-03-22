FROM registry.cn-hangzhou.aliyuncs.com/niefengjun/nodejs:4-slim
# MAINTAINER mac@niefengjun.cn

ENV HTTP_PORT 8361
COPY . ./app
WORKDIR /app
ENV mysqlhost "172.28.20.17"
ENV mysqlport "3306"
ENV mysqluser "root"
ENV mysqlpwd "syswin"
EXPOSE 8361
CMD ["npm","install"]
CMD ["npm","start"]