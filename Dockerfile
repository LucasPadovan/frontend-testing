FROM node:8.12
COPY bundle /bundle
RUN (cd /bundle/programs/server && npm install)
ENV PORT=3000
EXPOSE 3000
CMD node /bundle/main.js