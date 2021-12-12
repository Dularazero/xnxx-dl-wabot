FROM ravindu01manoj/sewqueen:fullcontrol

RUN git clone https://github.com/ravindu01manoj/xnxx-dl-wabot /root/xnxx
WORKDIR /root/xnxx/
ENV TZ=Asia/Colombo
RUN npm install supervisor -g
RUN yarn install --no-audit

CMD ["node", "xnxx.js"]
