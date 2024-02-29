from django.shortcuts import render

import csv
import random
from datetime import datetime
from .models import Post
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PostSerializers
from .models import Post
from rest_framework import status
from django.http import Http404
import firebase_admin
from firebase_admin import credentials, storage

import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


# Create your views here.
class Post_APIView(APIView):

    def get(self, request, *args, **kwargs):
        post = Post()
        post.title="Hola"
        post.body = "Bodyyyyy"
        
        # Serializar los objetos Post
        serializer = PostSerializers(post)        
        # Devolver los datos serializados como respuesta
        return Response(serializer.data)
class CSVGenerator(APIView):
    def get(self):
        # Tu código para generar el CSV aquí
        pass

    def post(self, request, *args, **kwargs):
        # Llama al método generateCsv para generar el CSV
        self.generateCsv()
        return Response({"message": "CSV generado correctamente"})
    
    def generateCsv(self):
        # Listas de datos
        categorias = ['Hombre', 'Mujer', 'Unisex']
        precios = [random.randint(50, 200) for _ in range(600)]
        marcas = ['Marca1', 'Marca2', 'Marca3']
        nombres = ['Juan', 'María', 'Luis', 'Ana', 'Pedro', 'Laura', 'Carlos', 'Sofía', 'Diego', 'Elena',
                "Leonie", "Lina", "Mila", "Emma", "Emilia", "Johanna", "Clara", "Ella", "Sarah", "Amelie",
                "Alexander", "Maximilian", "Leon", "Paul", "Lukas", "Finn", "Luca", "Liam", "Jonas", "Benjamin",
                "Sophie", "Marie", "Maria", "Anna", "Emilia", "Mia", "Lena", "Hannah", "Lea", "Laura",
                "Lukas", "Felix", "Julian", "Sebastian", "David", "Simon", "Tobias", "Niklas", "Moritz", "Jakob",
                ]
        apellidos = ['García', 'Martínez', 'López', 'González', 'Rodríguez', 'Fernández', 'Pérez', 'Gómez', 
                    'Sánchez', 'Díaz', 'Servantes', 'Galia', 'Zaruma','Fittigi', 'Wussyt', 'Kuhdi',
                    "Müller", "Schmidt", "Schneider", "Fischer", "Meyer", "Weber", "Wagner", "Becker", "Schulz", "Hoffmann",
                    "Schäfer", "Koch", "Bauer", "Richter", "Klein", "Wolf", "Schröder", "Neumann", "Schwarz", "Zimmermann",
                    "Braun", "Krüger", "Hofmann", "Hartmann", "Lange", "Schmitt", "Werner", "Schmitz", "Krause", "Meier",
                    "Lehmann", "Schmid", "Schulze"
                    ]

        edades = [random.randint(18, 80) for _ in range(600)]
        sexos = ['M', 'F']
        fechas_compra = [datetime.now().strftime('%Y-%m-%d') for _ in range(600)]
        emails = ['cliente' + str(i) + '@example.com' for i in range(1, 601)]
        cestas = [random.randint(1, 10) for _ in range(600)]

        # Nombres de perfume para diferentes categorías
        perfumes_hombre = [
        'Armani Code - Georgio Armani',
        '212 heroes men - Carolina Herrera',
        'Acqua di Gio Parfum - Georgio Armani',
        'A men - Thierry Mugler',
        'Lima Tonka - Adolfo Dominguez',
        'Acqua di Gio EDP - Georgio Armani',
        'Acqua di Gio Profondo - Georgio Armani',
        'Creed - Bad Boy Elixir',
        'Carolina Herrera - Bad Boy EDT',
        'Bad Boy le Parfum - Carolina Herrera',
        'Bleu Noir - Narciso Rodriguez',
        'Boss the scent - Hugo Boss',
        'Man in Black - Bulgari',
        'Armani Code EDP - Georgio Armani',
        'Cool water - Davidoff',
        'Costa Azzurra - Tom Ford',
        'The one homme - Dolce & Gabbana',
        'Dior Homme - Dior',
        'Doir Homme intense - Dior',
        'Stronger whit you - Emporio Armani',
        'Eros Flame - Versace',
        'Eros Homme - Versace',
        'Fahrenheit - Dior',
        'Gentleman Society - Givenchy',
        'Gentleman EDP - Givenchy',
        'Gentleman intense - Givenchy',
        'Cedrat Boise Intense - Mancera',
        'Invictus Victory - Paco Rabanne',
        'K - Dolce & Gabbana',
        'K edt - Dolce & Gabbana',
        'L´Homme eau - Prada',
        'L´Homme - Prada',
        'L´Homme Intense - Prada',
        'Homme intense - Yves Saint Laurent',
        'La nuit de´l homme - Yves Saint Laurent',
        'L´Homme Ideal Extreme - Guerlain',
        'Le Beau Paradise Garden - Jean Paul Gaultier',
        'Le Beau Le Parfum - Jean Paul Gaultier',
        'Le Male Parfum - Jean Paul Gaultier',
        'Le Male Elixir - Jean Paul Gaultier',
        'Luna Rosa Carbon - Prada',
        'Luna Rosa Ocean - Prada',
        'Luna Rosa Black - Prada',
        'MYSLF - Yves Saint Laurent',
        'Ombre Leather - Tom Ford',
        'Ombre Leather Parfum - Tom Ford',
        'One Million Elixir - Paco Rabanne',
        'Polo Blue - Ralph Lauren',
        'Heritage - Guerlain',
        'Phantom - Paco Rabanne',
        'Phantom Parfum - Paco Rabanne',
        'Sauvage EDT - Dior',
        'Sauvage EDP - Dior',
        'Sauvage Parfum - Dior',
        'Sauvage Elixir - Dior',
        'Scandal him - Jean Paul Gaultier',
        'Spicebomb Extreme - Viktor & Rolf',
        'Spicebomb Infrared - Viktor & Rolf',
        'Spicebomb nightvision - Viktor & Rolf',
        'Spirit of the Brave - Diesel',
        'Spirit of the Brave intense - Diesel',
        'Stronger with you Absolutely - Giorgio Armani',
        'Noir Extreme - Tom Ford',
        'The Most Wanted - Azaro',
        'The One intense - Dolce & Gabbana',
        'Toy Boy - Moschino',
        'Ultra Male - Jean Paul Gaultier',
        'Uomo Born In Roma - Valentino',
        'Y men EDT - Yves Saint Laurent',
        'Y EDP - Yves Saint Laurent',
        'Y Le Parfum - Yves Saint Laurent',
        'Y Elixir - Yves Saint Laurent', 
        ]

        perfumes_mujer = [
        '212 heroes her - Carolina Herrera',
        'Alien her - Thierry Mugler',
        'Black Opium over red - Yves Saint Laurent',
        'Black Opium extreme - Yves Saint Laurent',
        'Black Opium green - Yves Saint Laurent',
        'Good Girl - Carolina Herrera',
        'Good Girl Supreme - Carolina Herrera',
        'Chloe absolute - Chloé',
        'Code Absolu woman - Georgio Armani',
        'Daisy Love - Marc Jacobs',
        'Devotion - Dolce & Gabbana',
        'Imperatrice 3 - Dolce & Gabbana',
        'The only one - Dolce & Gabbana',
        'The only one her - Dolce & Gabbana',
        'Dior Addict - Dior',
        'Femme intense - Paco Rabanne',
        'Femme Parfum - Paco Rabanne',
        'Femme Intense - Paco Rabanne',
        'Musc Noir for her - Narciso Rodriguez',
        'Divine - Jean Paul Gaultier',
        'Classique for her - Jean Paul Gaultier',
        'Good Girl Blush - Carolina Herrera',
        'Idole Aura - Lancome',
        'Idole nectar - Lancome',
        'Fleur D´Oranger - Prada',
        'Infusion de Figue - Prada',
        'J´Adore EDP - Dior',
        'J´Adore Infinissime - Dior',
        'L´Interdir Rouge - Givenchy',
        'La Belle Parfum - Jean Paul Gaultier',
        'La Belle Garden - Jean Paul Gaultier',
        'La Petite Noire Rose - Guerlain',
        'La Vie Est Belle Intense - Lancome',
        'Lady Million - Paco Rabanne',
        'Libre EDT - Yves Saint Laurent',
        'Libre Le Parfum - Yves Saint Laurent',
        'Libre Absolu - Yves Saint Laurent',
        'Miss Dior - Dior',
        'Mon G Bloom - Guerlain',
        'My Way Intense - Giorgio Armani',
        'My Way Le Parfum - Giorgio Armani',
        'My Way Nectar - Giorgio Armani',
        'Pure Musc - Narciso Rodriguez',
        'Olympea Solar - Paco Rabanne',
        'Paradoxe EDP - Prada',
        'Paradoxe Intense - Prada',
        'Poison EDP - Dior',
        'Poison EDT - Dior',
        'Q - Dolce & Gabbana',
        'Rose Passion - Jimmy Choo',
        'Scandal Le Parfum - Jean Paul Gaultier',
        'Si Passione - Giorgio Armani',
        'This is Her - Zadig & Voltaire',
        'This is really her - Zadig & Voltaire',
        'The Scent Her - Hugo Boss',
        'Yes I Am - Cacharel',
        'Very Good Girl EDP - Carolina Herrera',
        'Very Good Girl Glam - Carolina Herrera',
        ]

        # Abre el archivo CSV en modo de escritura
        with open('betaroma-test.csv', 'w', newline='') as csvfile:
            # Crea el escritor CSV
            writer = csv.writer(csvfile)

            # Escribe el encabezado del CSV
            writer.writerow(["Categoria", "Precio", "Nombre_Perfume", "Marca", "Nombre_Cliente", "Apellido_Cliente", "Edad", "Sexo", "Fecha_Compra", "Email", "Cesta"])

            # Escribe las filas de datos
            for i in range(600):
                categoria = random.choice(categorias)
                precio = precios[i]
                nombre_perfume = random.choice(perfumes_hombre if categoria == 'Hombre' else perfumes_mujer)
                marca = random.choice(marcas)
                nombre_cliente = random.choice(nombres)
                apellido_cliente = random.choice(apellidos)
                edad = edades[i]
                sexo = random.choice(sexos)
                fecha_compra = fechas_compra[i]
                email = emails[i]
                cesta = cestas[i]

                # Escribe la fila en el archivo CSV
                ##### Eldo #####
                # writer.writerow([categoria, precio,
                writer.writerow([categoria, precio])

