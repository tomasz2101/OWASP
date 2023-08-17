# K01: Insecure Workload Configurations

## Kubernetes

```shell
cat devops/docker/Dockerfile
docker build -t tomasz2101/hackme-app:v1 -f devops/docker/Dockerfile .
docker push tomasz2101/hackme-app:v1

cat devops/k8s/manifests/k01/hack.pod.yaml; echo
kubectl apply -f devops/k8s/manifests/k01/hack.pod.yaml
kubectl port-forward pod/hackme-app 8080:80 &
```

Visit app at [localhost:8080](http://localhost:8080/)

```shell
# Terminal no. 1
kubectl exec -it hackme-app -- htop

# Terminal no. 2
kubectl exec hackme-app -- stress-ng --cpu 8 --vm 4 --vm-bytes 2G --timeout 30s
```

# Mitigations

```yaml
apiVersion: v1
kind: Pod
...
spec:
  containers:
  - ...
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```

```shell
cat devops/k8s/manifests/k01/fix4.pod.yaml; echo
kubectl apply -f devops/k8s/manifests/k01/fix4.pod.yaml
```
