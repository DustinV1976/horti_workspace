# Generated by Django 5.1 on 2024-08-28 14:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('plants', '0002_remove_plant_image_plant_photo_alter_plant_type'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plant',
            name='photo',
        ),
    ]
