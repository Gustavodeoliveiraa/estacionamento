# Generated by Django 4.2.6 on 2023-10-13 05:18

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Estaciona',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('placa', models.CharField(max_length=8)),
                ('carro', models.CharField(max_length=30)),
                ('data', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
