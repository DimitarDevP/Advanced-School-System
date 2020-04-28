import random, string

def genKey(strLen):
    chars = string.ascii_lowercase
    return ''.join(random.choice(chars) for i in range(strLen))