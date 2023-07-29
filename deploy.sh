docker build -t menelik7/multi-client:latest -f ./client/Dockerfile ./client
docker build -t menelik7/multi-server:latest -f ./server/Dockerfile ./server
docker build -t menelik7/multi-worker:latest -f ./worker/Dockerfile ./worker

docker push menelik7/multi-client:latest
docker push menelik7/multi-server:latest
docker push menelik7/multi-worker:latest

kubectl apply -f k8s
kubectl set image deployments/client-deployment server=menelik7/multi-client:latest
kubectl set image deployments/server-deployment server=menelik7/multi-server:latest
kubectl set image deployments/worker-deployment server=menelik7/multi-worker:latest