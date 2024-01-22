# Music Database, written on ExpressJs with MongoDB.
# How to run

1. Create `.env` file under `src` directory.

```
PORT = 7500
JWT_SECRET = <key>
JWT_REFRESH_SECRET = <key>
```

2. Run docker

```
docker-compose up
```

### Примеры запросов:

1. Пользователи

| Описание запроса       | Пример                | 
| ------------- |:------------------:| 
| _Зарегистрироваться_    |  POST - http://127.0.0.1:7500/user/signup/    | 
| _Войти_   | POST - http://127.0.0.1:7500/user/login/ | 
| _Получить ключ_  | POST - http://127.0.0.1:7500/user/token/     | 
| _Обновить ключ_ | POST - http://127.0.0.1:7500/user/token/refresh/    | 


body.json:

{
    "username":"stasy",
    "email":"an@mail.ru",
    "password":"Gfhjkm3434"
}

----
2. Треки


| Описание запроса       | Пример                | 
| ------------- |:------------------:| 
| _Получить все треки_    |  GET - http://127.0.0.1:7500/catalog/track/all/   | 
| _Получить трек по id_   | GET - http://127.0.0.1:7500/catalog/track/<id>/ | 
| _Добавить трек в избранное по id_  | POST - http://127.0.0.1:7500/catalog/track/<int:pk>/favorite/    | 
| _Удалить трек из избранного по id_  | DELETE - http://127.0.0.1:7500/catalog/track/<int:pk>/favorite/    | 
| _Добавить треки в избранное по id_  | POST - http://127.0.0.1:7500/catalog/track/favorite?id = <int:pk>,<int:pk>/   | 
| _Удалить треки из избранного по id_  | DELETE - http://127.0.0.1:7500/catalog/track/<int:pk>/favorite/    | 
| _Создать подборкy_  | GET - http://127.0.0.1:7500/catalog/selection     | 
| _Просмотреть подборки_  | GET - http://127.0.0.1:7500/catalog/selection/all     | 
| _Просмотреть подборку по id_  | GET - http://127.0.0.1:7500/catalog/selection/<int:pk>/     | 
| _Удалить трек из подборки по id_  | DELETE - http://127.0.0.1:7500/catalog/selection/<init:pk>/track/<int:pk>/delete/    | 
| _Добавить трек в подборку по id_  | POST - http://127.0.0.1:7500/catalog/selection/<init:pk>/track/<int:pk>/update/ | 
---



 
 
 

