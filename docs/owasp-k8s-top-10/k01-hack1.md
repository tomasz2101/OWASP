# K01: Insecure Workload Configurations

# Permission to write to file system

This exploit demonstrates what could potentialy happened to an application, if an attacker had permission to write to a file system.

# Setup

## Docker

```shell
cat devops/docker/Dockerfile; echo
docker build -t tomasz2101/hackme-app:v1 -f devops/docker/Dockerfile .
docker run --detach --name hackme-app --publish 8080:80 --rm tomasz2101/hackme-app:v1
```

## Kubernetes

```shell
cat devops/docker/Dockerfile; echo
docker build -t tomasz2101/hackme-app:v1 -f devops/docker/Dockerfile .
docker push tomasz2101/hackme-app:v1

cat devops/k8s/manifests/k01/hack.pod.yaml; echo
kubectl apply -f devops/k8s/manifests/k01/hack.pod.yaml
kubectl port-forward pod/hackme-app 8080:80 &
```

Visit app at [localhost:8080](http://localhost:8080/)

# Attack

## Docker

```shell
docker exec hackme-app bash -c "echo '<\!DOCTYPE html><html lang=\"en\"><head><style> body { align-items: center; background-color: black; display: flex; height: 100vh; justify-content: center; } </style></head><body><img src=\"https://raw.githubusercontent.com/tomasz2101/html5-hackme-app/main/app/src/assets/img/h1sub.png\"></body></html>' > /usr/share/nginx/html/index.html"
```

## Kubernetes

```shell
kubectl exec hackme-app -- bash -c "echo '<\!DOCTYPE html><html lang=\"en\"><head><style> body { align-items: center; background-color: black; display: flex; height: 100vh; justify-content: center; } </style></head><body><img src=\"https://raw.githubusercontent.com/tomasz2101/html5-hackme-app/main/app/src/assets/img/h1sub.png\"></body></html>' > /usr/share/nginx/html/index.html"
```

Visit app at [localhost:8080](http://localhost:8080/)

## Redirect to other page

```shell
kubectl exec hackme-app -- bash -c "echo 'server {
 rewrite ^/$ http://www.google.com permanent;
 }' > //etc/nginx/conf.d/default.conf"
 ```
```shell
kubectl exec hackme-app -- bash -c "/etc/init.d/nginx reload"
 ```



# Mitigations

To limit the impact of a compromised container, it is recommended to **utilize read-only filesystems when possible.** This prevents a malicious process or application from writing back to the host system.

## Docker

Be aware that the below example will not work in this context. Example only shows how to remove write access to folders and files.

```shell
# This fix will work for non-root users only!
kubectl exec -it hackme-app -- bash
ls -l /usr/share/nginx/html
find /usr/share/nginx/html -regextype posix-extended -regex ".*\.(css|html|ico|jpeg|jpg|js|png|svg|ttf|woff)" -exec chmod 444 {} \;
chattr +i /usr/share/nginx/html/index.html
```

## Kubernetes

```shell
cat devops/k8s/manifests/k01/fix1.pod.yaml; echo
kubectl delete pod hackme-app
kubectl apply -f devops/k8s/manifests/k01/fix1.pod.yaml
kubectl port-forward pod/hackme-app 8080:80 &
```

```yaml
apiVersion: v1
kind: Pod
...
spec:
  containers:
    - ...
      securityContext:
        readOnlyRootFilesystem: true
```

**Be aware** that, redOnlyRootFilesystem will prevent all processes from writing to file system, and that might have side effects.

```
$ kubectl logs -f hackme-app
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
/docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
10-listen-on-ipv6-by-default.sh: info: can not modify /etc/nginx/conf.d/default.conf (read-only file system?)
/docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
/docker-entrypoint.sh: Configuration complete; ready for start up
2023/06/16 12:53:57 [emerg] 1#1: open() "/etc/nginx/off" failed (30: Read-only file system)
nginx: [emerg] open() "/etc/nginx/off" failed (30: Read-only file system)
```

# Links

- [read only filesystems in docker and kubernetes](https://www.thorsten-hans.com/read-only-filesystems-in-docker-and-kubernetes/)
