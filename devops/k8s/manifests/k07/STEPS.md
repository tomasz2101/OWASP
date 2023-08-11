# Example

1. Create cluster with CNI calico
```shell
    minikube start --network-plugin=cni --cni=calico
```

2. Execute:
```shell
    kubectl apply -f devops/k8s/manifests/k07/namespace.yaml
    kubectl apply -f devops/k8s/manifests/k07/pod.yaml
    kubectl apply -f devops/k8s/manifests/k07/pod2.yaml
    kubectl apply -f devops/k8s/manifests/k07/pod3.yaml
```

3. Test connection between apps
```shell
    kubectl exec -it hackme-app -n k07 -- curl http://hackme-app-service.k07-secret.svc.cluster.local
```

4. Apply network policy
```shell
    kubectl apply -f devops/k8s/manifests/k07/networkpolicy.yaml
```

5. Test same connection again
```shell
    kubectl exec -it hackme-app -n k07 -- curl http://hackme-app-service.k07-secret.svc.cluster.local
```

6. Test connection from specific namespace
```shell
    kubectl exec -it hackme-app -n k07-secret01 -- curl http://hackme-app-service.k07-secret.svc.cluster.local
```

7. Cleanup:
```shell
    minikube delete
```