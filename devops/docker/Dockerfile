FROM nginx:1.25.1

ARG INDEX_VERSION=v1 \
    USERNAME

ENV USERNAME=$USERNAME

# Install OS packeges
RUN apt update && apt install -y \
        htop \
        stress-ng

# Copy source code
COPY app/config/etc/nginx/conf.d/default.conf /etc/nginx/conf.d/
COPY app/config/etc/nginx/nginx.conf /etc/nginx/
COPY app/src/ /usr/share/nginx/html/
COPY app/src/$INDEX_VERSION.index.html /usr/share/nginx/html/index.html
