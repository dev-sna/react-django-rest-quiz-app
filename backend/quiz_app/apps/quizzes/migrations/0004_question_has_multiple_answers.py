# Generated by Django 3.2.13 on 2022-05-20 21:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('quizzes', '0003_auto_20220519_1948'),
    ]

    operations = [
        migrations.AddField(
            model_name='question',
            name='has_multiple_answers',
            field=models.BooleanField(default=False),
        ),
    ]
