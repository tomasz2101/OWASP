# Example fix1, fix2

1. Execute:
```shell
    kubectl apply -f devops/k8s/manifests/k01/hack.pod.yaml
    kubectl get pods
    kubectl port-forward pod/hackme-app 8080:80
```

3. Visit localhost:8080

4. Execute:
```shell
    kubectl exec hackme-app -- bash -c "echo '<\!DOCTYPE html><html lang=\"en\"><head><style> body { align-items: center; background-color: black; display: flex; height: 100vh; justify-content: center; } </style></head><body><img src=\"https://raw.githubusercontent.com/tomasz2101/html5-hackme-app/main/app/src/assets/img/h1sub.png\"></body></html>' > /usr/share/nginx/html/index.html"
```

5. Visit localhost:8080

## Fixing application

1. Execute:
```shell
    kubectl delete pod hackme-app
    kubectl apply -f devops/k8s/manifests/k01/fix1.pod.yaml
    kubectl apply -f devops/k8s/manifests/k01/fix2.pod.yaml
```


# Example fix3
1. Execute:
```shell
    kubectl apply -f devops/k8s/manifests/k01/hack3.pod.yaml
    kubectl apply -f devops/k8s/manifests/k01/second-app.yaml
    kubectl port-forward pod/todo-app 8081:8000
    kubectl exec -it hackme-app -- bash

    df -h
    mkdir /tmp/host-fs
    mount /dev/sde /tmp/host-fs/
    find . -name "*.db"
    cd $directory
    cat 000000000.data
```

## Fixing application

```shell
    kubectl delete pod hackme-app
    kubectl apply -f devops/k8s/manifests/k01/fix3.pod.yaml
```

# Example fix4

2. Execute:
```shell
    kubectl apply -f devops/k8s/manifests/k01/hack.pod.yaml

```
```shell
# Terminal no. 1
kubectl exec -it hackme-app -- htop

# Terminal no. 2
kubectl exec hackme-app -- stress-ng --cpu 8 --vm 4 --vm-bytes 2G --timeout 30s
```

## Fixing application

```shell
    kubectl delete pod hackme-app
    kubectl apply -f devops/k8s/manifests/k01/fix4.pod.yaml
```
