# Generated by Django 2.1.7 on 2019-03-31 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('art', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='artists'),
        ),
    ]
