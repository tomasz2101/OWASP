# K01: Insecure Workload Configurations

## Privileged containers

This example shows how to disable container from running as a privileged.

# Problem

The dockers's run `--privileged` flag lifts all the limitations enforced by the device cgroup controller, allowing the container to do almost everything what the host can do.

# Setup

## Docker

```shell
docker build -t tomasz2101/hackme-app:v1 -f devops/docker/Dockerfile .
docker run --privileged --rm  --detach --name hackme-app --publish 8080:80 tomasz2101/hackme-app:v1
```

## Kubernetes

```shell
docker build -t tomasz2101/hackme-app:v1 -f devops/docker/Dockerfile .
docker push tomasz2101/hackme-app:v1

cat devops/k8s/manifests/k01/hack.pod.yaml; echo
kubectl apply -f devops/k8s/manifests/k01/hack.pod.yaml
kubectl port-forward pod/hackme-app 8080:80
```

Visit app at [localhost:8080](http://localhost:8080/)

# Mitigations

Running the process inside of a container as the root user is a common misconfiguration. **Application processes should not run as root**. If the container were to be compromised, the attacker would have root-level privileges that allow actions such as starting a malicious process.

## Kubernetes

```yaml
apiVersion: v1  
kind: Pod  
...
spec:  
  containers:  
  ...
  securityContext:  
    privileged: false
```

```shell
cat devops/k8s/manifests/k01/fix3.pod.yaml; echo
kubectl apply -f devops/k8s/manifests/k01/fix3.pod.yaml
```

# Links

- [privileged](https://docs.docker.com/engine/reference/commandline/run/#privileged)
- [Don't run with privileged:true](https://www.youtube.com/watch?v=tpsDgMtNObo)