# Generated by Django 4.0.4 on 2022-05-12 17:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('mainapp', '0002_rename_users_myusers'),
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='create_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mainapp.myusers'),
        ),
    ]
