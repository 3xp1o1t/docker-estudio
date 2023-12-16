<p align="center">
  <a href="" rel="noopener">
 <img src="github-header-image.png" alt="Project logo"></a>
</p>

<h3 align="center">Docker Estudio</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/3xp1o1t/docker-estudio)](https://github.com/3xp1o1t/docker-estudio/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/3xp1o1t/docker-estudio)](https://github.com/3xp1o1t/docker-estudio/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">Proyecto para estudiar Docker con Node.js y NextJs</p>

## 📝 Table of Contents

- [Acerca de](#about)
- [Guía Inicio](#guia_inicio)
- [Despliegue](#deployment)
- [Uso](#usage)
- [Construido con](#built_using)
- [TODO](../TODO.md)
- [Contribuir](../CONTRIBUTING.md)
- [Autor](#authors)
- [Agradecimientos](#acknowledgement)

## 🧐 Acerca de <a name = "about"></a>

Proyecto para estudiar docker, en este ejemplo dockerizar una aplicacion de NextJs como frontend y Node.js como backend, a su vez utilizando postgresql y prisma ORM para las
tablas de la base de datos.

## 🏁 Guia de inicio <a name = "guia_inicio"></a>

Estas instrucciones te permitirán tener una copia del proyecto funcionando en tu máquina local para propósitos de desarrollo y pruebas. Ver [deployment](#deployment) para notas sobre cómo desplegar el proyecto en un sistema activo.

### Prerequisites

Requisitos para funcionar hasta el momento modo desarrollo

- Docker

Compilar la imagen, iniciar los servicios y la migración

```bash
docker compose build
docker compose up -d backend
docker compose up -d db
docker exec -it backend npx prisma migrate dev --name init
```

Notas de aprendizaje

- Listar imagenes ejecutandose/existentes

```bash
docker ps -a
```

- Iniciar un servicio del archivo compose.yaml
  - Descargar la imagen del servicio y configurar.
  - Donde -d permite liberar la consola donde se ejecuto el cmd

```bash
docker compose up -d <nombre del servicio>
ex: docker compose up -d db # run db service
```

- Interactuar con un servicio, ejemplo Postgres

```bash
docker exec -it <service> <params>
docker exec -it db psql -U postgres # start db psql with user postgres
```

- Compilar un contenedor

```bash
# Requiere un archivo compose.yaml
docker compose build
```

- Usando prisma es posible ejecutar la migración una vez iniciado el contenedor

```bash
# después de compilar el servicio de backend
docker compose up -d backend
# verificar si funciona
docker ps -a
# ejecutar la migración
docker exec -it backend npx prisma migrate dev --name init
# verificar en el servicio de postgresql
postgres=# \dt || \l
# select de valores
select * from "User"; #Importante las "" en el nombre de la tabla.
```

### Instalación

Guía de instalación/inicio del proyecto

```
TODO comando para iniciar el contenedor
```

Verificar que este ejecutándose

```
TODO docker ps -a
```

TODO <Imagen como se ve corriendo>

## 🔧 Pruebas <a name = "tests"></a>

TODO agregar pruebas tal vez al front/back

### Conceptos avanzados de las pruebas

```
TODO ejemplo de test
```

## 🎈 Uso <a name="usage"></a>

Como usar el sistema

TODO foto o ejemplos

## 🚀 Despliegue <a name = "deployment"></a>

TODO Como desplegar la aplicación

## ⛏️ Construido con <a name = "built_using"></a>

- [Docker](https://www.mongodb.com/) - Contenedor
- [Postgresql](https://postgresql.com/) - base de datos
- [Express](https://expressjs.com/) - Framework servidor
- [NextJs](https://vuejs.org/) - Framework web
- [NodeJs](https://nodejs.org/en/) - Backend
- [NextUi](https://nextui.org) - Librería UI
- [NextThemes](https://www.npmjs.com/package/next-themes) - Temas para Next UI
- [Header](https://leviarista.github.io/github-profile-header-generator/) - Header Repo

## ✍️ Autor <a name = "authors"></a>

- [@3xp1o1t](https://github.com/3xp1o1t) - Autor del repo
- [@Francesco](https://www.youtube.com/@francescociulla) - Autor original del curso

Contribuidores [contribuidores](https://github.com/3xp1o1t) who participated in this project.

## 🎉 Agradecimientos <a name = "acknowledgement"></a>

- Gracias al curso de francesco
