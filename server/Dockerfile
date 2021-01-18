FROM python:3

COPY package.json /tmp/package.json

RUN cd /tmp

WORKDIR /
COPY . .

RUN apt-get update

RUN apt-get -y install curl gnupg

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - 
RUN apt-get -y install nodejs

RUN npm install -y

RUN apt-get install gdal-bin -y
RUN apt-get install libgdal-dev -y

RUN export CPLUS_INCLUDE_PATH=/usr/include/gdal
RUN export C_INCLUDE_PATH=/usr/include/gdal
RUN pip install GDAL==$(gdal-config --version) --global-option=build_ext --global-option="-I/usr/include/gdal"


EXPOSE 2138 
CMD ["node","./bin/www"]




