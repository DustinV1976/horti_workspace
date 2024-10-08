# Generated by Django 5.1 on 2024-08-26 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nutrients', '0002_nutrient_image_nutrient_nitrogen_nutrient_phosphorus_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='nutrient',
            name='amount',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='nutrient',
            name='unit',
            field=models.CharField(default='tsp/gallon', max_length=50),
        ),
    ]