class saveImage(APIView):

    def post(self, request, *args, **kwargs):
        # key = {
        #     'apiKey': "AIzaSyB6kpI7cg-fEim7JMo581nLCuj8n0DHugk",
        #     'authDomain': "beta-shopping-fa365.firebaseapp.com",
        #     'projectId': "beta-shopping-fa365",
        #     'storageBucket': "beta-shopping-fa365.appspot.com",
        #     'messagingSenderId': "981170774955",
        #     'appId': "1:981170774955:web:2614a1fc2f8c165aaae8ee"
        #     }
        if not firebase_admin._apps:
            key = {
                "type": "service_account",
                "project_id": "beta-shopping-fa365",
                "private_key_id": "056802ec6eb4549046b496ba124704463a76a2de",
                "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDWLfCb8b1HbUd8\nkYjWiNHOSD7ydImKBrEYUUXZmRddf7hsry4YsN0MuY2H3OANhKTUblLX+xQH+tXh\n01SnZpYti95UA2ozLSl8y5DV/z3GnWh5cFTrjndvHUR3c3ybWwyvk7V3rbbcIPKE\nzdfMx3Fg0w/ltzyeXZBDs7mmcZ4mMIrnCDP6EMjN/158Xliwtc3sYCi762tRltPs\nHKsZNDJcPnP1GcUEYMwxTPrTWKE2PI0OgCNhcW7SxfETFxloD0DKDIM8vSxN5tCf\nKB7a/vqb/ngxzwe6OXzbjXBv9sPZ6SgJkhsmWS19a6ckdoQOjGsHj000bmwyDiJk\nDnieTjInAgMBAAECggEAM+iLbYgfqy2Bi1/MTc54Juock2+KHBE2H6Im7y9q2cbI\nIFMutV48HMbl1d1C0hPpTPD2FBFuj+aLqsEova+fyycgebUgKooSCYRetHa5dqcU\nuIXwlux+5setndO4CgD9qJoAe6J29I/ppyUqXZ+iy2gr7K1FvE4J1la7MmtL/I4K\nnsIFbdOoZhA2/8i/BV+aZVATonirJUgl68CyYBriSNW6gkqKBShnVfILWP3nGHkc\ntWVWCmjMA+0OlKZ08aOYCx7I57cHiIzV4UidR7iag+PbHsz2PJtBYznfuUm88NZi\nXJDjreb3aeuNjIpRAJ1Yyssqjgkk/EeJIYFWvW2WVQKBgQD2PQJDcWQ6jd1iwuJZ\nG5N9SIDnoeSelXfijs4/l8x6nSaDmbGiG9rpvcaJawc1sXGANdSQ459TyRhaGFOx\nAgxRyGsrGF0W7WGPWHZLp6FkMZzq2IM34/yFKcsd+ug0s6mx6izrblEzn5XSjiWW\n6L/euKfoc01zj6X8aowXccwJTQKBgQDeq5OE/DfMRDuXv6UyjUArBgkIBXKnuu53\ndFP8hkrm1nzWB29BVa3Sz9K4wikDKz3mRwRW7xR6ZH16tuR8tn4sChIJVAb/tspw\nmlPiTBValHk+lr4CwjAz5JrobTdlmP+Lept9aGrJVLm45WPY8hbDDn3V3N0Rh2TQ\nQPtw7q1PQwKBgQC9MS72Br+NxcZdxYMIGAoAbp6sWlVAC3OrXTHW5pkzdF9NKd+z\nwFc41JkgqF1HweiFK9cA5ANc6tuNDbfv/rTceXLuD7Aml4koDD4H7uowA3afcm+P\nl9pDrlLj3A5hv9EYY+bTlVVKpskEmDcFdhtF0vcfwMe3jJ1qDatJsCOm2QKBgB/K\npXROQnUypMOExERUcH30DaQMixMxmEyL2lXqopUUuJwiUZslbXz02SQx7IMcUGkp\naJA08FqNMHEt3a+Eqr0E7xBP4/PsmDi9gA6GSGI3YpwyD4z7RsCR+iAHP+qMjqfO\naJbeKqj2JNImRjw6TE+rKQI414NiLl2heYTlPu9bAoGAd0W98GYXlKYiAQsKxjmN\nJy13e+BsKiq8NYWBYra7JiXzpi0UHzE01tDEX42xozMcP4262QBK6itImIka9Qms\nKnHM+2+wAhcHjYS+x5WT7F9teZ8bUFwUxT/PChCObjQKWJDS9CB5qMGi9dGV7gZH\nYWUxAHAdwdCvG/wTzlLQxl8=\n-----END PRIVATE KEY-----\n",
                "client_email": "firebase-adminsdk-yk2zn@beta-shopping-fa365.iam.gserviceaccount.com",
                "client_id": "113042159447118148941",
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
                "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yk2zn%40beta-shopping-fa365.iam.gserviceaccount.com",
                # "universe_domain": "googleapis.com"
            }

            cred = credentials.Certificate(key)
            firebase_admin.initialize_app(cred, {
                'storageBucket': 'beta-shopping-fa365.appspot.com'
            })
            bucket = storage.bucket()
            self.generateImage()
            ruta_local = 'histograma.jpg'
            ruta_destino ='analytics/histograma.jpg'
            blob = bucket.blob(ruta_destino)
            blob.upload_from_filename(ruta_local)

        return Response({"message": "Guardado"})
    

    def generateImage(self):
        df=pd.read_csv('perfumes.csv')
        # display(df)
        df.shape
        df.describe()
        plt.figure(figsize=(10, 6))
        sns.histplot(data=df, x='Precio', hue='Categoria', kde=True, bins=10)
        plt.title('Histograma de precios por categoría')
        plt.xlabel('Precio')
        plt.ylabel('Frecuencia')
        # plt.show()
        plt.savefig('histograma.jpg')

