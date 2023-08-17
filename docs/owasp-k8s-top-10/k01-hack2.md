# K01: Insecure Workload Configurations

## Root privilege escalation

This exploit demonstrates what could potentialy happened to an application, if an attacker had root access.

# Setup

## Docker

```shell
docker build -t tomasz2101/hackme-app:v1 -f devops/docker/Dockerfile .
docker run --rm  --detach --name hackme-app --publish 8080:80 tomasz2101/hackme-app:v2
```

## Kubernetes

```shell
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
docker exec hackme-app rm -f /usr/share/nginx/html/index.html
```

## Kubernetes

```shell
kubectl exec hackme-app -- rm -f /usr/share/nginx/html/index.html
```

Visit app at [localhost:8080](http://localhost:8080/)

# Mitigations

Running the process inside of a container as the root user is a common misconfiguration. **Application processes should not run as root**. If the container were to be compromised, the attacker would have root-level privileges that allow actions such as starting a malicious process.

## Docker

```Dockerfile
USER nobody:nogroup
```

## Kubernetes

Obtain Ids of of user `nobody` and group `nogroup`.

```shell
cat /etc/passwd | grep nobody | cut -d ':' -f3
65534

cat /etc/group | grep nogroup | cut -d':' -f3
65534
```

```yaml
apiVersion: v1
kind: Pod
...
spec:
  securityContext:
    runAsGroup: 65534
    runAsNonRoot: true
    runAsUser: 65534
    ...
```

```shell
cat devops/k8s/manifests/k01/fix2.pod.yaml; echo
kubectl delete pod hackme-app
kubectl apply -f devops/k8s/manifests/k01/fix2.pod.yaml
kubectl port-forward pod/hackme-app 8080:80 &
```
