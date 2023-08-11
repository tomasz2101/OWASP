# Example kyverno cli

1. Execute:
```shell
    kyverno apply rules --resource=deployment.yaml
```

# Exmaple kyverno on cluster

1. Install kyverno:
```shell
    helm repo add kyverno https://kyverno.github.io/kyverno/
    helm repo update
    helm install kyverno kyverno/kyverno --namespace kyverno --create-namespace
```

2. Apply policies:
```shell
    kubectl apply -f  policies-cluster/require-team-label.yaml
    kubectl apply -f  policies-cluster/validate-replica-count.yaml
```

3. Test policies:
```shell
    kubectl apply -f  deployment.yaml
    kubectl apply -f  deployment.fix.yaml
```
