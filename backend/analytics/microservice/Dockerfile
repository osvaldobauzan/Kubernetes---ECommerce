# Usa la imagen oficial de Python como base
FROM python:3.9

# Actualiza pip
RUN python -m pip install --upgrade pip

# Instala las dependencias de Django
RUN pip install djangorestframework djangorestframework-jwt django-model-utils requests python-firebase pandas seaborn matplotlib

# Instala firebase-admin utilizando el usuario root
RUN pip install firebase-admin

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia losapp archivos de tu aplicación al contenedor
COPY . /app

# Expone el puerto 8000 para que pueda ser accesible desde el exterior del contenedor
EXPOSE 8000

# Comando para ejecutar la aplicación Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
