#!/bin/bash

#create directory 'dist'
echo 'creando carpeta dist'
mkdir dist

#build artifacts EBS
echo 'npm install de EBS'
cd ESB
npm install
cd ..
echo 'tar.gz de EBS'
tar -czvf esb.tar.gz ESB/
mv esb.tar.gz dist/

#build artifacts Cliente
echo 'tar.gz de microservicio de cliente'
tar -czvf cliente.tar.gz Microservicio-Cliente/
mv cliente.tar.gz dist/

#build artifacts Repartidor
echo 'npm install de microservicio de repartidor'
cd Microservicio-Repartidor
npm install
cd ..
echo 'tar.gz de microservicio de repartidor'
tar -czvf repartidor.tar.gz Microservicio-Repartidor/
mv repartidor.tar.gz dist/

#build artifacts Restaurante
echo 'npm install de microservicio de restaurante'
cd Microservicio-Restaurante
npm install
cd ..
echo 'tar.gz de microservicio de repartidor'
tar -czvf restaurante.tar.gz Microservicio-Repartidor/
mv restaurante.tar.gz dist/
