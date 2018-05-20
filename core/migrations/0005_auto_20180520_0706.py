# Generated by Django 2.0.5 on 2018-05-20 07:06

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20180520_0616'),
    ]

    operations = [
        migrations.AddField(
            model_name='need',
            name='created',
            field=models.DateTimeField(auto_created=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='need',
            name='fulfilled_at',
            field=models.DateTimeField(null=True),
        ),
    ]
