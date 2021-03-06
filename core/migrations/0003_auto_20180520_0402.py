# Generated by Django 2.0.5 on 2018-05-20 04:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20180520_0253'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='lat',
            field=models.DecimalField(decimal_places=6, default=0.0, max_digits=9),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='lon',
            field=models.DecimalField(decimal_places=6, default=0.0, max_digits=9),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
