# Example

1. Execute:
    kubectl apply -f devops/k8s/manifests/k02/hack.pod.yaml

1. Execute:
    kubectl get pods

2. Execute:
    kubectl port-forward pod/hackme-app 8080:80

3. Visit localhost:8080
