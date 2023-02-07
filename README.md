# Next.js OpenJira App
Para correr localmente, se necesita la base de datos 

```
docker-compose up -d
```


# Configurar variables de entorno

Renombrar el archivo `.env.template` a `.env` y configurar las variables de entorno.

* MongoDB url local 

```
    MONGO_URL=mongodb://localhost:27017/entriesdb
```

* Reconstruir los modulos de node y levantar Next

```
    npm install
    npm run dev
```
* utilizando yarn 
    
```
    yarn install
    yarn dev
```

# LLenar la base de datos con informacion de prueba

```
    http://locahost:3000/api/seed
```	

# Correr en modo produccion


**Nota:** Si se quiere correr en modo produccion, se debe correr el comando `yarn run build` y luego `yarn start` para correr el servidor de produccion.
