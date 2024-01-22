FROM --platform=linux/amd64 mongo
ADD ./track.csv /tmp/track.csv
ADD ./mongo_seed.sh /tmp/mongo_seed.sh
RUN chmod +x /tmp/mongo_seed.sh
EXPOSE 27017
CMD /tmp/mongo_seed.sh