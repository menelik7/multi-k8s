docker build -t menelik7/multi-client:latest -t menelik7/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t menelik7/multi-server:latest -t menelik7/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t menelik7/multi-worker:latest -t menelik7/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push menelik7/multi-client:latest
docker push menelik7/multi-server:latest
docker push menelik7/multi-worker:latest

docker push menelik7/multi-client:$SHA
docker push menelik7/multi-server:$SHA
docker push menelik7/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/client-deployment server=menelik7/multi-client:$SHA
kubectl set image deployments/server-deployment server=menelik7/multi-server:$SHA
kubectl set image deployments/worker-deployment server=menelik7/multi-worker:$SHA