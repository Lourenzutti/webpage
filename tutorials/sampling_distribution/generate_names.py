from faker import Faker
import pandas as pd
import numpy as np
import os

abspath = os.path.abspath(__file__)
os.chdir(os.path.dirname(abspath))

fake = Faker(['it_IT', 'en_US', 'ja_JP'])
names = []
income = []
for _ in range(2000):
    names.append(fake.name())
    income.append(np.random.normal(1000, 200, size=1)[0])

data = pd.DataFrame({'name':names, 'income':income})
data.to_csv("data.csv", index=False)