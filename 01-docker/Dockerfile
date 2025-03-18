FROM ubuntu:24.04

RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    build-essential \
    libssl-dev \
    libffi-dev \
    zlib1g-dev \
    zip \
    unzip \
    curl \
    openjdk-8-jdk \
    && rm -rf /var/lib/apt/lists/*

RUN curl -s "https://get.sdkman.io" | bash && \
    bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin"
    
ENV PATH="/root/.sdkman/candidates/kotlin/current/bin:${PATH}"
    
RUN wget https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tgz && \
    tar -zxvf Python-3.10.0.tgz && \
    cd Python-3.10.0 && \
    ./configure --prefix=/opt/python3.10 && \
    make && \
    make install && \
    rm -rf Python-3.10.0 Python-3.10.0.tgz

RUN for f in python python3; do \
    ln -sf /opt/python3.10/bin/python3.10 /usr/bin/$f; \
    done

RUN python --version && \
    java -version && \
    kotlinc -version